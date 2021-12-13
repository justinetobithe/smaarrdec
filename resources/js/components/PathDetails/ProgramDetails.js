
import React, { useContext, useEffect, useState, Fragment } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useFetch } from '../../customHook';
import { AppContext } from '../../store';
import MUIDataTable from 'mui-datatables';
import dateFormat from 'dateformat';
import Error404 from "../Error404"


const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "program_title", label: "Project Title/s", option: { filter: true, sort: true } },
    { name: "agency", label: "Agency", option: { filter: true, sort: true } },
    { name: "commodity", label: "Commodity", option: { filter: true, sort: true } },
    { name: "researchers", label: "Researcher/s", option: { filter: true, sort: true } },
    { name: "duration", label: "Duration", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
]


const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: false,
    download: false,
    print: false, 
};

export default function ProgramDetails() {
    let { slug } = useParams();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/display-program-content/" + slug
    });

    const commodity = useFetch({
        url: "/api/commodities"
    });

    const projects = useFetch({
        url: "/api/get-project-by-program/" + data.id
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
        return (
            <>
                <section id="about" className="about program">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="program-title">
                                    {
                                        data.program_name
                                    }
                                </h1>
                                <div className="article-content">
                                    {
                                        data.featured_image != null ?
                                            <div className="embed-wrap">
                                                <img className="img-fluid" src={data.featured_image} alt={data.featured_image} />
                                            </div>
                                            : ""
                                    }
                                </div>


                                <ul className="project-nav nav nav-tabs mt-5" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="summary-tab" data-bs-toggle="tab" data-bs-target="#summary" type="button" role="tab" aria-controls="summary" aria-selected="true">Summary</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="false">Details</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="list-of-projects-tab" data-bs-toggle="tab" data-bs-target="#list-of-projects" type="button" role="tab" aria-controls="list-of-projects" aria-selected="false">List of Projects</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="summary" role="tabpanel" aria-labelledby="summary-tab">
                                        {
                                            data.program_content != null
                                                ? <div className="project-content mt-5" dangerouslySetInnerHTML={{ __html: data.program_content }} />
                                                : <p className="project-content mt-3">No data found</p>
                                        }
                                    </div>
                                    <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
                                        <div className="program-details mt-5">
                                            {
                                                !data.program_leader && !data.program_members ? null :
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Author/s :</label>
                                                        <div className="col-sm-10 row d-flex align-items-center">
                                                            {!data.program_leader ? null : <p className="mb-0">Program Leader : <b>{data.program_leader}</b></p>}
                                                            {!data.program_members ? null : <p className="mb-0">Program Member : <b>{JSON.parse(data.program_members).join(", ")}</b></p>}
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                !data.start_date && !data.end_date ? null :
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Duration :</label>
                                                        <div className="col-sm-10 row d-flex align-items-center">
                                                            {!data.start_date ? null : <p className="mb-0">Date Started : <b>{dateFormat(data.start_date, "mmmm, yyyy")}</b></p>}
                                                            {!data.end_date ? null : <p className="mb-0">Date Ended : <b>{dateFormat(data.end_date, "mmmm, yyyy")}</b></p>}
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                !data.remarks && !data.remarks_description ? null :
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Remarks :</label>
                                                        <div className="col-sm-10 row d-flex align-items-center">
                                                            {data.remarks == 0 ? null : <p className="mb-0">Status : <b>{data.remarks == 1 ? "On-Going" : data.remarks == 2 ? "Completed" : ""}</b></p>}
                                                            {!data.remarks_description ? null : <p className="mb-0">Description : {data.remarks_description}</p>}
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                !data.implementing_agency && !data.collaborating_agency ? null :
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Affiliation :</label>
                                                        <div className="col-sm-10 row d-flex align-items-center">
                                                            {!data.implementing_agency ? null : <p className="mb-0">Implementing Agency : <b>{JSON.parse(data.implementing_agency).map(item => item).join(", ")}</b></p>}
                                                            {!data.collaborating_agency ? null : <p className="mb-0">Collaborating Agency : <b>{JSON.parse(data.collaborating_agency).map(item => item).join(", ")}</b></p>}
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="list-of-projects" role="tabpanel" aria-labelledby="list-of-projects-tab">
                                        <MUIDataTable
                                            className="mt-5"
                                            title={"List of Projects for this Program"}
                                            data={
                                                projects.data.map((projects, index) => ({
                                                    id: index + 1,
                                                    program_title: projects.project_title,
                                                    agency: !projects.implementing_agency ? null : JSON.parse(projects.implementing_agency).join(", "),
                                                    commodity: commodity.data.filter((item) => {
                                                        if (JSON.stringify(projects.commodities).includes(item.commodity_name)) {
                                                            return item;
                                                        }
                                                    }).map(item => (
                                                        item.commodity_name + ", "
                                                    )),
                                                    researchers:
                                                        <>
                                                            {projects.program_leader == null ? "" : <p className="mb-0">Project Leader: {isset(projects.program_leader) ? projects.program_leader : ""} </p>}
                                                            {projects.program_members == null ? "" : <p className={projects.program_leader == null ? "mt-0 mb-0" : "mt-4 mb-0"}>Project Members: {isset(projects.program_members) ? JSON.parse(projects.program_members).join(", ") : ""} </p>}
                                                        </>,
                                                    duration:
                                                        <>
                                                            {projects.start_date == null ? "" : <p className="mb-0">Date Started: {isset(projects.start_date) ? dateFormat(projects.start_date, "mmmm, yyyy") : ""} </p>}
                                                            {projects.end_date == null ? "" : <p className={projects.start_date == null ? "mt-0 mb-0" : "mt-4 mb-0"}>Date Ended: {isset(projects.end_date) ? dateFormat(projects.end_date, "mmmm, yyyy") : ""} </p>}
                                                        </>,

                                                    action: <a className="btn btn-outline-success btn-sm" href={"/project/" + projects.program_slug}>
                                                        <i className="bi bi-eye"></i>
                                                    </a>,
                                                }))
                                            }
                                            columns={columns}
                                            options={options}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}




// import React, { useContext, useEffect } from 'react'
// import { NavLink, useParams } from 'react-router-dom'
// import { useFetch } from '../../customHook';
// import { AppContext } from '../../store';
// import MUIDataTable from 'mui-datatables';
// import dateFormat from 'dateformat';
// import Error404 from '../Error404';

// const columns = [
//     { name: "id", label: "No.", option: { filter: true, sort: true } },
//     { name: "program_title", label: "Project Title/s", option: { filter: true, sort: true } },
//     { name: "agency", label: "Agency", option: { filter: true, sort: true } },
//     { name: "commodity", label: "Commodity", option: { filter: true, sort: true } },
//     { name: "researchers", label: "Researcher/s", option: { filter: true, sort: true } },
//     { name: "duration", label: "Duration", option: { filter: true, sort: true } },
//     { name: "action", label: "Action", option: { filter: true, sort: true } },
// ]


// const options = {
//     filter: true,
//     filterType: 'dropdown',
//     responsive: 'standard',
//     selectableRows: false,
//     download: false,
//     print: false
// };

// export default function ProgramDetails() {

//     const { state, dispatch } = useContext(AppContext)

//     let { slug } = useParams();

//     const { data, loading } = useFetch({
//         url: "/api/display-program-content/" + slug
//     });

//     const commodity = useFetch({
//         url: "/api/commodities"
//     });

//     const projects = useFetch({
//         url: "/api/get-project-by-program/" + data.id
//     });

//     useEffect(() => {
//         dispatch({ type: "TOGGLE_LOADING", payload: loading })
//     }, [loading])

//     useEffect(() => {
//         window.scrollTo(0, 0)
//     })

//     if (isset(data.status) && !data.status) {
//         return <Error404 />
//     } else {
//         return (
//             <>
//                 <section id="about" className="about">
//                     <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
//                         <div className="form-group row">
//                             <label className="col-sm-2 col-form-label">Program :</label>
//                             <div className="col-sm-10 d-flex align-items-center">
//                                 <p className="fw-bold mb-0">{data.program_name}</p>
//                             </div>
//                         </div>
//                         {
//                             !data.program_leader && !data.program_members ? null :
//                                 <div className="form-group row">
//                                     <label className="col-sm-2 col-form-label">Author/s :</label>
//                                     <div className="col-sm-10 row d-flex align-items-center">
//                                         {!data.program_leader ? null : <p className="mb-0">Program Leader : <b>{data.program_leader}</b></p>}
//                                         {!data.program_members ? null : <p className="mb-0">Program Member : <b>{JSON.parse(data.program_members).join(", ")}</b></p>}
//                                     </div>
//                                 </div>
//                         }
//                         {
//                             !data.start_date && !data.end_date ? null :
//                                 <div className="form-group row">
//                                     <label className="col-sm-2 col-form-label">Duration :</label>
//                                     <div className="col-sm-10 row d-flex align-items-center">
//                                         {!data.start_date ? null : <p className="mb-0">Date Started : <b>{dateFormat(data.start_date, "mmmm, yyyy")}</b></p>}
//                                         {!data.end_date ? null : <p className="mb-0">Date Ended : <b>{dateFormat(data.end_date, "mmmm, yyyy")}</b></p>}
//                                     </div>
//                                 </div>
//                         }
//                         {
//                             !data.remarks && !data.remarks_description ? null :
//                                 <div className="form-group row">
//                                     <label className="col-sm-2 col-form-label">Remarks :</label>
//                                     <div className="col-sm-10 row d-flex align-items-center">
//                                         {data.remarks == 0 ? null : <p className="mb-0">Status : <b>{data.remarks == 1 ? "On-Going" : data.remarks == 2 ? "Completed" : ""}</b></p>}
//                                         {!data.remarks_description ? null : <p className="mb-0">Description : {data.remarks_description}</p>}
//                                     </div>
//                                 </div>
//                         }
//                         {
//                             !data.implementing_agency && !data.collaborating_agency ? null :
//                                 <div className="form-group row">
//                                     <label className="col-sm-2 col-form-label">Affiliation :</label>
//                                     <div className="col-sm-10 row d-flex align-items-center">
//                                         {!data.implementing_agency ? null : <p className="mb-0">Implementing Agency : <b>{JSON.parse(data.implementing_agency).map(item => item).join(", ")}</b></p>}
//                                         {!data.collaborating_agency ? null : <p className="mb-0">Collaborating Agency : <b>{JSON.parse(data.collaborating_agency).map(item => item).join(", ")}</b></p>}
//                                     </div>
//                                 </div>
//                         }
//                         {
//                             <div className="mt-5" dangerouslySetInnerHTML={{ __html: data.program_content }} />
//                         }
//                         <div className="row mt-5" data-aos="zoom-in" data-aos-delay="100">

//                             <MUIDataTable
//                                 title={"List of Projects for this Program"}
//                                 data={
//                                     projects.data.map((projects, index) => ({
//                                         id: index + 1,
//                                         program_title: projects.project_title,
//                                         agency: !projects.implementing_agency ? null : JSON.parse(projects.implementing_agency).join(", "),
//                                         commodity: commodity.data.filter((item) => {
//                                             if (JSON.stringify(projects.commodities).includes(item.commodity_name)) {
//                                                 return item;
//                                             }
//                                         }).map(item => (
//                                             item.commodity_name + ", "
//                                         )),
//                                         researchers:
//                                             <>
//                                                 {projects.program_leader == null ? "" : <p className="mb-0">Project Leader: {isset(projects.program_leader) ? projects.program_leader : ""} </p>}
//                                                 {projects.program_members == null ? "" : <p className={projects.program_leader == null ? "mt-0 mb-0" : "mt-4 mb-0"}>Project Members: {isset(projects.program_members) ? JSON.parse(projects.program_members).join(", ") : ""} </p>}
//                                             </>,
//                                         duration:
//                                             <>
//                                                 {projects.start_date == null ? "" : <p className="mb-0">Date Started: {isset(projects.start_date) ? dateFormat(projects.start_date, "mmmm, yyyy") : ""} </p>}
//                                                 {projects.end_date == null ? "" : <p className={projects.start_date == null ? "mt-0 mb-0" : "mt-4 mb-0"}>Date Ended: {isset(projects.end_date) ? dateFormat(projects.end_date, "mmmm, yyyy") : ""} </p>}
//                                             </>,

//                                         action: <a className="btn btn-outline-success btn-sm" href={"/project/" + projects.program_slug}>
//                                             <i className="bi bi-eye"></i>
//                                         </a>,
//                                     }))
//                                 }
//                                 columns={columns}
//                                 options={options}
//                             />
//                         </div>
//                     </div>
//                 </section>
//             </>
//         )
//     }
// }