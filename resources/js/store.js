import { createContext } from "react";

export const AppContext = createContext();

export const initialState = {
    loading: false,
    modal: {
        isShown: false,
        heading: "",
        onHide: () => { },
        data: {},
    },
    user: {},
    users: [],
    project: {},
    projects: [],
    resarcher: {},
    researchers: [],
    commodity: {},
    commodities: [],
    researcherProject: {},
    researcherProjects: [],
    agency: {},
    agencies: [],
    slider: {},
    sliders: [],
    program: {},
    programs: [],
    adminsNotifications: [],
    researchersNotifications: [],
    staffs: [],
    generalSettings: {},
    projectCategories: [],
    postCategories: [],
    posts: [],
    events: [],
    projectAbstracts: [],
    pureCounter: [],
    publications: [],
    academicDegrees: [],
    organizations: [],
    projectRequests: []
};
