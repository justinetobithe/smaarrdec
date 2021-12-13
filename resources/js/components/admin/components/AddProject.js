import React, { useRef, useEffect, useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { AppContext } from '../../../store';
import { useFetch, useHttpRequest } from '../../../customHook';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import slugify from 'slugify';
import { notify } from '../../Elements';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';
import CreatableSelect from 'react-select/creatable';
import CurrencyInput from 'react-currency-input';

const animatedComponents = makeAnimated();

const remarksOption = [
    { value: "1", label: "On-Going" },
    { value: "2", label: "Completed" }
];


export default function AddProject() {


    const editorRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [preview, setPreview] = useState();

    const [selectedPrograms, setSelectedPrograms] = useState();
    const [selectedProjectCategory, setSelectedProjectCategory] = useState();

    const [selectedProjectLeader, setSelectedProjectLeader] = useState();
    const [selectedProjectMembers, setSelectedProjectMembers] = useState();

    const [selectedFundingAgency, setSelectedFundingAgency] = useState();
    const [selectedImplementingAgency, setSelectedImplementingAgency] = useState();
    const [selectedCollaboratingAgency, setSelectedCollaboratingAgency] = useState();

    const [selectedCommodity, setSelectedCommodity] = useState();
    const [selectedRemarks, setSelectedRemarks] = useState();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    let history = useHistory();

    const { state, dispatch } = useContext(AppContext);

    const researchers = useFetch({
        url: "/api/display-researchers-by-name",
    });

    const projectCategory = useFetch({
        url: "/api/project-categories",
    });

    const programs = useFetch({
        url: "/api/programs",
    });

    const commodities = useFetch({
        url: "/api/get-commodity-ascending"
    });

    const agencies = useFetch({
        url: "/api/get-agencies-by-name"
    })


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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

    // Selected File
    const onSelectFile = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const [response, httpRequest] = useHttpRequest(data => ({
        url: "/insert-projects",
        method: "POST",
        data,
        header: { "Content-Type": "application/json" }
    }));

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: response.loading });

        if (response.error.length || response.data !== null) {
            notify(
                response.error.length ? response.error : response.data.message,
                response.data.status ? "success" : "error"
            );
            if (response.data.status) {
                history.push("/admin/project/my-projects");
            }
        }
    }, [response]);


    const onSubmit = data => {
        Swal.fire({
            title: 'Are you sure you want to save this data?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("user_role", state.user.role)
                fd.append("user_name", state.user.name)
                fd.append("program_id", selectedPrograms != null ? selectedPrograms.value : 0);
                fd.append("project_code", generatedCode(6));
                fd.append("project_title", data.project_title);
                fd.append("abstract", selectedFile);
                fd.append("project_study_site", data.project_study_site != null ? data.project_study_site : "");
                fd.append("project_content", editorRef.current.getContent());
                fd.append("project_slug", slugify(data.project_title).toLowerCase().replace(/[():,.'"]+/g, ""));
                fd.append("featured_image", selectedImage);
                fd.append("project_category_id", selectedProjectCategory != null ? selectedProjectCategory.value : 0);
                fd.append("commodities", selectedCommodity != null ? JSON.stringify(selectedCommodity.map(commodity => commodity.value)) : "");
                fd.append("budget", data.budget != null ? data.budget : "");
                fd.append("start_date", startDate != null ? dateFormat(startDate, "yyyy-mm-dd HH:MM:ss") : "");
                fd.append("end_date", endDate != null ? dateFormat(endDate, "yyyy-mm-dd HH:MM:ss") : "");
                fd.append("funding_agency", selectedFundingAgency != null ? JSON.stringify(selectedFundingAgency.map(fundingAgency => fundingAgency.value)) : "");
                fd.append("implementing_agency", selectedImplementingAgency != null ? JSON.stringify(selectedImplementingAgency.map(implementingAgency => implementingAgency.value)) : "");
                fd.append("collaborating_agency", selectedCollaboratingAgency != null ? JSON.stringify(selectedCollaboratingAgency.map(collaboratingAgency => collaboratingAgency.value)) : "");
                fd.append("project_leader", selectedProjectLeader != null ? selectedProjectLeader.value : "");
                fd.append("project_members", selectedProjectMembers != null ? JSON.stringify(selectedProjectMembers.map(researcher => researcher.value)) : "");
                fd.append("added_by", state.user.email);
                fd.append("remarks", selectedRemarks != null ? selectedRemarks.value : "0");
                fd.append("remarks_description", data.remarks_description != null ? data.remarks_description : "");
                fd.append("status", state.user.role == 2 ? 1 : state.user.role == 3 ? 1 : 0);
                httpRequest(fd);
            }
        });
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Project</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/project/view/">View Project</NavLink></li>
                    <li className="breadcrumb-item active">Add Project</li>
                </ol>
                <div className="container-fluid add-project card mb-4 b-0 p-0">
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
                                                    <label className="form-label">Project Title</label>
                                                    <input
                                                        className="form-control"
                                                        placeholder="Enter Project Title Here"
                                                        {...register("project_title", { required: true })}
                                                    />
                                                    {
                                                        errors.project_title && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Project Study Site/Location</label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Enter Project Study Site/Location"
                                                        {...register("project_study_site")}
                                                        rows="2"
                                                    ></textarea>
                                                    {
                                                        errors.project_study_site && (<div className="form-text ps-error-message">This field is required *</div>)
                                                    }
                                                </div>

                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Executive Summary</label>
                                                    <Editor
                                                        className="form-control"
                                                        apiKey="rmaraoxct4iqpbk2ur478gvlxmdpuekuur95ua0latdnclkq"
                                                        placeholder="Enter Project Content Here"
                                                        onInit={(evt, editor) => editorRef.current = editor}
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
                                    <div className="row-group mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Researcher
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Project Leader</label>
                                                    <CreatableSelect
                                                        options={researchers.data.map(researcher => ({
                                                            value: researcher.name,
                                                            label: researcher.name,
                                                        }))}
                                                        isClearable
                                                        defaultValue={selectedProjectLeader}
                                                        onChange={setSelectedProjectLeader}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Project Members</label>
                                                    <CreatableSelect
                                                        options={researchers.data.map(researcher => ({
                                                            value: researcher.name,
                                                            label: researcher.name,
                                                        }))}
                                                        isMulti
                                                        isClearable
                                                        defaultValue={selectedProjectMembers}
                                                        onChange={setSelectedProjectMembers}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-group mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Budget
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <label className="form-label">Funding Agency</label>
                                                    <CreatableSelect
                                                        options={agencies.data.map(agency => ({
                                                            value: agency.agency_name,
                                                            label: agency.agency_name,
                                                        }))}
                                                        isMulti
                                                        isClearable
                                                        defaultValue={selectedFundingAgency}
                                                        onChange={setSelectedFundingAgency}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Approved Budget</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter Approved Budget"
                                                        {...register("budget")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-group mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Affiliation
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Implemeting Agency</label>
                                                    <CreatableSelect
                                                        options={agencies.data.map(agency => ({
                                                            value: agency.agency_name,
                                                            label: agency.agency_name,
                                                        }))}
                                                        isMulti
                                                        defaultValue={selectedImplementingAgency}
                                                        onChange={setSelectedImplementingAgency}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Collaborating Agency</label>
                                                    <CreatableSelect
                                                        options={agencies.data.map(agency => ({
                                                            value: agency.agency_name,
                                                            label: agency.agency_name,
                                                        }))}
                                                        isMulti
                                                        isClearable
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
                                                    <div className="display-image mb-2">
                                                        {
                                                            selectedImage &&
                                                            <img
                                                                className="img-fluid"
                                                                src={preview}
                                                                alt="..."
                                                            ></img>
                                                        }
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="Select image"
                                                        accept="image/png, image/jpeg"
                                                        defaultValue={selectedImage}
                                                        onChange={onSelectImage}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Programs
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <Select
                                                        options={
                                                            programs.data.map(programs => ({
                                                                value: programs.id,
                                                                label: programs.program_name
                                                            }))
                                                        }
                                                        placeholder="Select a program"
                                                        isClearable
                                                        defaultValue={selectedPrograms}
                                                        onChange={setSelectedPrograms}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Project Category
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <Select
                                                        options={
                                                            projectCategory.data.map(projectCategory => ({
                                                                value: projectCategory.id,
                                                                label: projectCategory.project_category_name
                                                            }))}
                                                        placeholder="Select a category"
                                                        isClearable
                                                        {...register("project_category_id")}
                                                        defaultValue={selectedProjectCategory}
                                                        onChange={setSelectedProjectCategory}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Commodity
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    <Select
                                                        options={
                                                            commodities.data.map(commodity => ({
                                                                value: commodity.commodity_name,
                                                                label: commodity.commodity_name
                                                            }))
                                                        }
                                                        placeholder="Select a commodity"
                                                        components={animatedComponents}
                                                        isClearable
                                                        isMulti
                                                        {...register("commodity")}
                                                        defaultValue={selectedCommodity}
                                                        onChange={setSelectedCommodity}

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
                                                        className="form-control w-100"
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        selectsStart
                                                        dateFormat="MMMM d, yyyy"
                                                        placeholderText="Start Date"
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid w-100">
                                                    <label className="form-label">Set end date</label>
                                                    <DatePicker
                                                        className="form-control w-100"
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        selectsEnd
                                                        dateFormat="MMMM d, yyyy"
                                                        placeholderText="End Date"
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        minDate={startDate}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-group">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>
                                                    Abstract
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid">
                                                    {isset(
                                                        selectedFile
                                                    ) ? (
                                                        selectedFile && (
                                                            <div className="mb-3">
                                                                <a
                                                                    className="text-center d-flex align-items-center justify-content-center"
                                                                    target="_blank"
                                                                    href=""
                                                                >
                                                                    {" "}
                                                                    {
                                                                        selectedFile.name
                                                                    }
                                                                </a>
                                                            </div>
                                                        )
                                                    ) : ""}
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        accept="application/pdf,application/vnd.ms-excel"
                                                        onChange={
                                                            onSelectFile
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
                                                    Status
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 row-fluid w-100">
                                                    <label className="form-label">Remarks</label>
                                                    <Select
                                                        options={remarksOption.map(remarks => ({
                                                            value: remarks.value,
                                                            label: remarks.label
                                                        }))}
                                                        isClearable
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
                                                    <NavLink className="btn btn-danger w-50 btn-sm" to="/admin/project/my-projects">Cancel</NavLink>
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


function generatedCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
