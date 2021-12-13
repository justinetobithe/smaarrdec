import React, { useRef, useContext, useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { useFetch, useHttpRequest } from '../../../customHook';
import { AppContext } from '../../../store';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { notify } from '../../Elements';
import slugify from 'slugify';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import Error404 from './Error404';

const animatedComponents = makeAnimated();

const remarksOption = [
    { value: "1", label: "On-Going" },
    { value: "2", label: "Completed" }
];

export default function EditProgram() {


    let history = useHistory();

    let { id } = useParams();

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const { data, loading } = useFetch({
        url: `/api/get-programs-by-id/${id}`
    });


    const [programDetails, setProgramDetails] = useState({});

    const [selectedImage, setSelectedImage] = useState();
    const [preview, setPreview] = useState();
    const [selectedImplementingAgency, setSelectedImplementingAgency] = useState();
    const [selectedCollaboratingAgency, setSelectedCollaboratingAgency] = useState();
    const [selectedProgramLeader, setSelectedProgramLeader] = useState();
    const [selectedProgramMembers, setSelectedProgramMembers] = useState();
    const [selectedRemarks, setSelectedRemarks] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const { state, dispatch } = useContext(AppContext);



    const agencies = useFetch({
        url: "/api/get-agencies-by-name"
    });

    const researchers = useFetch({
        url: "/api/researchers"
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            program_content: programDetails.program_content,
            program_leader: programDetails.program_leader
        }
    });

    // Selected Image
    useEffect(() => {
        if (!selectedImage) {
            setPreview(selectedImage)
            return
        }
        const objectUrl = URL.createObjectURL(selectedImage);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedImage]);

    const onSelectImage = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(undefined)
            return
        }
        setSelectedImage(e.target.files[0]);
    }

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading })
    }, [loading])

    useEffect(() => {
        setProgramDetails(data);
        if (data.start_date != null) {
            setStartDate(new Date(data.start_date))
        }
        if (data.end_date != null) {
            setEndDate(new Date(data.end_date))
        }

    }, [data])

    useEffect(() => {
        if (data.implementing_agency) {
            setSelectedImplementingAgency(
                !data.implementing_agency ? null : JSON.parse(data.implementing_agency).map(item => ({
                    value: item,
                    label: item
                }))
            )
        }
    }, [data])

    useEffect(() => {
        if (data.collaborating_agency) {
            setSelectedCollaboratingAgency(
                !data.collaborating_agency ? null : JSON.parse(data.collaborating_agency).map(item => ({
                    value: item,
                    label: item
                }))
            )
        }
    }, [data])

    useEffect(() => {
        if (data.program_leader) {
            setSelectedProgramLeader(
                !data.program_leader ? null : (item) => ({
                    value: data.program_leader,
                    label: data.program_leader
                })
            )
        }
    }, [data])


    useEffect(() => {
        if (data.program_members) {
            setSelectedProgramMembers(
                !data.program_members ? null : JSON.parse(data.program_members).map(item => ({
                    value: item,
                    label: item
                }))
            )
        }
    }, [data])


    useEffect(() => {
        if (data.remarks) {
            setSelectedRemarks(
                !data.remarks ? null : (item) => ({
                    value: remarksOption.find(item => data.remarks == item.value).value,
                    label: remarksOption.find(item => data.remarks == item.value).label,
                })
            )
        }
    }, [data, remarksOption])


    useEffect(() => {
        for (const property in programDetails) {
            setValue(property, programDetails[property]);
        }
    }, [programDetails])


    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/program/update-program",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" },
    }));

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });
        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            )
            if (response.data.status) {
                history.push("/admin/programs/my-programs");
            }
        }

    }, [response]);

    const onSubmit = (formData) => {

        Swal.fire({
            title: "Are you sure you want to update this data?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok"
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("program_id", id);
                fd.append("program_name", formData.program_name);
                fd.append("program_content", editorRef.current.getContent());
                fd.append("program_slug", slugify(formData.program_name).toLowerCase().replace(/[():,'"]+/g, ''));
                fd.append("featured_image", selectedImage);
                fd.append("start_date", startDate != null ? dateFormat(startDate, "yyyy-mm-dd HH:MM:ss") : "");
                fd.append("end_date", endDate != null ? dateFormat(endDate, "yyyy-mm-dd HH:MM:ss") : "");
                fd.append("implementing_agency", selectedImplementingAgency != undefined ? JSON.stringify(selectedImplementingAgency.map(agency => agency.value)) : "");
                fd.append("collaborating_agency", selectedCollaboratingAgency != undefined ? JSON.stringify(selectedCollaboratingAgency.map(agency => agency.value)) : "");
                fd.append("program_leader", selectedProgramLeader != null || undefined ? selectedProgramLeader.value : "");
                fd.append("program_members", selectedProgramMembers != null ? JSON.stringify(selectedProgramMembers.map(researcher => researcher.value)) : "");
                fd.append("remarks", selectedRemarks != null ? selectedRemarks.value : "0");
                fd.append("remarks_description", formData.remarks_description != null ? formData.remarks_description : "");
                fd.append("added_by", state.user.email);
                fd.append("status", 1);
                handleHttpRequest(fd);

            }
        });
    }

    if (isset(data.status) && !data.status) {
        return <Error404 />
    } else {
        return (
            <>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Edit Program</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/admin/programs/view">View Program</NavLink></li>
                        <li className="breadcrumb-item active">Edit Program</li>
                    </ol>

                    <div className="container-fluid add-post card mb-4 b-0 p-0">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-8 content-right mb-3">
                                        <div className="row-group mb-3">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Details
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 row-fluid">
                                                        <label className="form-label">Program Title</label>
                                                        <input
                                                            className="form-control"
                                                            placeholder="Enter Program Title Here"
                                                            {...register("program_name", { required: true })}
                                                        />
                                                        {
                                                            errors.program_name && (<div className="form-text ps-error-message">This field is required *</div>)
                                                        }
                                                    </div>
                                                    <div className="mb-3 row-fluid">
                                                        <label className="form-label">Executive Summary</label>
                                                        <Editor
                                                            className="form-control"
                                                            apiKey="rmaraoxct4iqpbk2ur478gvlxmdpuekuur95ua0latdnclkq"
                                                            onInit={(evt, editor) => editorRef.current = editor}
                                                            initialValue={
                                                                isset(
                                                                    programDetails.program_content
                                                                )
                                                                    ? programDetails.program_content
                                                                    : data.program_content
                                                            }
                                                            init={{
                                                                height: 500,
                                                                menubar: 'view edit format table',
                                                                plugins: [
                                                                    'advlist autolink lists link image charmap print preview anchor',
                                                                    'searchreplace visualblocks code fullscreen',
                                                                    'insertdatetime media table paste code help wordcount'
                                                                ],
                                                                toolbar: 'undo redo | formatselect | ' +
                                                                    'bold italic backcolor | alignleft aligncenter ' +
                                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                    'removeformat | help',
                                                                selector: 'textarea',

                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Affiliation
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 row-fluid w-100">
                                                        <label className="form-label">Select Agency</label>
                                                        <CreatableSelect
                                                            options={
                                                                agencies.data.map(agencies => ({
                                                                    value: agencies.agency_name,
                                                                    label: agencies.agency_name
                                                                }))
                                                            }
                                                            placeholder="Select Implementing Agency"
                                                            components={animatedComponents}
                                                            isClearable
                                                            isMulti
                                                            value={selectedImplementingAgency}
                                                            defaultValue={selectedImplementingAgency}
                                                            onChange={setSelectedImplementingAgency}

                                                        />
                                                    </div>
                                                    <div className="mb-3 row-fluid w-100">
                                                        <label className="form-label">Select Collaborating Agency</label>
                                                        <CreatableSelect
                                                            options={
                                                                agencies.data.map(agencies => ({
                                                                    value: agencies.agency_name,
                                                                    label: agencies.agency_name
                                                                }))
                                                            }
                                                            placeholder="Select Collaborating Agency"
                                                            components={animatedComponents}
                                                            isClearable
                                                            isMulti
                                                            value={selectedCollaboratingAgency}
                                                            defaultValue={selectedCollaboratingAgency}
                                                            onChange={setSelectedCollaboratingAgency}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 content-left mb-3">
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Featured Image
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 row-fluid">
                                                        {selectedImage || isset(programDetails.featured_image) ? (
                                                            <div className="display-image mb-2">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={
                                                                        selectedImage ? preview : programDetails.featured_image != null ? programDetails.featured_image :
                                                                            "/storage/programs/no-image.png"
                                                                    }
                                                                    alt="..."
                                                                ></img>
                                                            </div>
                                                        ) : ""}

                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            placeholder="Select image"
                                                            accept="image/png, image/jpeg"
                                                            onChange={onSelectImage}
                                                            defaultValue={
                                                                isset(
                                                                    programDetails.featured_image
                                                                )
                                                                    ? programDetails.featured_image
                                                                    : data.featured_image
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Duration
                                                    </h5>
                                                </div>
                                                <div className="card-body">

                                                    <div className="mb-3 row-fluid w-100">
                                                        <label className="form-label">Set start date</label>
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                            isClearable
                                                            className="form-control w-100"
                                                            dateFormat="MMMM d, yyyy"
                                                        />
                                                    </div>
                                                    <div className="mb-3 row-fluid w-100">
                                                        <label className="form-label">Set end date</label>
                                                        <DatePicker
                                                            selected={endDate}
                                                            onChange={(date) => setEndDate(date)}
                                                            isClearable
                                                            className="form-control w-100"
                                                            dateFormat="MMMM d, yyyy"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Program Leader
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 row-fluid">
                                                        <CreatableSelect
                                                            options={researchers.data.map(researcher => ({
                                                                value: researcher.name,
                                                                label: researcher.name,
                                                            }))}
                                                            isClearable
                                                            value={selectedProgramLeader}
                                                            defaultValue={selectedProgramLeader}
                                                            onChange={setSelectedProgramLeader}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Program Members
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 row-fluid">
                                                        <CreatableSelect
                                                            options={researchers.data.map(researcher => ({
                                                                value: researcher.name,
                                                                label: researcher.name,
                                                            }))}
                                                            isMulti
                                                            isClearable
                                                            value={selectedProgramMembers}
                                                            defaultValue={selectedProgramMembers}
                                                            onChange={setSelectedProgramMembers}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Status
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 row-fluid w-100">
                                                        <label className="form-label">Remarks</label>
                                                        <Select
                                                            options={remarksOption}
                                                            isClearable
                                                            value={selectedRemarks}
                                                            defaultValue={selectedRemarks}
                                                            onChange={setSelectedRemarks}
                                                        />
                                                    </div>
                                                    <div className="mb-3 row-fluid w-100">
                                                        <label className="form-label">Remarks Description</label>
                                                        <textarea
                                                            className="form-control"
                                                            {...register("remarks_description")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-group">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>
                                                        Action
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 gap-2 d-flex justify-content-center">
                                                        <button className="btn btn-info w-50 btn-sm">Save</button>
                                                        <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/programs/my-programs">Cancel</NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}