import React, { useEffect, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppContext } from '../../store'
import { useHttpRequest } from "./../../customHook"
import Swal from 'sweetalert2';
import { notify } from '../Elements';


export default function Login() {

    const { state, dispatch } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: "/login",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" },
    }));

    // HANDLE RESPONSE CHANGES
    useEffect(() => {
        //SET LOADING
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );

            if (response.data.status) {
                dispatch({
                    type: "AUTHENTICATION",
                    payload: response.data.user
                })
            }
        }

    }, [response]);

    const onSubmit = (formData) => {
        let data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        handleHttpRequest(data);
    };



    return (
        <>
            <div className="container-fluid login__container">
                <div className="col-12 card">
                    <div className="card-header">
                        {/* <h2 className="text-center font-weight-light">Login</h2> */}
                        <img className="form-control" src="/img/logo.png" alt="Logo"></img>
                    </div>
                    <div className="card-body p-0">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="inputEmail"
                                    type="email"
                                    placeholder="name@example.com"
                                    // required
                                    {...register("email", { required: true })}
                                />
                                <label htmlFor="inputEmail">Email address</label>
                                {
                                    errors.email && (
                                        <div className="form-text ps-error-message">
                                            This field is required *
                                        </div>
                                    )
                                }
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="inputPassword"
                                    type="password"
                                    placeholder="Password"
                                    // required
                                    {...register("password", { required: true })}
                                />
                                <label htmlFor="inputPassword">Password</label>
                                {
                                    errors.password && (
                                        <div className="form-text ps-error-message">
                                            This field is required *
                                        </div>
                                    )
                                }
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                <label className="form-check-label" htmlFor="inputRememberPassword">Remember
                                    Password</label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <a className="small" href="/admin/register">Register Account</a>
                                <button className="btn btn-primary" >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
