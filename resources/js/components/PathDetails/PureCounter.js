import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useFetch } from '../../customHook'
import { AppContext } from '../../store'


export default function PureCounter() {

    const { data, loading } = useFetch({
        url: "/api/global-dashboard-data"
    });

    return (
        <>
            <section id="counts" className="counts section-bg">
                <div className="container">
                    <div className="row counters">
                        <div className="col-lg-3 col-6 text-center">
                            <span data-purecounter-start="0" data-purecounter-end={isset(data.projects) ? data.projects : 0} data-purecounter-duration="1" className="purecounter">{isset(data.projects) ? data.projects : 0}</span>
                            <NavLink className="fw-bold" to="/projects">Project</NavLink>
                        </div>
                        <div className="col-lg-3 col-6 text-center">
                            <span data-purecounter-start="0" data-purecounter-end={isset(data.events) ? data.events : 0} data-purecounter-duration="1" className="purecounter">{isset(data.events) ? data.events : 0}</span>
                            <NavLink className="fw-bold" to="/events">Events</NavLink>
                        </div>
                        <div className="col-lg-3 col-6 text-center">
                            <span data-purecounter-start="0" data-purecounter-end={isset(data.commodities) ? data.commodities : 0} data-purecounter-duration="1" className="purecounter">{isset(data.commodities) ? data.commodities : 0}</span>
                            <NavLink className="fw-bold" to="/commodities">Commodity</NavLink>
                        </div>
                        <div className="col-lg-3 col-6 text-center">
                            <span data-purecounter-start="0" data-purecounter-end={isset(data.agencies) ? data.agencies : 0} data-purecounter-duration="1" className="purecounter">{isset(data.agencies) ? data.agencies : 0}</span>
                            <NavLink className="fw-bold" to="/about-us/consortium-members-agencies">Consortium Agencies</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
