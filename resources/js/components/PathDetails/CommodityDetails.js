import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../customHook';
import { AppContext } from '../../store';
import Error404 from '../Error404';

export default function CommodityDetails() {
    let { slug } = useParams();

    const { state, dispatch } = useContext(AppContext)

    const { data, loading } = useFetch({
        url: "/api/display-commodity-content/" + slug
    });

    const commodity = useFetch({
        url: "/api/commodities"
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
                {/* <section id="hero" className="d-flex justify-content-center align-items-center">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                        <h1 className="text-center">
                            {
                                data.commodity_name
                            }
                        </h1>
                    </div>
                </section>

                <section id="about" className="about">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">

                        {
                            <div dangerouslySetInnerHTML={{ __html: data.commodity_content }} />
                        }
                    </div>
                </section> */}

                <section id="about" className="about commodity">
                    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row">
                            <div className="col-12 col-lg-8 block-content">
                                <h1 className="commodity-title">
                                    {
                                        data.commodity_name
                                    }
                                </h1>
                                <div className="article-content">
                                    <div className="embed-wrap">
                                        <img className="img-fluid" src={data.commodity_image} alt={data.commodity_image} />
                                    </div>
                                    {
                                        <div className="commodity-content mt-5" dangerouslySetInnerHTML={{ __html: data.commodity_content }} />
                                    }
                                </div>
                            </div>
                            <div className="col-lg-4 section-right-panel animated-content d-none d-lg-block mt-3">
                                <div className="sidebar sticker">
                                    <h4 className="header-title">
                                        Other Commodities
                                    </h4>
                                    <div className="tabs-inner current" id="tabs-latest">
                                        <ul>
                                            {
                                                commodity.data.slice(0, 10).map(commodity => (
                                                    <li key={commodity.id}>
                                                        <p className="title-sidebar"><a href={commodity.commodity_slug}>{commodity.commodity_name}</a></p>
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
