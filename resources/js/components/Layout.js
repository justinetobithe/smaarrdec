import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AppContext } from "@/store";
import { useFetch } from "../customHook";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Program = ({ programId, program }) => {
    return (
        <li className="program-list"><NavLink to={"/programs/" + program.program_slug} maxLength="20">{program.program_name}</NavLink></li>
    )
}


export default function Layout({ children }) {

    const { state, dispatch } = useContext(AppContext);

    const systemOptions = useFetch({
        url: "/api/system-options/get-essential-data",
    });


    return (
        <>
            <header id="header" className="header">
                <div className="top-header top-header-style-four">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-8 col-md-8">
                                <ul className="top-header-contact-info">
                                    <li>Call: <a href="tel:082-321-2000">{isset(systemOptions.data.company_contact_number) ? systemOptions.data.company_contact_number : null}</a>
                                    </li>
                                </ul>
                                <div className="top-header-social">
                                    <span>Follow us:</span>
                                    <ul className="social-link">
                                        <li>
                                            <a className="d-block facebook" target="_blank" href="https://www.facebook.com/SMAARRDEC/"> <i className="bx bxl-facebook"></i> </a>
                                        </li>
                                        <li>
                                            <a className="d-block instagram" target="_blank" href="https://www.instagram.com/smaarrdec/"> <i className="bx bxl-instagram"></i> </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <ul className="top-header-login-register">
                                    <li><a href="/admin/login">
                                        <i className='bx bxs-log-in-circle'></i> Login
                                    </a></li>
                                    <li><a href="/admin/register"><i className="bx bx-user-plus"></i> Register</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-header">
                    <div className="container d-flex align-items-center">
                        <NavLink className="logo me-auto" to="/">
                            {isset(systemOptions.data.website_logo) ?
                                <img className="img-fluid" src={systemOptions.data.website_logo} alt="Logo" />
                                : null}
                        </NavLink>

                        <nav id="navbar" className="navbar order-last order-lg-0">
                            <ul className="float-right">
                                <li><NavLink exact to="/">Home</NavLink></li>
                                <li className="dropdown"><a href="#"><span>About Us</span></a>
                                    <ul>
                                        <li><NavLink to="/about-us/history">History</NavLink></li>
                                        <li><NavLink to="/about-us/vision-mision-and-goal">Vision, Mision, and Goal</NavLink></li>
                                        <li><NavLink to="/about-us/organizational-structure">Organizational Structure</NavLink></li>
                                        <li><NavLink to="/about-us/consortium-members-agencies">Consortium-Members Agencies</NavLink></li>
                                        <li><NavLink to="/commodities">Commodity</NavLink></li>
                                        <li><NavLink to="/about-us/list-of-staff-members">Secretariat</NavLink></li>
                                    </ul>
                                </li>
                                <li><NavLink to="/events">Event</NavLink></li>
                                <li><NavLink to="/programs">Programs</NavLink></li>
                                <li><NavLink to="/projects">Projects</NavLink></li>
                                <li><NavLink to="/researchers">Researcher</NavLink></li>


                                <li><NavLink to="/contact">Contact</NavLink></li>
                                <li className="header-cta"><a href="tel:082-321-2000">{isset(systemOptions.data.company_contact_number) ? systemOptions.data.company_contact_number : null}</a></li>
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle"></i>
                        </nav>

                    </div>
                </div>
            </header>

            <MessengerCustomerChat
                pageId="104826098636329"
                appId="638355813986376"
            />

            {children}



            <footer id="footer">
                <div className="footer-top">
                    <div className="container" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h4>Contact</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i><NavLink to="/contact/#maps">{isset(systemOptions.data.company_address) ? systemOptions.data.company_address : null}</NavLink></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="tel:082-321-2000">{isset(systemOptions.data.company_contact_number) ? systemOptions.data.company_contact_number : null}</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href={isset(systemOptions.data.company_email) ? "mailto: " + systemOptions.data.company_email : null}>{isset(systemOptions.data.company_email) ? systemOptions.data.company_email : null}</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Links</h4>
                                <ul>
                                    <li><NavLink exact to="/">Home</NavLink></li>
                                    <li><NavLink to="/events">Event</NavLink></li>
                                    <li><NavLink to="/programs">Programs</NavLink></li>
                                    <li><NavLink to="/projects">Projects</NavLink></li>
                                    <li><NavLink to="/researchers">Researcher</NavLink></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>About Us</h4>
                                <ul>
                                    <li><NavLink to="/about-us/history">History</NavLink></li>
                                    <li><NavLink to="/about-us/vision-mision-and-goal">Vision, Mision, and Goal</NavLink></li>
                                    <li><NavLink to="/about-us/organizational-structure">Organizational Structure</NavLink></li>
                                    <li><NavLink to="/about-us/consortium-members-agencies">Consortium-Members Agencies</NavLink></li>
                                    <li><NavLink to="/commodities">Commodity</NavLink></li>
                                    <li><NavLink to="/about-us/list-of-staff-members">Secretariat</NavLink></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <h4>Social</h4>
                                <p>Connect with us through our social media platforms: </p>
                                <div className="social-links text-center text-md-right pt-3 pt-md-0">
                                    <a className="facebook" target="_blank" href="https://www.facebook.com/smaarrdec1987"><i className="bx bxl-facebook"></i></a>
                                    <a className="instagram" target="_blank" href="https://www.instagram.com/smaarrdec/"><i className="bx bxl-instagram"></i></a>
                                </div>
                                <div className="d-flex mt-3 align-items-center justify-content-center">
                                    <a href="#">
                                        <img src="https://s01.flagcounter.com/countxl/Pf6p/bg_FFFFFF/txt_000000/border_CCC8C8/columns_2/maxflags_10/viewers_0/labels_1/pageviews_1/flags_0/percent_0/"
                                            alt="Flag Counter"
                                            border="0"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container py-4">
                    <div className="text-center d-flex align-items-center justify-content-center">
                        <div className="copyright">
                            {isset(systemOptions.data.website_footer_copyright_text) ? systemOptions.data.website_footer_copyright_text : null}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );

}