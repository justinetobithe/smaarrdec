import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { useFetch, useHttpRequest } from "../../../customHook";
import { AppContext } from "../../../store";
import { Button } from "react-bootstrap";
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "implementing_agency", label: "Implementing Agency", option: { filter: true, sort: true } },
    { name: "commodity", label: "Commodity", option: { filter: true, sort: true } },
    { name: "category", label: "Category", option: { filter: true, sort: true } },
    { name: "program_title", label: "Program Title", option: { filter: true, sort: true } },
    { name: "project_title", label: "Project Title/s", option: { filter: true, sort: true } },
    { name: "project_leader", label: "Project Leader", option: { filter: true, sort: true } },
    { name: "project_members", label: "Project Member/s", option: { filter: true, sort: true } },
    { name: "study_site", label: "Study Site/s", option: { filter: true, sort: true } },
    { name: "year_started", label: "Year Started", option: { filter: true, sort: true } },
    { name: "year_ended", label: "Year Ended", option: { filter: true, sort: true } },
    { name: "funding_agency", label: "Funding Agency", option: { filter: true, sort: true } },
    { name: "budget", label: "Budget", option: { filter: true, sort: true } },
    { name: "collaborating_agency", label: "Collaborating Agency", option: { filter: true, sort: true } },
    { name: "remarks", label: "Remarks", option: { filter: true, sort: true } },
]


const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: false,
    // download: false,
    print: false,
    downloadOptions: { filename: 'Database.csv', separator: ',' }
};

const remarksOptions = [
    { value: "0", label: "Not Yet Stated" },
    { value: "1", label: "On-Going" },
    { value: "2", label: "Completed" }
]

export default function GenerateReport() {

    const { state, dispatch } = useContext(AppContext)

    const [selectedPrograms, setSelectedPrograms] = useState()
    const [selectedCommodity, setSelectedCommodity] = useState()
    const [selectedImplementingAgency, setSelectedImplementingAgency] = useState()
    const [selectedRemarks, setSelectedRemarks] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { data, loading } = useFetch({
        url: `/api/get-projects-for-report?filterPrograms=${selectedPrograms != null ? selectedPrograms.value : ""
            }&filterImplementingAgency=${selectedImplementingAgency != null ? selectedImplementingAgency.value : ""
            }&filterCommodity=${selectedCommodity != null ? selectedCommodity.value : ""
            }&filterRemarks=${selectedRemarks != null ? selectedRemarks.value : ""
            }&filterStartDate=${startDate != null ? dateFormat(startDate, "yyyy-mm-dd HH:MM:ss") : ""
            }&filterEndDate=${endDate != null ? dateFormat(endDate, "yyyy-mm-dd HH:MM:ss") : ""
            }&filterCategory=${selectedCategory != null ? selectedCategory.value : ""}`
    });

    useEffect(() => {
        dispatch({ type: "FETCH_PROJECTS", payload: data })
    }, [data])


    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);


    const commodities = useFetch({
        url: "/api/commodities"
    });


    const agencies = useFetch({
        url: "/api/agencies"
    });

    const programs = useFetch({
        url: "/api/programs"
    });

    const projectCategory = useFetch({
        url: "/api/project-categories"
    })

    console.log("Start Date: ", startDate != null ? dateFormat(startDate, "yyyy-mm-dd HH:MM:ss") : "");

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Generate Report</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                <li className="breadcrumb-item active">Generate Report</li>
            </ol>
            <div className="card mb-4 z-index">
                <div className="card-body">
                    <div className="row g-3 mb-5 z-index">
                        <h4 className="">Filter by</h4>
                        <div className="col-md-6">
                            <div className="mb-4 row">
                                <label className="col-sm-3 col-form-label">Programs</label>
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
                                <label className="col-sm-3 col-form-label">Commodity</label>
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
                                <label className="col-sm-3 col-form-label">Implementing Agency</label>
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
                                <label className="col-sm-3 col-form-label">Status</label>
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
                        <div className="col-md-6">
                            <div className="mb-4 row">
                                <label className="col-sm-3 col-form-label">Duration</label>
                                <div className="col-sm-7">
                                    <div className="mb-3 row-fluid w-100">
                                        <DatePicker
                                            className="form-control w-100"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            dateFormat="MMMM d, yyyy"
                                            placeholderText="Start Date"
                                            startDate={startDate}
                                            endDate={endDate}
                                        />
                                    </div>
                                    <div className="mb-3 row-fluid w-100">
                                        <DatePicker
                                            className="form-control w-100"
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            dateFormat="MMMM d, yyyy"
                                            placeholderText="End Date"
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-4 row">
                                <label className="col-sm-3 col-form-label">Category</label>
                                <div className="col-sm-7">
                                    <Select
                                        options={projectCategory.data.map(projectCategory => ({
                                            label: projectCategory.project_category_name,
                                            value: projectCategory.id
                                        }))}
                                        isClearable
                                        defaultValue={selectedCategory}
                                        onChange={setSelectedCategory}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <div className="card">
                    {!isset(data) ? null :
                        <MUIDataTable
                            title={"List of Projects"}
                            data={
                                data.map((projects, index) => ({
                                    id: index + 1,
                                    implementing_agency: !projects.implementing_agency ? null : JSON.parse(projects.implementing_agency).join(", "),
                                    commodity: commodities.data.filter((item) => {
                                        if (JSON.stringify(projects.commodities).includes(item.commodity_name)) {
                                            return item;
                                        }
                                    }).map(item => (
                                        item.commodity_name
                                    )).join(", "),
                                    category: !projects.project_category_name ? null : projects.project_category_name,
                                    program_title: !projects.program_name ? null : projects.program_name,
                                    project_title: projects.project_title,
                                    project_leader: !projects.project_leader ? null : projects.project_leader,
                                    project_members: !projects.project_members ? null : JSON.parse(projects.project_members).join(", "),
                                    study_site: !projects.project_study_site ? null : projects.project_study_site,
                                    year_started: isset(projects.start_date) ? dateFormat(projects.start_date, "yyyy") : "",
                                    year_ended: isset(projects.end_date) ? dateFormat(projects.end_date, "yyyy") : "",
                                    funding_agency: !projects.funding_agency ? null : JSON.parse(projects.funding_agency).join(", "),
                                    budget: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(projects.budget),
                                    collaborating_agency: !projects.collaborating_agency ? null : JSON.parse(projects.collaborating_agency).join(", "),
                                    remarks: !projects.remarks_description ? null : projects.remarks_description,
                                }))

                            }
                            columns={columns}
                            options={options}
                        />
                    }
                </div>
            </div>
        </div >
    )
}
