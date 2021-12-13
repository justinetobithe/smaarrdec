import React, { useRef, useEffect, useContext, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
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
import Error404 from './Error404';


export default function EditPost() {

    const editorRef = useRef(null);

    let { id } = useParams();

    let history = useHistory();

    const [postDetails, setPostDetails] = useState({});

    const [selectedPostCategory, setSelectedPostCategory] = useState();


    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");

    const [datePublished, setDatePublished] = useState();

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: `/api/get-post-content/${id}`,
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    const postCategory = useFetch({
        url: "/api/post-categories",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            post_title: postDetails.post_title,
            post_content: postDetails.post_content,
            post_category_id: postDetails.post_category_id,
        }
    });


    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/post/update-post/",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }));


    useEffect(() => {
        setPostDetails(data);

        if (data.date_published != null) {
            setDatePublished(new Date(data.date_published))
        }

    }, [data]);

    useEffect(() => {
        if (data.post_category_id != null && postCategory.data.length) {
            setSelectedPostCategory({
                value: postCategory.data.find(item => item.id == data.post_category_id).id,
                label: postCategory.data.find(item => item.id == data.post_category_id).post_category_name,
            })
        }

    }, [data, postCategory.data])


    useEffect(() => {

        // SET FORM VALUE (DYNAMIC VALUES)
        for (const property in postDetails) {
            setValue(property, postDetails[property]);
        }
    }, [postDetails]);


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
                history.push("/admin/post/view")
            }
        }
    }, [response]);


    const onSubmit = (formData) => {

        if (datePublished == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Date cannot be null!',
            });
        } else if (selectedPostCategory == undefined || selectedPostCategory == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Category cannot be null, please select a category!',
            });
        } else {
            Swal.fire({
                title: 'Are you sure you want to update this data?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    let fd = new FormData();
                    fd.append('id', id);
                    fd.append("date_published", dateFormat(datePublished, "yyyy-mm-dd HH:MM:ss"));
                    fd.append("post_title", formData.post_title);
                    fd.append("post_content", editorRef.current.getContent());
                    fd.append("post_slug", slugify(formData.post_title).toLowerCase().replace(/[():,'"]+/g, ''));
                    fd.append("post_category_id", selectedPostCategory.value);
                    fd.append("featured_image", selectedFile);
                    handleHttpRequest(fd);
                }
            });

        }
    }

    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
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
                                                            initialValue={
                                                                isset(
                                                                    postDetails.post_content
                                                                )
                                                                    ? postDetails.post_content
                                                                    : data.post_content
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
                                                        Date
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 row-fluid">
                                                        <DatePicker
                                                            selected={datePublished}
                                                            onChange={(date) => setDatePublished(date)}
                                                            className="form-control w-100"
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
                                                            isClearable
                                                            options={postCategory.data.map(
                                                                (postCategory) => ({
                                                                    value: postCategory.id,
                                                                    label: postCategory.post_category_name
                                                                }))}
                                                            placeholder="Please select a category"
                                                            isClearable
                                                            value={selectedPostCategory}
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
                                                        {selectedFile || isset(postDetails.featured_image) ? (
                                                            <div className="display-image mb-2">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={
                                                                        selectedFile ? preview : postDetails.featured_image != null
                                                                            ? postDetails.featured_image
                                                                            : "/storage/posts/no-image.png"
                                                                    }
                                                                    alt="..."
                                                                ></img>
                                                            </div>
                                                        ) : null}

                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Select image"
                                                            accept="image/png, image/jpeg"
                                                            onChange={onSelectFile}
                                                            defaultValue={
                                                                isset(
                                                                    postDetails.featured_image
                                                                )
                                                                    ? postDetails.featured_image
                                                                    : data.featured_image
                                                            }
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
}