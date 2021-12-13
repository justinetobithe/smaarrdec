import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFetch } from "../../../customHook";
import { AppContext } from "../../../store";
import MUIDataTable from "mui-datatables";
import { Modal } from "../../Elements";
import { Button } from "react-bootstrap";
import CommodityModal from "./Modal/CommodityModal";

const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: false,
    download: false,
    print: false
};

const researchersColumns = [
    { name: "id", label: "No.", options: { filter: true, sort: true } },
    {
        name: "image",
        label: "Image",
        options: { filter: true, sort: true },
    },
    {
        name: "commodity",
        label: "Commodity",
        options: { filter: true, sort: true },
    },
];

const adminColumns = [
    { name: "id", label: "No.", options: { filter: true, sort: true } },
    {
        name: "image",
        label: "Image",
        options: { filter: true, sort: true },
    },
    {
        name: "commodity",
        label: "Commodity",
        options: { filter: true, sort: true },
    },
    {
        name: "priority_type",
        label: "Priority Type",
        options: { filter: true, sort: true },
    },
    {
        name: "status",
        label: "Status",
        options: { filter: true, sort: true },
    },
    {
        name: "action",
        label: "Action",
        options: { filter: true, sort: true },
    },
];

export default function ViewCommodity() {
    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/commodities",
    });

    useEffect(() => {
        dispatch({ type: "FETCH_COMMODITIES", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ tpye: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Commodity",
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
                    history.push("/admin/commodity/view");
                },
                data: data,
                children: <CommodityModal />,
            },
        });
    };


    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">View Commodity</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active">View Commodity</li>
                </ol>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Commodity"}
                            data={state.commodities.map((commodity, index) => ({
                                id: index + 1,
                                image:
                                    commodity.commodity_image == null ? (
                                        ""
                                    ) : (
                                        <img
                                            className="img-fluid"
                                            src={commodity.commodity_image}
                                            alt={commodity.commodity_name}
                                            width="150"
                                        ></img>
                                    ),
                                commodity: commodity.commodity_name,
                                priority_type:
                                    commodity.priority_type == 1
                                        ? "Priority"
                                        : "Neutral",
                                status:
                                    commodity.status == 1 ? (
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
                                            id={commodity.id}
                                            type="button"
                                            onClick={() => openModal(commodity)}
                                            className="btn btn-info btn-sm"
                                        >
                                            Update
                                        </Button>
                                        <NavLink
                                            to={"/admin/commodity/edit/" + commodity.id}
                                            className="btn btn-secondary btn-sm mb-0"
                                        >
                                            Edit
                                        </NavLink>
                                    </div>
                                ,
                            }))}

                            columns={state.user.role == 2 || state.user.role == 3 ? adminColumns : researchersColumns}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
