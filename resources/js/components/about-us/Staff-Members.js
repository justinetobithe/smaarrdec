import React, { useContext, useEffect } from 'react'
import { useFetch } from '../../customHook'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../store';

export default function Staff_Members() {

    const { state, dispatch } = useContext(AppContext)

    const { data, loading } = useFetch({
        url: "/api/staff/science-research-assistant"
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <section id="secretariat" className="secretariat">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Secretariat</h2>
                    </div>
                    <div className="row" data-aos="zoom-in" data-aos-delay="100">
                        {
                            data.map((staffs) => (
                                <div className="col-12 col-md-4 col-lg-4 d-flex align-items-stretch mb-5" key={staffs.id}>
                                    <div className="card">
                                        <div className="card-header">
                                            <img src={staffs.image_file} className="img-fluid" alt={staffs.fname + " " + staffs.lname} />
                                        </div>
                                        <div className="card-body">
                                            <h4>{staffs.fname + " " + staffs.lname}</h4>
                                            <p>{staffs.position}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>


        </>
    )
}
