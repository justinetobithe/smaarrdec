
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useFetch } from "../customHook";
import { AppContext } from "../store";
import Agencies from "./Agencies";


export default function Contact() {

    const { state, dispatch } = useContext(AppContext)

    const { data, loading } = useFetch({
        url: "api/system-options/get-essential-data"
    });

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading])


    return (
        <>

            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="col-12 info">
                        <div className="row mt-5">
                            <div className="col-12 col-md-6 col-lg-4 mt-3">
                                <div className="card">
                                    <div className="d-block d-flex align-items-center justify-content-center">
                                        <span className="bi bi-geo-alt"></span>
                                    </div>
                                    <h4>Location</h4>
                                    <a href="#maps">{isset(data.company_address) ? data.company_address : null}</a>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mt-3">
                                <div className="card">
                                    <div className="d-block d-flex align-items-center justify-content-center">
                                        <span className="bi bi-phone"></span>
                                    </div>
                                    <h4>Call</h4>
                                    <a href="tel:082-321-2000">{isset(data.company_contact_number) ? data.company_contact_number : null}</a>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mt-3">
                                <div className="card">
                                    <div className="d-block d-flex align-items-center justify-content-center">
                                        <span className="bi bi-envelope"></span>
                                    </div>
                                    <h4>Email</h4>
                                    <a href={isset(data.company_email) ? "mailto: " + data.company_email : null}>{isset(data.company_email) ? data.company_email : null}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="maps" className="maps p-0">
                <div data-aos="fade-up">
                    {
                        isset(data.google_maps) ?
                            <iframe
                                src={data.google_maps}
                                frameBorder="0" allowFullScreen={true}>
                            </iframe>
                            : null}
                </div>
            </section>

            <Agencies />
        </>
    )
}