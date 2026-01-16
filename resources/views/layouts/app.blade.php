<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ElPosturo - @yield('title')</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        body {
            font-family: 'Instrument Sans', sans-serif; /* Sesuai tema kamu */
            background: #f8f9fa;
            margin: 0;
        }
        /* Sedikit fix layout biar sidebar pas */
        .sidebar {
            min-width: 250px;
            min-height: 100vh;
        }
    </style>
</head>

<body>
    
    <div class="d-flex">
        <nav class="sidebar bg-white border-end shadow-sm">
            <div class="p-4">
                <div class="brand h4 fw-bold mb-1 text-primary">ElPosturo</div>
                <div class="small text-muted mb-4">Postur Reminder System</div>

                <div class="list-group list-group-flush">
                    <a href="{{ route('dashboard') }}" class="list-group-item list-group-item-action border-0 rounded mb-2 {{ Request::is('/') ? 'active' : '' }}">
                        <i class="bi bi-grid me-2"></i> Dashboard
                    </a>
                    <a href="{{ route('riwayat') }}" class="list-group-item list-group-item-action border-0 rounded {{ Request::is('riwayat') ? 'active' : '' }}">
                        <i class="bi bi-clock-history me-2"></i> Riwayat
                    </a>
                </div>
            </div>
        </nav>

        <main class="flex-grow-1 p-4">
            <div class="container-fluid">
                @yield('content')
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

</body>
</html>