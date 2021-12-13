import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../store";
import { Button, Table } from "react-bootstrap";
import { useFetch } from "../../../../customHook";
import dateFormat from 'dateformat';

export default function ProgramViewModal() {

    const { state, dispatch } = useContext(AppContext);

    const programs = useFetch({
        url: "/api/programs"
    })

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
                    <Table hover>
                        <tbody key={state.modal.data.id}>
                            <tr className="project-details">
                                <td>Program Title</td>
                                <td className="text-align-left"><b>{state.modal.data.program_name}</b></td>
                            </tr>
                            <tr className="project-details">
                                <td>Researcher/s</td>
                                <td>
                                    {!state.modal.data.program_leader ? null : <p className="mb-0">Program Leader : <b> {state.modal.data.program_leader}</b></p>}
                                    {!state.modal.data.program_members ? null : <p className="mb-0">Program Member :  <b>{JSON.parse(state.modal.data.program_members).join(", ")}</b></p>}
                                </td>
                            </tr>
                            <tr className="project-details">
                                <td>Duration</td>
                                <td>
                                    {!state.modal.data.start_date ? null : <p className="mb-0">Date Started : <b>{dateFormat(state.modal.data.start_date, "mmmm, yyyy")}</b></p>}
                                    {!state.modal.data.end_date ? null : <p className="mb-0">Date Ended : <b>{dateFormat(state.modal.data.end_date, "mmmm, yyyy")}</b></p>}
                                </td>
                            </tr>
                            <tr className="project-details">
                                <td>Remarks</td>
                                <td>
                                    {state.modal.data.remarks == 0 ? null : <p className="mb-0">Status : <b>{state.modal.data.remarks == 1 ? "On-Going" : state.modal.data.remarks == 2 ? "Completed" : ""}</b></p>}
                                    {!state.modal.data.remarks_description ? null : <p className="mb-0">Description : <b>{state.modal.data.remarks_description}</b></p>}
                                </td>
                            </tr>
                            <tr className="project-details">
                                <td>Affiliation</td>
                                <td>
                                    {state.modal.data.implementing_agency == "" || "[]" ? null : <p className="mb-0">Implementing Agency : <b>{JSON.parse(state.modal.data.implementing_agency).map(item => item).join(", ")}</b></p>}
                                    {state.modal.data.collaborating_agency == "" || "[]" ? null : <p className="mb-0">Collaborating Agency : <b>{JSON.parse(state.modal.data.collaborating_agency).map(item => item).join(", ")}</b></p>}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div className="mb-3 d-flex align-items-center justify-content-end">
                    <Button
                        className="btn btn-secondary ms-2 btn-sm"
                        data-bs-dismiss="modal"
                        onClick={() => closeModal()}
                    >
                        Close
                    </Button>
                </div>
            </form>
        </>
    );
}
