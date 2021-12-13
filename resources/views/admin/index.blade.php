<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta content="" name="description">
    <meta content="" name="keywords">


    <title>{{ config('app.name') }} | Admin</title>
    <link rel="icon" href="{{ asset('img/logo-menu.png') }}" type="image/png">

    <link href="{{ asset('admin/plugins/datatables/style.css') }}" rel="stylesheet" /> 

    <link href="{{ asset('admin/css/styles.css') }}" rel="stylesheet" /> 



    <link href="{{ asset('plugins/boxicons/css/boxicons.min.css') }}" rel="stylesheet">

</head>

<body class="sb-nav-fixed">

    <div id="admin_app"></div>
    <script>
        const AUTH_USER = {!! $user->toJson() !!};
    </script>
    <script src="{{ asset('js/admin_app.js') }}?v=<?= date('U') ?>"></script>

    <script src="{{ asset('admin/js/scripts.js') }}"></script> 
 
</body>

</html>