import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AppContext } from "../../../store";
import MUIDataTable from "mui-datatables";
import { useFetch } from "../../../customHook";
import { Button } from "react-bootstrap";
import ProgramModal from "./Modal/ProgramModal";
import ProgramViewModal from "./Modal/ProgramViewModal";


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
    { name: "added_by", label: "Added By", option: { filter: true, sort: true } },
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

export default function ViewProgram() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/get-all-programs",
    });

    const users = useFetch({
        url: "/api/users"
    })

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
                            footer: "",
                            onHide: () => { },
                        },
                    });
                    history.push("/admin/programs/view");
                },
                data: data,
                children: <ProgramModal />,
            },
        });
    };

    const viewProgramModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Program Details",
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
                    })
                    history.push("/admin/programs/view");
                },
                data: data,
                children: <ProgramViewModal />
            }
        })
    }




    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">List of Programs</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active">List of Programs</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Programs"}
                            data={state.programs.map((program, index) => ({
                                id: index + 1,
                                name: program.program_name,
                                implementing_agency: !program.implementing_agency ? null : JSON.parse(program.implementing_agency).map(item => item).join(", "),
                                collaborating_agency: !program.collaborating_agency ? null : JSON.parse(program.collaborating_agency).map(item => item).join(", "),
                                added_by: users.data.map(item => {
                                    if (JSON.stringify(program.added_by).includes(item.email)) {
                                        return item.name
                                    }
                                }),
                                status:
                                    program.status == 0 ? (
                                        <Button
                                            id={program.id}
                                            onClick={() =>
                                                openModal(program)
                                            }
                                            type="button"
                                            className="btn btn-info btn-sm"
                                        >
                                            Verify
                                        </Button>
                                    ) : program.status == 1 ? (
                                        <p className="text-success m-0">
                                            Active
                                        </p>
                                    ) : program.status == 2 ? (
                                        <p className="text-danger m-0">
                                            Rejected
                                        </p>
                                    ) : null,
                                action: (
                                    <div className="d-flex justify-content-center"> 
                                        <Button
                                            id={program.id}
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            onClick={() => viewProgramModal(program)}
                                        >
                                            View
                                        </Button>
                                    </div>
                                ),
                            }))}
                            columns={columns}
                            options={options}
                        />
                    </div>
                </div>
            </div >
        </>
    );
}
