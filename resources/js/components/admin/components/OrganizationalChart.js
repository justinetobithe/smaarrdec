import React, { useEffect, useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFetch, useHttpRequest } from '../../../customHook'
import { AppContext } from '../../../store'
import { notify } from '../../Elements'

export default function OrganizationalChart() {

    const { state, dispatch } = useContext(AppContext)

    let history = useHistory();

    const [generalSettingsDetails, setGeneralSettingsDetails] = useState({})
    const [selectedImage, setSelectedImage] = useState()
    const [imagePreview, setImagePreview] = useState()

    const { data, loading } = useFetch({
        url: "/api/system-options/get-essential-data",
    })

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])


    const {
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            organizational_structure: generalSettingsDetails.organizational_structure
        }
    })

    useEffect(() => {
        setGeneralSettingsDetails(data)
    }, [data])

    useEffect(() => {

        for (const property in generalSettingsDetails) {
            setValue(property, generalSettingsDetails[property])
        }
    }, [generalSettingsDetails])


    useEffect(() => {
        if (!selectedImage) {
            setImagePreview(undefined)
            return;
        }
        const objectUrl = URL.createObjectURL(selectedImage)
        setImagePreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedImage])

    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(undefined)
            return;
        }
        setSelectedImage(e.target.files[0])
    }


    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: "/api/system-options/update-organizational-chart",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" },
    }));

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading })

        if (response.error.length || response.data !== null) {
            notify(
                response.data.error ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );

            if (response.data.status) {
                if (response.data !== null) {
                    setGeneralSettingsDetails(response.data.payload)
                }
            }
        }
    }, [response])

    const onSubmit = () => {
        if (selectedImage == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select an image!',
            });
        } else {
            Swal.fire({
                title: "Are you sure you want to update this chart?",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    let fd = new FormData();
                    fd.append("organizational_structure", selectedImage);
                    handleHttpRequest(fd);
                }
            });
        }
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Organizational Chart</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">View Organizational Chart</li>
                </ol>
                <div className="mb-4">
                    <div className="card border-0">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">
                                <div className="mb-3 row-fluid">
                                    {isset(
                                        selectedImage
                                    ) ? (
                                        selectedImage && (
                                            <div className="display-image mb-3">
                                                <img
                                                    className="img-fluid"
                                                    src={
                                                        imagePreview
                                                    }
                                                    alt="..."
                                                ></img>
                                            </div>
                                        )
                                    ) : (
                                        <div className="display-image mb-3">
                                            <img
                                                className="img-fluid"
                                                src={
                                                    isset(
                                                        generalSettingsDetails.organizational_structure
                                                    )
                                                        ? generalSettingsDetails.organizational_structure
                                                        : data.organizational_structure
                                                }
                                                alt="Organziational Structure"
                                            ></img>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="form-control"
                                        placeholder="Select image"
                                        accept="image/png, image/jpeg"
                                        onChange={
                                            onSelectImage
                                        }
                                        defaultValue={
                                            isset(
                                                generalSettingsDetails.organizational_structure
                                            )
                                                ? generalSettingsDetails.organizational_structure
                                                : data.organizational_structure
                                        }
                                    />
                                </div>
                            </div>
                            {
                                selectedImage != null ? (
                                    <div className="card-footer border-0 bg-transparent d-flex align-items-center justify-content-center">
                                        <button className="btn btn-info w-50 btn-sm text-white">Save</button>
                                    </div>
                                )
                                    : null
                            }
                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}
