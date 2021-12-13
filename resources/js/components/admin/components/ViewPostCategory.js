import React, { useContext, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { AppContext } from '../../../store';
import { useFetch } from '../../../customHook';
import PostCategoriesModal from "./Modal/PostCategoriesModal";
import { Button } from 'react-bootstrap';


const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "categoryName", label: "Category Name", option: { filter: true, sort: true } },
    { name: "description", label: "Description", option: { filter: true, sort: true } },
    { name: "link", label: "Link", option: { filter: true, sort: true } },
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


export default function ViewPostCategory() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);
    const { data, loading } = useFetch({
        url: "/api/post-categories"
    })

    useEffect(() => {
        dispatch({ type: "FETCH_POST_CATEGORIES", payload: data });
    }, [data])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Post Category",
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
                    history.push("/admin/post/category/view");
                },
                data: data,
                children: <PostCategoriesModal />,
            },
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Post Categories</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">Post Categories</li>
                </ol>
                <div className="card mb-4">
                    <div className="card-body">
                        <NavLink type="button" className="btn btn-info btn-sm text-white" to="/admin/post/category/add">Add New Category</NavLink>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"Post Category Table"}
                            data={
                                state.postCategories.map((postCategories, index) => ({
                                    id: index + 1,
                                    categoryName: postCategories.post_category_name,
                                    description: postCategories.post_category_description == "undefined" ? null : postCategories.post_category_description,
                                    link: "/" + postCategories.post_category_slug,
                                    status:
                                        postCategories.status == 1 ? (
                                            <p className="text-success m-0">
                                                Active
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Unactive
                                            </p>
                                        ),
                                    action: <Button id={postCategories.id} type="button" onClick={() => openModal(postCategories)} className="btn btn-info btn-sm mb-0">Update</Button>
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
