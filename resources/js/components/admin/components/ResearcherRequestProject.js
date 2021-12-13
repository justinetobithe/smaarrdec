import React, { useContext, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { AppContext } from '../../../store';
import { useFetch } from '../../../customHook';

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "title", label: "Title", option: { filter: true, sort: true } },
    { name: "subject", label: "Subject/Project", option: { filter: true, sort: true } },
    { name: "message", label: "Message", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsize: 'standard',
    selectableRows: false,
    download: false,
    print: false
};


export default function ResearcherRequestProject() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: `/api/get_project_requests/${state.user.email}`
    })

    useEffect(() => {
        dispatch({ type: "FETCH_PROJECT_REQUESTS", payload: data });
    }, [data])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Request Lists</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">Request Lists</li>
                </ol>
                <div className="card mb-4">
                    <div className="card-body">
                        <NavLink type="button" className="btn btn-info btn-sm text-white" to="/admin/request-project/add">New Request</NavLink>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"Request List"}
                            data={
                                state.projectRequests.map((projectRequests, index) => ({
                                    id: index + 1,
                                    title: projectRequests.title,
                                    subject: projectRequests.subject,
                                    message: projectRequests.message,
                                    status:
                                        projectRequests.read_type == 1 ? (
                                            <p className="text-success m-0">
                                                Read
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Unread
                                            </p>
                                        ),
                                }))
                            }
                            options={options}
                            columns={columns}
                        />
                    </div>

                </div>
            </div>

        </>
    )
}
