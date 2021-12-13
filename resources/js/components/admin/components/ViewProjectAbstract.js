import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Select from 'react-select'
import { useFetch } from '../../../customHook'
import { AppContext } from '../../../store'
import dateFormat from 'dateformat'
import MUIDataTable from 'mui-datatables'
import { Button } from 'react-bootstrap'
import ProjectAbstractModal from './Modal/ProjectAbstractModal'

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "abstract_name", label: "Abstract Name", option: { filter: true, sort: true } },
    { name: "attached_file", label: "Attached File", option: { filter: true, sort: true } },
    { name: "date_published", label: "Date Published", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
    { name: "action", label: "Actions", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsize: 'standard',
    selectableRows: false,
    download: false,
    print: false
};


export default function ViewProjectAbstract() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext)


    const [selectedProject, setSelectedProject] = useState([]);

    const { data, loading } = useFetch({
        url: selectedProject != null ? `/api/get-project-abstract?filterProject=${selectedProject.value}` : ''
    })

    useEffect(() => {
        dispatch({ type: "FETCH_PROJECT_ABSTRACTS", payload: data })
    }, [data])

    const projects = useFetch({
        url: `/api/get-project-name/${state.user.email}`
    })


    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Project Abstract",
                data,
                size: "md",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => { }
                        },
                    })
                    history.push("/admin/project/abstract/view");
                },
                data: data,
                children: <ProjectAbstractModal />
            },
        })
    }


    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Project Abstract</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">View Project Abstract</li>
                </ol>
                <div className="card z-index mb-4">
                    <div className="card-body">
                        <div className="row">
                            <label htmlFor="inputName" className="col-sm-2 col-form-label text-left">Select Project :</label>
                            <div className="col-sm-5">
                                <Select
                                    options={
                                        projects.data.map(projects => ({
                                            value: projects.id,
                                            label: projects.project_title
                                        }))
                                    }
                                    isClearable
                                    defaultValue={isset(selectedProject) ? selectedProject : []}
                                    onChange={setSelectedProject}

                                />
                            </div>
                            <div className="col-sm-5 d-flex justify-content-end">
                                <NavLink type="button" className="btn btn-info btn-sm text-white d-flex align-items-center justify-content-center" to="/admin/project/abstract/add">Generate Abstract</NavLink>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Abstracts"}
                            data={
                                state.projectAbstracts.map((abstract, index) => ({
                                    id: index + 1,
                                    abstract_name: abstract.abstract_name,
                                    attached_file: <a className="fw-bold fst-italic text-decoration-none text-dark" target="_blank" href={abstract.attached_file}>{abstract.abstract_name}</a>,
                                    date_published: dateFormat(abstract.created_at, "mmmm d, yyyy"),
                                    status: abstract.status == 1 ? <p className="text-success m-0">Active</p> : <p className="text-danger m-0">Unactive</p>,
                                    action:
                                        <Button
                                            id={abstract.id}
                                            onClick={() => openModal(abstract)}
                                            type="button"
                                            className="btn btn-info btn-sm"
                                        >Edit</Button>
                                }))
                            }
                            options={options}
                            columns={columns}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}
