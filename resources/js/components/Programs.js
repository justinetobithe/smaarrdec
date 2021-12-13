import React, { useContext, useEffect, useState } from 'react'
import { useFetch } from '../customHook'
import { NavLink } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { AppContext } from '../store';
import Select from 'react-select';
import Pagination from 'react-js-pagination'


const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "name", label: "Program Name", option: { filter: true, sort: true } },
    { name: "implementing_agency", label: "Implementing Agency", option: { filter: true, sort: true } },
    { name: "collaborating_agency", label: "Collaborating Agency", option: { filter: true, sort: true } },
    { name: "researchers", label: "Researcher/s", option: { filter: true, sort: true } },
    { name: "remarks", label: "Remarks", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: false,
    download: false,
    print: false,
    pagination: false
};

const remarksOptions = [
    { value: "0", label: "Not Yet Stated" },
    { value: "1", label: "On-Going" },
    { value: "2", label: "Completed" }
]
export default function Programs() {

    const { state, dispatch } = useContext(AppContext);

    const [selectedRemarks, setSelectedRemarks] = useState()
    const [selectedImplementingAgency, setSelectedImplementingAgency] = useState()
    const [pagination, setPagination] = useState({
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1
    })

    const { data, loading } = useFetch({
        url: `/api/get-programs?filterImplementingAgency=${selectedImplementingAgency != null ? selectedImplementingAgency.value : ""}&filterRemarks=${selectedRemarks != null ? selectedRemarks.value : ""}`,
    });

    useEffect(() => {
        dispatch({ type: "FETCH_PROGRAMS", payload: data.data })
    }, [data.data])

    const agencies = useFetch({
        url: "/api/get-agencies-ascending"
    });

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (isset(data.data)) {
            setPagination({
                activePage: data.current_page,
                itemsCountPerPage: data.per_page,
                totalItemsCount: data.total
            });
        }
    }, [data])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    return (
        <>
            <section id="programs" className="programs">
                <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                    <div className="section-title">
                        <h2>Programs</h2>
                        <p>List of Programs</p>
                    </div>
                    <div className="row" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row g-3 mb-5 z-index">
                            <h4 className="">Filter by</h4>
                            <div className="col-md-6">
                                <div className="mb-4 row">
                                    <label className="col-sm-3 col-form-label">Implementing Agency:</label>
                                    <div className="col-sm-7">
                                        <Select
                                            options={agencies.data.map(agencies => ({
                                                value: agencies.agency_name,
                                                label: agencies.agency_name
                                            }))}
                                            isClearable
                                            defaultValue={selectedImplementingAgency}
                                            onChange={setSelectedImplementingAgency}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-4 row">
                                    <label className="col-sm-3 col-form-label">Remarks:</label>
                                    <div className="col-sm-7">
                                        <Select
                                            options={remarksOptions}
                                            isClearable
                                            defaultValue={selectedRemarks}
                                            onChange={setSelectedRemarks}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!isset(state.programs) ? null :
                            <MUIDataTable
                                title={"List of Programs"}
                                data={
                                    state.programs.map((programs, index) => ({
                                        id: index + 1,
                                        name: programs.program_name,
                                        implementing_agency: programs.implementing_agency != "" ? JSON.parse(programs.implementing_agency) : "",
                                        collaborating_agency: programs.collaborating_agency != "" ? JSON.parse(programs.collaborating_agency) : "",
                                        researchers:
                                            <>
                                                {programs.program_leader == null ? "" : <p className="mb-0">Program Leader: {isset(programs.program_leader) ? programs.program_leader : ""} </p>}
                                                {programs.program_members == null ? "" : <p className={programs.program_leader == null ? "mt-0 mb-0" : "mt-4 mb-0"}>Program Members: {isset(programs.program_members) ? JSON.parse(programs.program_members).join(", ") : ""} </p>}
                                            </>,
                                        remarks:
                                            programs.remarks == 1 ? (
                                                <p className="text-primary m-0">
                                                    On-Going
                                                </p>
                                            ) : programs.remarks == 2 ? (

                                                <p className="text-success m-0">
                                                    Completed
                                                </p>
                                            ) : programs.remarks == 2 ? (
                                                <p className="text-danger m-0">
                                                    Terminate
                                                </p>
                                            ) : "",
                                        action: <NavLink className="btn btn-outline-success btn-sm" to={"/program/" + programs.program_slug} data-toggle="tooltip" data-placement="top" title="View Program">
                                            <i className="bi bi-eye"></i>
                                        </NavLink>,
                                    }))
                                }
                                columns={columns}
                                options={options}
                            />
                        }
                        <Pagination
                            itemClass="page-item mt-5"
                            linkClass="page-link"
                            innerClass="pagination justify-content-center"
                            pageRangeDisplayed={10}
                            onChange={
                                pageNumber =>
                                    setPagination(state => ({
                                        ...state,
                                        activePage: pageNumber
                                    }))
                            }
                            {...pagination}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
