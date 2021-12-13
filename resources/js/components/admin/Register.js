import React, { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Route, useHistory, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHttpRequest } from '../../customHook';
import { AppContext } from '../../store';
import { notify } from '../Elements';



export default function Register() {

    const { state, dispatch } = useContext(AppContext);

    const [isChecked, setIsChecked] = useState(false);

    let history = useHistory();

    document.body.style = 'background: #ff1949; height: inherit!important;';

    const [userInfo, setUserInfo] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    });

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm();

    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/register",
        method: "POST",
        data,
        // headers: { "Content-Type": "multiple/form-data" },
        headers: { "Content-Type": "application/json" },
    }));

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.length || response.data !== null) {
            // notify(
            //     response.error.length ? response.error : response.data.message,
            //     response.data.status ? "success" : "error"
            // );

            Swal.fire({
                icon: response.data.status ? "success" : "error",
                title: response.error.length ? response.error : response.data.message,
                showConfirmButton: true,
                timer: 2000
            });
            if (response.data.status) {
                history.push("/admin/register");
                // <Redirect path to="/admin/register" />
            }
        }

    }, [response])

    const onSubmit = data => {
        if (data.name == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Name must be filled out.',
            });
        } else if (data.email == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email must be filled out.',
            });
        } else if (data.password == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be filled out.',
            });
        } else if (data.confirmPassword == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Confirm Password must be filled out.',
            });
        } else if (data.password != data.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password does not matched!',
            });
        } else if (data.password == data.confirmPassword) {
            if (!isChecked) {
                Swal.fire({
                    icon: 'info',
                    title: 'Information',
                    text: 'Please read the terms and conditions.',
                });
            } else {
                let fd = new FormData();
                fd.append("name", data.name);
                fd.append("email", data.email);
                fd.append("password", data.password);
                httpRequest(fd);
            }
        }
    }

    return (
        <>
            <div className="container-fluid register__container">
                <div className="col-12 card">
                    <div className="card-header">
                        <img className="form-control" src="/img/logo.png" alt="Logo"></img>
                    </div>
                    <div className="card-body p-0">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    {...register("name", { required: true })}
                                />
                                <label htmlFor="name">Name</label>
                                {
                                    errors.name && (
                                        <div className="form-text">
                                            <div className="ps-error-message">
                                                This field is required *
                                            </div>
                                        </div>

                                    )
                                }
                            </div>


                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    {...register("email", { required: true })}
                                />
                                <label htmlFor="email">Email address</label>
                                {
                                    errors.email && (
                                        <div className="form-text">
                                            <div className="ps-error-message">
                                                This field is required *
                                            </div>
                                        </div>

                                    )
                                }
                            </div>


                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", { required: true })}
                                />
                                <label htmlFor="password">Password</label>
                                {
                                    errors.password && (
                                        <div className="form-text">
                                            <div className="ps-error-message">
                                                This field is required *
                                            </div>
                                        </div>

                                    )
                                }
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="confirmPassword"
                                    name="password"
                                    type="password"
                                    placeholder="Confrim Password"
                                    {...register("confirmPassword", { required: true })}
                                />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                {
                                    errors.confirmPassword && (
                                        <div className="form-text">
                                            <div className="ps-error-message">
                                                This field is required *
                                            </div>
                                        </div>

                                    )
                                }
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    id="inputTermsAndCondition"
                                    type="checkbox"
                                    defaultChecked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                // {...register("checkbox", { register: true })}
                                />
                                <label className="form-check-label" htmlFor="inputTermsAndCondition">I have read and agree to the Terms and Conditions and Privacy Policy</label>
                            </div>
                            {/* <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <button className="btn btn-primary w-100">Register</button>
                            </div> */}
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <a className="small" href="/admin/login">Already have an account?</a>
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
