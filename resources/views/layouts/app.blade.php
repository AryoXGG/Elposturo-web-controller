<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ElPosturo - @yield('title')</title>
    <link rel="stylesheet" href="/resources/css/app.css">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity=""
        crossorigin="anonymous">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        /* Minimal reset for blade preview when vite is not running */
        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f6f7f9;
            margin: 0;
        }
    </style>
</head>

<body>
    
    <div class="d-flex">
        <nav class="sidebar bg-light border-end">
            <div class="p-3">
                <div class="brand h5 mb-1">ElPosturo</div>
                <div class="small text-muted mb-3">Postur Reminder System</div>

                <div class="list-group">
                    <a href="{{ route('dashboard') }}" class="list-group-item list-group-item-action">DashBoard</a>
                    <a href="{{ route('riwayat') }}" class="list-group-item list-group-item-action">Riwayat</a>
                </div>
            </div>
        </nav>

        <main class="grow p-4">
            <div class="container-fluid">
                @yield('content')
            </div>
        </main>
    </div>

    <!-- Bootstrap JS bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity=""
        crossorigin="anonymous"></script>
    <script src="/resources/js/app.js" defer></script>

</body>

</html>