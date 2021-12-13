
import React, { useRef, useEffect, useContext, useState, setState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { AppContext } from '../../../store';
import { useFetch, useHttpRequest } from '../../../customHook';
import Select from 'react-select';
import slugify from 'slugify';
import { notify } from '../../Elements';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';


export default function AddPost() {


    const { state, dispatch } = useContext(AppContext);

    const editorRef = useRef(null);


    const [selectedPostCategory, setSelectedPostCategory] = useState(null);


    let history = useHistory();


    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const [datePublished, setDatePublished] = useState();

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const { data, loading } = useFetch({
        url: "/api/post-categories",
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-posts",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }));

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

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );
            if (response.data.status) {
                history.push("/admin/post/view");
            }
        }
    }, [response]);


    const onSubmit = data => {

        if (datePublished == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a date!',
            });
        } else if (selectedPostCategory == undefined || selectedPostCategory == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a category!',
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
                    fd.append("date_published", dateFormat(datePublished, "yyyy-mm-dd HH:MM:ss"));
                    fd.append("post_title", data.post_title);
                    fd.append("post_content", editorRef.current.getContent());
                    fd.append("post_slug", slugify(data.post_title).toLowerCase().replace(/[():,'"]+/g, ''));
                    fd.append("post_category_id", selectedPostCategory.value);
                    fd.append("featured_image", selectedFile);
                    fd.append("user_id", state.user.id);
                    fd.append("status", 1);
                    httpRequest(fd);

                }
            });

        }
    }



    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Post</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/post/view/">View Post</NavLink></li>
                    <li className="breadcrumb-item active">Add Post</li>
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
                                                    <label className="form-label">Post Title</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("post_title", { required: true })}
                                                    />
                                                    {
                                                        errors.post_title && (<div className="form-text ps-error-message">This field is required *</div>)
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
                                                    Set Date
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <DatePicker
                                                        selected={datePublished}
                                                        onChange={(date) => setDatePublished(date)}
                                                        className="form-control w-100"
                                                        isClearable
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
                                                    Post Categories
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <Select
                                                        options={
                                                            data.map(postCategories => ({
                                                                value: postCategories.id,
                                                                label: postCategories.post_category_name
                                                            }))
                                                        }
                                                        placeholder="Please select a category"
                                                        isClearable
                                                        {...register("post_category_id")}
                                                        defaultValue={selectedPostCategory}
                                                        onChange={setSelectedPostCategory}

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
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/post/view">Cancel</NavLink>
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

