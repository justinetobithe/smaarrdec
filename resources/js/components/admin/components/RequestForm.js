import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFetch, useHttpRequest } from '../../../customHook'
import { AppContext } from '../../../store'
import { notify } from '../../Elements'

export default function RequestForm() {

    const { state, dispatch } = useContext(AppContext)

    let history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-project-request",
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
                history.push("/admin/request-project/view");
            }
        }

    }, [response])

    const onSubmit = data => {
        Swal.fire({
            title: 'Are you sure you want to send this data?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("researcher_email", state.user.email)
                fd.append("title", data.title)
                fd.append("subject", data.subject)
                fd.append("message", data.message)
                fd.append("read_type", "0")
                fd.append("status", "1")
                httpRequest(fd);
            }
        })
    }
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Request Form</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">Request Form</li>
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
                                                    <label className="form-label">Title</label>
                                                    <input className="form-control" type="text" defaultValue="I would like to request my project" {...register("title", { required: true })} />
                                                    {
                                                        errors.title && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }

                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Subject/Project</label>
                                                    <input className="form-control" type="text"  {...register("subject", { required: true })} />
                                                    {
                                                        errors.subject && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }

                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Message</label>
                                                    <textarea className="form-control" rows="5" {...register("message", { required: true })} >
                                                    </textarea>
                                                    {
                                                        errors.message && (<div className="form-text ps-error-message">This field is required *</div>)
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
                                                    Action
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 gap-2 d-flex justify-content-center">
                                                    <button className="btn btn-info w-50 btn-sm">Save</button>
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/dashboard">Cancel</NavLink>
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
