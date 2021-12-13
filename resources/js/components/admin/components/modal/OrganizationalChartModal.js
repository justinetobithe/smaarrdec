import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { useHttpRequest } from "../../../../customHook";
import { AppContext } from "../../../../store";
import { notify } from "../../../Elements";

export default function OrganizationalChartModal() {
    const { state, dispatch } = useContext(AppContext);

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: "/api/system-options/update-organizational-chart",
        method: "POST",
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
                    type: "UPDATE_ORGANIZATIONAL_STRUCTURE",
                    payload: response.data.payload,
                });
            }

            closeModal();
        }
    }, [response]);

    const onSubmit = () => {
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
                fd.append("organizational_structure", selectedFile);
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
                                    width="200"
                                ></img>
                            </div>
                        )
                    ) : (
                        <div
                            className="display-image mb-2"
                        >
                            <img
                                className="img-fluid"
                                src={state.modal.data.organizational_structure}
                                width="200"
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
    );
}
