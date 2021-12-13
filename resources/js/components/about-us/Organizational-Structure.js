import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetch } from '../../customHook'
import { AppContext } from '../../store'

export default function Organizational_Structure() {

    const { state, dispatch } = useContext(AppContext)

    const { data, loading } = useFetch({
        url: "/api/system-options/get-essential-data"
    })

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>

            <section id="about" className="about">
                <div className="container position-relative organizational-structure" data-aos="zoom-in" data-aos-delay="100">
                    <div className="section-title">
                        <h2>Organizational Structure</h2>
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        {
                            isset(data.organizational_structure)
                                ? <img className="img-fluid" src={data.organizational_structure} alt="Organizational Structure" />
                                : ""
                        }
                    </div>
                </div>
            </section>


        </>
    )
}
