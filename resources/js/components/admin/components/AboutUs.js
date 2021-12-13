import React, { useRef, useState, useEffect, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { notify } from '../../Elements'
import Swal from 'sweetalert2'
import { AppContext } from '../../../store'
import { useFetch, useHttpRequest } from '../../../customHook'
import { useForm } from 'react-hook-form'

export default function AboutUs() {

    const { state, dispatch } = useContext(AppContext);

    const editorRef = useRef(null);
    const [aboutUsDetails, setAboutUsDetails] = useState({})

    let history = useHistory();

    const { data, loading } = useFetch({
        url: "/api/system-options/get-essential-data"
    })

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    } 

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            about_us: aboutUsDetails.about_us
        }
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        for (const property in aboutUsDetails) {
            setValue(property, aboutUsDetails[property])
        }
    }, [aboutUsDetails])

    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/system-options/update-about-us",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }));


    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.legth || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            )
            if (response.data.status) {
                history.push("/admin/page/about-us");
            }
        }
    }, [response]);

    const onSubmit = () => {
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
                fd.append("about_us", editorRef.current.getContent());
                handleHttpRequest(fd);

            }
        });
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Edit About Us</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">Edit About Us</li>
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
                                                    <label className="form-label">Content</label>
                                                    <Editor
                                                        className="form-control"
                                                        apiKey="rmaraoxct4iqpbk2ur478gvlxmdpuekuur95ua0latdnclkq"
                                                        onInit={(evt, editor) => editorRef.current = editor}
                                                        initialValue={
                                                            isset(aboutUsDetails.about_us)
                                                                ? aboutUsDetails.about_us
                                                                : data.about_us
                                                        }
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
