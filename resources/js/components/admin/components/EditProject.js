import React, { useRef, useEffect, useContext, useState } from 'react'
import { NavLink, useHistory, useParams, Redirect } from 'react-router-dom'
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

const animatedComponents = makeAnimated();

const remarksOption = [
    { value: "1", label: "On-Going" },
    { value: "2", label: "Completed" }
];


export default function EditProject() {

    let { id } = useParams();

    const { state, dispatch } = useContext(AppContext);

    let history = useHistory();
    const editorRef = useRef(null);

    const { data, loading } = useFetch({
        url: "/api/display-researcher-project-content/" + id
    });

    const [projectDetails, setProjectDetails] = useState({});

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
        setValue
    } = useForm({
        defaultValues: {
            project_title: projectDetails.project_title,
            project_content: projectDetails.project_content,
            project_study_site: projectDetails.project_study_site,
            abstract: projectDetails.abstract,
            commodityies: projectDetails.commodityies,
            proposed_budget: projectDetails.proposed_budget,
            project_leader: projectDetails.project_leader,
            project_members: projectDetails.project_members,
            programs: projectDetails.programs,
            projectCategory: projectDetails.projectCategory,
            start_date: projectDetails.start_date,
            end_date: projectDetails.end_date,
            agency: projectDetails.agency,
            funding_agency: projectDetails.funding_agency,
            implementing_agency: projectDetails.implementing_agency,
            collaborating_agency: projectDetails.collaborating_agency,
            program_id: projectDetails.program_id,
            project_category_id: projectDetails.project_category_id,
        }
    });

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

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

    useEffect(() => {
        setProjectDetails(data);

        if (data.start_date != null) {
            setStartDate(new Date(data.start_date))
        }
        if (data.end_date != null) {
            setEndDate(new Date(data.end_date))
        }

    }, [data]);

    useEffect(() => {
        if (data.funding_agency != null) {
            setSelectedFundingAgency(
                !data.funding_agency ? null : JSON.parse(data.funding_agency).map(item => ({
                    value: item,
                    label: item
                }))
            )
        }
    }, [data])

    useEffect(() => {
        if (data.project_category_id != null && projectCategory.data.length) {
            setSelectedProjectCategory(
                !data.project_category_id ? null :
                    {
                        value: projectCategory.data.find(item => item.id == data.project_category_id).id,
                        label: projectCategory.data.find(item => item.id == data.project_category_id).project_category_name,
                    })
        }

    }, [data, projectCategory.data])

    useEffect(() => {
        if (data.program_id != null && data.program_id != 0 && programs.data.length) {
            setSelectedPrograms({
                value: programs.data.find(item => item.id == data.program_id).id,
                label: programs.data.find(item => item.id == data.program_id).program_name,
            })
        }
    }, [data, programs.data])


    useEffect(() => {
        if (data.commodities != null && commodities.data.length) {
            setSelectedCommodity(
                !data.commodities ? null : JSON.parse(data.commodities).map(item => ({
                    value: item,
                    label: item
                }))
            )
        }
    }, [data, commodities.data])

    useEffect(() => {
        if (data.implementing_agency != null) {
            setSelectedImplementingAgency(
                !data.implementing_agency ? null : JSON.parse(data.implementing_agency).map(item => ({
                    value: item,
                    label: item
                }))
            )
        }
    }, [data])

    useEffect(() => {
        if (data.collaborating_agency != null) {
            setSelectedCollaboratingAgency(
                !data.collaborating_agency ? null : JSON.parse(data.collaborating_agency).map(item => ({
                    value: item,
                    label: item
                }))
            )
        }
    }, [data])

    useEffect(() => {
        if (data.project_leader != null) {
            setSelectedProjectLeader(
                !data.project_leader ? null : (item) => ({
                    value: data.project_leader,
                    label: data.project_leader
                })
            )
        }
    }, [data])


    useEffect(() => {
        if (data.project_members != null) {
            setSelectedProjectMembers(
                !data.project_members ? null : JSON.parse(data.project_members).map(item => ({
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

        // SET FORM VALUE (DYNAMIC VALUES)
        for (const property in projectDetails) {
            setValue(property, projectDetails[property]);
        }
    }, [projectDetails]);


    const [response, handleHttpRequest] = useHttpRequest(data => ({
        url: "/api/project/update-project",
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


    const onSubmit = (formData) => {
        Swal.fire({
            title: 'Are you sure you want to update this data?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("project_id", id);
                fd.append("program_id", selectedPrograms != null ? selectedPrograms.value : 0);
                fd.append("project_code", generatedCode(6));
                fd.append("project_title", formData.project_title);
                fd.append("abstract", selectedFile);
                fd.append("project_study_site", formData.project_study_site != null ? formData.project_study_site : "");
                fd.append("project_content", editorRef.current.getContent());
                fd.append("project_slug", slugify(formData.project_title).toLowerCase().replace(/[():,.'"]+/g, ""));
                fd.append("featured_image", selectedImage);
                fd.append("project_category_id", selectedProjectCategory != null ? selectedProjectCategory.value : 0);
                fd.append("commodities", selectedCommodity != null ? JSON.stringify(selectedCommodity.map(commodity => commodity.value)) : "");
                fd.append("budget", formData.budget != null ? formData.budget : "");
                fd.append("start_date", startDate != null ? dateFormat(startDate, "yyyy-mm-dd HH:MM:ss") : "");
                fd.append("end_date", endDate != null ? dateFormat(endDate, "yyyy-mm-dd HH:MM:ss") : "");
                fd.append("funding_agency", selectedFundingAgency != null ? JSON.stringify(selectedFundingAgency.map(fundingAgency => fundingAgency.value)) : "");
                fd.append("implementing_agency", selectedImplementingAgency != null ? JSON.stringify(selectedImplementingAgency.map(implementingAgency => implementingAgency.value)) : "");
                fd.append("collaborating_agency", selectedCollaboratingAgency != null ? JSON.stringify(selectedCollaboratingAgency.map(collaboratingAgency => collaboratingAgency.value)) : "");
                fd.append("project_leader", selectedProjectLeader != null ? selectedProjectLeader.value : "");
                fd.append("project_members", selectedProjectMembers != null ? JSON.stringify(selectedProjectMembers.map(researcher => researcher.value)) : "");
                fd.append("added_by", state.user.email);
                fd.append("remarks", selectedRemarks != null ? selectedRemarks.value : "0");
                fd.append("remarks_description", formData.remarks_description != null ? formData.remarks_description : "");
                fd.append("status", 1);
                handleHttpRequest(fd);
            }
        });
    }

    if (isset(data.status) && !data.status) {
        return <Redirect push to="/admin/dashboard" />
    }


    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Edit Project</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/admin/project/my-projects">My Project</NavLink></li>
                    <li className="breadcrumb-item active">Edit Project</li>
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
                                                        initialValue={
                                                            isset(
                                                                projectDetails.project_content
                                                            )
                                                                ? projectDetails.project_content
                                                                : data.project_content
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
                                                        options={researchers.data.map(agency => ({
                                                            value: agency.name,
                                                            label: agency.name,
                                                        }))}
                                                        isClearable
                                                        value={selectedProjectLeader}
                                                        defaultValue={selectedProjectLeader}
                                                        onChange={setSelectedProjectLeader}
                                                    />
                                                </div>
                                                <div className="mb-3 row-fluid">
                                                    <label className="form-label">Project Members</label>
                                                    <CreatableSelect
                                                        options={researchers.data.map(agency => ({
                                                            value: agency.name,
                                                            label: agency.name,
                                                        }))}
                                                        isMulti
                                                        isClearable
                                                        value={selectedProjectMembers}
                                                        defaultValue={selectedProjectMembers}
                                                        onChange={setSelectedProjectMembers}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-group">
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
                                                        value={selectedFundingAgency}
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
                                                        defaultValue={
                                                            isset(
                                                                projectDetails.budget
                                                            )
                                                                ? projectDetails.budget
                                                                : data.budget
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
                                                        value={selectedImplementingAgency}
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
                                                    {selectedImage || isset(projectDetails.featured_image) ? (
                                                        <div className="display-image mb-2">
                                                            <img
                                                                className="img-fluid"
                                                                src={
                                                                    selectedImage ? preview : projectDetails.featured_image != null ? projectDetails.featured_image :
                                                                        "/storage/projects/no-image.png"
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
                                                                projectDetails.featured_image
                                                            )
                                                                ? projectDetails.featured_image
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
                                                        value={selectedPrograms}
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
                                                        value={selectedProjectCategory}
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
                                                        value={selectedCommodity}
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
                                                                    style={{ cursor: "default" }}
                                                                >
                                                                    {" "}
                                                                    {
                                                                        selectedFile.name
                                                                    }
                                                                </a>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div className="mb-3">
                                                            {
                                                                <a
                                                                    className="text-center d-flex align-items-center justify-content-center"
                                                                    target="_blank"
                                                                    href={
                                                                        isset(
                                                                            projectDetails.abstract
                                                                        )
                                                                            ? projectDetails.abstract
                                                                            : data.abstract
                                                                    }
                                                                >
                                                                    {projectDetails.abstract !=
                                                                        null
                                                                        ? "Preview"
                                                                        : ""}
                                                                </a>
                                                            }{" "}
                                                        </div>
                                                    )}
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




