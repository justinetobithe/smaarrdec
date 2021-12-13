import React, { useEffect, useReducer } from 'react'
import { LoadingOverlay, Modal } from '../Elements';
import AuthRoute from './AuthRoute';
import GuestRoute from "./GuestRoute";
import reducer from "../../reducer";
import { AppContext, initialState } from '../../store';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useParams
} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Login from './Login'
import Register from './Register'



import ViewAgency from './components/ViewAgency';
import AddAgency from './components/AddAgency';

import ViewUsers from './components/ViewUsers';
import GeneralSettings from './components/GeneralSettings';
import ViewProjects from './components/ViewProject';
import ViewPost from './components/ViewPost';
import AddPost from './components/AddPost';
import AddProgram from './components/AddProgram';
import ViewProgram from './components/ViewProgram';
import ResearchersPrograms from './components/ResearchersPrograms';
import UsersProfile from './components/UsersProfile';

import ViewPostCategory from './components/ViewPostCategory';
import AddPostCategory from './components/AddPostCategory';
import AddStaff from './components/AddStaff';
import ViewStaff from './components/ViewStaff';
import AddCommodity from './components/AddCommodity'
import ViewCommodity from './components/ViewCommodity'

import ViewEvent from './components/ViewEvent';
import AddEvent from './components/AddEvent';

import ViewProject from './components/ViewProject';

import AddProject from './components/AddProject';

import ViewProjectCategory from './components/ViewProjectCategory';
import AddProjectCategory from './components/AddProjectCategory';

import AddResearcher from './components/AddResearcher';
import ViewResearcher from './components/ViewResearcher';
import OrganizationalChart from './components/OrganizationalChart';
import ResearchersProjects from './components/ResearchersProjects';
import ResearchersProfile from './components/ResearchersProfile';
import AddSlider from './components/AddSlider';
import ViewSlider from './components/ViewSlider';
import Layout from './Layout';
import EditProject from './components/EditProject';
import EditEvent from './components/EditEvent';
import EditCommodity from './components/EditCommodity';
import EditPost from './components/EditPost';
import EditProgram from './components/EditProgram';
 
import ViewProjectAbstract from './components/ViewProjectAbstract';
import AddProjectAbstract from './components/AddProjectAbsract';
import GenerateReport from './components/GenerateReport';
import EditAgency from './components/EditAgency';
import VMG from './components/VMG';
import AboutUs from './components/AboutUs';
import RequestForm from './components/RequestForm';
import ResearcherRequestProject from './components/ResearcherRequestProject';
import ViewRequestList from './components/ViewRequestList';


export default function App() {
    let history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (isset(AUTH_USER.id)) {
            dispatch({
                type: "AUTHENTICATION",
                payload: AUTH_USER,
            })
        }
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <LoadingOverlay loading={state.loading} />
            <Router history={history}>
                <Switch>
                    <AuthRoute exact path="/admin/dashboard" component={Dashboard} />
                    <AuthRoute exact path="/admin/" component={Dashboard} />
                    <GuestRoute exact path="/admin/login" component={Login} />
                    <Route path="/admin/register" component={Register} />


                    <AuthRoute path="/admin/organizational-chart/view" component={OrganizationalChart} />

                    <AuthRoute path="/admin/general-settings" component={GeneralSettings} />
                    <AuthRoute path="/admin/user/view" component={ViewUsers} />

                    <AuthRoute path="/admin/user/profile" component={UsersProfile} />

                    <AuthRoute path="/admin/agency/view" component={ViewAgency} />
                    <AuthRoute path="/admin/agency/add" component={AddAgency} />

                    <AuthRoute path="/admin/project/view" component={ViewProjects} />

                    <AuthRoute path="/admin/programs/my-programs" component={ResearchersPrograms} />
                    <AuthRoute path="/admin/programs/view" component={ViewProgram} />
                    <AuthRoute path="/admin/programs/add" component={AddProgram} />

                    <AuthRoute path="/admin/post/category/view" component={ViewPostCategory} />
                    <AuthRoute path="/admin/post/category/add/" component={AddPostCategory} />
                    <AuthRoute path="/admin/post/view" component={ViewPost} />
                    <AuthRoute path="/admin/post/add" component={AddPost} />
                    <AuthRoute path="/admin/staff/view" component={ViewStaff} />
                    <AuthRoute path="/admin/staff/add" component={AddStaff} />

                    <AuthRoute path="/admin/commodity/view" component={ViewCommodity} />
                    <AuthRoute path="/admin/commodity/add" component={AddCommodity} />

                    <AuthRoute path="/admin/event/view" component={ViewEvent} />
                    <AuthRoute path="/admin/event/add" component={AddEvent} />


                    <AuthRoute path="/admin/researcher/view" component={ViewResearcher} />
                    <AuthRoute path="/admin/researcher/add" component={AddResearcher} />
                    <AuthRoute path="/admin/researcher/my-profile" component={ResearchersProfile} />


                    <AuthRoute path="/admin/project/my-projects" component={ResearchersProjects} />

                    <AuthRoute path="/admin/slider-settings/view" component={ViewSlider} />
                    <AuthRoute path="/admin/slider-settings/add" component={AddSlider} />


                    <AuthRoute path="/admin/project/view" component={ViewProject} />

                    <AuthRoute path="/admin/project/add" component={AddProject} />

                    <AuthRoute path="/admin/project/category/view" component={ViewProjectCategory} />

                    <AuthRoute path="/admin/project/category/add" component={AddProjectCategory} />

                    <AuthRoute path="/admin/project/abstract/view" component={ViewProjectAbstract} />
                    <AuthRoute path="/admin/project/abstract/add" component={AddProjectAbstract} />

                    <AuthRoute path="/admin/project/generate-report/view" component={GenerateReport} />

                    <AuthRoute path="/admin/request-project/researcher/view" component={ViewRequestList} />

                    <AuthRoute path="/admin/request-project/view" component={ResearcherRequestProject} />
                    <AuthRoute path="/admin/request-project/add" component={RequestForm} />
 
                    <AuthRoute path="/admin/page/about-us" component={AboutUs} />
                    <AuthRoute path="/admin/page/vision-mission-and-goal" component={VMG} />

                    <AuthRoute path="/admin/project/edit/:id" children={<Layout><EditProject /></Layout>} />
                    <AuthRoute path="/admin/event/edit/:id" children={<Layout><EditEvent /></Layout>} />
                    <AuthRoute path="/admin/commodity/edit/:id" children={<Layout><EditCommodity /></Layout>} />
                    <AuthRoute path="/admin/post/edit/:id" children={<Layout><EditPost /></Layout>} />
                    <AuthRoute path="/admin/program/edit/:id" children={<Layout><EditProgram /></Layout>} />
                    <AuthRoute path="/admin/agency/edit/:id" children={<Layout><EditAgency /></Layout>} />

                </Switch>
            </Router>
            <Modal {...state.modal} />
        </AppContext.Provider>
    )
}
