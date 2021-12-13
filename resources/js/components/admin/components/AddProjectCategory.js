import React, { useRef, useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import slugify from "slugify"
import { AppContext } from '../../../store'
import { useFetch, useHttpRequest } from '../../../customHook'
import { useForm } from 'react-hook-form'
import { notify } from '../../Elements'
import Swal from 'sweetalert2'


export default function AddProjectCategory() {

    const editorRef = useRef(null);

    let history = useHistory();


    const log = () => {
        if (editorRef.current) {
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
        url: "/insert-project-categories",
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
                history.push("/admin/project/category/view");
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
                fd.append("project_category_name", data.project_category_name);
                fd.append("project_category_description", editorRef.current.getContent());
                fd.append("status", 1);
                httpRequest(fd);

            }
        });
    }

    return (
        <>

            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Project Category</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/project/category/view">Project Category</NavLink></li>
                    <li className="breadcrumb-item active">Add Project Category</li>
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
                                                    <label className="form-label">Category Name</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("project_category_name", { required: true })}
                                                    />
                                                    {
                                                        errors.project_category_name && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>

                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Executive Summary</label>
                                                    <Editor
                                                        className="form-control"
                                                        apiKey="rmaraoxct4iqpbk2ur478gvlxmdpuekuur95ua0latdnclkq"
                                                        onInit={(evt, editor) => editorRef.current = editor}
                                                        init={{
                                                            height: 500,
                                                            menubar: 'view edit format table',
                                                            plugins: [
                                                                'advlist autolink lists link image charmap print preview anchor',
                                                                'searchreplace visualblocks code fullscreen',
                                                                'insertdatetime media table paste code help wordcount'
                                                            ],
                                                            toolbar: 'undo redo | formatselect | ' +
                                                                'bold italic backcolor | alignleft aligncenter ' +
                                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                'removeformat | help',
                                                            selector: 'textarea',

                                                        }}
                                                    />
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
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/project/category/view">Cancel</NavLink>
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
