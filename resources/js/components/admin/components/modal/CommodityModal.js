import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useHttpRequest } from "../../../../customHook";
import { AppContext } from "../../../../store";
import { notify } from "../../../Elements";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const priorityOptions = [
    { value: "0", label: "Neutral" },
    { value: "1", label: "Priority" },
];

const statusOptions = [
    { value: "0", label: "Unactive" },
    { value: "1", label: "Active" },
];

export default function CommodityModal() {
    const { state, dispatch } = useContext(AppContext);

    const [priorityOption, setPriorityOption] = useState(
        isset(state.modal.data)
            ? priorityOptions.find(
                (item) => item.value == state.modal.data.priority_type
            )
            : null
    );

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
        url: "/api/commodity/update-details",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" },
    }));

    const [deleteResponse, handleDeleteRequest] = useHttpRequest((data) => ({
        url: "/api/commodities/" + data,
        method: "DELETE",
        data,
        header: { "Content-Type": "application/json" },
    }));


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

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );

            if (response.data.status) {
                dispatch({
                    type: "UPDATE_COMMODITIES",
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
                    type: "DELETE_COMMODOTIES",
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
                fd.append("commodity_id", state.modal.data.id);
                fd.append("commodity_name", state.modal.data.commodity_name);
                fd.append("commodity_image", selectedFile);
                fd.append("priority_type", priorityOption.value);
                fd.append("status", statusOption.value);
                handleHttpRequest(fd);
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
            title: "Are you sure you want to delete this commodity?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
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
                                src={state.modal.data.commodity_image}
                                alt={state.modal.data.commodity_name}
                            ></img>
                        </div>
                    )}
                    <label htmlFor="" className="col-form-label">
                        Image:
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        placeholder="Select image"
                        accept="image/png, image/jpeg"
                        defaultValue={selectedFile}
                        onChange={onSelectFile}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Commodity Name:
                    </label>
                    <input
                        type="text"
                        id=""
                        className="form-control"
                        defaultValue={state.modal.data.commodity_name}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Priority Type:
                    </label>
                    <Select
                        options={priorityOptions}
                        placeholder="Please select an option"
                        isClearable
                        defaultValue={priorityOption}
                        onChange={setPriorityOption}
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
    );
}
