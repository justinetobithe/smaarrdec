export default function (state, { type, payload }) {
    switch (type) {
        case "TOGGLE_LOADING":
            return {
                ...state,
                loading: payload,
            };
        case "TOGGLE_MODAL":
            return {
                ...state,
                modal: payload,
            };

        // Users
        case "AUTHENTICATION":
            return {
                ...state,
                user: payload,
            };
        case "FETCH_USERS":
            return {
                ...state,
                users: payload,
            };
        case "UPDATE_USER":
            let users = state.users;
            let userIndex = users.findIndex((user) => user.id == payload.id);
            users[userIndex] = payload;
            return {
                ...state,
                users: users,
            };

        // Projects
        case "FETCH_PROJECTS":
            return {
                ...state,
                projects: payload,
            };
        case "UPDATE_PROJECTS":
            let projects = state.projects;
            let projectIndex = projects.findIndex(
                (project) => project.id == payload.id
            );
            projects[projectIndex] = payload;
            return {
                ...state,
                projects: projects,
            };

        // Researchers
        case "FETCH_RESEARCHERS":
            return {
                ...state,
                researchers: payload,
            };
        case "UPDATE_RESEARCHERS":
            let researchers = state.researchers;
            let researcherIndex = researchers.findIndex(
                (researcher) => researcher.id == payload.id
            );
            researchers[researcherIndex] = payload;
            return {
                ...state,
                researchers: researchers,
            };

        case "FETCH_RESEARCHER_PROJECTS":
            return {
                ...state,
                researcherProjects: payload,
            };
        case "UPDATE_RESEARCHER_PROJECTS":
            let researcherProjects = state.researcherProjects;
            let researcherProjectIndex = researcherProjects.findIndex(
                (researcherProject) => researcherProject.id == payload.id
            );
            researcherProjects[researcherProjectIndex] = payload;
            return {
                ...state,
                researcherProjects: researcherProjects,
            };
        case "DELETE_RESEARCHER_PROJECTS":
            return {
                ...state,
                researcherProjects: state.researcherProjects.filter(item => item.id != payload.id),
            };

        // Commodity
        case "FETCH_COMMODITIES":
            return {
                ...state,
                commodities: payload,
            };
        case "UPDATE_COMMODITIES":
            let commodities = state.commodities;
            let commodityIndex = commodities.findIndex(
                (commodity) => commodity.id == payload.id
            );
            commodities[commodityIndex] = payload;
            return {
                ...state,
                commodities: commodities,
            };
        case "DELETE_COMMODOTIES":
            return {
                ...state,
                commodities: state.commodities.filter(item => item.id != payload.id),
            };

        // Commodity
        case "FETCH_AGENCIES":
            return {
                ...state,
                agencies: payload,
            };
        case "UPDATE_AGENCIES":
            let agencies = state.agencies;
            let agencyIndex = agencies.findIndex(
                (agency) => agency.id == payload.id
            );
            agencies[agencyIndex] = payload;
            return {
                ...state,
                agencies: agencies,
            };
        case "DELETE_AGENCIES":
            return {
                ...state,
                agencies: state.agencies.filter(item => item.id != payload.id)
            }

        // Program
        case "FETCH_PROGRAMS":
            return {
                ...state,
                programs: payload,
            };
        case "UPDATE_PROGRAMS":
            let programs = state.programs;
            let programIndex = programs.findIndex(
                (program) => program.id == payload.id
            );
            programs[programIndex] = payload;
            return {
                ...state,
                programs: programs
            }

        // case "UPDATE_PROGRAMS":
        //     let programs = state.programs;
        //     let programIndex = programs.findIndex(
        //         (program) => program.id == payload.id
        //     );
        //     programs[programIndex] = payload;
        //     return {
        //         ...state,
        //         programs: programs,
        //     };

        case "DELETE_PROGRAMS":
            return {
                ...state,
                programs: state.programs.filter(item => item.id != payload.id)
            }

        // Slider
        case "FETCH_SLIDERS":
            return {
                ...state,
                sliders: payload,
            };
        case "UPDATE_SLIDERS":
            let sliders = state.sliders;
            let sliderIndex = sliders.findIndex(
                (slider) => slider.id == payload.id
            );
            sliders[sliderIndex] = payload;
            return {
                ...state,
                sliders: sliders,
            };
        case "DELETE_SLIDERS":
            return {
                ...state,
                sliders: state.sliders.filter(item => item.id != payload.id),
            };

        //Post 
        case "FETCH_POSTS":
            return {
                ...state,
                posts: payload,
            };
        case "UPDATE_POSTS":
            let posts = state.posts;
            let postIndex = posts.findIndex(
                (post) => post.id = payload.id
            );
            posts[postIndex] = payload;
            return {
                ...state,
                posts: posts,
            }
        case "DELETE_POSTS":
            return {
                ...state,
                posts: state.posts.filter(item => item.id != payload.id),
            }
        /* NOTIFICAITIONS */
        case "SET_ADMIN_NOTIFICATIONS":
            return {
                ...state,
                adminsNotifications: payload
            }
        case "ADD_ADMIN_NOTIFICATIONS":
            return {
                ...state,
                adminsNotifications: [payload, ...state.adminsNotifications]
            }
        case "UPDATE_ADMIN_NOTIFICATIONS":
            let adminsNotifications = state.adminsNotifications;
            let adminsNotificationIndex = adminsNotifications.findIndex(item => item.id == payload.id);
            adminsNotifications[adminsNotificationIndex] = {
                ...adminsNotifications[adminsNotificationIndex],
                read_type: payload.read_type
            }
            return {
                ...state,
                adminsNotifications: adminsNotifications
            }

        case "SET_RESEARCHER_NOTIFICATIONS":
            return {
                ...state,
                researchersNotifications: payload,
            }
        case "ADD_RESEARCHER_NOTIFICATIONS":
            return {
                ...state,
                researchersNotifications: [payload, ...state.researchersNotifications],
            }
        case "UPDATE_RESEARCHER_NOTIFICATIONS":
            let researchersNotifications = state.researchersNotifications;
            let researchersNotificationIndex = researchersNotifications.findIndex(item => item.id == payload.id);
            researchersNotifications[researchersNotificationIndex] = {
                ...researchersNotifications[researchersNotificationIndex],
                read_type: payload.read_type
            }
            return {
                ...state,
                researchersNotifications: researchersNotifications
            }


        case "READ_ALL_NOTIFICATION":
            let notificationsArr2 = state.notifications;
            notificationsArr2.forEach(item => {
                if (item.read_type == 0) {
                    let notificationIndex2 = notificationsArr2.findIndex(v => v.id == payload.id);
                    notificationsArr2[notificationIndex2] = {
                        ...notificationsArr2[notificationIndex2],
                        read_type: 1
                    }
                }
            })
            return {
                ...state,
                notifications: notificationsArr2
            }
        /* END NOTIFICAITIONS */

        // Staffs
        case "FETCH_STAFFS":
            return {
                ...state,
                staffs: payload,
            };
        case "UPDATE_STAFFS":
            let staffs = state.staffs;
            let staffIndex = staffs.findIndex(
                (staff) => staff.id == payload.id
            );
            staffs[staffIndex] = payload;
            return {
                ...state,
                staffs: staffs,
            };
        case "DELETE_STAFFS":
            return {
                ...state,
                staffs: state.staffs.filter(item => item.id != payload.id)
            }

        // GENERAL SETTINGS  
        case "SET_GENERAL_SETTINGS":
            return {
                ...state,
                generalSettings: payload
            }

        case "UPDATE_ORGANIZATIONAL_STRUCTURE":
            return {
                ...state,
                generalSettings: {
                    ...state.generalSettings,
                    organizational_structure:
                        payload.organizational_structure
                }
            }
        /* END GENERAL SETTINGS */

        // Project Category
        case "FETCH_PROJECT_CATEGORIES":
            return {
                ...state,
                projectCategories: payload,
            };
        case "UPDATE_PROJECT_CATEGORIES":
            let projectCategories = state.projectCategories;
            let projectCategoryIndex = projectCategories.findIndex(
                (projectCategory) => projectCategory.id == payload.id
            );
            projectCategories[projectCategoryIndex] = payload;
            return {
                ...state,
                projectCategories: projectCategories,
            };

        case "DELETE_PROJECT_CATEGORIES":
            return {
                ...state,
                projectCategories: state.projectCategories.filter(item => item.id != payload.id)
            }
        // Post Category
        case "FETCH_POST_CATEGORIES":
            return {
                ...state,
                postCategories: payload,
            };
        case "UPDATE_POST_CATEGORIES":
            let postCategories = state.postCategories;
            let postCategoryIndex = postCategories.findIndex(
                (postCategory) => postCategory.id == payload.id
            );
            postCategories[postCategoryIndex] = payload;
            return {
                ...state,
                postCategories: postCategories,
            };

        // Events 
        case "FETCH_EVENTS":
            return {
                ...state,
                events: payload
            }
        case "UPDATE_EVENTS":
            let events = state.events;
            let eventIndex = events.findIndex(
                (event) => event.id == payload.id
            );
            events[eventIndex] = payload;
            return {
                ...state,
                events: events
            }
        case "DELETE_EVENTS":
            return {
                ...state,
                events: state.events.filter(item => item.id != payload.id),
            }

        /* Project Report */
        case "FETCH_PROJECT_ABSTRACTS":
            return {
                ...state,
                projectAbstracts: payload,
            }
        case "UPDATE_PROJECT_ABSTRACTS":
            let projectAbstracts = state.projectAbstracts;
            let projectAbstractIndex = projectAbstracts.findIndex(
                (projectAbstract) => projectAbstract.id == payload.id
            );
            projectAbstracts[projectAbstractIndex] = payload;
            return {
                ...state,
                projectAbstracts: projectAbstracts,
            }
        case "DELETE_PROJECT_ABSTRACTS":
            return {
                ...state,
                projectAbstracts: state.projectAbstracts.filter(item => item.id != payload.id),
            }

        // Publications
        case "INSERT_PUBLICATIONS":
            return {
                ...state,
                publications: [...state.publications, payload]
            }
        case "FETCH_PUBLICATIONS":
            return {
                ...state,
                publications: payload,
            }
        case "UPDATE_PUBLICATIONS":
            let publications = state.publications;
            let publicationIndex = publications.findIndex(
                (publication) => publication.id == payload.id
            );
            publications[publicationIndex] = payload;
            return {
                ...state,
                publications: publications
            }
        case "DELETE_PUBLICATIONS":
            return {
                ...state,
                publications: state.publications.filter(item => item.id != payload.id)
            }

        // Academic Degrees
        case "INSERT_ACADEMIC_DEGREES":
            return {
                ...state,
                academicDegrees: [...state.academicDegrees, payload]
            }
        case "FETCH_ACADEMIC_DEGREES":
            return {
                ...state,
                academicDegrees: payload
            }
        case "UPDATE_ACADEMIC_DEGREES":
            let academicDegrees = state.academicDegrees;
            let academicDegreeIndex = academicDegrees.findIndex(
                (academicDegree) => academicDegree.id == payload.id
            );
            academicDegrees[academicDegreeIndex] = payload;
            return {
                ...state,
                academicDegrees: academicDegrees
            }
        case "DELETE_ACADEMIC_DEGREES":
            return {
                ...state,
                academicDegrees: state.academicDegrees.filter(item => item.id != payload.id)
            }

        // Organizations
        case "INSERT_ORGANIZATIONS":
            return {
                ...state,
                organizations: [...state.organizations, payload]
            }
        case "FETCH_ORGANIZATIONS":
            return {
                ...state,
                organizations: payload
            }
        case "UPDATE_ORGANIZATIONS":
            let organizations = state.organizations;
            let organizationIndex = organizations.findIndex(
                (organization) => organization.id == payload.id
            )
            organizations[organizationIndex] = payload;
            return {
                ...state,
                orgranizations: organizations
            }
        case "DELETE_ORGRANIZATIONS":
            return {
                ...state,
                organizations: state.organizations.filter(item => item.id != payload.id)
            }

        // Project Request

        case "FETCH_PROJECT_REQUESTS":
            return {
                ...state,
                projectRequests: payload
            }

        case "UPDATE_PROJECT_REQUESTS":
            let projectRequestsArr = state.projectRequests
            let projectRequestIndex = projectRequestsArr.findIndex(item => item.id == payload.id)
            projectRequestsArr[projectRequestIndex] = {
                ...projectRequestsArr[projectRequestIndex],
                read_type: payload.read_type
            }
            return {
                ...state,
                projectRequests: projectRequestsArr
            }

        default:
            return state;
    }
}
