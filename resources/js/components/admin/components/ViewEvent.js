import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useFetch } from '../../../customHook'
import { AppContext } from '../../../store'
import MUIDataTable from 'mui-datatables'
import { Button } from 'react-bootstrap'
import dateFormat from 'dateformat'
import EventModal from './Modal/EventModal'


const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "event_title", label: "Event", option: { filter: true, sort: true } },
    { name: "event_location", label: "Location", option: { filter: true, sort: true } },
    { name: "date_started", label: "Date", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } }
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: false,
    download: false,
    print: false
};



export default function ViewEvent() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/events"
    });

    useEffect(() => {
        dispatch({ type: "FETCH_EVENTS", payload: data })
    }, [data])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Event",
                data,
                size: "md",
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
                    history.push("/admin/event/view");
                },
                data: data,
                children: <EventModal />
            }
        })
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Events</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">View Events</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Events"}
                            data={
                                state.events.map((events, index) => ({
                                    id: index + 1,
                                    event_title: events.event_title,
                                    event_location: events.event_location,
                                    date_started: dateFormat(events.date_stated, "dddd, mmmm d, yyyy h:MM TT"),
                                    status:
                                        events.status == 1 ? (
                                            <p className="text-success m-0">
                                                Active
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Unactive
                                            </p>
                                        ), 
                                    action:
                                        <div className="d-flex align-items-center">
                                            <Button
                                                id={events.id}
                                                type="button"
                                                onClick={() => openModal(events)}
                                                className="btn btn-info btn-sm"
                                            >
                                                Update
                                            </Button>
                                            <NavLink
                                                to={"/admin/event/edit/" + events.id}
                                                className="btn btn-secondary btn-sm mb-0"
                                            >
                                                Edit
                                            </NavLink>
                                        </div>
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
