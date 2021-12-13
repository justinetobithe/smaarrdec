import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../customHook';
import dateFormat from 'dateformat';
import { AppContext } from '../../store';
import moment from "moment"
import Error404 from "../Error404"

export default function PostDetails() {

    let { slug } = useParams();

    const { state, dispatch } = useContext(AppContext)

    const { data, loading } = useFetch({
        url: "/api/display-post-content/" + slug
    });

    const otherPosts = useFetch({
        url: `/api/get-other-posts/${data.post_title}`
    })

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
        return (
            <>
                <section id="about" className="about post">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row">
                            <div className="col-12 col-lg-9 block-content">
                                <h1 className="post-title">
                                    {
                                        data.post_title
                                    }
                                </h1>
                                <div className="author-block">
                                    <h5 className="author-details"><span className="editor">{data.author_name}</span></h5>
                                    <div className="post-details">
                                        <p className="timestamp-entry">Posted at <span className="date-posted">{dateFormat(data.date_published, "mmmm d, yyyy, h:MM TT")}</span></p>
                                    </div>
                                </div>
                                <div className="article-content">
                                    <div className="embed-wrap">
                                        <img className="img-fluid" src={data.featured_image} alt={data.featured_image} />
                                    </div>
                                    {
                                        <div className="post-content mt-5" dangerouslySetInnerHTML={{ __html: data.post_content }} />

                                    }
                                </div>
                            </div>
                            <div className="col-lg-3 section-right-panel animated-content d-none d-lg-block mt-3">
                                <div className="sidebar sticker">
                                    <h4 className="header-title">
                                        Other Post
                                    </h4>
                                    <div className="tabs-inner current" id="tabs-latest">
                                        <ul>
                                            {
                                                otherPosts.data.slice(0, 10).map(posts => (
                                                    <li key={posts.id}>
                                                        <p className="title-sidebar"><a href={posts.post_slug}>{posts.post_title}</a></p>
                                                        <p className="timestamp-entry"><time className="media-meta text-muted">{moment(posts.date_published).fromNow()}</time></p>
                                                    </li>
                                                ))
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