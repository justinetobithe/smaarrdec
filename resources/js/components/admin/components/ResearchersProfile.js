import React, { useRef, useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFetch, useHttpRequest } from "../../../customHook";
import { AppContext } from "../../../store";
import { useForm } from "react-hook-form";
import { notify } from "../../Elements";
import Swal from "sweetalert2";
import slugify from "slugify";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Editor } from "@tinymce/tinymce-react";
import MUIDataTable from "mui-datatables";
import { Button } from "react-bootstrap";
import PublicationAddModal from "./modal/PublicationAddModal";
import PublicationEditModal from "./modal/PublicationEditModal";
import AcademicDegreesEditModal from "./modal/AcademicDegreesEditModal";
import AcademicDegreesAddModal from "./modal/AcademicDegreesAddModal";
import OrganizationsAddModal from "./modal/OrganizationsAddModal";
import OrganizationsEditModal from "./modal/OrganizationsEditModal";

const publicationsColumns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    { name: "title", label: "Title", option: { filter: true, sort: true } },
    {
        name: "description",
        label: "Description",
        option: { filter: true, sort: true },
    },
    { name: "type", label: "Type", option: { filter: true, sort: true } },
    { name: "members", label: "Members", option: { filter: true, sort: true } },
    { name: "link", label: "Link", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
];

const academicDegreesColumns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    {
        name: "school_name",
        label: "School Name",
        option: { filter: true, sort: true },
    },
    { name: "program", label: "Program", option: { filter: true, sort: true } },
    { name: "degree", label: "Degree", option: { filter: true, sort: true } },
    { name: "year", label: "Year", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
];

const organizationColumns = [
    { name: "id", label: "No.", option: { filter: true, sort: true } },
    {
        name: "organization",
        label: "Organization Name",
        option: { filter: true, sort: true },
    },
    {
        name: "position",
        label: "Position",
        option: { filter: true, sort: true },
    },
    { name: "address", label: "Address", option: { filter: true, sort: true } },
    { name: "action", label: "Action", option: { filter: true, sort: true } },
];

const globalOptions = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: false,
    download: false,
    print: false,
};

