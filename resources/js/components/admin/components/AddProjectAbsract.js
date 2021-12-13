import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { useFetch, useHttpRequest } from '../../../customHook'
import { AppContext } from '../../../store'
import { notify } from '../../Elements'



export default function AddProjectAbsract() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext)

    const { data, loading } = useFetch({
        url: `/api/get-project-name/${state.user.email}`
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    const [selectedProject, setSelectedProject] = useState();

    const [selectedFile, setSelectedFile] = useState("");

    const onSelectFile = e => {
        setSelectedFile(e.target.files[0]);
    }

    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-project-abstract",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }))

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading })
        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );
            if (response.data.status) {
                history.push("/admin/project/abstract/view");
            }
        }
    }, [response])

    const onSubmit = data => {
        if (selectedProject == undefined || selectedProject == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a project first',
            });
        } else if (selectedFile == undefined || selectedFile == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please attached a file!',
            });
        } else {
            Swal.fire({
                title: 'Are you sure you want to save this data?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    let fd = new FormData();
                    fd.append("project_id", selectedProject.value);
                    fd.append("abstract_name", data.abstract_name);
                    fd.append("attached_file", selectedFile);
                    fd.append("status", 0);
                    httpRequest(fd);
                }
            })
        }
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Generate New Abstract</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/project/abstract/view">View Project Abstract</NavLink></li>
                    <li className="breadcrumb-item active">Generate New Abstract</li>
                </ol>

                <div className="container-fluid add-post card mb-4 b-0 p-0">
                    <div className="col-lg-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-12 content-right mb-3">
                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Details
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-4 row">
                                                    <label className="form-label">Project Name</label>
                                                    <div className="col-sm-5">
                                                        <Select
                                                            options={
                                                                data.map(projects => ({
                                                                    value: projects.id,
                                                                    label: projects.project_title
                                                                }))
                                                            }
                                                            isClearable
                                                            defaultValue={selectedProject}
                                                            onChange={setSelectedProject}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-4 row">
                                                    <label className="form-label">Abstract Name</label>
                                                    <div className="col-sm-5">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            {...register("abstract_name")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-4 row">
                                                    <label className="form-label">Attached File</label>
                                                    <div className="col-sm-5">
                                                        <input
                                                            type="file"
                                                            onChange={onSelectFile}
                                                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-sm-2 col-form-label text-left text-md-end"></label>
                                                    <div className="col-sm-5">
                                                        <div className="mb-3 gap-2 d-flex justify-content-center">
                                                            <button className="btn btn-info w-50 btn-sm text-white">Save</button>
                                                            <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/project/abstract/view">Cancel</NavLink>
                                                        </div>
                                                    </div>
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
        </>
    )
}

const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

