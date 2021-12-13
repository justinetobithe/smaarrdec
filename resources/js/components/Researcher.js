import React, { useState, useEffect, useContext } from 'react'
import Pagination from 'react-js-pagination'
import { NavLink } from 'react-router-dom'
import { useFetch } from '../customHook'
import { AppContext } from '../store';


export default function Researcher() {


    const { state, dispatch } = useContext(AppContext);

    const [filterName, setFilterName] = useState(null);

    const [pagination, setPagination] = useState({
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1
    });

    const { data, loading } = useFetch({
        url: `/api/get-researchers?filterName=${filterName}&page=${pagination.activePage}`
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
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <section className="researchers">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Researchers</h2>
                        <p>List of Researchers</p>
                    </div>

                    <div className="row" data-aos="zoom-in" data-aos-delay="100">
                        <div className="search row align-items-center mb-5">
                            <div className="col-auto">
                                <label htmlFor="search" className="col-form-label">Search</label>
                            </div>
                            <div className="col-auto">
                                <input
                                    className="field form-control"
                                    aria-label="search"
                                    placeholder="Search researcher"
                                    type="text" name="search"
                                    onChange={e => setFilterName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        { 
                            isset(data.data) ? data.data.map((researchers, index) => (
                                <div className="col-12 col-md-4 col-lg-3 mb-5" key={researchers.id}>
                                    <div className="card h-100">
                                        <div className="card-header d-flex align-items-center justify-content-center mt-3 h-100">
                                            <img className="img-fluid rounded-circle" src={researchers.image} alt={researchers.name} ></img>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title text-center"><NavLink to={"/researcher/" + researchers.slug}>{researchers.name}</NavLink></h3>
                                            <h4 className="text-center">{researchers.occupation}</h4>
                                        </div>
                                        <div className="card-footer">
                                            <div className="text-center text-md-right pt-3 pt-md-0">
                                                <a className="t20" href={"tel:" + researchers.contact_no}><i className="bx bx-phone-call"></i></a>
                                                <a className="t20" href={"mailto:" + researchers.email}><i className="bx bx-mail-send"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                                : null
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
