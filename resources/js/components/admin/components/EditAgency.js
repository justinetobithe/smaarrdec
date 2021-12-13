import React, { useRef, useEffect, useContext, useState, setState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { AppContext } from '../../../store';
import { useFetch, useHttpRequest } from '../../../customHook';
import { notify } from '../../Elements';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';



export default function EditAgency() {

    const { state, dispatch } = useContext(AppContext);
    let history = useHistory();

    let { id } = useParams()

    const [agencyDetails, setAgencyDetails] = useState({})

    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");


    const { data, loading } = useFetch({
        url: `/api/agencies/${id}`
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            region: agencyDetails.region,
            acronym: agencyDetails.acronym,
            site_url: agencyDetails.site_url
        }
    });


    useEffect(() => {
        setAgencyDetails(data);
    }, [data])

    useEffect(() => {
        // SET FORM VALUE (DYNAMIC VALUES)
        for (const property in agencyDetails) {
            setValue(property, agencyDetails[property]);
        }
    }, [agencyDetails]);


    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

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

    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/agency/update-agency",
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
                history.push("/admin/agency/view");
            }
        }
    }, [response]);


    const onSubmit = (formData) => {
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
                fd.append("id", id);
                fd.append("agency_name", formData.agency_name);
                fd.append("region", formData.region);
                fd.append("acronym", formData.acronym);
                fd.append("site_url", !formData.site_url ? "#" : formData.site_url);
                fd.append("logo_url", selectedFile);
                handleHttpRequest(fd);
            }
        });
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Edit Agency</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/agency/view/">View Agency</NavLink></li>
                    <li className="breadcrumb-item active">Edit Agency</li>
                </ol>
                <div className="container-fluid add-project card mb-4 b-0 p-0">
                    <div className="col-lg-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-8 content-right mb-3">
                                    <div className="row-group mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Content
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Agency Name</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("agency_name", { required: true })}
                                                    />
                                                    {
                                                        errors.agency_name && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Region</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("region")}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Acronym</label>
                                                    <input
                                                        className="form-control"
                                                        {...register("acronym")}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Link</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text" id="basic-addon1">🔗</span>
                                                        <input type="text" className="form-control" {...register("site_url")} />
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
                                                    Agency Logo
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    {
                                                        selectedFile || isset(agencyDetails.logo_url) ? (
                                                            <div className="display-image mb-2">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={
                                                                        selectedFile ? preview : agencyDetails.logo_url
                                                                    }
                                                                    alt="..."
                                                                ></img>
                                                            </div>
                                                        ) : null
                                                    }
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="Select image"
                                                        accept="image/png, image/jpeg"
                                                        onChange={onSelectFile}
                                                        defaultValue={
                                                            isset(
                                                                agencyDetails.logo_url
                                                            )
                                                                ? agencyDetails.logo_url
                                                                : data.logo_url
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
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/agency/view">Cancel</NavLink>
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

