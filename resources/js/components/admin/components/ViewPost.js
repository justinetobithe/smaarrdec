import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { useFetch, useHttpRequest } from "../../../customHook";
import { AppContext } from "../../../store";
import { Button } from "react-bootstrap";
import dateFormat from 'dateformat';
import PostModal from './Modal/PostModal';

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "title", label: "Title", option: { filter: true, sort: true } },
    { name: "author", label: "Author", option: { filter: true, sort: true } },
    { name: "category", label: "Category", option: { filter: true, sort: true } },
    { name: "date", label: "Date", option: { filter: true, sort: true } },
    { name: "status", label: "Status", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } }
];

const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: false,
    download: false,
    print: false
};



export default function ViewPost() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/posts",
    });

    useEffect(() => {
        dispatch({ type: "FETCH_POSTS", payload: data });
    }, [data])

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Post",
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
                    history.push("/admin/post/view");
                },
                data: data,
                children: <PostModal />,
            },
        });
    };


    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Post</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">View Post</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Posts"}
                            columns={columns}
                            options={options}
                            data={
                                state.posts.map((posts, index) => ({
                                    id: index + 1,
                                    title: posts.post_title,
                                    author: posts.author_name,
                                    category: posts.post_category_name,
                                    date: dateFormat(posts.date_published, "mmmm d, yyyy"),
                                    status:
                                        posts.status == 1 ? (
                                            <p className="text-success m-0">
                                                Active
                                            </p>
                                        ) : (
                                            <p className="text-danger m-0">
                                                Unactive
                                            </p>
                                        ),
                                    action:
                                        <div className="d-flex align-items-center">
                                            <Button
                                                type="button"
                                                onClick={() => openModal(posts)}
                                                className="btn btn-info btn-sm"
                                            >
                                                Update
                                            </Button>
                                            <NavLink
                                                to={"/admin/post/edit/" + posts.id}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Edit
                                            </NavLink>
                                        </div>
                                }))
                            }
                        />
                    </div>

                </div>
            </div>

        </>
    )
}
