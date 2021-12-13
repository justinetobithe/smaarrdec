import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetch } from '../customHook'
import MUIDataTable from 'mui-datatables';
import { AppContext } from '../store'
import Select from 'react-select'
import dateFormat from 'dateformat'
import Pagination from 'react-js-pagination'

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "project_title", label: "Project Title/s", option: { filter: true, sort: true } },
    { name: "agency", label: "Agency", option: { filter: true, sort: true } },
    { name: "commodity", label: "Commodity", option: { filter: true, sort: true } },
    { name: "researchers", label: "Researcher/s", option: { filter: true, sort: true } },
    { name: "duration", label: "Duration", option: { filter: true, sort: true } },
    { name: "remarks", label: "Remarks", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
]


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

export default function Projects() {

    const { state, dispatch } = useContext(AppContext);

    const [selectedCommodity, setSelectedCommodity] = useState()
    const [selectedRemarks, setSelectedRemarks] = useState()
    const [selectedPrograms, setSelectedPrograms] = useState()
    const [selectedImplementingAgency, setSelectedImplementingAgency] = useState()

    const [pagination, setPagination] = useState({
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1
    });

    const { data, loading } = useFetch({
        url: `/api/get-projects?filterPrograms=${selectedPrograms != null ? selectedPrograms.value : ""}&filterImplementingAgency=${selectedImplementingAgency != null ? selectedImplementingAgency.value : ""}&filterCommodity=${selectedCommodity != null ? selectedCommodity.value : ""}&filterRemarks=${selectedRemarks != null ? selectedRemarks.value : ""}&page=${pagination.activePage}`
    });

    useEffect(() => {
        dispatch({ type: "FETCH_PROJECTS", payload: data.data })
    }, [data.data])

    const commodities = useFetch({
        url: "/api/get-commodity-ascending"
    });

    const agencies = useFetch({
        url: "/api/get-agencies-ascending"
    });

    const programs = useFetch({
        url: "/api/get-programs-ascending"
    });


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
        window.scrollTo(0, 0)
    }, [])


    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);


    return (
        <>

            <section className="projects">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Projects</h2>
                        <p>List of Projects</p>
                    </div>
                    <div className="row" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row g-3 mb-5 z-index">
                            <h4 className="">Filter by</h4>
                            <div className="col-md-6">
                                <div className="mb-4 row">
                                    <label className="col-sm-3 col-form-label">Programs:</label>
                                    <div className="col-sm-7">
                                        <Select
                                            options={programs.data.map(programs => ({
                                                value: programs.id,
                                                label: programs.program_name
                                            }))}
                                            isClearable
                                            defaultValue={selectedPrograms}
                                            onChange={setSelectedPrograms}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-4 row">
                                    <label className="col-sm-3 col-form-label">Commodity:</label>
                                    <div className="col-sm-7">
                                        <Select
                                            options={
                                                commodities.data.map(commodity => ({
                                                    value: commodity.commodity_name,
                                                    label: commodity.commodity_name
                                                }))
                                            }
                                            isClearable
                                            defaultValue={selectedCommodity}
                                            onChange={setSelectedCommodity}
                                        />
                                    </div>
                                </div>
                            </div>
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
                        {!isset(state.projects) ? null :
                            <MUIDataTable
                                title={"List of Projects"}
                                data={
                                    state.projects.map((projects, index) => ({
                                        id: index + 1,
                                        project_title: projects.project_title,
                                        agency: !projects.implementing_agency ? null : JSON.parse(projects.implementing_agency).join(", "),
                                        commodity: commodities.data.filter((item) => {
                                            if (JSON.stringify(projects.commodities).includes(item.commodity_name)) {
                                                return item;
                                            }
                                        }).map(item => (
                                            item.commodity_name
                                        )).join(", "),
                                        researchers:
                                            <>
                                                {projects.project_leader == null ? "" : <p className="mb-0">Project Leader: {isset(projects.project_leader) ? projects.project_leader : ""} </p>}
                                                {projects.project_members == null ? "" : <p className={projects.project_leader == null ? "mt-0 mb-0" : "mt-4 mb-0"}>Project Members: {isset(projects.project_members) ? JSON.parse(projects.project_members).join(", ") : ""} </p>}
                                            </>,
                                        duration:
                                            <>
                                                {projects.start_date == null ? "" : <p className="mb-0">Date Started: {isset(projects.start_date) ? dateFormat(projects.start_date, "mmmm, yyyy") : ""} </p>}
                                                {projects.end_date == null ? "" : <p className={projects.start_date == null ? "mt-0 mb-0" : "mt-4 mb-0"}>Date Ended: {isset(projects.end_date) ? dateFormat(projects.end_date, "mmmm, yyyy") : ""} </p>}
                                            </>,
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
                                        action: <NavLink className="btn btn-outline-success btn-sm" to={"project/" + projects.project_slug} data-toggle="tooltip" data-placement="top" title="View Project">
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
                            onChange={pageNumber =>
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

