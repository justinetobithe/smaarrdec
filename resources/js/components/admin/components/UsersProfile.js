import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHttpRequest } from '../../../customHook'
import { AppContext } from '../../../store'
import { notify } from '../../Elements'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function UsersProfile() {
    const { state, dispatch } = useContext(AppContext);
    const [togglePassword, setTogglePassword] = useState(true);



    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: `/api/users/${state.user.id}`,
        method: "POST",
        data,
        header: { "Content-Type": "application/json" },
    }));



    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });
        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );
            if (
                isset(response.data.password_changed) &&
                response.data.password_changed
            ) {
                axios.get("/sanctum/csrf-cookie").then(() => {
                    axios.post("/logout").then(() => {
                        dispatch({
                            type: "AUTHENTICATION",
                            payload: {}
                        });
                    });
                });
            }
        }
    }, [response]);

    const watchNewPassword = watch("newPassword");

    const onSubmit = (data) => {

        Swal.fire({
            title: 'Are you sure you want to change your password? You will be logout if you click OK.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("_method", "PUT");
                for (let key in data) {
                    fd.append(key, data[key]);
                }

                handleHttpRequest(fd);
            }
        })
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Users Profile</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">Users Profile</li>
                </ol>
                <div className="card mb-4">
                    <div className="card-body">

                        <form onSubmit={handleSubmit(onSubmit)} className="ps-profile-form">
                            <div className="mb-4 row">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label text-left text-md-end">Name :</label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        id="inputName"
                                        className="form-control"
                                        defaultValue={state.user.name}
                                        {...register("name", { required: true, })}
                                        disabled
                                    />
                                    {
                                        errors.name && (<div className="form-text ps-error-message">This field is required *</div>)
                                    }
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label text-left text-md-end">Email :</label>
                                <div className="col-sm-5">
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        defaultValue={state.user.email}
                                        {...register("email", { required: true, })}
                                        disabled
                                    />
                                    {
                                        errors.email && (<div className="form-text ps-error-message">This field is required *</div>)
                                    }
                                </div>
                            </div>

                            <h4 className="my-4">Change Password</h4>

                            <div className="mb-4 row">
                                <label htmlFor="inputCurrentPassword" className="col-sm-2 col-form-label text-left text-md-end">Current Password :</label>
                                <div className="col-sm-5">
                                    <input
                                        type="password"
                                        id="inputCurrentPassword"
                                        className="form-control"
                                        {...register("currentPassword", { required: true })}
                                    />
                                    {
                                        errors.currentPassword && (<div className="form-text ps-error-message">This field is required *</div>)
                                    }
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label htmlFor="inputNewPassword" className="col-sm-2 col-form-label text-left text-md-end">New Password :</label>
                                <div className="col-sm-5">
                                    <input
                                        type={
                                            togglePassword
                                                ? "password"
                                                : "text"
                                        }
                                        id="inputNewPassword"
                                        className="form-control"
                                        {...register("newPassword", {
                                            minLength: {
                                                value: 8,
                                                message: "Password must at least 8 characters"
                                            },
                                            required: isset(true) ? null : "This field is required *"
                                        })}
                                    />
                                    {
                                        errors.newPassword && (<div className="form-text ps-error-message">{errors.newPassword.message}</div>)
                                    }
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label text-left text-md-end">Confirm Password :</label>
                                <div className="col-sm-5">
                                    <input
                                        type={
                                            togglePassword
                                                ? "password"
                                                : "text"
                                        }
                                        id="inputConfirmPassword"
                                        className="form-control"
                                        {
                                        ...register("confirmPassword", {
                                            minLength: {
                                                value: 8,
                                                message: "Password must at least 8 characters",
                                            },
                                            validate: (value) =>
                                                (watch("newPassword")
                                                    .length && value === watchNewPassword) ||
                                                "Password does not match",
                                        })
                                        }
                                    />
                                    {
                                        errors.confirmPassword && (<div className="form-text ps-error-message"> {errors.confirmPassword.message}</div>)
                                    }
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label className="col-sm-2 col-form-label text-left text-md-end"></label>
                                <div className="col-sm-5">
                                    <ul>
                                        <li>Please do note that this action can't be undone.</li>
                                        <li>Your email address will be used to login your account</li>
                                    </ul>
                                    <div className="mb-3 gap-2 d-flex justify-content-center">
                                        <button className="btn btn-info w-50 btn-sm text-white">Save</button>
                                        <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/dashboard">Cancel</NavLink>
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
