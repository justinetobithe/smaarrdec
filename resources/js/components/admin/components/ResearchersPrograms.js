import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AppContext } from "../../../store";
import MUIDataTable from "mui-datatables";
import { useFetch } from "../../../customHook";
import { Button } from "react-bootstrap";
import ResearchersProgramModal from "./Modal/ResearcherProgramModal";



const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    {
        name: "name",
        label: "Program Name",
        option: { filter: true, sort: true },
    },
    {
        name: "implementing_agency",
        label: "Implementing Agency",
        option: { filter: true, sort: true },
    },
    {
        name: "collaborating_agency",
        label: "Collaborating Agency",
        option: { filter: true, sort: true },
    },
    { name: "remarks", label: "Remarks", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: false,
    download: false,
    print: false
};


export default function ResearchersPrograms() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: `/api/get-programs-filter-researcher/${state.user.email}`,
    });

    useEffect(() => {
        dispatch({ type: "FETCH_PROGRAMS", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Program",
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
                    history.push("/admin/programs/my-programs");
                },
                data: data,
                children: <ResearchersProgramModal />,
            },
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">My Programs</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active">My Programs</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Programs"}
                            data={state.programs.map((program, index) => ({
                                id: index + 1,
                                name: program.program_name,
                                implementing_agency: !program.implementing_agency ? "" : JSON.parse(program.implementing_agency).map(item => item).join(", "),
                                collaborating_agency: !program.collaborating_agency ? "" : JSON.parse(program.collaborating_agency).map(item => item).join(", "),
                                remarks:
                                    program.remarks == 0 ? ""
                                        :
                                        program.remarks == 1 ? (
                                            <p className="text-primary m-0">
                                                On-Going
                                            </p>
                                        ) : program.remarks == 2 ? (
                                            <p className="text-success m-0">
                                                Completed
                                            </p>
                                        ) : program.remarks == 3 ? (
                                            <p className="text-danger m-0">
                                                Terminate
                                            </p>
                                        ) : "",
                                status:
                                    state.user.role == 1 ? (
                                        program.status == 1 ? (
                                            <p className="text-success m-0">
                                                Approved
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Waiting for Approval
                                            </p>
                                        )
                                    ) : state.user.role == 2 || state.user.role == 3 ? (
                                        program.status == 1 ? (
                                            <p className="text-success m-0">
                                                Active
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Unactive
                                            </p>
                                        )
                                    ) : "",
                                action:
                                    <div className="d-flex align-items-center">
                                        <Button
                                            id={program.id}
                                            type="button"
                                            onClick={() => openModal(program)}
                                            className="btn btn-info btn-sm"
                                        >
                                            Update
                                        </Button>
                                        <NavLink
                                            to={"/admin/program/edit/" + program.id}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            Edit
                                        </NavLink>
                                    </div>
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
