import MUIDataTable from 'mui-datatables'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { useFetch, useHttpRequest } from '../../../customHook'
import { AppContext } from '../../../store'
import { notify } from '../../Elements'

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "added_by", label: "Added By", option: { filter: true, sort: true } },
    { name: "title", label: "Title", option: { filter: true, sort: true } },
    { name: "subject", label: "Subject/Project", option: { filter: true, sort: true } },
    { name: "message", label: "Message", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsize: 'standard',
    selectableRows: false,
    download: false,
    print: false
};

export default function ViewRequestList() {


    let history = useHistory();

    const [selectedProject, setSelectedProject] = useState()
    const [selectedResearchers, setSelectedResearchers] = useState()

    const { state, dispatch } = useContext(AppContext)

    const { data, loading } = useFetch({
        url: `/api/project-requests`
    })

    const projects = useFetch({
        url: `/api/get-project-name`
    })

    const researchers = useFetch({
        url: "/api/display-researchers-except-name"
    })

    const users = useFetch({
        url: "/api/users"
    })


    useEffect(() => {
        dispatch({ type: "FETCH_PROJECT_REQUESTS", payload: data })
    }, [data])

    useEffect(() => {
        dispatch({ type: "FETCH_PROJECTS", payload: projects.data })
    }, [projects.data])

    useEffect(() => {
        dispatch({ type: "FETCH_RESEARCHERS", payload: researchers.data })
    }, [researchers.data])


    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/project/delegate-project",
        method: "POST",
        data: data,
        header: { "Content-Type": "application/json" }
    }))

    const [markAsReadResponse, handleMarkAsRead] = useHttpRequest((id, data) => ({
        url: `api/project-request/${id}`,
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }))

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading })

        if (response.error.lenth || response.data != null) {
            notify(
                response.error.lenth ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            )
            if (response.data.status) {
                if (response.data != null) {
                    history.push("/admin/request-project/researcher/view");
                }
            }
        }
    }, [response])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: markAsReadResponse.loading })

        if (markAsReadResponse.error.lenth || markAsReadResponse.data != null) {
            notify(
                markAsReadResponse.error.lenth ? markAsReadResponse.error : markAsReadResponse.data.message,
                markAsReadResponse.data.status ? "success" : "error"
            )
            if (markAsReadResponse.data.status) {
                dispatch({ type: "UPDATE_PROJECT_REQUESTS", payload: markAsReadResponse.data.payload })
            }
        }
    }, [markAsReadResponse])

    const onSubmit = () => {
        if (selectedProject == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a project!',
            });
        } else if (selectedResearchers == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a researcher',
            });
        } else {
            Swal.fire({
                title: 'Are you sure you want to delegate this project?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    let fd = new FormData();
                    fd.append("project_id", selectedProject.value)
                    fd.append("researcher_email", selectedResearchers.value)
                    handleHttpRequest(fd);
                }
            })
        }
    }

    const markAsRead = (id, researher_email) => {
        Swal.fire({
            title: 'Are you sure you want this request to mark as read?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = new FormData();
                data.append("_method", "PUT")
                data.append("researcher_email", researher_email)
                data.append("read_type", 1)
                handleMarkAsRead(id, data);
            }
        })
    }


    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Request Lists</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">Request Lists</li>
                </ol>
                <div className="mb-4">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="request-list-tab" data-bs-toggle="tab" data-bs-target="#request-list" type="button" role="tab" aria-controls="request-list" aria-selected="true">Request List</button>
                            <button className="nav-link" id="delegate-project-tab" data-bs-toggle="tab" data-bs-target="#delegate-project" type="button" role="tab" aria-controls="delegate-project" aria-selected="false">Delegate Project</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="request-list" role="tabpanel" aria-labelledby="request-list-tab">
                            <div className="col-12 mt-4">
                                <MUIDataTable
                                    title={"Request List"}
                                    data={
                                        state.projectRequests.map((projectRequests, index) => ({
                                            id: index + 1,
                                            added_by: users.data.map(item => {
                                                if (JSON.stringify(projectRequests.researcher_email).includes(item.email)) {
                                                    return item.name
                                                }
                                            }),
                                            title: projectRequests.title,
                                            subject: projectRequests.subject,
                                            message: projectRequests.message,
                                            status:
                                                projectRequests.read_type == 1 ? (
                                                    <p className="text-success m-0">
                                                        Read
                                                    </p>
                                                ) : (
                                                    <p className="text-danger m-0">
                                                        Unread
                                                    </p>
                                                ),
                                            action:
                                                projectRequests.read_type == 1 ? (
                                                    ""
                                                ) : (
                                                    <button className="btn btn-info btn-sm text-white" onClick={() => markAsRead(projectRequests.id, projectRequests.researcher_email)}>Set as read</button>
                                                ),

                                        }))
                                    }
                                    options={options}
                                    columns={columns}
                                />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="delegate-project" role="tabpanel" aria-labelledby="delegate-project-tab">
                            <div className="col-12 mt-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Details
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-4 row">
                                                    <label className="col-sm-2 col-form-label">Project Name</label>
                                                    <div className="col-sm-5">
                                                        <Select
                                                            options={
                                                                state.projects.map(project => ({
                                                                    value: project.id,
                                                                    label: project.project_title
                                                                }))
                                                            }
                                                            isClearable
                                                            defaultValue={selectedProject}
                                                            onChange={setSelectedProject}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-4 row">
                                                    <label className="col-sm-2 col-form-label">Researcher</label>
                                                    <div className="col-sm-5">
                                                        <Select
                                                            options={
                                                                state.researchers.map(researchers => ({
                                                                    value: researchers.email,
                                                                    label: researchers.name
                                                                }))
                                                            }
                                                            isClearable
                                                            defaultValue={selectedResearchers}
                                                            onChange={setSelectedResearchers}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3 row">
                                                    <label className="col-sm-2 col-form-label text-left text-md-end"></label>
                                                    <div className="col-sm-5">
                                                        <div className="mb-3 gap-2 d-flex justify-content-center">
                                                            <button className="btn btn-info w-50 btn-sm text-white">Save</button>
                                                            <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/project/my-projects">Cancel</NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}
