<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta content="" name="description">
    <meta content="" name="keywords">

    <title>{{ config('app.name') }}</title>
    <link rel="icon" href="{{ asset('/img/logo-menu.png') }}" type="image/png">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

    <link href="{{ asset('/plugins/animate.css/animate.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/plugins/aos/aos.css') }}" rel="stylesheet">
    <link href="{{ asset('/plugins/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/plugins/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ asset('/plugins/boxicons/css/boxicons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/plugins/remixicon/remixicon.css') }}" rel="stylesheet">

    <link href="{{ asset('/css/style.css') }}" rel="stylesheet">
</head>




<body>

    <!-- <div id="preloader"></div> -->


    <div id="app"></div>
    <div id="fb-customer-chat"></div>

    <script src="{{ asset('js/app.js') }}?v=<?= date('U') ?>"></script>

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>


    <script src="{{ asset('/plugins/aos/aos.js') }}"></script>
    <script src="{{ asset('/plugins/php-email-form/validate.js') }}"></script>
    <script src="{{ asset('/plugins/purecounter/purecounter.js') }}"></script>
    <script src="{{ asset('/js/main.js') }}"></script>

</body>

</html>