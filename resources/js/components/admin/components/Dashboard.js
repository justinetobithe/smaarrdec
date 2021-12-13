import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetch } from '../../../customHook'
import { AppContext } from '../../../store'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import EventIcon from '@material-ui/icons/Event';
import BusinessIcon from '@material-ui/icons/Business';


export default function Dashboard() {


    const { state, dispatch } = useContext(AppContext);

    document.body.style = 'background: #f8f9fa;';

    const { data, loading } = useFetch({
        url: "/api/global-dashboard-data"
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                {state.user.role == 2 || state.user.role == 3 ?
                    <div className="row">

                        <div className="col-md-4 col-lg-4 col-xl-3">
                            <div className="card bg-yellow-orange text-white mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-7 inner">
                                            <h3>{isset(data.posts) ? data.posts : 0}</h3>
                                            <p>Posts</p>
                                        </div>
                                        <div className="col-5 icon">
                                            <InsertDriveFileIcon className="c-9b9d9e" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <NavLink className="small text-white stretched-link" to="/admin/post/view">View Details</NavLink>
                                    <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3">
                            <div className="card bg-pink-orange text-white mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-7 inner">
                                            <h3>{isset(data.agencies) ? data.agencies : 0}</h3>
                                            <p>Agencies</p>
                                        </div>
                                        <div className="col-5 icon">
                                            <BusinessIcon className="c-9b9d9e" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <NavLink className="small text-white stretched-link" to="/admin/agency/view">View Details</NavLink>
                                    <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3">
                            <div className="card bg-white-yellow text-white mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-7 inner">
                                            <h3>{isset(data.programs) ? data.programs : 0}</h3>
                                            <p>Programs</p>
                                        </div>
                                        <div className="col-5 icon">
                                            <DescriptionIcon className="c-9b9d9e" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <NavLink className="small text-white stretched-link" to="/admin/programs/view">View Details</NavLink>
                                    <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3">
                            <div className="card bg-white-green text-white mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-7 inner">
                                            <h3>{isset(data.projects) ? data.projects : 0}</h3>
                                            <p>Projects</p>
                                        </div>
                                        <div className="col-5 icon">
                                            <AccountTreeIcon className="c-9b9d9e" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <NavLink className="small text-white stretched-link" to="/admin/project/view">View Details</NavLink>
                                    <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3">
                            <div className="card bg-white-blue text-white mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-7 inner">
                                            <h3>{isset(data.commodities) ? data.commodities : 0}</h3>
                                            <p>Commodity</p>
                                        </div>
                                        <div className="col-5 icon">
                                            <IndeterminateCheckBoxIcon className="c-9b9d9e" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <NavLink className="small text-white stretched-link" to="/admin/commodity/view">View Details</NavLink>
                                    <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3">
                            <div className="card bg-white-violet text-white mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-7 inner">
                                            <h3>{isset(data.events) ? data.events : 0}</h3>
                                            <p>Events</p>
                                        </div>
                                        <div className="col-5 icon">
                                            <EventIcon className="c-9b9d9e" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <NavLink className="small text-white stretched-link" to="/admin/event/view">View Details</NavLink>
                                    <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    : state.user.role == 1 ?

                        <div className="row">

                            <div className="col-md-4 col-lg-4 col-xl-3">
                                <div className="card bg-white-yellow text-white mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-7 inner">
                                                <h3>{isset(data.programs) ? data.programs : 0}</h3>
                                                <p>Programs</p>
                                            </div>
                                            <div className="col-5 icon">
                                                <DescriptionIcon className="c-9b9d9e" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <NavLink className="small text-white stretched-link" to="/admin/programs/view">View Details</NavLink>
                                        <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xl-3">
                                <div className="card bg-white-green text-white mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-7 inner">
                                                <h3>{isset(data.projects) ? data.projects : 0}</h3>
                                                <p>Projects</p>
                                            </div>
                                            <div className="col-5 icon">
                                                <AccountTreeIcon className="c-9b9d9e" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <NavLink className="small text-white stretched-link" to="/admin/project/my-projects">View Details</NavLink>
                                        <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xl-3">
                                <div className="card bg-white-blue text-white mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-7 inner">
                                                <h3>{isset(data.commodities) ? data.commodities : 0}</h3>
                                                <p>Commodity</p>
                                            </div>
                                            <div className="col-5 icon">
                                                <IndeterminateCheckBoxIcon className="c-9b9d9e" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <NavLink className="small text-white stretched-link" to="/admin/commodity/view">View Details</NavLink>
                                        <div className="small text-white"><i className='bx bxs-chevron-right'></i></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        : null}
            </div>

            <div className="container">
                {/* <div className="row d-flex justify-content-center mt-200">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>
                </div> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Smart Wizard modal</h5> <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                            </div>
                            <div className="modal-body">
                                <ul className="nav nav-pills mb-3 d-flex justify-content-center" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        1. This is some placeholder content the Home tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        2. This is some placeholder content the Home tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                        3. This is some placeholder content the Home tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
