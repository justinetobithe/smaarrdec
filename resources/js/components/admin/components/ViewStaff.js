import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFetch } from "../../../customHook";
import { AppContext } from "../../../store";
import MUIDataTable from "mui-datatables";
import { Modal, Button } from "react-bootstrap";
import StaffModal from "./Modal/StaffModal";


const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "image", label: "Image", option: { filter: true, sort: true } },
    { name: "name", label: "Name", option: { filter: true, sort: true } },
    { name: "position", label: "Position", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: 'dropdown',
    response: 'standard',
    selectableRows: false,
    download: false,
    print: false
};

export default function ViewStaff() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/staffs"
    })

    useEffect(() => {
        dispatch({ type: "FETCH_STAFFS", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ tpye: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Staff",
                data,
                size: "md",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            onHide: () => { },
                        },
                    });
                    history.push("/admin/staff/view");
                },
                data: data,
                children: <StaffModal />,
            },
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Staff</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">View Staff</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Staff"}
                            data={
                                state.staffs.map((staff, index) => ({
                                    id: index + 1,
                                    image: <img className="img-fluid" src={staff.image_file} alt={staff.fname + " " + staff.lname} width="150"></img>,
                                    name: staff.fname + " " + staff.lname,
                                    position: staff.position,
                                    status:
                                        staff.status == 1 ? (
                                            <p className="text-success m-0">
                                                Active
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Unactive
                                            </p>
                                        ),
                                    action:
                                        <Button
                                            id={staff.id}
                                            onClick={() => openModal(staff)}
                                            type="button"
                                            className="btn btn-info btn-sm mb-0"
                                        >Update</Button>
                                }))
                            }
                            columns={columns}
                            options={options}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}
