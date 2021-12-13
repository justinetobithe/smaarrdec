import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFetch } from "../../../customHook";
import { AppContext } from "../../../store";
import MUIDataTable from "mui-datatables";
import { Modal, Button } from "react-bootstrap";
import AgencyModal from "./Modal/AgencyModal";

// import Select from 'react-select/src/select'

const researcherColumns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "image", label: "Image", option: { filter: true, sort: true } },
    { name: "name", label: "Name", option: { filter: true, sort: true } },

];

const adminColumns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "image", label: "Image", option: { filter: true, sort: true } },
    { name: "name", label: "Name", option: { filter: true, sort: true } },
    {
        name: "status",
        label: "Status",
        option: { filter: true, sort: true },
    },
    {
        name: "action",
        label: "Action",
        option: { filter: true, sort: true },
    },
];

const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: false,
    download: false,
    print: false
};

export default function ViewAgency() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/agencies",
    });

    useEffect(() => {
        dispatch({ type: "FETCH_AGENCIES", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);


    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Agency",
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
                    history.push("/admin/agency/view");
                },
                data: data,
                children: <AgencyModal />,
            },
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Agency</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active">View Agency</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"Agency Table"}
                            data={state.agencies.map((agency, index) => ({
                                id: index + 1,
                                image: (
                                    <img
                                        className="img-fluid"
                                        src={agency.logo_url}
                                        alt={agency.agency_name}
                                        width="200"
                                    ></img>
                                ),
                                name: agency.agency_name,
                                status:
                                    agency.status == 1 ? (
                                        <p className="text-success m-0">
                                            Active
                                        </p>
                                    ) : (
                                        <p className="text-danger m-0">
                                            Unactive
                                        </p>
                                    ),
                                action: (
                                    <div className="d-flex align-items-center">
                                        <Button
                                            type="button"
                                            onClick={() => openModal(agency)}
                                            className="btn btn-info btn-sm"
                                        >
                                            Update
                                        </Button>
                                        <NavLink
                                            to={"/admin/agency/edit/" + agency.id}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            Edit
                                        </NavLink>
                                    </div>
                                ),
                            }))}
                            columns={state.user.role == 2 || state.user.role == 3 ? adminColumns : researcherColumns}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
