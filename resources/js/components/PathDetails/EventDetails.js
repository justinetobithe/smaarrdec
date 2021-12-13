import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../customHook';
import dateFormat from 'dateformat';
import { AppContext } from '../../store';
import moment from 'moment'
import Error404 from '../Error404';

export default function EventDetails() {
    let { slug } = useParams();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/display-event-content/" + slug
    });

    const upcomingEvents = useFetch({
        url: `/api/get-upcoming-events/${data.event_title}`
    })

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
        return (
            <>
                <section id="about" className="about event">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row">
                            <div className="col-12 col-lg-9 block-content">
                                <h1 className="event-title">
                                    {
                                        data.event_title
                                    }
                                </h1>
                                <div className="d-block">
                                    {data.event_description != null ? <h5 className="description-details">{data.event_description}</h5> : ""}
                                    <div className="event-details">
                                        <p className="timestamp-entry">Started at <span className="date-posted">{dateFormat(data.date_started, "mmmm d, yyyy, h:MM TT")}</span></p>
                                        <p className="timestamp-entry">Ended at <span className="date-posted">{dateFormat(data.date_ended, "mmmm d, yyyy, h:MM TT")}</span></p>
                                    </div>
                                </div>
                                <div className="article-content">
                                    {
                                        data.event_image != null ?
                                            <div className="embed-wrap">
                                                <img className="img-fluid" src={data.event_image} alt={data.event_image} />
                                            </div>
                                            : ""
                                    }
                                    {
                                        <div className="event-content mt-5" dangerouslySetInnerHTML={{ __html: data.event_content }} />

                                    }
                                </div>
                            </div>
                            <div className="col-lg-3 section-right-panel animated-content d-none d-lg-block mt-3">
                                <div className="sidebar sticker">
                                    <h4 className="header-title">
                                        Upcoming Events
                                    </h4>
                                    <div className="tabs-inner current" id="tabs-latest">
                                        <ul>
                                            {
                                                upcomingEvents.data.length ?
                                                    upcomingEvents.data.slice(0, 10).map(events => (
                                                        <li key={events.id}>
                                                            <p className="title-sidebar"><a href={events.events_slug}>{events.event_title}</a></p>
                                                            <p className="timestamp-entry"><time className="media-meta text-muted">{moment(events.date_started).fromNow()}</time></p>
                                                        </li>
                                                    ))
                                                    : <p>No event found</p>
                                            }

                                        </ul>
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