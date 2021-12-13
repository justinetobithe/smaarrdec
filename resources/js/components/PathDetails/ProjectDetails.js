import React, { useContext, useEffect, useState, Fragment } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useFetch } from '../../customHook';
import { AppContext } from '../../store';
import dateFormat from 'dateformat';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Error404 from "../Error404"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export default function ProjectDetails() {
    let { slug } = useParams();

    const { state, dispatch } = useContext(AppContext);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const { data, loading } = useFetch({
        url: "/api/display-project-content/" + slug
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const commodity = useFetch({
        url: "/api/commodities"
    });

    const relatedProject = useFetch({
        url: data.commodities != null ? `/api/get-related-projects?commodities=${JSON.parse(data.commodities).join(",")}` : ""
    })

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
        return (
            <>
                <section id="about" className="about project">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row">
                            <div className="col-12 col-lg-9 block-content">
                                <h1 className="project-title">
                                    {
                                        data.project_title
                                    }
                                </h1>
                                <div className="article-content">
                                    {
                                        data.featured_image != null && data.featured_image != "" ?
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
                                        <button className="nav-link" id="commodity-tab" data-bs-toggle="tab" data-bs-target="#commodity" type="button" role="tab" aria-controls="commodity" aria-selected="false">Commodity</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="file-tab" data-bs-toggle="tab" data-bs-target="#file" type="button" role="tab" aria-controls="file" aria-selected="false">File</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="summary" role="tabpanel" aria-labelledby="summary-tab">
                                        {
                                            data.project_content != null
                                                ? <div className="project-content mt-5" dangerouslySetInnerHTML={{ __html: data.project_content }} />
                                                : <p className="project-content mt-3">No data found</p>
                                        }
                                    </div>
                                    <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
                                        <div className="project-details mt-5">
                                            {!data.program_id ? null :
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Program :</label>
                                                    <div className="col-sm-10 d-flex align-items-center">
                                                        <p className="fw-bold mb-0">{data.program_name}</p>
                                                    </div>
                                                </div>}
                                            {
                                                !data.project_leader && !data.project_members ? null :
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Researcher/s :</label>
                                                        <div className="col-sm-10 row d-flex align-items-center">
                                                            {!data.project_leader ? null : <p className="mb-0">Project Leader : <b>{data.project_leader}</b></p>}
                                                            {!data.project_members ? null : <p className="mb-0">Project Member : <b>{JSON.parse(data.project_members).join(", ")}</b></p>}
                                                        </div>
                                                    </div>
                                            }
                                            {!data.project_study_site ? null :
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Project Study Site/Location :</label>
                                                    <div className="col-sm-10 d-flex align-items-center">
                                                        <p className="fw-bold mb-0">{data.project_study_site}</p>
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
                                                !data.funding_agency && !data.budget ? null :
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Budget :</label>
                                                        <div className="col-sm-10 row d-flex align-items-center">
                                                            {!data.funding_agency ? null : <p className="mb-0">Funding Agency : <b>{JSON.parse(data.funding_agency).map(item => item).join(", ")}</b></p>}
                                                            {!data.budget ? null : <p className="mb-0">Amount : <b>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(data.budget)}</b></p>}
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                data.implementing_agency == "" || "[]" && data.collaborating_agency == "" || "[]" ? null :
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Affiliation :</label>
                                                        <div className="col-sm-10 row d-flex align-items-center">
                                                            {data.implementing_agency == "" || "[]" ? null : <p className="mb-0">Implementing Agency : <b>{JSON.parse(data.implementing_agency).map(item => item).join(", ")}</b></p>}
                                                            {data.collaborating_agency == "" || "[]" ? null : <p className="mb-0">Collaborating Agency : <b>{JSON.parse(data.collaborating_agency).map(item => item).join(", ")}</b></p>}
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="commodity" role="tabpanel" aria-labelledby="commodity-tab">

                                        {
                                            data.commodities != null ? (
                                                <div className="project-details mt-5">
                                                    <div className="row"> {
                                                        commodity.data.filter(item => {
                                                            if (JSON.parse(data.commodities).includes(item.commodity_name)) {
                                                                return item
                                                            }
                                                        }).map(item => (
                                                            <div className="col-12 col-md-4 col-lg-3 mb-5 aos-init aos-animate" data-aos="flip-left" key={item.id}>
                                                                <div className="card h-100">
                                                                    <div className="caprd-header h-100">
                                                                        <img className="img-fluid" src={item.commodity_image} alt={item.commodity_name} />
                                                                    </div>
                                                                    <div className="card-body h-50">
                                                                        <h6 className="card-title text-center">{item.commodity_name}</h6>
                                                                    </div>
                                                                    <div className="card-footer bg-transparent">
                                                                        <a className="btn btn-primary w-100" href={item.commodity_slug}>Visit page</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    </div>
                                                </div>
                                            ) : <p className="mt-3">No data found</p>

                                        }

                                    </div>
                                    <div className="tab-pane fade" id="file" role="tabpanel" aria-labelledby="file-tab">
                                        {
                                            data.abstract != null ?
                                                <div className="col-4 col-sm-6 col-lg-3 mt-5">
                                                    <Document
                                                        file={data.abstract}
                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                    >
                                                        <Page pageNumber={pageNumber} />
                                                    </Document>
                                                    <a target="_blank" href={data.abstract} className="mt-3 d-flex align-items-center justify-content-center">Download</a>
                                                </div>
                                                : <p className="mt-3">No data found</p>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3 section-right-panel animated-content d-none d-lg-block mt-3">
                                <div className="sidebar sticker">
                                    <h4 className="header-title">
                                        Related Project
                                    </h4>
                                    <div className="tabs-inner current" id="tabs-latest">
                                        <ul>
                                            {
                                                relatedProject.data.length ?
                                                    relatedProject.data.slice(0, 10).map(project => (
                                                        <li key={project.id}>
                                                            <p className="title-sidebar"><a href={project.project_slug}>{project.project_title}</a></p>
                                                            <p className="detail-entry"><small>{JSON.parse(project.commodities).join(", ")}</small></p>
                                                        </li>
                                                    ))
                                                    : <p className="mt-3">No data found</p>
                                            }

                                        </ul>
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

