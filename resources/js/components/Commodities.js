import React, { useState, useEffect, useContext } from 'react'
import Pagination from 'react-js-pagination'
import { NavLink } from 'react-router-dom'
import { useFetch } from '../customHook'
import { AppContext } from '../store'





export default function Commodities() {

    const { state, dispatch } = useContext(AppContext);

    const [filterName, setFilterName] = useState(null);

    const [pagination, setPagination] = useState({
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1
    });


    const { data, loading } = useFetch({
        url: `/api/get-commodities?filterName=${filterName}&page=${pagination.activePage}`
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
            <section id="commodity" className="commodity">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Commodity</h2>
                        <p>Here are the list of some priority commodity here in Southern Mindanao (Region XI) given by the Department of Agriculture</p>
                    </div>
                    <div className="col-12 info">
                        <div className="search row align-items-center mb-5">
                            <div className="col-auto">
                                <label htmlFor="search" className="col-form-label">Search</label>
                            </div>
                            <div className="col-auto">
                                <input
                                    className="field form-control"
                                    aria-label="search"
                                    placeholder="Search commodity"
                                    type="text" name="search"
                                    onChange={e => setFilterName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            {
                                isset(data.data) ? data.data.map(commodity =>
                                    commodity.status == 1 ? (
                                        <div className="col-12 col-md-4 col-lg-3 mb-5" data-aos="flip-left" key={commodity.id}>
                                            <div className="card h-100">
                                                <div className="card-header h-100">
                                                    <img id={commodity.id} className="img-fluid" src={commodity.commodity_image} alt={commodity.commodity_name} ></img>
                                                </div>
                                                <div className="card-body h-50">
                                                    <h6 className="card-title">{commodity.commodity_name}</h6>
                                                </div>
                                                <div className="card-footer bg-transparent">
                                                    <NavLink to={"/commodity/" + commodity.commodity_slug} className="btn btn-primary w-100">Visit page</NavLink>
                                                </div>

                                            </div>
                                        </div >
                                    ) : null
                                )
                                    : null}
                        </div>
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            innerClass="pagination justify-content-center"
                            pageRangeDisplayed={6}
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
