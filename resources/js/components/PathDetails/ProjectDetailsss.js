import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useFetch } from '../../customHook';
import { AppContext } from '../../store';
import dateFormat from 'dateformat';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Error404 from "../Error404"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ProjectDetailss() {
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

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
        return (
            <>
                <section id="about" className="about">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Title :</label>
                            <div className="col-sm-10 d-flex align-items-center">
                                <p className="fw-bold mb-0">{data.project_title}</p>
                            </div>
                        </div>
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
                        {
                            !data.project_content ? null :
                                <div className="d-block mt-5">
                                    <h4 className="text-left mb-5">
                                        Executive Summary
                                    </h4>
                                    <div className="mt-5" dangerouslySetInnerHTML={{ __html: data.project_content }} />
                                </div>
                        }

                    </div>
                </section >
                {
                    !data.commodities ? null :
                        <section id="commodity" className="commodity p-0">
                            <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                                <hr />
                                <h4 className="text-center mb-5">
                                    Commodities
                                </h4>
                                <div className="row d-flex align-items-center justify-content-center">
                                    {
                                        !data.commodities ? null :
                                            commodity.data.filter(item => {
                                                if (JSON.parse(data.commodities).includes(item.commodity_name)) {
                                                    return item
                                                }
                                            }).map(item => (
                                                <div className="col-12 col-md-4 col-lg-3 mb-5" data-aos="flip-left" key={item.id}>
                                                    <div className="card h-100">
                                                        <div className="card-header h-100">
                                                            <img id={item.id} className="img-fluid" src={item.commodity_image} alt={item.commodity_name} />
                                                        </div>
                                                        <div className="card-body h-50">
                                                            <h6 className="card-title">{item.commodity_name}</h6>
                                                        </div>
                                                        <div className="card-footer bg-transparent">
                                                            <NavLink className="btn btn-primary w-100 text-white" to={"/commodity/" + item.commodity_slug}>Visit page</NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </section>
                }
                {

                    !data.abstract ? null :
                        <section className="p-0 mb-5">
                            <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                                <hr />
                                <h4 className="text-center">Documents</h4>
                                <div className="row mt-3">
                                    {
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-3">
                                            <Document
                                                file={data.abstract}
                                                onLoadSuccess={onDocumentLoadSuccess}
                                            >
                                                <Page pageNumber={pageNumber} />
                                            </Document>
                                            <a target="_blank" href={data.abstract} className="mt-3 d-flex align-items-center justify-content-center">Download</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </section>
                }
            </>
        )
    }
}