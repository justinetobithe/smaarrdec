import React, { useEffect, useReducer } from "react";
import reducer from "@/reducer"
import { AppContext, initialState } from "@/store";
import { BrowserRouter as Router, Switch, Route, useParams, useHistory } from "react-router-dom";
import GuestRoute from "@/components/GuestRoute";
import { LastLocationProvider } from "react-router-last-location"

import Home from "@/components/Home";
import Contact from "@/components/Contact";
import Events from "@/components/Events";
import Search from "@/components/Search";
import Projects from "@/components/Projects";
import Researcher from "@/components/Researcher";
import Commodities from "@/components/Commodities";
import Programs from "./Programs";

import History from "@/components/about-us/History";
import Vision_Mission_And_Goal from "@/components/about-us/Vision-Mission-And-Goal";
import Organizational_Structure from "@/components/about-us/Organizational-Structure";
import Consortium_Members_Agencies from "@/components/about-us/Consortium-Members-Agencies";
import Staff_Members from "@/components/about-us/Staff-Members";


import { LoadingOverlay } from "@/components/Elements";
import Error404 from "@/components/Error404";

import CommodityDetails from "./PathDetails/CommodityDetails";
import ProgramDetails from "./PathDetails/ProgramDetails";
import PostDetails from "./PathDetails/PostDetails";
import EventDetails from "./PathDetails/EventDetails";


import Layout from "./Layout";
import ResearcherDetails from "./PathDetails/ResearcherDetails";
import ProjectDetails from "./PathDetails/ProjectDetails";


export default function app() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <LoadingOverlay loading={state.loading} />
            <Router >
                <LastLocationProvider>
                    <Switch>
                        <GuestRoute exact path="/" component={Home} />
                        <GuestRoute exact path="/home" component={Home} />
                        <GuestRoute exact path="/events" component={Events} />
                        <GuestRoute exact path="/projects" component={Projects} />
                        <GuestRoute exact path="/researchers" component={Researcher} />
                        <GuestRoute exact path="/search" component={Search} />
                        <GuestRoute exact path="/commodities" component={Commodities} />
                        <GuestRoute exact path="/contact" component={Contact} />
                        <GuestRoute exact path="/programs" component={Programs} />

                        <GuestRoute path="/about-us/consortium-members-agencies" component={Consortium_Members_Agencies} />
                        <GuestRoute path="/about-us/history" component={History} />
                        <GuestRoute path="/about-us/organizational-structure" component={Organizational_Structure} />
                        <GuestRoute path="/about-us/list-of-staff-members" component={Staff_Members} />
                        <GuestRoute path="/about-us/vision-mision-and-goal" component={Vision_Mission_And_Goal} />

                        <GuestRoute path="/program/:slug" children={<Layout><ProgramDetails /></Layout>} />
                        <GuestRoute path="/post/:slug" children={<Layout><PostDetails /></Layout>} />
                        <GuestRoute path="/commodity/:slug" children={<Layout><CommodityDetails /></Layout>} />
                        <GuestRoute path="/event/:slug" children={<Layout><EventDetails /></Layout>} />
                        <GuestRoute path="/researcher/:slug" children={<Layout><ResearcherDetails /> </Layout>} />
                        <GuestRoute path="/project/:slug" children={<Layout><ProjectDetails /> </Layout>} />


                        <GuestRoute component={Error404} />
                    </Switch>
                </LastLocationProvider>
            </Router>
        </AppContext.Provider>
    )
}