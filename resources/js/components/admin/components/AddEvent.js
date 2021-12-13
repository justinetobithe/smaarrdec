import React, { useRef, useState, useEffect, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { notify } from '../../Elements'
import Swal from 'sweetalert2'
import { AppContext } from '../../../store'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { useHttpRequest } from '../../../customHook'
import dateFormat from 'dateformat'

export default function AddEvent() {

    const { state, dispatch } = useContext(AppContext);

    const editorRef = useRef(null);


    let history = useHistory();

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();


    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-events",
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
                history.push("/admin/event/view");
            }
        }
    }, [response]);

    useEffect(() => {

        if (!selectedFile) {
            // setPreview(undefined)
            return true;
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);


    }, [selectedFile])




    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            // setSelectedFile(undefined)
            return true;
        }
        setSelectedFile(e.target.files[0]);
    }

    const onSubmit = data => {
        if (startDate == null || endDate == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please set a date!',
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
                    fd.append("event_title", data.event_title);
                    fd.append("author_id", state.user.id);
                    fd.append("event_description", data.event_description);
                    fd.append("event_content", editorRef.current.getContent());
                    fd.append("event_location", data.event_location)
                    fd.append("event_slug", slugify(data.event_title).toLowerCase().replace(/[():,'"]+/g, ''));
                    fd.append("date_started", dateFormat(startDate, "yyyy-mm-dd HH:MM:ss"));
                    fd.append("date_ended", dateFormat(endDate, "yyyy-mm-dd HH:MM:ss"));
                    fd.append("status", "1");
                    fd.append("event_image", selectedFile);
                    httpRequest(fd);

                }
            });
        }
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Event</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/event/view/">View Event</NavLink></li>
                    <li className="breadcrumb-item active">Add Event</li>
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
                                                    <label className="form-label">Event Name</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("event_title", { required: true })}
                                                    />
                                                    {
                                                        errors.event_title && (
                                                            <div className="form-text ps-error-message">This field is required *</div>
                                                        )
                                                    }
                                                </div>

                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Event Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="2"
                                                        {...register("event_description")}
                                                    >
                                                    </textarea>
                                                </div>

                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Enter Location</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="2"
                                                        {...register("event_location")}
                                                    >
                                                    </textarea>
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
                                                    Date
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid w-100">
                                                    <label htmlFor="startDate" className="form-label">Set start date</label>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        className="form-control w-100"
                                                        selectsStart
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        showTimeSelect
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid w-100">
                                                    <label htmlFor="endDate" className="form-label">Set end date</label>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        className="form-control w-100"
                                                        selectsEnd
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        minDate={startDate}
                                                        showTimeSelect
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Featured Image
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
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/event/view">Cancel</NavLink>
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
