import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useHttpRequest } from "../../../../customHook";
import { AppContext } from "../../../../store";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { notify } from "../../../Elements";


const statusOptions = [
    { value: "0", label: "Unactive" },
    { value: "1", label: "Active" },
];

export default function PostCategoriesModal() {
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
        url: `api/post/category/update-status`,
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
                    type: "UPDATE_POST_CATEGORIES",
                    payload: response.data.payload,
                });
            }
            closeModal();
        }
    }, [response]);

    const onSubmit = (formData) => {
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
                fd.append("id", state.modal.data.id);
                fd.append("post_category_description", formData.post_category_description);
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
                        Post Category Name:
                    </label>
                    <textarea
                        id=""
                        className="form-control"
                        defaultValue={state.modal.data.post_category_name}
                        rows="2"
                        disabled
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Post Category Description:
                    </label>
                    <textarea
                        className="form-control"
                        rows="3"
                        defaultValue={state.modal.data.post_category_description != "undefined" ? state.modal.data.post_category_description : null}
                        {...register("description")}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="col-form-label">
                        Status:
                    </label>
                    <Select
                        options={statusOptions}
                        placeholder="Please select a status"
                        isClearable
                        defaultValue={statusOption}
                        onChange={setStatusOption}
                    />
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-end">
                    <Button
                        className="btn btn-secondary btn-sm"
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
