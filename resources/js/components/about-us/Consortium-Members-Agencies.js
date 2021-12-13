import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store";
import { useFetch } from "../../customHook";
import Pagination from "react-js-pagination";
import { NavLink } from "react-router-dom";

export default function Consortium_Members_Agencies() {

    const { state, dispatch } = useContext(AppContext);

    const [filterName, setFilterName] = useState(null);

    const [pagination, setPagination] = useState({
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
    });

    const { data, loading } = useFetch({
        url: `/api/get-agencies?filterName=${filterName}&page=${pagination.activePage}`,
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        if (isset(data.data)) {
            setPagination({
                activePage: data.current_page,
                itemsCountPerPage: data.per_page,
                totalItemsCount: data.total,
            });
        }
    }, [data]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <> 
            <section id="about" className="about">
                <div
                    className="container position-relative consortium-members-agencies"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                >
                    <div className="section-title">
                        <h2>Consortium-Members Agencies</h2>
                        <p>
                            Today, the Consortium has 28 members. Its present
                            membership has grown not only to include research
                            and research-oriented organizations/institutions but
                            also catalytic institutions like Local Government
                            Units (LGUs), Trade associations and the like.
                        </p>
                    </div>

                    <div className="col-12 info">
                        <form id="search-worksheet" action="#" data-toggle="collapse" className="search form-inline mb-3"
                            method="get" _lpchecked="1">
                            <div className="mb-5">
                                <input
                                    className="field form-control"
                                    aria-label="search"
                                    placeholder="Search agency"
                                    type="text" name="search"
                                    onChange={e => setFilterName(e.target.value)
                                    }
                                />
                            </div>
                        </form>
                        <div className="row mt-5 mb-5">
                            {isset(data.data)
                                ? data.data.map((agency) =>
                                    agency.status == 1 ? (
                                        <div
                                            className="col-12 col-md-4 col-lg-3 d-flex align-items-stretch justify-content-center mb-5"
                                            data-aos="flip-left"
                                            key={agency.id}
                                        >
                                            <div className="card">
                                                <div className="card-header h-100">
                                                    <img
                                                        id={agency.id}
                                                        className="img-fluid"
                                                        src={agency.logo_url}
                                                        alt={
                                                            agency.agency_name
                                                        }
                                                    ></img>
                                                </div>
                                                <div className="card-body h-50">
                                                    <h5 className="card-title text-center">
                                                        {agency.agency_name +
                                                            " " +
                                                            "(" +
                                                            agency.acronym +
                                                            ")" +
                                                            " " +
                                                            agency.region}
                                                    </h5>
                                                </div>
                                                <div className="card-footer">
                                                    <a
                                                        href={agency.site_url}
                                                        target="_blank"
                                                        className="btn btn-primary w-100"
                                                    >
                                                        Visit Site
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                )
                                : null}
                        </div>
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            innerClass="pagination justify-content-center"
                            pageRangeDisplayed={10}
                            onChange={(pageNumber) =>
                                setPagination((state) => ({
                                    ...state,
                                    activePage: pageNumber,
                                }))
                            }
                            {...pagination}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
