import React, { useContext, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { AppContext } from '../../../store';
import { useFetch } from '../../../customHook';
import ProjectCategoryModal from "./Modal/ProjectCategoryModal";

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "categoryName", label: "Category Name", option: { filter: true, sort: true } },
    { name: "description", label: "Description", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
    { name: "action", label: "Actions", option: { filter: true, sort: true } },
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsize: 'standard',
    selectableRows: false,
    download: false,
    print: false
};


export default function ProjectCategory() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/project-categories"
    })

    useEffect(() => {
        dispatch({ type: "FETCH_PROJECT_CATEGORIES", payload: data });
    }, [data])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Project Category",
                data,
                size: "md",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => { },
                        },
                    });
                    history.push("/admin/project/category/view");
                },
                data: data,
                children: <ProjectCategoryModal />,
            },
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Project Categories</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">Project Categories</li>
                </ol>
                <div className="card mb-4">
                    <div className="card-body">
                        <NavLink type="button" className="btn btn-info btn-sm text-white" to="/admin/project/category/add">Add New Category</NavLink>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"Post Category Table"}
                            data={
                                state.projectCategories.map((projectCategories, index) => ({
                                    id: index + 1,
                                    categoryName: projectCategories.project_category_name,
                                    description: projectCategories.project_category_description,
                                    status:
                                        projectCategories.status == 1 ? (
                                            <p className="text-success m-0">
                                                Active
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Unactive
                                            </p>
                                        ),
                                    action: <button id={projectCategories.id} type="button" onClick={() => openModal(projectCategories)} className="btn btn-info btn-sm" > Edit</button>
                                }))
                            }
                            options={options}
                            columns={columns}
                        />
                    </div>

                </div>
            </div>

        </>
    )
}