export default function ResearchersProfile() {
    const { state, dispatch } = useContext(AppContext);

    let history = useHistory();

    const biographyRef = useRef(null);
    const researchInterestRef = useRef(null);

    let userEmail = state.user.email;

    const agency = useFetch({
        url: "/api/get-agencies-by-name",
    });

    const degrees = useFetch({
        url: "/api/degrees",
    });

    const [selectedAgency, setSelectedAgency] = useState();
    // const [agencyOption, setAgencyOption] = useState();

    const [researcherDetails, setResearcherDetails] = useState({});

    const [selectedFile, setSelectedFile] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [imagePreview, setImagePreview] = useState();
    const [filePreview, setFilePreview] = useState(false);

    const [selectedExpertise, setSelectedExpertise] = useState();

    const log = () => {
        if (biographyRef.current) {
            console.log(biographyRef.current.getContent());
        }
        if (researchInterestRef.current) {
            console.log(researchInterestRef.current.getContent());
        }
    };

    const { data, loading } = useFetch({
        url: `/api/researcher/${userEmail}`,
    });

    const publicationData = useFetch({
        url: `/api/get-publications/${data.id}`,
    });

    const academicDegreeData = useFetch({
        url: `/api/get-academic-degrees/${data.id}`,
    });

    const membershipData = useFetch({
        url: `/api/get-membership/${data.id}`,
    });

    useEffect(() => {
        dispatch({
            type: "FETCH_ACADEMIC_DEGREES",
            payload: academicDegreeData.data,
        });
    }, [academicDegreeData.data]);

    useEffect(() => {
        dispatch({ type: "FETCH_PUBLICATIONS", payload: publicationData.data });
    }, [publicationData.data]);

    useEffect(() => {
        dispatch({ type: "FETCH_ORGANIZATIONS", payload: membershipData.data });
    }, [membershipData.data]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            name: state.user.name,
            email: state.user.email,
            contact_no: researcherDetails.contact_no,
            occupation: researcherDetails.occupation,
            research_interest: researcherDetails.research_interest,
            expertise: researcherDetails.expertise,
            agency: researcherDetails.agency,
            place_of_assignment: researcherDetails.place_of_assignment,
            biography: researcherDetails.biography,
        },
    });

    useEffect(() => {
        setResearcherDetails(data);
        if (data.agency_id != null) {
            if (agency.data.length) {
                setSelectedAgency({
                    value: agency.data.find((item) => item.id == data.agency_id)
                        .id,
                    label: agency.data.find((item) => item.id == data.agency_id)
                        .agency_name,
                });
            }
        }
    }, [data]);

    useEffect(() => {
        if (data.expertise != null) {
            setSelectedExpertise(
                !data.expertise
                    ? null
                    : JSON.parse(data.expertise).map((item) => ({
                          value: item,
                          label: item,
                      }))
            );
        }
    }, [data]);

    useEffect(() => {
        // SET FORM VALUE (DYNAMIC VALUES)
        for (const property in researcherDetails) {
            setValue(property, researcherDetails[property]);
        }
    }, [researcherDetails]);

    useEffect(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: loading });
    }, [loading]);

    const [response, handleHttpRequest] = useHttpRequest((data) => ({
        url: "/api/researcher/update-researcher",
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
            );

            if (response.data.status) {
                if (response.data !== null) {
                    // dispatch({ type: "UPDATE_RESEARCHERS", payload: response.data.payload });
                    setResearcherDetails(response.data.payload);
                }
            }
        }
    }, [response]);

    useEffect(() => {
        if (!selectedImage) {
            setImagePreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedImage);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedImage]);

    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(undefined);
            return;
        }
        setSelectedImage(e.target.files[0]);
    };

    const onSelectFile = (e) => {
        setSelectedFile(e.target.files[0]);
        setFilePreview(true);
    };

    const onSubmitPersonalOverView = (formData) => {
        console.log("Curriculum Vitae", selectedFile);
        Swal.fire({
            title: "Are you sure you want to save this data?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                let fd = new FormData();
                fd.append("id", researcherDetails.id);
                fd.append("name", state.user.name);
                fd.append("email", state.user.email);
                fd.append(
                    "contact_no",
                    formData.contact_no != null ? formData.contact_no : ""
                );
                fd.append(
                    "occupation",
                    formData.occupation != null ? formData.occupation : null
                );
                fd.append(
                    "slug",
                    slugify(state.user.name)
                        .toLowerCase()
                        .replace(/[():,'"]+/g, "")
                        .toString()
                );
                fd.append("image", selectedImage);
                fd.append(
                    "agency_id",
                    selectedAgency != null ? selectedAgency.value : ""
                );
                fd.append(
                    "place_of_assignment",
                    formData.place_of_assignment != null
                        ? formData.place_of_assignment
                        : ""
                );
                fd.append(
                    "research_interest",
                    researchInterestRef.current.getContent()
                );
                fd.append(
                    "expertise",
                    selectedExpertise != null
                        ? JSON.stringify(
                              selectedExpertise.map(
                                  (expertise) => expertise.value
                              )
                          )
                        : ""
                );
                fd.append("biography", biographyRef.current.getContent());
                fd.append("curriculum_vitae", selectedFile);
                fd.append("status", 1);
                handleHttpRequest(fd);
            }
        });
    };

    const addPublicationModal = () => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Add Publication",
                data,
                size: "lg",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => {},
                        },
                    });
                    history.push("/admin/researcher/my-profile");
                },
                data: data,
                children: <PublicationAddModal />,
            },
        });
    };

    const editPublicationModal = (publication) => {
        console.log("Data ", publication);
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Publication",
                data,
                size: "lg",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => {},
                        },
                    });
                    history.push("/admin/researcher/my-profile");
                },
                data: publication,
                children: <PublicationEditModal />,
            },
        });
    };

    const addAcademicDegreeModal = () => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Add Academic Degree",
                data,
                size: "lg",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => {},
                        },
                    });
                    history.push("/admin/researcher/my-profile");
                },
                data: data,
                children: <AcademicDegreesAddModal />,
            },
        });
    };

    const editAcademicDegreeModal = (academicDegrees) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Academic Degree",
                data,
                size: "lg",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => {},
                        },
                    });
                    history.push("/admin/researcher/my-profile");
                },
                data: academicDegrees,
                children: <AcademicDegreesEditModal />,
            },
        });
    };

    const addOrganizationModal = () => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Add Organization",
                data,
                size: "lg",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => {},
                        },
                    });
                    history.push("/admin/researcher/my-profile");
                },
                data: data,
                children: <OrganizationsAddModal />,
            },
        });
    };

    const editOrganizationModal = (organization) => {
        dispatch({
            type: "TOGGLE_MODAL",
            payload: {
                isShown: true,
                heading: "Edit Organization",
                data,
                size: "lg",
                onHide: () => {
                    dispatch({
                        type: "TOGGLE_MODAL",
                        payload: {
                            isShown: false,
                            heading: "",
                            footer: "",
                            onHide: () => {},
                        },
                    });
                    history.push("/admin/researcher/my-profile");
                },
                data: organization,
                children: <OrganizationsEditModal />,
            },
        });
    };

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">My Profile</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active">My Profile</li>
                </ol>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            className="nav-link active"
                            id="personal-overview-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#personal-overview"
                            type="button"
                            role="tab"
                            aria-controls="personal-overview"
                            aria-selected="true"
                        >
                            Personal Overview
                        </button>
                        <button
                            className="nav-link"
                            id="academic-degrees-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#academic-degrees"
                            type="button"
                            role="tab"
                            aria-controls="academic-degrees"
                            aria-selected="false"
                        >
                            Academic Degrees
                        </button>
                        <button
                            className="nav-link"
                            id="publications-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#publications"
                            type="button"
                            role="tab"
                            aria-controls="publications"
                            aria-selected="false"
                        >
                            Publications
                        </button>
                        <button
                            className="nav-link"
                            id="organizations-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#organizations"
                            type="button"
                            role="tab"
                            aria-controls="organizations"
                            aria-selected="false"
                        >
                            Organizations
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="personal-overview"
                        role="tabpanel"
                        aria-labelledby="personal-overview-tab"
                    >
                        <div className="container-fluid add-post card mb-4 b-0 p-0 mt-3">
                            <div className="col-lg-12">
                                <form
                                    onSubmit={handleSubmit(
                                        onSubmitPersonalOverView
                                    )}
                                >
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-8 content-right mb-3">
                                            <div className="row-group">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>Details</h5>
                                                    </div>
                                                    <div className="row card-body g-3">
                                                        <div className="col-6 mb-3 row-fluid">
                                                            <label className="form-label">
                                                                Name
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                id="name"
                                                                {...register(
                                                                    "name"
                                                                )}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-3 row-fluid">
                                                            <label className="form-label">
                                                                Email
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="email"
                                                                id="email"
                                                                {...register(
                                                                    "email"
                                                                )}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-3 row-fluid">
                                                            <label className="form-label">
                                                                Contact No.
                                                            </label>
                                                            <div className="input-group">
                                                                <span className="input-group-text">
                                                                    #
                                                                </span>
                                                                <input
                                                                    className="form-control"
                                                                    type="number"
                                                                    maxLength="11"
                                                                    id="contact_number"
                                                                    {...register(
                                                                        "contact_no"
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-6 mb-3 row-fluid">
                                                            <label className="form-label">
                                                                Occupation
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                {...register(
                                                                    "occupation"
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="mb-3 row-fluid">
                                                            <label className="form-label">
                                                                Biography
                                                            </label>
                                                            <Editor
                                                                className="form-control"
                                                                apiKey="rmaraoxct4iqpbk2ur478gvlxmdpuekuur95ua0latdnclkq"
                                                                onInit={(
                                                                    evt,
                                                                    editor
                                                                ) =>
                                                                    (biographyRef.current =
                                                                        editor)
                                                                }
                                                                initialValue={
                                                                    isset(
                                                                        researcherDetails.biography
                                                                    )
                                                                        ? researcherDetails.biography
                                                                        : data.biography
                                                                }
                                                                init={{
                                                                    height: 620,
                                                                    menubar:
                                                                        "view edit format table",
                                                                    plugins: [
                                                                        "advlist autolink lists link image charmap print preview anchor",
                                                                        "searchreplace visualblocks code fullscreen",
                                                                        "insertdatetime media table paste code help wordcount",
                                                                    ],
                                                                    toolbar:
                                                                        "undo redo | formatselect | " +
                                                                        "bold italic backcolor | alignleft aligncenter " +
                                                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                                                        "removeformat | help",
                                                                    selector:
                                                                        "textarea",
                                                                }}
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
                                                            Researcher Image
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3 row-fluid">
                                                            {isset(
                                                                selectedImage
                                                            ) ? (
                                                                selectedImage && (
                                                                    <div className="display-image mb-2">
                                                                        <img
                                                                            className="img-fluid"
                                                                            src={
                                                                                imagePreview
                                                                            }
                                                                            alt="..."
                                                                        ></img>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div className="display-image mb-2">
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={
                                                                            isset(
                                                                                researcherDetails.image
                                                                            )
                                                                                ? researcherDetails.image
                                                                                : data.image
                                                                        }
                                                                        alt={
                                                                            isset(
                                                                                researcherDetails.name
                                                                            )
                                                                                ? researcherDetails.name
                                                                                : data.name
                                                                        }
                                                                    ></img>
                                                                </div>
                                                            )}
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                placeholder="Select image"
                                                                accept="image/png, image/jpeg"
                                                                onChange={
                                                                    onSelectImage
                                                                }
                                                                defaultValue={
                                                                    isset(
                                                                        researcherDetails.image
                                                                    )
                                                                        ? researcherDetails.image
                                                                        : data.image
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-fluid">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>Agency</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3 row-fluid">
                                                            <Select
                                                                isClearable
                                                                options={agency.data.map(
                                                                    (
                                                                        agency
                                                                    ) => ({
                                                                        value: agency.id,
                                                                        label: agency.agency_name,
                                                                    })
                                                                )}
                                                                value={
                                                                    selectedAgency
                                                                }
                                                                onChange={
                                                                    setSelectedAgency
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-fluid">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>
                                                            Place of Assignment
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3 row-fluid">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                id="placeOfAssignment"
                                                                {...register(
                                                                    "place_of_assignment"
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-fluid">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>
                                                            Curriculum Vitae
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
                                                                            style={{
                                                                                cursor: "default",
                                                                            }}
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
                                                                                    researcherDetails.curriculum_vitae
                                                                                )
                                                                                    ? researcherDetails.curriculum_vitae
                                                                                    : data.curriculum_vitae
                                                                            }
                                                                        >
                                                                            {researcherDetails.curriculum_vitae !=
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
                                                                placeholder="Select image"
                                                                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                onChange={
                                                                    onSelectFile
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 content-left mb-3">
                                            <div className="row-group mt-3">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>Others</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3 row-fluid">
                                                            <label className="form-label">
                                                                Researcher
                                                                Interest
                                                            </label>
                                                            <Editor
                                                                className="form-control"
                                                                apiKey="rmaraoxct4iqpbk2ur478gvlxmdpuekuur95ua0latdnclkq"
                                                                onInit={(
                                                                    evt,
                                                                    editor
                                                                ) =>
                                                                    (researchInterestRef.current =
                                                                        editor)
                                                                }
                                                                initialValue={
                                                                    isset(
                                                                        researcherDetails.research_interest
                                                                    )
                                                                        ? researcherDetails.research_interest
                                                                        : data.research_interest
                                                                }
                                                                init={{
                                                                    height: 500,
                                                                    menubar:
                                                                        "view edit format table",
                                                                    plugins: [
                                                                        "advlist autolink lists link image charmap print preview anchor",
                                                                        "searchreplace visualblocks code fullscreen",
                                                                        "insertdatetime media table paste code help wordcount",
                                                                    ],
                                                                    toolbar:
                                                                        "undo redo | formatselect | " +
                                                                        "bold italic backcolor | alignleft aligncenter " +
                                                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                                                        "removeformat | help",
                                                                    selector:
                                                                        "textarea",
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="mb-3 row-fluid">
                                                            <label className="form-label">
                                                                Expertise
                                                            </label>
                                                            <CreatableSelect
                                                                isMulti
                                                                value={
                                                                    selectedExpertise
                                                                }
                                                                defaultValue={
                                                                    selectedExpertise
                                                                }
                                                                onChange={
                                                                    setSelectedExpertise
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4 col-lg-3 content-right mb-3">
                                            <div className="mb-3 gap-2 d-flex justify-content-center">
                                                <button className="btn btn-info w-50 btn-sm text-white">
                                                    Save
                                                </button>
                                                <NavLink
                                                    className="btn btn-danger w-50 btn-sm"
                                                    to="/admin/dashboard"
                                                >
                                                    Cancel
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div
                        className="tab-pane fade"
                        id="academic-degrees"
                        role="tabpanel"
                        aria-labelledby="academic-degrees-tab"
                    >
                        <div className="card mt-4 mb-4">
                            <div className="card-body">
                                <Button
                                    type="button"
                                    className="btn btn-info btn-sm text-white"
                                    onClick={() =>
                                        addAcademicDegreeModal(data.id)
                                    }
                                >
                                    Add New Academic Degree
                                </Button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="card">
                                <MUIDataTable
                                    title="List of Academic Degrees"
                                    data={state.academicDegrees.map(
                                        (academicDegree, index) => ({
                                            id: index + 1,
                                            school_name:
                                                academicDegree.school_name,
                                            degree: degrees.data
                                                .filter((item) => {
                                                    if (
                                                        JSON.stringify(
                                                            academicDegree.degree_id
                                                        ).includes(item.id)
                                                    ) {
                                                        return item;
                                                    }
                                                })
                                                .map(
                                                    (item) => item.degree_name
                                                ),
                                            program: academicDegree.program,
                                            year: academicDegree.year,
                                            action: (
                                                <div className="d-flex align-items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            editAcademicDegreeModal(
                                                                academicDegree
                                                            )
                                                        }
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            ),
                                        })
                                    )}
                                    options={globalOptions}
                                    columns={academicDegreesColumns}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="tab-pane fade"
                        id="publications"
                        role="tabpanel"
                        aria-labelledby="publications-tab"
                    >
                        <div className="card mt-4 mb-4">
                            <div className="card-body">
                                <Button
                                    type="button"
                                    className="btn btn-info btn-sm text-white"
                                    onClick={() => addPublicationModal(data.id)}
                                >
                                    Add New Publication
                                </Button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="card">
                                <MUIDataTable
                                    title="List of Publications"
                                    data={state.publications.map(
                                        (publication, index) => ({
                                            id: index + 1,
                                            title: publication.title,
                                            description:
                                                publication.description,
                                            type: publication.type,
                                            members: !publication.members
                                                ? null
                                                : JSON.parse(
                                                      publication.members
                                                  ).join(", "),
                                            link: (
                                                <a
                                                    target="_blank"
                                                    href={publication.url}
                                                >
                                                    Link
                                                </a>
                                            ),
                                            action: (
                                                <div className="d-flex align-items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            editPublicationModal(
                                                                publication
                                                            )
                                                        }
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            ),
                                        })
                                    )}
                                    options={globalOptions}
                                    columns={publicationsColumns}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="tab-pane fade"
                        id="organizations"
                        role="tabpanel"
                        aria-labelledby="organizations-tab"
                    >
                        <div className="card mt-4 mb-4">
                            <div className="card-body">
                                <Button
                                    type="button"
                                    className="btn btn-info btn-sm text-white"
                                    onClick={() =>
                                        addOrganizationModal(data.id)
                                    }
                                >
                                    Add New Organization
                                </Button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="card">
                                <MUIDataTable
                                    title="List of Organizations"
                                    data={state.organizations.map(
                                        (organization, index) => ({
                                            id: index + 1,
                                            organization:
                                                organization.organization,
                                            position: organization.position,
                                            address: organization.address,
                                            action: (
                                                <div className="d-flex align-items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            editOrganizationModal(
                                                                organization
                                                            )
                                                        }
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            ),
                                        })
                                    )}
                                    options={globalOptions}
                                    columns={organizationColumns}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
