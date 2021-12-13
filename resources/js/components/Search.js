import React, { useContext, useEffect } from 'react'
import Select from 'react-select';
import { useFetch } from '../customHook'
import { AppContext } from '../store'

export default function Search() {
    const { state, dispatch } = useContext(AppContext);
    const { data, loading } = useFetch({
        url: "/api/post-categories"
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    return (
        <>

            <section id="hero" className="d-flex justify-content-center align-items-center">
                <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                    <h1>Search</h1>
                </div>
            </section>

            <section id="search" className="search">
                <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                    <div className="section-title">
                        <h2>Search</h2>
                        <p>Vestibulum dictum scelerisque mi, eget feugiat sem laoreet ut. Duis tempor ipsum at iaculis
                            eleifend.</p>
                    </div>
                    {/* <div className="intro row">
                        <div className="col-12">
                            <h5 className="text-uppercase text-center">Search</h5>
                            <p>Vestibulum dictum scelerisque mi, eget feugiat sem laoreet ut. Duis tempor ipsum at iaculis
                                eleifend.</p>
                            <form id="search-worksheet" action="#" data-toggle="collapse" className="search form-inline"
                                method="get" _lpchecked="1">

                                <input className="field form-control" aria-label="search"
                                    placeholder="Search topics or keywords" type="text" name="search" />
                            </form>
                        </div>
                    </div> */}
                    <div className="body row">
                        <div className="col-12">
                            <nav>
                                <div className="nav nav-tabs text-uppercase flex-row align-items-center justify-content-center justify-content-lg-between"
                                    id="nav-tab" role="tablist">

                                    <button className="nav-link" id="event-tab" data-bs-toggle="tab" data-bs-target="#event"
                                        type="button" role="tab" aria-controls="event" aria-selected="false">Event</button>
                                    <button className="nav-link" id="news-tab" data-bs-toggle="tab" data-bs-target="#news"
                                        type="button" role="tab" aria-controls="news" aria-selected="false">News</button>
                                    <button className="nav-link" id="Media-tab" data-bs-toggle="tab" data-bs-target="#Media"
                                        type="button" role="tab" aria-controls="Media" aria-selected="false">Media</button>
                                    <button className="nav-link" id="technology-tab" data-bs-toggle="tab"
                                        data-bs-target="#technology" type="button" role="tab" aria-controls="technology"
                                        aria-selected="false">Technology</button>
                                    <button className="nav-link" id="learning-oppotunity-tab" data-bs-toggle="tab"
                                        data-bs-target="#learning-oppotunity" type="button" role="tab"
                                        aria-controls="learning-oppotunity" aria-selected="false">Learning Opportunity</button>
                                    <button className="nav-link" id="webinars-tab" data-bs-toggle="tab"
                                        data-bs-target="#webinars" type="button" role="tab"
                                        aria-controls="webinars" aria-selected="false">Webinars</button>
                                    <button className="nav-link" id="seminars-tab" data-bs-toggle="tab"
                                        data-bs-target="#seminars" type="button" role="tab"
                                        aria-controls="seminars" aria-selected="false">Seminars</button>


                                    <div className="toggles">
                                        <button className="btn btn-list" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="List View"><i className="bx bx-menu"></i></button>
                                        <button className="btn btn-grid active" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="Grid View"><i className="bx bxs-grid-alt"></i></button>
                                    </div>
                                </div>
                            </nav>
                            <div className="tab-content mt-5" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="six-ps" role="tabpanel" aria-labelledby="six-ps-tab">
                                    <div className="row">
                                        <aside className="sidebar col-12 col-sm-4 mb-4">
                                            <div className="row">
                                                <form id="search-worksheet" action="#" data-toggle="collapse" className="search form-inline mb-3"
                                                    method="get" _lpchecked="1">
                                                    <input className="field form-control" aria-label="search"
                                                        placeholder="Search topics or keywords" type="text" name="search" />
                                                </form>
                                                <div className="result">
                                                    <ul className="list-unstyled list-inline">
                                                        <li className="list-inline-item">
                                                            <h5 className="text">15 Filtered results</h5>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <button type="button" className="btn btn-primary">
                                                                Event
                                                                <i className="bx bx-x-circle"></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <h4 className="title">Select a category</h4>
                                            <div className="block">
                                                <Select
                                                    options={data.map(postCategories => ({
                                                        value: postCategories.postSlug,
                                                        label: postCategories.postName
                                                    }))}
                                                    placeholder="Post Categories"
                                                />
                                            </div>
                                        </aside>
                                        <div className="items col-12 col-sm-8">
                                            <div className="row" data-aos="zoom-in" data-aos-delay="100">
                                                <div className="col-sm-12 col-md-12 col-lg-6 align-items-stretch">
                                                    <div className="card">
                                                        <div className="card-header col-12 p-0">
                                                            <img src="/img/no-image.png" className="img-fluid" alt="..."></img>
                                                        </div>
                                                        <div className="card-body col-12">
                                                            <h3><a href="#">Loren ipsum dolor sit amet</a></h3>
                                                            <p>Et architecto provident deleniti facere repellat nobis
                                                                iste. Id facere quia quae dolores dolorem
                                                                tempore.</p>
                                                            <a className="learn-more btn btn-primary" href="#">Learn More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-lg-6 align-items-stretch">
                                                    <div className="card">
                                                        <div className="card-header col-12 p-0">
                                                            <img src="/img/no-image.png" className="img-fluid" alt="..."></img>
                                                        </div>
                                                        <div className="card-body col-12">
                                                            <h3><a href="#">Loren ipsum dolor sit amet</a></h3>
                                                            <p>Et architecto provident deleniti facere repellat nobis
                                                                iste. Id facere quia quae dolores dolorem
                                                                tempore.</p>
                                                            <a className="learn-more btn btn-primary" href="#">Learn More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-lg-6 align-items-stretch">
                                                    <div className="card">
                                                        <div className="card-header col-12 p-0">
                                                            <img src="/img/no-image.png" className="img-fluid" alt="..."></img>
                                                        </div>
                                                        <div className="card-body col-12">
                                                            <h3><a href="#">Loren ipsum dolor sit amet</a></h3>
                                                            <p>Et architecto provident deleniti facere repellat nobis
                                                                iste. Id facere quia quae dolores dolorem
                                                                tempore.</p>
                                                            <a className="learn-more btn btn-primary" href="#">Learn More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-lg-6 align-items-stretch">
                                                    <div className="card">
                                                        <div className="card-header col-12 p-0">
                                                            <img src="/img/no-image.png" className="img-fluid" alt="..."></img>
                                                        </div>
                                                        <div className="card-body col-12">
                                                            <h3><a href="#">Loren ipsum dolor sit amet</a></h3>
                                                            <p>Et architecto provident deleniti facere repellat nobis
                                                                iste. Id facere quia quae dolores dolorem
                                                                tempore.</p>
                                                            <a className="learn-more btn btn-primary" href="#">Learn More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <nav>
                                                <ul className="pagination">
                                                    <li className="page-item disabled">
                                                        <a className="page-link" href="#" tabIndex="-1"
                                                            aria-disabled="true">Previous</a>
                                                    </li>
                                                    <li className="page-item active disabled"><a className="page-link" href="#">1</a>
                                                    </li>
                                                    <li className="page-item" aria-current="page">
                                                        <a className="page-link" href="#">2</a>
                                                    </li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="event" role="tabpanel" aria-labelledby="event-tab">
                                    Event</div>
                                <div className="tab-pane fade" id="news" role="tabpanel" aria-labelledby="news-tab">
                                    News</div>
                                <div className="tab-pane fade" id="media" role="tabpanel" aria-labelledby="media-tab">
                                    Media</div>
                                <div className="tab-pane fade" id="technology" role="tabpanel" aria-labelledby="technology-tab">
                                    Technology</div>
                                <div className="tab-pane fade" id="learning-oppotunity" role="tabpanel"
                                    aria-labelledby="learning-oppotunity-tab">
                                    Learning Oppotunity</div>
                                <div className="tab-pane fade" id="project" role="tabpanel" aria-labelledby="project-tab">
                                    Project</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
