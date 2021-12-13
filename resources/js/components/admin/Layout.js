import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AppContext } from '../../store'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import EventIcon from '@material-ui/icons/Event';
import BusinessIcon from '@material-ui/icons/Business';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TableChartIcon from '@material-ui/icons/TableChart';
import GroupIcon from '@material-ui/icons/Group';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Badge from '@material-ui/core/Badge';
import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';
import { useFetch, useHttpRequest } from '../../customHook'
import moment from "moment"

export default function Layout({ children }) {

    const { state, dispatch } = useContext(AppContext);
    let history = useHistory();



    const handleLogout = (e) => {
        e.preventDefault();
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios.post('/logout').then(() => {
                dispatch({
                    type: "AUTHENTICATION",
                    // payload: { isLoggedIn: false, user: {} },
                    payload: {},

                });

                history.push("/admin/login");
            });
        });
    };

    const adminsNotification = useFetch({
        url: "/api/admins-notification"
    });

    const researchersNotification = useFetch({
        url: `/api/get-researchers-notification/${state.user.email}`
    });


    useEffect(() => {
        dispatch({ type: "SET_ADMIN_NOTIFICATIONS", payload: adminsNotification.data })
    }, [adminsNotification.data]);

    useEffect(() => {
        dispatch({ type: "SET_RESEARCHER_NOTIFICATIONS", payload: researchersNotification.data })
    }, [researchersNotification.data]);

    useEffect(() => {
        // console.log("LISTENING...")
        Echo.channel("my-channel").listen(".my-event", ({ data }) => {
            dispatch({ type: "ADD_ADMIN_NOTIFICATIONS", payload: data })
            // setReceivedNotification(data);

            // console.log("DATA: ", data);
        });
    }, []);

    useEffect(() => {
        Echo.channel("researcher-channel").listen(".researcher-event", ({ data }) => {
            dispatch({ type: "ADD_RESEARCHER_NOTIFICATIONS", payload: data })
        });
    }, []);


    const [markAsReadAdminResponse, handleAdminMarkAsRead] = useHttpRequest((id, data) => ({
        url: `/api/admins-notification/${id}`,
        method: "POST",
        data,
        header: { "Content-type": "application/json" },
    }));

    const [markAsReadResearcherResponse, handleResearcherMarkAsRead] = useHttpRequest((id, data) => ({
        url: `/api/researchers-notification/${id}`,
        method: "POST",
        data,
        header: { "Content-type": "application/json" },
    }));

    useEffect(() => {
        if (markAsReadAdminResponse.error.length || markAsReadAdminResponse.data !== null) {
            if (markAsReadAdminResponse.data.status) {
                dispatch({
                    type: "UPDATE_ADMIN_NOTIFICATIONS",
                    payload: markAsReadAdminResponse.data.payload,
                });
            }
        }
    }, [markAsReadAdminResponse])

    useEffect(() => {
        if (markAsReadResearcherResponse.error.length || markAsReadResearcherResponse.data !== null) {
            if (markAsReadResearcherResponse.data.status) {
                dispatch({
                    type: "UPDATE_RESEARCHER_NOTIFICATIONS",
                    payload: markAsReadResearcherResponse.data.payload,
                });
            }
        }
    }, [markAsReadResearcherResponse])


    const adminMarkAsRead = (id, url) => {
        let data = new FormData();
        data.append("_method", "PUT");
        data.append("read_type", 1);
        handleAdminMarkAsRead(id, data);
        // GO TO THE PAGE
        history.push(url)
    }

    const researcherMarkAsRead = (id, url) => {
        let data = new FormData();
        data.append("_method", "PUT");
        data.append("read_type", 1);
        handleResearcherMarkAsRead(id, data);
        // GO TO THE PAGE
        history.push(url)

    }


    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <NavLink className="navbar-brand ps-3" to="/admin/dashboard/">
                    <img className="img-fluid" src="/img/logo-white-text.png" alt="Logo"></img>
                </NavLink>
                <Button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 bg-transparent border-0" id="sidebarToggle" href="#!"><MenuIcon className="c-9b9d9e" /></Button>
                <ul className="navbar-nav me-0 me-md-3 my-2 my-md-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/" >Visit site</a>
                    </li>
                </ul>
                <div className="bottom-nav ms-auto me-0 me-md-3 my-2 my-md-0">
                    <ul className="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
                        {
                            state.user.role == 1 ?
                                <li className="nav-item dropdown notifications d-flex align-items-center justify-content-center">
                                    <IconButton className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false" >
                                        <Badge badgeContent={state.researchersNotifications.filter(item => item.read_type == 0).length} color="primary">
                                            <NotificationsIcon className="c-9b9d9e" />
                                        </Badge>
                                    </IconButton>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ maxHeight: "350px", overflowY: "scroll" }}>
                                        <li className="dropdown-menu-header">
                                            <h4 className="text-uppercase dropdown-header m-0"><span className="grey">Notifications</span></h4>
                                        </li>
                                        <li>
                                            <Divider />
                                        </li>
                                        <li className="scrollable-container media-list w-100 ps">
                                            {

                                                state.researchersNotifications.length ?
                                                    state.researchersNotifications.map((item) => (
                                                        <div className="media" key={item.id} onClick={() => researcherMarkAsRead(item.id, item.url)} style={{ cursor: "pointer" }}>
                                                            <div className="media-body row">
                                                                <div className="notification-icon col-2">
                                                                    {item.request_type == 1 ? <Badge className="m-0 bg-primary"><PermDeviceInformationIcon /></Badge> : item.request_type == 2 ? <Badge className="m-0 bg-danger"><CheckBoxIcon /></Badge> : null}
                                                                </div>
                                                                <div className="col-10">
                                                                    <h6 className="media-heading" style={{
                                                                        fontWeight: item.read_type == 0 ? "bold" : "normal"
                                                                    }}>{item.notification_title}</h6>
                                                                    <p className="notification-text font-small-3 text-muted" style={{
                                                                        fontWeight: item.read_type == 0 ? "bold" : "normal"
                                                                    }}>{item.notification_text}</p>
                                                                    <small className="notification-text font-small-3 text-muted"
                                                                        style={{
                                                                            fontWeight: item.read_type == 0 ? "bold" : "normal"
                                                                        }}><time className="media-meta text-muted">{moment(item.created_at).fromNow()}</time></small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )) : <p className="text-muted text-center" href="#">No notifications</p>
                                            }

                                        </li>
                                        <li>
                                            <Divider />
                                        </li>
                                        <li><a className="dropdown-item text-muted text-center" href="#">Read all notifications</a></li>
                                    </ul>
                                </li>

                                : state.user.role == 2 || state.user.role == 3 ?
                                    <li className="nav-item dropdown notifications d-flex align-items-center justify-content-center">
                                        <IconButton className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" >
                                            <Badge badgeContent={state.adminsNotifications.filter(item => item.read_type == 0).length} color="primary">
                                                <NotificationsIcon className="c-9b9d9e" />
                                            </Badge>
                                        </IconButton>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ maxHeight: "350px", overflowY: "scroll" }}>
                                            <li className="dropdown-menu-header">
                                                <h4 className="text-uppercase dropdown-header m-0"><span className="grey">Notifications</span></h4>
                                            </li>
                                            <li>
                                                <Divider />
                                            </li>
                                            <li className="scrollable-container media-list w-100 ps">
                                                {

                                                    state.adminsNotifications.length ?
                                                        state.adminsNotifications.map((item) => (
                                                            <div className="media" key={item.id} onClick={() => adminMarkAsRead(item.id, item.url)} style={{ cursor: "pointer" }}>
                                                                <div className="media-body row">
                                                                    <div className="notification-icon col-2">
                                                                        {item.request_type == 1 ? <Badge className="m-0 bg-primary"><PersonAddIcon /></Badge> : item.request_type == 2 ? <Badge className="m-0 bg-danger"><HourglassEmptyIcon /></Badge> : null}
                                                                    </div>
                                                                    <div className="col-10">
                                                                        <h6 className="media-heading" style={{
                                                                            fontWeight: item.read_type == 0 ? "bold" : "normal"
                                                                        }}>{item.notification_title}</h6>
                                                                        <p className="notification-text font-small-3 text-muted" style={{
                                                                            fontWeight: item.read_type == 0 ? "bold" : "normal"
                                                                        }}>{item.notification_text}</p>
                                                                        <small className="notification-text font-small-3 text-muted" style={{
                                                                            fontWeight: item.read_type == 0 ? "bold" : "normal"
                                                                        }}><time className="media-meta text-muted">{moment(item.created_at).fromNow()}</time></small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )) : <p className="text-muted text-center" href="#">No notifications</p>
                                                }

                                            </li>
                                            <li>
                                                <Divider />
                                            </li>
                                            <li><a className="dropdown-item text-muted text-center" href="#">Read all notifications</a></li>
                                        </ul>
                                    </li>
                                    : null
                        }
                        <li className="nav-item dropdown name d-flex align-items-center justify-content-center">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false"><PersonIcon className="c-9b9d9e" /> {state.user.name}</a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                {state.user.role == 2 || state.user.role == 3 ?
                                    <li><NavLink className="dropdown-item" to="/admin/general-settings">Settings</NavLink></li>
                                    : null
                                }
                                <li><NavLink className="dropdown-item" to="/admin/user/profile">Users Profile</NavLink></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div >
            </nav >

            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading"></div>
                                <NavLink className="nav-link active" to="/admin/dashboard">
                                    <div className="sb-nav-link-icon"><DashboardIcon className="c-9b9d9e" /></div>
                                    Dashboard
                                </NavLink>
                                <div className="sb-sidenav-menu-heading">CONTENT</div>

                                {state.user.role == 2 || state.user.role == 3 ?
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePost"
                                        aria-expanded="false" aria-controls="collapsePost">
                                        <div className="sb-nav-link-icon"><InsertDriveFileIcon className="c-9b9d9e" /></div>
                                        Post
                                        <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                    </a>
                                    : null}
                                <div className="collapse" id="collapsePost" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink className="nav-link" to="/admin/post/view">View Post</NavLink>
                                        <NavLink className="nav-link" to="/admin/post/add">Add Post</NavLink>
                                        <NavLink className="nav-link" to="/admin/post/category/view">Category</NavLink>
                                    </nav>
                                </div>

                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseProgram"
                                    aria-expanded="false" aria-controls="collapseProgram">
                                    <div className="sb-nav-link-icon"><DescriptionIcon className="c-9b9d9e" /></div>
                                    Programs
                                    <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                </a>
                                <div className="collapse" id="collapseProgram" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        {state.user.role == 2 || state.user.role == 3 ?
                                            <NavLink className="nav-link" to="/admin/programs/view">List of Programs</NavLink>
                                            : null
                                        }
                                        <NavLink className="nav-link" to="/admin/programs/my-programs">My Programs</NavLink>
                                        <NavLink className="nav-link" to="/admin/programs/add">Add Program</NavLink>
                                    </nav>
                                </div>

                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseProject" aria-expanded="false" aria-controls="collapseProject">
                                    <div className="sb-nav-link-icon"><AccountTreeIcon className="c-9b9d9e" /></div>
                                    Project
                                    <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                </a>
                                <div className="collapse" id="collapseProject" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        {state.user.role == 2 || state.user.role == 3 ?
                                            <NavLink className="nav-link" to="/admin/project/view">List of Project</NavLink>
                                            : null
                                        }
                                        <NavLink className="nav-link" to="/admin/project/my-projects">My Project</NavLink>
                                        <NavLink className="nav-link" to="/admin/project/add">Add Project</NavLink>
                                        {/* <NavLink className="nav-link" to="/admin/project/delegate">Delegate Project</NavLink> */}
                                        {
                                            state.user.role == 1 ?
                                                <NavLink className="nav-link" to="/admin/request-project/view">Project Request</NavLink>
                                                : null}
                                        {state.user.role == 2 || state.user.role == 3 ?
                                            <>
                                                <NavLink className="nav-link" to="/admin/project/generate-report/view">Generate Report</NavLink>
                                                <NavLink className="nav-link" to="/admin/request-project/researcher/view">Project Request</NavLink>
                                                <NavLink className="nav-link" to="/admin/project/category/view">Category</NavLink>
                                            </>
                                            : null
                                        }
                                    </nav>
                                </div>


                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseCommodity" aria-expanded="false" aria-controls="collapseCommodity">
                                    <div className="sb-nav-link-icon"><IndeterminateCheckBoxIcon className="c-9b9d9e" /></div>
                                    Commodity
                                    <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                </a>
                                <div className="collapse" id="collapseCommodity" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink className="nav-link" to="/admin/commodity/view">View Commodity</NavLink>
                                        {state.user.role == 2 || state.user.role == 3 ?
                                            <NavLink className="nav-link" to="/admin/commodity/add">Add Commodity</NavLink>
                                            : null}
                                    </nav>
                                </div>

                                {state.user.role == 2 || state.user.role == 3 ?
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                        data-bs-target="#collapseEvent" aria-expanded="false" aria-controls="collapseEvent">
                                        <div className="sb-nav-link-icon"><EventIcon className="c-9b9d9e" /></div>
                                        Events
                                        <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                    </a> : null
                                }
                                <div className="collapse" id="collapseEvent" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink className="nav-link" to="/admin/event/view">View Events</NavLink>
                                        <NavLink className="nav-link" to="/admin/event/add">Add Events</NavLink>
                                    </nav>
                                </div>

                                <div className="sb-sidenav-menu-heading">CONSORTIUM AGENCIES</div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseAgency" aria-expanded="false" aria-controls="collapseAgency">
                                    <div className="sb-nav-link-icon"><BusinessIcon className="c-9b9d9e" /></div>
                                    Agencies
                                    <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                </a>
                                <div className="collapse" id="collapseAgency" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink className="nav-link" to="/admin/agency/view">View Agencies</NavLink>
                                        {state.user.role == 2 || state.user.role == 3 ?
                                            <NavLink className="nav-link" to="/admin/agency/add">Add Agency</NavLink>
                                            : null
                                        }
                                    </nav>
                                </div>
                                <div className="sb-sidenav-menu-heading">USER MANAGEMENT</div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseResearcher"
                                    aria-expanded="false" aria-controls="collapseResearcher">
                                    <div className="sb-nav-link-icon"><AssignmentIndIcon className="c-9b9d9e" /></div>
                                    Researcher
                                    <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                </a>
                                <div className="collapse" id="collapseResearcher" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        {state.user.role == 2 || state.user.role == 3 ?
                                            <NavLink className="nav-link" to="/admin/researcher/view">View Researcher</NavLink>
                                            : null
                                        }
                                        {/* <NavLink className="nav-link" to="/admin/researcher/add">Add Researcher</NavLink> */}

                                        <NavLink className="nav-link" to="/admin/researcher/my-profile">My Profile</NavLink>

                                        {/* <NavLink className="nav-link" to="/admin/researcher/edit">Edit Profile</NavLink> */}

                                    </nav>
                                </div>
                                {state.user.role == 2 || state.user.role == 3 ?
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseStaff"
                                        aria-expanded="false" aria-controls="collapseStaff">
                                        <div className="sb-nav-link-icon"><SupervisorAccountIcon className="c-9b9d9e" /></div>
                                        Staff
                                        <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                    </a> : null
                                }
                                <div className="collapse" id="collapseStaff" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink className="nav-link" to="/admin/organizational-chart/view">Organizational Chart</NavLink>
                                        <NavLink className="nav-link" to="/admin/staff/view">View Staff</NavLink>
                                        <NavLink className="nav-link" to="/admin/staff/add">Add Staff</NavLink>
                                    </nav>
                                </div>
                                <div className="collapse" id="collapseOrganizationalChart" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseUser"
                                    aria-expanded="false" aria-controls="collapseUser">
                                    <div className="sb-nav-link-icon"><GroupIcon className="c-9b9d9e" /></div>
                                    User Account
                                    <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                </a>
                                <div className="collapse" id="collapseUser" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        {state.user.role == 2 || state.user.role == 3 ?
                                            <NavLink className="nav-link" to="/admin/user/view">View Users</NavLink>
                                            : null
                                        }
                                        <NavLink className="nav-link" to="/admin/user/profile">Profile</NavLink>
                                    </nav>
                                </div>

                                {state.user.role == 3 ?
                                    <>
                                        <div className="sb-sidenav-menu-heading">General Settings</div>
                                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                            data-bs-target="#collapseAppearance" aria-expanded="false" aria-controls="collapseAppearance">
                                            <div className="sb-nav-link-icon"><DesktopWindowsIcon className="c-9b9d9e" /></div>
                                            Appearance
                                            <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                        </a>
                                        <div className="collapse" id="collapseAppearance" aria-labelledby="headingOne"
                                            data-bs-parent="#sidenavAccordion">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <NavLink className="nav-link" to="/admin/page/about-us">About Us</NavLink>
                                                <NavLink className="nav-link" to="/admin/page/vision-mission-and-goal">VMG</NavLink>
                                                <NavLink className="nav-link" to="/admin/slider-settings/view">Slider</NavLink>

                                            </nav>
                                        </div>
                                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                            data-bs-target="#collapseGlobal" aria-expanded="false" aria-controls="collapseGlobal">
                                            <div className="sb-nav-link-icon"><SettingsIcon className="c-9b9d9e" /></div>
                                            Global
                                            <div className="sb-sidenav-collapse-arrow"><KeyboardArrowDownIcon className="c-9b9d9e" /></div>
                                        </a>
                                        <div className="collapse" id="collapseGlobal" aria-labelledby="headingOne"
                                            data-bs-parent="#sidenavAccordion">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <NavLink className="nav-link" to="/admin/general-settings">General Settings</NavLink>
                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }
                            </div>
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main className="h-100">
                        {children}
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; SMAARRDEC 2021</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
