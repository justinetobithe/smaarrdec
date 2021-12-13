import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Error404() {
    return (
        <>
            <section id="error-404-area" className="error-404-area">
                <div className="container" data-aos="zoom-in" data-aos-delay="100">
                    <div className="not-found">
                        <h2>OOPS!</h2>
                        <h3>Error 404 : Page Not Found</h3>
                        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                        <NavLink to="/" className="btn btn-primary"><i className="bx bxs-chevrons-left icon-arrow"></i><span className="label">Back
                            Home</span></NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}
