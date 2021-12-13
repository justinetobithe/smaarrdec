import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { useFetch, useHttpRequest } from "../../../customHook";
import { AppContext } from "../../../store";
import { Button } from "react-bootstrap";
import ResearcherProjectModal from "./Modal/ResearcherProjectModal";

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "project_code", label: "Project Code", option: { filter: true, sort: true } },
    {
        name: "project_name",
        label: "Project",
        option: { filter: true, sort: true },
    },
    {
        name: "category",
        label: "Category",
        option: { filter: true, sort: true },
    },
    { name: "program", label: "Program", option: { filter: true, sort: true } },
    { name: "attached_file", label: "Attached File", option: { filter: true, sort: true } },
    { name: "remarks", label: "Remarks", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
];


const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: false,
    download: false,
    print: false
};

export default function ResearchersProjects() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: `/api/researchers-projects/${state.user.email}`,
    });



    useEffect(() => {
        dispatch({ type: "FETCH_RESEARCHER_PROJECTS", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Project",
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
                    history.push("/admin/project/my-projects");
                },
                data: data,
                children: <ResearcherProjectModal />,
            },
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">My Projects</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active">My Projects</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Projects"}
                            data={state.researcherProjects.map((projects, index) => ({
                                id: index + 1,
                                project_code: projects.project_code,
                                project_name: projects.project_title,
                                category: projects.project_category_name
                                    ? projects.project_category_name
                                    : null,
                                program: projects.program_name
                                    ? projects.program_name
                                    : null,
                                attached_file:
                                    projects.abstract != null ?
                                        <a className="fst-italic text-decoration-none text-dark" target="_blank" href={projects.abstract}>Preview</a>
                                        : ""
                                ,
                                remarks:
                                    projects.remarks == 0 ? ""
                                        :
                                        projects.remarks == 1 ? (
                                            <p className="text-primary m-0">
                                                On-Going
                                            </p>
                                        ) : projects.remarks == 2 ? (
                                            <p className="text-success m-0">
                                                Completed
                                            </p>
                                        ) : projects.remarks == 3 ? (
                                            <p className="text-danger m-0">
                                                Terminate
                                            </p>
                                        ) : "",
                                status:
                                    state.user.role == 1 ? (
                                        projects.status == 1 ? (
                                            <p className="text-success m-0">
                                                Approved
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Waiting for Approval
                                            </p>
                                        )
                                    ) : state.user.role == 2 || state.user.role == 3 ? (
                                        projects.status == 1 ? (
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
                                            type="button"
                                            onClick={() => openModal(projects)}
                                            className="btn btn-info btn-sm"
                                        >
                                            Update
                                        </Button>
                                        <NavLink
                                            to={"/admin/project/edit/" + projects.id}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            Edit
                                        </NavLink>
                                    </div>
                                ,
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
