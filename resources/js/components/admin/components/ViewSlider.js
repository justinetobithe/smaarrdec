import React, { useContext, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { AppContext } from '../../../store';
import { useFetch } from '../../../customHook';
import { Button } from 'react-bootstrap';
import SliderModal from './Modal/SliderModal';
import { notify } from '../../Elements';

const columns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "image", label: "Image", option: { filter: true, sort: true } },
    { name: "sliderName", label: "Slider Name", option: { filter: true, sort: true } },
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


export default function ViewSlider() {

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const { data, loading } = useFetch({
        url: "/api/slider"
    })

    useEffect(() => {
        dispatch({ type: "FETCH_SLIDERS", payload: data });
    }, [data]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const openModal = (data) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Slider",
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
                    history.push("/admin/slider-settings/view");
                },
                data: data,
                children: <SliderModal />,
            },
        });
    };


    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Slider</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item active">Slider</li>
                </ol>
                <div className="card mb-4">
                    <div className="card-body">
                        <NavLink type="button" className="btn btn-info btn-sm text-white" to="/admin/slider-settings/add">Add New Slider</NavLink>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="card">
                        <MUIDataTable
                            title={"List of Slider"}
                            data={
                                state.sliders.map((slider, index) => ({
                                    id: index + 1,
                                    image: <img src={slider.background_image} className="img-fluid" alt={slider.slider_name} width="350"></img>,
                                    sliderName: slider.slider_name,
                                    status: slider.status == 1 ? <p className="text-success m-0">Active</p> : <p className="text-danger m-0">Unactive</p>,
                                    action:
                                        <Button
                                            id={slider.id}
                                            onClick={() => openModal(slider)}
                                            type="button"
                                            className="btn btn-info btn-sm mb-0"
                                        >Update</Button>
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
