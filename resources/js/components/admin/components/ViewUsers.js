import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFetch, useHttpRequest } from "../../../customHook";
import { AppContext } from "../../../store";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { notify } from "../../Elements";
import { Button } from "react-bootstrap";

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "name", label: "Name", option: { filter: true, sort: true } },
    { name: "email", label: "Email", option: { filter: true, sort: true } },
    { name: "role", label: "Role", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: false,
    download: false,
    print: false
};

const roleOptions = [
    { value: "1", label: "Research" },
    { value: "2", label: "Admin" },
    { value: "3", label: "Super Admin" },
];

export default function ViewUsers() {
    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/users",
    });

    useEffect(() => {
        dispatch({ type: "FETCH_USERS", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: "/api/user/update-role",
        method: "POST",
        data,
        header: { "Content-type": "application/json" },
    }));

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );
            if (response.data.status) {
                if (response.data !== null) {
                    dispatch({
                        type: "UPDATE_USER",
                        payload: response.data.payload,
                    });
                }
            }
        }
    }, [response]);

    const onVefiry = (data) => {
        Swal.fire({
            title: "Select a role",
            input: "select",
            inputOptions: {
                1: "Researcher",
                2: "Admin",
                3: "Super Admin",
            },
            inputPlaceholder: "Select a role",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value) {
                    let role = result.value;
                    Swal.fire({
                        title: "Are you sure you want to update his/her role?",
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let fd = new FormData();
                            fd.append("id", data);
                            fd.append("role", role);
                            handleHttpRequest(fd);
                        }
                    });
                }
            }
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Users</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active">View Users</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title="Users Table"
                            data={state.users.map((user, index) => ({
                                id: index + 1,
                                name: user.name,
                                email: user.email,
                                role:
                                    user.role == 0 ? (
                                        <Button
                                            type="button"
                                            onClick={() => onVefiry(user.id)}
                                            className="btn btn-info btn-sm mb-0"
                                        >
                                            Verify
                                        </Button>
                                    ) : user.role == 1 ? (
                                        "Researchers"
                                    ) : user.role == 2 ? (
                                        "Admin"
                                    ) : user.role == 3 ? (
                                        "Super Admin"
                                    ) : null,
                                status: user.status == 1 ? <p className="text-success m-0">Active</p> : <p className="text-danger m-0">Unactive</p>,
                            }))}
                            columns={columns}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
