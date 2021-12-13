<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Admin</title>
    <link rel="icon" href="../assets/img/logo-menu.png" type="image/png">

    <link href="assets/vendor/datatables/style.css" rel="stylesheet" />

    <link href="assets/css/styles.css" rel="stylesheet" />

    <link href="../assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">

</head>

<body class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">

        <a class="navbar-brand ps-3" href="index.html">
            <img class="img-fluid" src="../assets/img/logo-white-text.png" alt="Logo">
        </a>


        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                class='bx bx-menu'></i></button>
        <h3 class=""><a class="navbar-brand ps-3" href="../index.html">
                Visit Site
            </a></h3>
        <ul class="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false"><i class='bx bxs-user'></i></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#!">Settings</a></li>
                    <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item" href="#!">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading"></div>
                        <a class="nav-link active" href="index.html">
                            <div class="sb-nav-link-icon"><i class='bx bx-tachometer'></i></div>
                            Dashboard
                        </a>
                        <div class="sb-sidenav-menu-heading">CONTENT</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePost"
                            aria-expanded="false" aria-controls="collapsePost">
                            <div class="sb-nav-link-icon"><i class='bx bxs-file-blank'></i></div>
                            Post
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapsePost" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Post</a>
                                <a class="nav-link" href="#">Add Post</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePage"
                            aria-expanded="false" aria-controls="collapsePage">
                            <div class="sb-nav-link-icon"><i class='bx bxs-file'></i></div>
                            Page
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapsePage" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Page</a>
                                <a class="nav-link" href="#">Add Page</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseEvents" aria-expanded="false" aria-controls="collapseEvents">
                            <div class="sb-nav-link-icon"><i class='bx bx-calendar'></i></div>
                            Events
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapseEvents" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Events</a>
                                <a class="nav-link" href="#">Add Events</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseProject" aria-expanded="false" aria-controls="collapseProject">
                            <div class="sb-nav-link-icon"><i class='bx bxs-network-chart'></i></div>
                            Project
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapseProject" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Project</a>
                                <a class="nav-link" href="#">Add Project</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseCommodity" aria-expanded="false" aria-controls="collapseCommodity">
                            <div class="sb-nav-link-icon"><i class='bx bxs-tree'></i></div>
                            Commodity
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapseCommodity" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Commodity</a>
                                <a class="nav-link" href="#">Add Commodity</a>
                            </nav>
                        </div>
                        <div class="sb-sidenav-menu-heading">CONSORTIUM AGENCIES</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseAgency" aria-expanded="false" aria-controls="collapseAgency">
                            <div class="sb-nav-link-icon"><i class='bx bxs-building'></i></div>
                            Agencies
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapseAgency" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Agencies</a>
                                <a class="nav-link" href="#">Add Agency</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLogo"
                            aria-expanded="false" aria-controls="collapseLogo">
                            <div class="sb-nav-link-icon"><i class='bx bxs-file-image'></i></div>
                            Logo
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapseLogo" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Logos</a>
                                <a class="nav-link" href="#">Add Logo</a>
                            </nav>
                        </div>
                        <div class="sb-sidenav-menu-heading">USER MANAGEMENT</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseUser"
                            aria-expanded="false" aria-controls="collapseUser">
                            <div class="sb-nav-link-icon"><i class='bx bxs-user-account'></i></div>
                            User Account
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapseUser" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Users</a>
                                <a class="nav-link" href="#">Add User</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseStaff"
                            aria-expanded="false" aria-controls="collapseStaff">
                            <div class="sb-nav-link-icon"><i class='bx bxs-user-circle'></i></div>
                            Staff
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapseStaff" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">View Staff</a>
                                <a class="nav-link" href="#">Add Staff</a>
                            </nav>
                        </div>
                        <div class="sb-sidenav-menu-heading">Global</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseGlobal" aria-expanded="false" aria-controls="collapseGlobal">
                            <div class="sb-nav-link-icon"><i class='bx bx-globe'></i></div>
                            Global
                            <div class="sb-sidenav-collapse-arrow"><i class='bx bxs-chevron-down'></i></div>
                        </a>
                        <div class="collapse" id="collapseGlobal" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="#">Header</a>
                                <a class="nav-link" href="#">Footer</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Dashboard</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div class="row">
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-aqua text-white mb-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-7 inner">
                                            <h3>150</h3>
                                            <p>Research</p>
                                        </div>
                                        <div class="col-5 icon">
                                            <i class='bx bxs-file-find'></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-green text-white mb-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-7 inner">
                                            <h3>150</h3>
                                            <p>Projects</p>
                                        </div>
                                        <div class="col-5 icon">
                                            <i class='bx bx-task'></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-yellow text-white mb-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-7 inner">
                                            <h3>150</h3>
                                            <p>Commodity</p>
                                        </div>
                                        <div class="col-5 icon">
                                            <i class='bx bxs-box'></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-red text-white mb-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-7 inner">
                                            <h3>150</h3>
                                            <p>Events</p>
                                        </div>
                                        <div class="col-5 icon">
                                            <i class='bx bx-calendar'></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class='bx bxs-chevron-right'></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; SMAARRDEC 2021</div>
                    </div>
                </div>
            </footer>
        </div>
    </div>

    <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/scripts.js"></script>
    <script src="assets/demo/chart-area-demo.js"></script>
    <script src="assets/demo/chart-bar-demo.js"></script>
    <script src="assets/vendor/datatables/simple-datatables.js"></script>

    <script src="assets/js/datatables-simple-demo.js"></script>
</body>

</html>