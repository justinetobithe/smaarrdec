import React, { useRef, useEffect, useContext, useState, setState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { AppContext } from '../../../store';
import { useFetch, useHttpRequest } from '../../../customHook';
import { notify } from '../../Elements';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';



export default function AddAgency() {



    const editorRef = useRef(null);


    let history = useHistory();


    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");

    const log = () => {
        if (editorRef.current) {
            0
            console.log(editorRef.current.getContent());
        }
    };

    const { state, dispatch } = useContext(AppContext);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-agencies",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }));

    useEffect(() => {
        if (!selectedFile) {
            setPreview(selectedFile)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0]);


    }

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );
            if (response.data.status) {
                history.push("/admin/agency/view");
            }
        }
    }, [response]);


    const onSubmit = data => {
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
                fd.append("agency_name", data.agency_name);
                fd.append("region", data.aregion);
                fd.append("acronym", data.aacronym);
                fd.append("site_url", !formData.site_url ? "#" : formData.site_url);
                fd.append("logo_url", selectedFile);

                httpRequest(fd);

            }
        });

    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Agency</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/agency/view/">View Agency</NavLink></li>
                    <li className="breadcrumb-item active">Add Agency</li>
                </ol>
                <div className="container-fluid add-project card mb-4 b-0 p-0">
                    <div className="col-lg-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-8 content-right mb-3">
                                    <div className="row-group mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Details
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Agency Name</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("agency_name", { required: true })}
                                                    />
                                                    {
                                                        errors.agency_name && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Region</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("agency_region")}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Acronym</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("agency_acronym")}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Link</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text" id="basic-addon1">🔗</span>
                                                        <input type="text" className="form-control" {...register("agency_site_url")} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 col-md-6 col-lg-4 content-left mb-3">
                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Agency Logo
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <div className="display-image mb-2">
                                                        {
                                                            selectedFile &&
                                                            <img
                                                                className="img-fluid"
                                                                src={preview}
                                                                alt="..."
                                                            >
                                                            </img>
                                                        }
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="Select image"
                                                        accept="image/png, image/jpeg"
                                                        defaultValue={selectedFile}
                                                        onChange={onSelectFile}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Action
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 gap-2 d-flex justify-content-center">
                                                    <button className="btn btn-info w-50 btn-sm">Save</button>
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/agency/view">Cancel</NavLink>
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

