import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useHttpRequest } from "../../../../customHook";
import { AppContext } from "../../../../store";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { notify } from "../../../Elements";
 

const remarksOptions = [
    { value: "1", label: "On-Going" },
    { value: "2", label: "Completed" },
    { value: "3", label: "Terminate" }
]; 


export default function ResearcherProgramModal() {

    const { state, dispatch } = useContext(AppContext);

    const [selectedRemarks, setSelectedRemarks] = useState(
        isset(state.modal.data)
            ? remarksOptions.find(
                (item) => item.value == state.modal.data.remarks
            )
            : null
    );
  

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: "/api/program/update-remarks",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" },
    }));

    const [deleteResponse, handleDeleteRequest] = useHttpRequest((data) => ({
        url: "/api/programs/" + data,
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
                    type: "UPDATE_PROGRAMS",
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
                    type: "DELETE_PROGRAMS",
                    payload: deleteResponse.data.payload,
                });
            } 
            closeModal();

        }
    }, [deleteResponse]);


    const onSubmit = (data) => {
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
                fd.append("program_id", state.modal.data.id);
                fd.append("remarks_description", data.remarks_description);
                fd.append("remarks", selectedRemarks != null ? selectedRemarks.value : "");
                fd.append("status", selectedStatus.value);
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
            title: "Are you sure you want to delete this program?",
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
                    <label htmlFor="" className="col-form-label">
                        Program Name:
                    </label>
                    <textarea
                        id=""
                        className="form-control"
                        defaultValue={state.modal.data.program_name}
                        rows="2"
                        {...register("program_name")}
                        disabled
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Remarks Description:
                    </label>
                    <textarea
                        className="form-control"
                        rows="3"
                        defaultValue={state.modal.data.remarks_description}
                        {...register("remarks_description")}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Remarks:
                    </label>
                    <Select
                        options={remarksOptions}
                        placeholder="Please select a status"
                        isClearable
                        defaultValue={selectedRemarks}
                        onChange={setSelectedRemarks}
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
