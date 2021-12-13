import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useHttpRequest } from "../../../../customHook";
import { AppContext } from "../../../../store";
import { notify } from "../../../Elements";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const statusOptions = [
    { value: "1", label: "Approved" },
    { value: "2", label: "Reject" },
];

export default function ProjectApprovalModal() {

    const { state, dispatch } = useContext(AppContext);


    const [statusOption, setStatusOption] = useState(
        isset(state.modal.data)
            ? statusOptions.find(
                (item) => item.value == state.modal.data.status
            )
            : null
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: "/api/projects/update-status",
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
                dispatch({
                    type: "UPDATE_PROJECTS",
                    payload: response.data.payload,
                });
            }

            closeModal();

        }
    }, [response]);



    const onSubmit = (data) => {
        Swal.fire({
            title: "Are you sure you want to update this project?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData(); 
                fd.append("researcher_email", state.modal.data.added_by)
                fd.append("project_id", state.modal.data.id);
                fd.append("project_title", state.modal.data.project_title);
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



    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Project Title:
                    </label>
                    <input
                        type="text"
                        id=""
                        className="form-control"
                        defaultValue={state.modal.data.project_title}
                        disabled
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
                    {/* <Button
                        className="btn btn-danger ms-2"
                        onClick={handleSubmit(onDelete)}
                    >
                        Delete
                    </Button> */}
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
