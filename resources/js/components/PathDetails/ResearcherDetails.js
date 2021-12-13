import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../customHook';
import { AppContext } from '../../store';
import Error404 from '../Error404';


export default function ResearcherDetails() {

    const { state, dispatch } = useContext(AppContext);

    let { slug } = useParams();

    const { data, loading } = useFetch({
        url: "/api/display-researcher-content/" + slug
    });

    const researcherProjects = useFetch({
        url: `/api/get-researcher-projects/${data.name}`
    })

    const projects = useFetch({
        url: "/api/projects"
    })

    const degrees = useFetch({
        url: "/api/degrees"
    })

    const publicationData = useFetch({
        url: `/api/fetch-publications/${data.id}`
    })

    const academicDegreeData = useFetch({
        url: `/api/fetch-academic-degrees/${data.id}`
    })

    const organizationData = useFetch({
        url: `/api/fetch-membership/${data.id}`
    })

    // const projectData = useFetch({
    //     url: `/ api / researcher - projects / ${ data.email }`
    // })

    useEffect(() => {
        dispatch({ type: "FETCH_PUBLICATIONS", payload: publicationData.data })
    }, [publicationData.data])

    useEffect(() => {
        dispatch({ type: "FETCH_ACADEMIC_DEGREES", payload: academicDegreeData.data })
    }, [academicDegreeData.data])

    useEffect(() => {
        dispatch({ type: "FETCH_ORGANIZATIONS", payload: organizationData.data })
    }, [organizationData.data])

    useEffect(() => {
        dispatch({ type: "FETCH_PROJECTS", payload: researcherProjects.data })
    }, [researcherProjects.data])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
        return (
            <>
                <section id="researchers-profile" className="researchers-profile">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center">
                                <img className="researcher-image img-fluid rounded" src={data.image} alt={data.name}></img>
                            </div>
                            <div className="col-12 col-md-8 col-lg-9 col-xl-10">
                                <h1 className="researcher-name">{data.name}</h1>
                                <div className="researcher-contact-details">
                                    <p className="contact-number">Phone: <span className="">{data.contact_no}</span></p>
                                    <p className="email">Email: <span className="">{data.email}</span></p>
                                </div>
                                {!data.occupation ? null : <h5 className="researcher-occupation">{data.occupation}</h5>}
                            </div>
                            <div className="tabbable tabs-left mt-5">
                                {/* Nav tabs   */}
                                <ul className="col-12 col-md-3 nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="personal-overview-tab" data-bs-toggle="tab" data-bs-target="#personal-overview" type="button" role="tab" aria-controls="personal-overview" aria-selected="true"><i className="bx bxs-user"></i> Personal Overview </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="project-tab" data-bs-toggle="tab" data-bs-target="#project" type="button" role="tab" aria-controls="project" aria-selected="false"><i className="bx bxs-data"></i> Projects </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="research-details-tab" data-bs-toggle="tab" data-bs-target="#research-details" type="button" role="tab" aria-controls="research-details" aria-selected="false"><i className="bx bxs-book-reader"></i> Researcher Details </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="academic-degrees-tab" data-bs-toggle="tab" data-bs-target="#academic-degrees" type="button" role="tab" aria-controls="academic-degrees" aria-selected="false"><i className="bx bxs-graduation"></i> Academic Degrees </button>
                                    </li>
                                </ul>

                                <div className="col-12 col-md-9 tab-content">
                                    <div className="tab-pane active" id="personal-overview" role="tabpanel" aria-labelledby="personal-overview-tab">
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Biography
                                                    </h5>
                                                </div>
                                                {data.biography != null ? <div className="card-body" dangerouslySetInnerHTML={{ __html: data.biography }} /> : <div className="card-body"> <p>No data found</p> </div>}
                                            </div>
                                        </div>
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Organization
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        state.organizations.length ?
                                                            <ul className="organization-list">
                                                                {

                                                                    state.organizations.slice(0, 10).map(organizations => (
                                                                        <li key={organizations.id}>
                                                                            {"(" + organizations.position + ")"} {organizations.organization + ", "} {organizations.address}
                                                                        </li>
                                                                    ))

                                                                }

                                                            </ul>
                                                            : <p>No data found</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="project" role="tabpanel" aria-labelledby="project-tab">
                                        <div className="row-group">
                                            <div className="card projects">
                                                <div className="card-header">
                                                    <h5>
                                                        Projects
                                                    </h5>
                                                </div>
                                                <div className="card-body h-100">
                                                    {
                                                        state.projects.length ?
                                                            <ul className="projects-list">
                                                                {

                                                                    state.projects.slice(0, 10).map(projects => (
                                                                        <li key={projects.id} className="mb-4">
                                                                            <h5 className="project-title mb-0 fw-bold d-inline-block">{projects.project_title}</h5>
                                                                            <p className="researchers mb-0">{projects.project_leader != null ? projects.project_leader + ", " : ""}{JSON.parse(projects.project_members).join(", ")}</p>
                                                                            {projects.project_category_name != null ? <small className="project-category">{projects.project_category_name}</small> : ""}
                                                                            <a className="project-slug" href={"/project/" + projects.project_slug}>[More Information]</a>
                                                                        </li>
                                                                    ))

                                                                }
                                                            </ul>
                                                            : <p>No data found</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="research-details" role="tabpanel" aria-labelledby="research-details-tab">

                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Research Interests
                                                    </h5>
                                                </div>
                                                {data.research_interest != null ? <div className="card-body" dangerouslySetInnerHTML={{ __html: data.research_interest }} /> : <div className="card-body"> <p>No data found</p> </div>}
                                            </div>
                                        </div>



                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Publications
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        state.publications.length ?
                                                            <ul className="publication-list">
                                                                {


                                                                    state.publications.slice(0, 10).map(publications => (
                                                                        <li key={publications.id}>
                                                                            {publications.members != null ? JSON.parse(publications.members).join(", ") : ""} ({publications.year}) . {publications.title} <em>{publications.description}</em>. <a className="publication-url" href={publications.url} target="_blank">[More Information]</a>
                                                                        </li>
                                                                    ))

                                                                }
                                                            </ul>
                                                            : <p>No data found</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Area of Expertise
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    {data.expertise != null ? <p className="mb-0">{data.expertise != null ? JSON.parse(data.expertise).sort().join(", ") : ""}</p> : <p>No data found</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="tab-pane" id="academic-degrees" role="tabpanel" aria-labelledby="academic-degrees-tab">
                                        <div className="row-group">
                                            <div className="card academic-degrees">
                                                <div className="card-header">
                                                    <h5>
                                                        Academic Degrees
                                                    </h5>
                                                </div>
                                                <div className="card-body h-100">
                                                    {
                                                        state.academicDegrees.length ?
                                                            <ul className="academic-degree-list">
                                                                {
                                                                    state.academicDegrees.slice(0, 10).map((academicDegrees, index) => (
                                                                        <li key={index + 1}>
                                                                            {"(" + academicDegrees.year + ")"} {
                                                                                degrees.data.filter(item => {
                                                                                    if (JSON.stringify(academicDegrees.degree_id).includes(item.id)) {
                                                                                        return item;
                                                                                    }
                                                                                }).map(item => (
                                                                                    item.acronym + ", "
                                                                                ))

                                                                            } {academicDegrees.program + ", "} {academicDegrees.school_name + ", "} {academicDegrees.school_address}
                                                                        </li>
                                                                    ))

                                                                }
                                                            </ul>
                                                            : <p>No data found</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </>
        )
    }
}