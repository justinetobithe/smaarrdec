import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { useFetch, useHttpRequest } from '../../../customHook'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { notify } from '../../Elements'
import slugify from 'slugify'
import { AppContext } from '../../../store'
import Error404 from './Error404'

export default function EditCommodity() {
    const { state, dispatch } = useContext(AppContext);

    let history = useHistory();
    let { id } = useParams();

    const editorRef = useRef(null);

    const { data, loading } = useFetch({
        url: "/api/get-commodity-content/" + id
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
        if (state.user.role == 1) {
            history.push("/admin/dashboard");
        }
    }, [loading])



    const [commodityDetails, setCommodityDetails] = useState({});

    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            commodity_name: commodityDetails.commodity_name,
            commodity_content: commodityDetails.commodity_content,
        }
    });


    useEffect(() => {
        setCommodityDetails(data);
    }, [data]);


    useEffect(() => {
        // SET FORM VALUE (DYNAMIC VALUES)
        for (const property in commodityDetails) {
            setValue(property, commodityDetails[property]);
        }
    }, [commodityDetails]);



    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/commodity/update-commodity",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }));


    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });
        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );
            if (response.data.status) {
                if (response.data !== null) {
                    // setCommodityDetails(response.data.payload);
                    history.push("/admin/commodity/view");
                }
            }
        }
    }, [response]);

    const onSubmit = (formData) => {
        Swal.fire({
            title: 'Are you sure you want to update this commodity?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("commodity_id", id);
                fd.append("commodity_name", formData.commodity_name);
                fd.append("commodity_content", editorRef.current.getContent());
                fd.append("commodity_slug", slugify(formData.commodity_name).toLowerCase().replace(/[():,'"]+/g, ''));
                fd.append("commodity_image", selectedFile);
                handleHttpRequest(fd);
            }
        })
    }

    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
        return (
            <>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Edit Commodity</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/admin/commodity/view">View Commodity</NavLink></li>
                        <li className="breadcrumb-item active">Edit Commodity</li>
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
                                                        Content
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
                                                            initialValue={
                                                                isset(
                                                                    commodityDetails.commodity_content
                                                                )
                                                                    ? commodityDetails.commodity_content
                                                                    : data.commodity_content
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
                                                        Commodity Image
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 row-fluid">
                                                        {selectedFile || isset(commodityDetails.commodity_image) ? (
                                                            <div className="display-image mb-2">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={
                                                                        selectedFile ? preview : commodityDetails.commodity_image
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
                                                                    commodityDetails.commodity_image
                                                                )
                                                                    ? commodityDetails.commodity_image
                                                                    : data.commodity_image
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
                                                        <button className="btn btn-info w-50 btn-sm text-white">Save</button>
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
}
