import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { useHttpRequest } from "../../../../customHook";
import { AppContext } from "../../../../store";
import { notify } from "../../../Elements";


const statusOptions = [
    { value: "0", label: "Unactive" },
    { value: "1", label: "Active" },
];

export default function AgencyModal() {
    const { state, dispatch } = useContext(AppContext);

    const [statusOption, setStatusOption] = useState(
        isset(state.modal.data)
            ? statusOptions.find(
                (item) => item.value == state.modal.data.status
            )
            : null
    );

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: "/api/agency/update-agency-status",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" },
    }));

    const [deleteResponse, handleDeleteRequest] = useHttpRequest((data) => ({
        url: "/api/agencies/" + data,
        method: "DELETE",
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
                dispatch({
                    type: "UPDATE_AGENCIES",
                    payload: response.data.payload,
                });
            }
            closeModal();
        }
    }, [response]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: deleteResponse.loading });

        if (deleteResponse.error.length || deleteResponse.data !== null) {
            notify(
                deleteResponse.error.length ? deleteResponse.error : deleteResponse.data.message,
                deleteResponse.data.status ? "success" : "error"
            );

            if (deleteResponse.data.status) {
                dispatch({
                    type: "DELETE_AGENCIES",
                    payload: deleteResponse.data.payload,
                });
            }
            closeModal();

        }
    }, [deleteResponse]);

    const onSubmit = (data) => {
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
                fd.append("agency_id", state.modal.data.id);
                fd.append("site_url", data.site_url);
                fd.append("status", statusOption.value);
                handleDeleteRequest(fd);
            }
        });
    };

    const closeModal = () => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: false,
                heading: "",
                footer: "",
                onHide: () => { },
            },

        });
    };

    const onDelete = () => {
        Swal.fire({
            title: "Are you sure you want to delete this agency?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                handleDeleteRequest(state.modal.data.id);
            }
        });
    };

    return (
        <>
            <form>
                <div className="mb-3">
                    {isset(selectedFile) ? (
                        selectedFile && (
                            <div className="display-image mb-2">
                                <img
                                    className="img-fluid"
                                    src={preview}
                                    alt="..."
                                ></img>
                            </div>
                        )
                    ) : (
                        <div
                            className="display-image mb-2"
                            key={state.modal.data.id}
                        >
                            <img
                                className="img-fluid"
                                src={state.modal.data.logo_url}
                                alt={state.modal.data.agency_name}
                            ></img>
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Agency Name:
                    </label>
                    <input
                        type="text"
                        id=""
                        className="form-control"
                        defaultValue={state.modal.data.agency_name}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Agency Website Link:
                    </label>
                    <input
                        type="text"
                        id=""
                        className="form-control"
                        defaultValue={state.modal.data.site_url}
                        {...register("site_url")}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Status:
                    </label>
                    <Select
                        options={statusOptions}
                        placeholder="Please select an option"
                        isClearable
                        defaultValue={statusOption}
                        onChange={setStatusOption}
                    />
                </div>{" "}
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
    );
}
