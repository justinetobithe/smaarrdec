import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useFetch, useHttpRequest } from '../../../../customHook'
import { AppContext } from '../../../../store'
import { notify } from '../../../Elements'
import Select from 'react-select'
import { Button } from 'react-bootstrap'


export default function OrganizationsEditModal() {

    const { state, dispatch } = useContext(AppContext)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/researcher-membership/update-membership",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }))

    const [deleteResponse, handleDeleteResponse] = useHttpRequest(data => ({
        url: "/api/researcher-membership/" + data,
        method: "DELETE",
        data,
        header: { "Content-Type": "application/json" }
    }))

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading })
        if (response.error.lenth || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            )
            if (response.data.status) {
                dispatch({
                    type: "UPDATE_ORGANIZATIONS",
                    payload: response.data.payload
                })
            }
            closeModal();
        }
    }, [response])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: deleteResponse.loading })

        if (deleteResponse.error.length || deleteResponse.data !== null) {
            notify(
                deleteResponse.error.lenth ? deleteResponse.error : deleteResponse.data.message,
                deleteResponse.data.status ? "success" : "error"
            )
            if (deleteResponse.data.status) {
                dispatch({
                    type: "DELETE_ORGANIZATIONS",
                    payload: deleteResponse.data.payload
                })
            }
            closeModal();
        }
    }, [deleteResponse])

    const onSubmit = formData => {
        Swal.fire({
            title: "Are you sure you want to update this data?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("id", state.modal.data.id)
                fd.append("researcher_id", state.modal.data.researcher_id)
                fd.append("organization", formData.organization)
                fd.append("position", formData.position)
                fd.append("address", formData.address)
                fd.append("status", "1")
                handleHttpRequest(fd);
            }
        });
    }

    const closeModal = () => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: false,
                heading: "",
                footer: "",
                onHide: () => { }
            }
        })
    }

    const onDelete = () => {
        Swal.fire({
            title: "Are you sure you want to delete this data?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteResponse(state.modal.data.id)
            }
        })
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body row g-3">
                    <div className="col-12">
                        <label className="form-label fw-bold">Name of Organization</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={state.modal.data.organization}
                            {...register("organization", { required: true })}
                        />
                        {
                            errors.organization && (<div className="form-text ps-error-message">This field is required *</div>)
                        }
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold">Position</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={state.modal.data.position}
                            {...register("position", { required: true })}
                        />
                        {
                            errors.position && (<div className="form-text ps-error-message">This field is required *</div>)
                        }
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold">Address</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            defaultValue={state.modal.data.address}
                            {...register("address")}
                        ></textarea>
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-end">
                    <Button
                        className="btn btn-danger ms-2 btn-sm"
                        onClick={handleSubmit(onDelete)}
                    >
                        Delete
                    </Button>
                    <Button
                        className="btn btn-secondary ms-2 btn-sm"
                        data-bs-dismiss="modal"
                        onClick={() => closeModal()}
                    >
                        Close
                    </Button>
                    <Button
                        className="btn btn-info ms-2 btn-sm"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save changes
                    </Button>
                </div>
            </form>
        </>
    )
}
