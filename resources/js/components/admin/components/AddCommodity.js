import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { useFetch, useHttpRequest } from '../../../customHook'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { notify } from '../../Elements'
import slugify from 'slugify'
import { AppContext } from '../../../store'
import Select from 'react-select'

export default function AddCommodity() {
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


        console.log("Image :", selectedFile.value);
    }


    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-commodities",
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
                history.push("/admin/commodity/view");
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
                fd.append("commodity_name", data.commodity_name);
                fd.append("commodity_content", editorRef.current.getContent());
                fd.append("commodity_slug", slugify(data.commodity_name).toLowerCase().replace(/[():,'"]+/g, ''));
                fd.append("commodity_image", selectedFile);
                httpRequest(fd);
            }
        })
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Commodity</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/commodity/view">View Commodity</NavLink></li>
                    <li className="breadcrumb-item active">Add Commodity</li>
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
                                                    <label className="form-label">Commodity Name</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("commodity_name", { required: true })}
                                                    />
                                                    {
                                                        errors.commodity_name && (<div className="form-text ps-error-message">This field is required *</div>)
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
                                                    Commodity Image
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
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/commodity/view">Cancel</NavLink>
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
