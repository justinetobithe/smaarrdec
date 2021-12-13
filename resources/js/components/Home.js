import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFetch } from "../customHook";
import { AppContext } from "../store";
import Agencies from "./Agencies";
import PureCounter from "./PathDetails/PureCounter";
import dateFormat from "dateformat";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/fall-animation/fall-animation.scss";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const BannerSlider = withAutoplay(AwesomeSlider);
const CommoditySlider = withAutoplay(AwesomeSlider);

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
    },
    text: {
        border: "1px solid #cccc",
    },
}));

export default function Home() {

    const { state, dispatch } = useContext(AppContext);

    const classes = useStyles();

    const { data, loading } = useFetch({
        url: "/api/global-dashboard-data",
    });

    const priorityCommodity = useFetch({
        url: "/api/priority-commodities",
    });

    const posts = useFetch({
        url: "/api/posts",
    });

    const slider = useFetch({
        url: "/api/display-slider",
    });

    const globalData = useFetch({
        url: "/api/global-dashboard-data"
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading]);

    return (
        <>
            <section id="banner" className="banner p-0">
                <BannerSlider
                    play={true}
                    cancelOnInteraction={false} // should stop playing on user interaction
                    interval={6000}
                    animation="foldOutAnimation"
                    cssModule={[CoreStyles, AnimationStyles]}
                >
                    {slider.data.map((slider) => (
                        <div data-src={slider.background_image} key={slider.id}>
                            {isset(slider.content) ? (
                                <div
                                    className="accordion-body"
                                    dangerouslySetInnerHTML={{
                                        __html: slider.content,
                                    }}
                                />
                            ) : null}
                        </div>
                    ))}
                </BannerSlider>
            </section>

            <section className="blogs">
                <div className="container" data-aos="fade-up">
                    <div
                        className="row"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        {posts.data.slice(0, 3).map((posts) => (
                            posts.status == 1 ?
                                <div
                                    className="col-lg-4 col-md-6 d-flex align-items-stretch mb-3"
                                    key={posts.id}
                                >
                                    <div className="card">
                                        <div className="card-header h-100">
                                            <img
                                                src={posts.featured_image != null ? posts.featured_image : "/storage/posts/no-image.png"}
                                                className="img-fluid"
                                                alt={posts.post_title}
                                            ></img>
                                        </div>
                                        <div className="card-body h-50">
                                            <h5 className="card-title text-center">
                                                <NavLink
                                                    to={"/post/" + posts.post_slug}
                                                >
                                                    {posts.post_title}
                                                </NavLink>
                                            </h5>
                                        </div>
                                        <div className="card-footer">
                                            <h4 className="text-uppercase text-center">
                                                {dateFormat(
                                                    posts.date_published,
                                                    "mmmm d, yyyy"
                                                )}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                : null
                        ))}
                    </div>
                </div>
            </section>

            <Agencies />

            <section id="about" className="about">
                <div className="container" data-aos="fade-up">
                    <div className="row">
                        <div className="col-lg-6 pt-4 pt-lg-0 mb-5 content">
                            <h3 className="mb-5">
                                Here are the list of some priority commodity
                                here in Southern Mindanao (Region XI) given by
                                the Department of Agriculture
                            </h3>

                            {priorityCommodity.data.map((commodity) => (
                                <Accordion
                                    className={classes.text}
                                    key={commodity.id}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>
                                            {commodity.commodity_name}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            dangerouslySetInnerHTML={{
                                                __html: commodity.commodity_content,
                                            }}
                                        ></Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                        <div
                            className="col-lg-6 mb-3"
                            data-aos="fade-left"
                            data-aos-delay="100"
                        >
                            <CommoditySlider
                                play={true}
                                cancelOnInteraction={false} // should stop playing on user interaction
                                interval={3000}
                            >
                                {priorityCommodity.data.map((commodity) => (
                                    <div
                                        key={commodity.id}
                                        data-src={commodity.commodity_image}
                                    />
                                ))}
                            </CommoditySlider>
                        </div>

                    </div>
                </div>
            </section>



            <section id="why-us" className="why-us">
                <div className="container" data-aos="fade-up">
                    <div className="row">
                        <div
                            className="col-lg-12 d-flex align-items-stretch"
                            data-aos="zoom-in"
                            data-aos-delay="100"
                        >
                            <div className="icon-boxes d-flex flex-column justify-content-center">
                                <div className="row">
                                    <div className="col-12 col-md-4 col-lg-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <i className="bx bx-line-chart"></i>
                                            <h4 className="text-uppercase">
                                                Innovate
                                            </h4>
                                            <p>
                                                SMAARRDEC introduce new methods,
                                                ideas, products, or technologies
                                                to level up the R&D projects for
                                                agriculture, aquatic and natural
                                                resources in Davao region.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <i className="bx bx-link"></i>
                                            <h4 className="text-uppercase">
                                                Engage
                                            </h4>
                                            <p>
                                                SMAARRDEC make sure that the R&D
                                                projects are presented to the
                                                stakeholders namely, farmers,
                                                processors and investors wherein
                                                collaboration and interaction
                                                takes place.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 d-flex align-items-stretch">
                                        <div className="icon-box mt-4 mt-xl-0">
                                            <i className="bx bxs-heart"></i>
                                            <h4 className="text-uppercase">
                                                Connect
                                            </h4>
                                            <p>
                                                SMAARRDEC ties up with the
                                                twenty-eight (28) Consortium
                                                Member Institutions to
                                                continuously have a well-managed
                                                and improved research outputs,
                                                developmental services and
                                                operation within its internal
                                                and external consortium network.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PureCounter />

        </>
    );
}
