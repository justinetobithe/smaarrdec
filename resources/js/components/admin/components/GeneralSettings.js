import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFetch, useHttpRequest } from "../../../customHook";
import { AppContext } from "../../../store";
import { useForm } from "react-hook-form";
import { notify } from "../../Elements";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

export default function GeneralSettings() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const [generalSettingsDetails, setGeneralSettingsDetails] = useState({})

    const { data, loading } = useFetch({
        url: "/api/system-options/get-essential-data",
    })


    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);


    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            website_name: generalSettingsDetails.website_name,
            website_footer_copyright_text: generalSettingsDetails.copyright,
            company_email: generalSettingsDetails.company_email,
            company_email_name: generalSettingsDetails.company_email_name,
            company_name: generalSettingsDetails.company_name,
            company_address: generalSettingsDetails.company_address,
            company_contact_number: generalSettingsDetails.company_contact_number,
            company_fax_number: generalSettingsDetails.company_fax_number,
        }
    });

    useEffect(() => {
        setGeneralSettingsDetails(data);
    }, [data])

    useEffect(() => {
        for (const property in generalSettingsDetails) {
            setValue(property, generalSettingsDetails[property])
        }
    }, [generalSettingsDetails])

    useEffect(() => {
        if (!selectedFile) {
            setPreview(selectedFile);
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

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: `/api/system-options/${data}`,
        method: "POST",
        data,
        header: { "Content-Type": "application/json" },
    }));

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );

            if (response.data.status) {
                if (response.data !== null) {
                    setGeneralSettingsDetails(response.data.payload);
                }
            }
        }
    }, [response]);

    const onSubmit = (formData) => {
        Swal.fire({
            title: "Are you sure you want to save this data?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("_method", "PUT");
                fd.append("website_logo", selectedFile);
                fd.append("website_name", formData.website_name = ! null ? formData.website_name : "");
                fd.append("website_footer_copyright_text", formData.website_footer_copyright_text = ! null ? formData.website_footer_copyright_text : "");
                fd.append("company_email", formData.company_email = ! null ? formData.company_email : "");
                fd.append("company_email_name", formData.company_email_name = ! null ? formData.company_email_name : "");
                fd.append("company_name", formData.company_name = ! null ? formData.company_name : "");
                fd.append("company_address", formData.company_address = ! null ? formData.company_address : "");
                fd.append("company_contact_number", formData.company_contact_number = ! null ? formData.company_contact_number : "");
                fd.append("company_fax_number", formData.company_fax_number = ! null ? formData.company_fax_number : "");
                handleHttpRequest(fd);
            }
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">General Settings</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">General Settings</li>
                </ol>

                <div className="container-fluid card mb-4 b-0 p-0">
                    <div className="col-lg-12">
                        <div className="row-fluid">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="tabbable tabs-left">
                                    {/* Nav tabs   */}
                                    <ul className="col-12 col-md-3 nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="general-settings-tab" data-bs-toggle="tab" data-bs-target="#general-settings" type="button" role="tab" aria-controls="general-settings" aria-selected="true"><i className="bx bxs-cog"></i> General Settings </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="system-email-tab" data-bs-toggle="tab" data-bs-target="#system-email" type="button" role="tab" aria-controls="system-email" aria-selected="false"><i className="bx bxs-envelope"></i> System Email </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="company-profile-tab" data-bs-toggle="tab" data-bs-target="#company-profile" type="button" role="tab" aria-controls="company-profile" aria-selected="false"><i className="bx bxs-briefcase"></i> Company Profile </button>
                                        </li>

                                    </ul>

                                    {/* Tab panes  */}
                                    <div className="col-12 col-md-9 tab-content">
                                        <div className="tab-pane active" id="general-settings" role="tabpanel" aria-labelledby="general-settings-tab">
                                            {/* Website Logo */}
                                            <div className="row-group">
                                                <div className="card website-logo">
                                                    <div className="card-header">
                                                        <h5>
                                                            Website Logo
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3">
                                                            <label htmlFor="" className="col-form-label">
                                                                Image:
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                placeholder="Select image"
                                                                accept="image/png, image/jpeg"
                                                                onChange={onSelectFile}
                                                                src={
                                                                    isset(generalSettingsDetails)
                                                                        ? generalSettingsDetails.website_logo
                                                                        : data.website_logo
                                                                }
                                                            />
                                                            {isset(selectedFile) ? (
                                                                selectedFile && (
                                                                    <div className="display-image mt-3 mb-3 d-flex align-items-center justify-content-center">
                                                                        <img
                                                                            className="img-fluid"
                                                                            src={preview}
                                                                            width="300"
                                                                            alt="..."
                                                                        ></img>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div className="display-image mt-3 mb-3 d-flex align-items-center justify-content-center"

                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={
                                                                            isset(generalSettingsDetails)
                                                                                ? generalSettingsDetails.website_logo
                                                                                : data.website_logo
                                                                        }
                                                                        alt={
                                                                            isset(generalSettingsDetails)
                                                                                ? generalSettingsDetails.website_logo
                                                                                : data.website_logo
                                                                        }
                                                                        width="300"
                                                                    ></img>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Copyright Text */}
                                            <div className="row-group">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>
                                                            Footer Copyright Text
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3">
                                                            <label htmlFor="copyrightText" className="form-label">Copyright Text:</label>
                                                            <textarea className="form-control" id="copyrightText" rows="3"  {...register("website_footer_copyright_text")}></textarea>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            {/* Website Name */}
                                            <div className="row-group">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>
                                                            Website Name
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3">
                                                            <label htmlFor="websiteName" className="form-label">Website Name:</label>
                                                            <input type="text" className="form-control" id="websiteName"  {...register("website_name")} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-group d-flex align-items-center justify-content-end">
                                                <Button type="submit" className="btn btn-info btn-sm mb-0">Save Settings</Button>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="system-email" role="tabpanel" aria-labelledby="system-email-tab">
                                            {/* System Email */}
                                            <div className="row-group">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>
                                                            System Email
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3">
                                                            <label htmlFor="email" className="form-label">Email:</label>
                                                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" {...register("company_email")} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Name:</label>
                                                            <input type="text" className="form-control" id="name" {...register("company_email_name")} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-group d-flex align-items-center justify-content-end">
                                                <Button type="submit" className="btn btn-info btn-sm mb-0">Save Settings</Button>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="company-profile" role="tabpanel" aria-labelledby="company-profile-tab">
                                            {/* Company Profile */}
                                            <div className="row-group">
                                                <div className="card company-profile">
                                                    <div className="card-header">
                                                        <h5>
                                                            Company Profile
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3 row">
                                                            <label htmlFor="companyName" className="col-sm-2 col-form-label text-start text-lg-end">Company Name:</label>
                                                            <div className="col-sm-10">
                                                                <input className="form-control" type="text" id="companyName" {...register("company_name")} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="companyAddress" className="col-sm-2 col-form-label text-start text-lg-end">Company Address:</label>
                                                            <div className="col-sm-10">
                                                                <textarea className="form-control" type="text" id="companyAddress" rows="3" {...register("company_address")}></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="contactNumber" className="col-sm-2 col-form-label text-start text-lg-end">Contact Number:</label>
                                                            <div className="col-sm-10">
                                                                <input className="form-control" type="text" id="contactNumber" {...register("company_contact_number")} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="faxNumber" className="col-sm-2 col-form-label text-start text-lg-end">Fax Number:</label>
                                                            <div className="col-sm-10">
                                                                <input className="form-control" type="text" id="faxNumber" {...register("company_fax_number")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-group d-flex align-items-center justify-content-end">
                                                <Button type="submit" className="btn btn-info btn-sm mb-0">Save Settings</Button>
                                            </div>

                                        </div>
                                        {/* <div className="tab-pane" id="maps" role="tabpanel" aria-labelledby="maps-tab">...</div>
                                        <div className="tab-pane" id="settings-settings" role="tabpanel" aria-labelledby="settings-settings-tab">...</div> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
