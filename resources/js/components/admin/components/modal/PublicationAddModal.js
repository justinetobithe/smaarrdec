import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useHttpRequest } from '../../../../customHook'
import { AppContext } from '../../../../store'
import { notify } from '../../../Elements'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { Button, Table } from 'react-bootstrap'

const publicationTypeOptions = [
    { value: "Books", label: "Books" },
    { value: "Conference", label: "Conference" },
    { value: "Journals", label: "Journals" },
]

export default function PublicationAddModal() {

    const { state, dispatch } = useContext(AppContext)

    const [selectedMembers, setSelectedMembers] = useState()
    const [selectedPublicationType, setSelectedPublicationType] = useState()
    const [selectedYear, setSelectedYear] = useState()

    const year = (new Date().getFullYear())
    const years = Array.from(new Array(50), (val, index) => year - index)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-publication",
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
                    type: "INSERT_PUBLICATIONS",
                    payload: response.data.payload.researcher_publications
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
                fd.append("title", data.title)
                fd.append("description", data.description)
                fd.append("type", selectedPublicationType != null ? selectedPublicationType.value : "")
                fd.append("members", selectedMembers != null ? JSON.stringify(selectedMembers.map(members => members.value)) : "")
                fd.append("year", selectedYear != null ? selectedYear.value : "")
                fd.append("url", data.url)
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
                        <label className="form-label fw-bold">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("title", { required: true })}
                        />
                        {
                            errors.title && (<div className="form-text ps-error-message">This field is required *</div>)
                        }
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold">Description</label>
                        <textarea className="form-control" rows="3" {...register("description")}></textarea>
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-bold">Members</label>
                        <CreatableSelect
                            isMulti
                            defaultValue={selectedMembers}
                            onChange={setSelectedMembers}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Type</label>
                        <Select
                            isClearable
                            options={publicationTypeOptions}
                            defaultValue={selectedPublicationType}
                            onChange={setSelectedPublicationType}
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
                    <div className="col-12">
                        <label className="form-label fw-bold">Link</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">🔗</span>
                            <input type="text" className="form-control" {...register("url")} />
                        </div>
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
