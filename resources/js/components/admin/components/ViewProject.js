import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { useFetch, useHttpRequest } from "../../../customHook";
import { AppContext } from "../../../store";
import { Button } from "react-bootstrap";
import ProjectApprovalModal from "./Modal/ProjectApprovalModal";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ProjectVeiwModal from "./Modal/ProjectVeiwModal";
// import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
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
    { name: "project_leader", label: "Project Leader", option: { filter: true, sort: true }, },
    { name: "commodity", label: "Commodity", option: { filter: true, sort: true }, },
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

export default function ViewProject() {
    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/view-all-projects",
    });

    const projectAbstract = useFetch({
        url: "/api/get-all-project-abstract"
    })

    const commodity = useFetch({
        url: "/api/commodities"
    })

    useEffect(() => {
        dispatch({ type: "FETCH_PROJECTS", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);


    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Project Verification",
                data,
                size: "md",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => { },
                        },
                    });
                    history.push("/admin/project/view");
                },
                data: data,
                children: <ProjectApprovalModal />,
            },
        });
    };

    const viewProjectModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Project Details",
                data,
                size: "xl",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => { }
                        }
                    });
                    history.push("/admin/project/view")
                },
                data: data,
                children: <ProjectVeiwModal />
            }
        })
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">List of Projects</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active">List of Projects</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Projects"}
                            data={state.projects.map((projects, index) => ({
                                id: index + 1,
                                project_name: projects.project_title,
                                category: projects.project_category_name,
                                project_leader: projects.project_leader,
                                commodity: commodity.data.filter(item => {
                                    if (JSON.stringify(projects.commodities).includes(item.commodity_name)) {
                                        return item
                                    }
                                }).map(item => (
                                    <p key={item.id} className="mb-0">{item.commodity_name}</p>
                                )),
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
                                    projects.status == 0 ? (
                                        <Button
                                            id={projects.id}
                                            onClick={() =>
                                                openModal(projects)
                                            }
                                            type="button"
                                            className="btn btn-info btn-sm"
                                        >
                                            Verify
                                        </Button>
                                    ) : projects.status == 1 ? (
                                        <p className="text-success m-0">
                                            Active
                                        </p>
                                    ) : projects.status == 2 ? (
                                        <p className="text-danger m-0">
                                            Rejected
                                        </p>
                                    ) : null,
                                action:
                                    <Button
                                        type="button" className="btn btn-success btn-sm" onClick={() =>
                                            viewProjectModal(projects)
                                        } >
                                        View
                                    </Button>
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
