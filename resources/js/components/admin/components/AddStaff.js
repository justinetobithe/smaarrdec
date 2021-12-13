import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useHttpRequest } from '../../../customHook'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { notify } from '../../Elements'
import { AppContext } from '../../../store'



export default function AddStaff() {

    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    let history = useHistory();
    const { state, dispatch } = useContext(AppContext);


    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


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


    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-staff",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }));

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });
        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );
            if (response.data.status) {
                history.push("/admin/staff/view");
            }
        }
    }, [response]);

    const onSubmit = data => {
        if (selectedFile == "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Staff image is required!',
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
                    fd.append("fname", data.fname);
                    fd.append("lname", data.lname);
                    fd.append("position", data.position);
                    fd.append("image_file", selectedFile);
                    fd.append("status", 1);
                    httpRequest(fd);
                }
            })
        }
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Staff</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/staff/view/">View Staff</NavLink></li>
                    <li className="breadcrumb-item active">Add Staff</li>
                </ol>
                <div className="container-fluid add-post card mb-4 b-0 p-0">
                    <div className="col-lg-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-8 content-right mb-3">
                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Details
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Firstname</label>
                                                    <input className="form-control" type="text" id="firstName" {...register("fname", { required: true })} />
                                                    {
                                                        errors.fname && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }

                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Lastname</label>
                                                    <input className="form-control" type="text" id="lastName" {...register("lname", { required: true })} />
                                                    {
                                                        errors.lname && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }

                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Position</label>
                                                    <input className="form-control" type="text" id="position" {...register("position", { required: true })} />
                                                    {
                                                        errors.position && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }

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
                                                    Staffs Image
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
                                                            ></img>
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
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/staff/view">Cancel</NavLink>
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