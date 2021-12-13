import React, { useRef, useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import Select from "react-select"
import { useFetch, useHttpRequest } from '../../../customHook'
import { AppContext } from '../../../store'
import { useForm } from 'react-hook-form'
import { notify } from '../../Elements'
import Swal from 'sweetalert2'
import slugify from 'slugify'


const statusOptions = [
    { value: "1", label: "Active" },
    { value: "0", label: "Unactive" }
]

export default function AddResearcher() {

    let history = useHistory();
    const editorRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const [status, setStatus] = useState();

    const [degree, setDegree] = useState();

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/degrees",
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);


    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-researchers",
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
                history.push("/admin/researcher/view");
            }
        }
    }, [response]);


    const onSubmit = data => {
        if (data.name == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Content must be filled out.',
            });

        } else if (data.email == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Email must be filled out.',
            });

        } else if (data.contact_no == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Contact Number must be filled out.',
            });

        } else if (data.place_of_assignment == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Place of Assignment must be filled out.',
            });

        } else if (preview == null || preview.value == "undefined") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Featured Image is undefined!',
            });
        } else if (status.value == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Email must be filled out.',
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

                    fd.append('name', data.name);
                    fd.append('email', data.email);
                    fd.append('contact_no', data.contact_no);
                    fd.append('slug', slugify(data.name).toLowerCase().replace(/[():,'"]+/g, ''));
                    fd.append('image', selectedFile);
                    fd.append('place_of_assignment', data.place_of_assignment);
                    fd.append('specialization', data.specialization);
                    fd.append('expertise', data.expertise);
                    fd.append('status', status.value);
                    httpRequest(fd);

                }
            });

        }
    }

    const [num, setNum] = useState(0);

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Researcher</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/researcher/view/">View Researcher</NavLink></li>
                    <li className="breadcrumb-item active">Add Researcher</li>
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
                                                    <label htmlFor="name" className="form-label">Name :</label>
                                                    <input
                                                        className="form-control"
                                                        type="text" id="name"
                                                        {...register("name", { required: true })}
                                                    />

                                                    {
                                                        errors.name && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label htmlFor="email" className="form-label">Email :</label>
                                                    <input
                                                        className="form-control"
                                                        type="email"
                                                        id="email"
                                                        {...register("email", { required: true })}
                                                    />

                                                    {
                                                        errors.email && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label htmlFor="contact_number" className="form-label">Contact No. :</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        maxLength="11"
                                                        id="contact_number"
                                                        {...register("contact_no", { required: true })}
                                                    />
                                                    {
                                                        errors.contact_no && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label htmlFor="placeOfAssignment" className="form-label">Place of Assignment :</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        id="placeOfAssignment"
                                                        {...register("place_of_assignment", { required: true })}
                                                    />

                                                    {
                                                        errors.place_of_assignment && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label htmlFor="specialization" className="form-label">Specialization :</label>
                                                    <textarea
                                                        className="form-control"
                                                        type="text"
                                                        id="specialization"
                                                        rows="2"
                                                        {...register("specialization", { required: true })}
                                                    ></textarea>
                                                    {
                                                        errors.specialization && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label htmlFor="expertise" className="form-label">Expertise :</label>
                                                    <textarea
                                                        className="form-control"
                                                        type="text"
                                                        id="expertise"
                                                        rows="2"
                                                        {...register("expertise", { required: true })}
                                                    ></textarea>

                                                    {
                                                        errors.expertise && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-group mt-3">
                                        <div className="card">
                                            <div className="tabbable tabs-left">
                                                <ul className="col-12 col-md-3 nav nav-tabs" id="myTab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link active" id="pds-tab" data-bs-toggle="tab" data-bs-target="#pds" type="button" role="tab" aria-controls="pds" aria-selected="false">PDS </button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="resume-tab" data-bs-toggle="tab" data-bs-target="#resume" type="button" role="tab" aria-controls="resume" aria-selected="false">Resume </button>
                                                    </li>
                                                </ul>
                                                <div className="col-12 col-md-9 tab-content mh-300">
                                                    <div className="tab-pane active" id="pds" role="tabpanel" aria-labelledby="pds-tab">
                                                        <div className="row-group">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5>
                                                                        Resume
                                                                    </h5>
                                                                </div>
                                                                <div className="card-body">
                                                                    <div className="mb-3 row-fluid">
                                                                        <input type="file" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane" id="resume" role="tabpanel" aria-labelledby="resume-tab">
                                                        <div className="row-group">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5>
                                                                        Personal Data Sheet
                                                                    </h5>
                                                                </div>
                                                                <div className="card-body">
                                                                    <div className="mb-3 row-fluid">
                                                                        <input type="file" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                    Status
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <Select
                                                        options={statusOptions}
                                                        placeholder="Select a status"
                                                        isClearable
                                                        defaultValue={status}
                                                        onChange={setStatus}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                                    Save
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <button className="btn btn-info w-100">Save</button>
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
