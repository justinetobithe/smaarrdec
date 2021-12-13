import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useFetch, useHttpRequest } from '../../../../customHook'
import { AppContext } from '../../../../store'
import { notify } from '../../../Elements'
import Select from 'react-select'
import { Button } from 'react-bootstrap'


export default function AcademicDegreesEditModal() {

    const { state, dispatch } = useContext(AppContext)

    const degrees = useFetch({
        url: "/api/degrees"
    })
 
    const [selectedDegree, setSelectedDegree] = useState()

    useEffect(() => {
        if (state.modal.data.degree_id != null && state.modal.data.degree_id != 0 && degrees.data.length) {
            setSelectedDegree({
                value: degrees.data.find(item => item.id == state.modal.data.degree_id).id,
                label: degrees.data.find(item => item.id == state.modal.data.degree_id).degree_name,
            })
        }
    }, [state.modal.data, degrees.data])

    const [selectedYear, setSelectedYear] = useState(
        isset(state.modal.data)
            ?
            !state.modal.data.year ? null : (item) => ({
                value: state.modal.data.year,
                label: state.modal.data.year
            }) : null
    )



    const year = (new Date().getFullYear())
    const years = Array.from(new Array(50), (val, index) => year - index)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/researcher-academic-degrees/update-academic-degrees",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }))

    const [deleteResponse, handleDeleteResponse] = useHttpRequest(data => ({
        url: "/api/academic-degrees/" + data,
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
                    type: "UPDATE_ACADEMIC_DEGREES",
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
                    type: "DELETE_ACADEMIC_DEGREES",
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
                fd.append("school_name", formData.school_name)
                fd.append("school_address", formData.school_address)
                fd.append("program", formData.program)
                fd.append("degree_id", selectedDegree != null ? selectedDegree.value : 0)
                fd.append("year", selectedYear != null ? selectedYear.value : "")
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
                        <label className="form-label fw-bold">Name of School</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={state.modal.data.school_name}
                            {...register("school_name", { required: true })}
                        />
                        {
                            errors.title && (<div className="form-text ps-error-message">This field is required *</div>)
                        }
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold">Program</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={state.modal.data.program}
                            {...register("program", { required: true })}
                        />
                        {
                            errors.program && (<div className="form-text ps-error-message">This field is required *</div>)
                        }
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold">School Address</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            defaultValue={state.modal.data.school_address}
                            {...register("school_address")}
                        ></textarea>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Degree</label>
                        <Select
                            isClearable
                            options={
                                degrees.data.map(degree => ({
                                    value: degree.id,
                                    label: degree.degree_name
                                }))
                            }
                            value={selectedDegree}
                            defaultValue={selectedDegree}
                            onChange={setSelectedDegree}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Year</label>
                        <Select
                            isClearable
                            options={
                                years.map(years => ({
                                    value: years,
                                    label: years
                                }))
                            }
                            value={selectedYear}
                            defaultValue={selectedYear}
                            onChange={setSelectedYear}
                        />
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
