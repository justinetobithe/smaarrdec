
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useFetch, useHttpRequest } from '../../../../customHook'
import { AppContext } from '../../../../store'
import { notify } from '../../../Elements'
import Select from 'react-select'
import { Button } from 'react-bootstrap'

export default function AcademicDegreesAddModal() {

    const { state, dispatch } = useContext(AppContext)

    const [selectedDegree, setSelectedDegree] = useState()
    const [selectedYear, setSelectedYear] = useState()

    const year = (new Date().getFullYear())
    const years = Array.from(new Array(50), (val, index) => year - index)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const degrees = useFetch({
        url: "/api/degrees"
    })

    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-academic-degrees",
        method: "POST",
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
                    type: "INSERT_ACADEMIC_DEGREES",
                    payload: response.data.payload.researcher_acedemic_degrees
                })
            }
            closeModal();
        }
    }, [response])

    const onSubmit = data => {
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
                fd.append("researcher_id", state.modal.data.id)
                fd.append("school_name", data.school_name)
                fd.append("school_address", data.school_address)
                fd.append("program", data.program)
                fd.append("degree_id", selectedDegree != null ? selectedDegree.value : 0)
                fd.append("year", selectedYear != null ? selectedYear.value : "")
                fd.append("status", "1")
                httpRequest(fd);
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

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body row g-3">
                    <div className="col-12">
                        <label className="form-label fw-bold">Name of School</label>
                        <input
                            type="text"
                            className="form-control"
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
                            defaultValue={selectedYear}
                            onChange={setSelectedYear}
                        />
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-end">
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
