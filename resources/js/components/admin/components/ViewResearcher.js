import React, { useContext, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { AppContext } from '../../../store';
import { useFetch } from '../../../customHook';
import { Button } from 'react-bootstrap';
import ResearcherModal from './Modal/ResearcherModal';

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "image", label: "Image", option: { filter: true, sort: true } },
    { name: "name", label: "Name", option: { filter: true, sort: true } },
    { name: "agency", label: "Agency", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: false,
    download: false,
    print: false
};



export default function ViewResearcher() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/researchers",
    });

    useEffect(() => {
        dispatch({ type: "FETCH_RESEARCHERS", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Researcher",
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
                    history.push("/admin/researcher/view");
                },
                data: data,
                children: <ResearcherModal />,
            },
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Researchers</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">View Researchers</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Researchers"}
                            columns={columns}
                            options={options}
                            data={
                                state.researchers.map((researchers, index) => ({

                                    id: index + 1,
                                    image: <img className="img-fluid" src={researchers.image} alt={researchers.name} width="150"></img>,
                                    name: researchers.name,
                                    agency: researchers.agency_name,
                                    resume: '',
                                    status: researchers.status == 1 ? <p className="text-success m-0">Active</p> : <p className="text-danger m-0">Unactive</p>,
                                    action:
                                        <Button
                                            id={researchers.id}
                                            onClick={() => openModal(researchers)}
                                            type="button"
                                            className="btn btn-info btn-sm mb-0"
                                        >Edit</Button>
                                }))
                            }
                        />
                    </div>

                </div>
            </div>

        </>
    )
}
