<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'ElPosturo') - Smart Posture Monitoring</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    @vite(['resources/css/app.css'])
    
    <!-- Firebase SDK v8 (Compat Mode) - CDN -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    
    @yield('additional-css')
</head>
<body>
    <div class="animated-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
    </div>

    <div class="container">
        <aside class="sidebar">
            <div class="logo-container">
                <div class="logo-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="logo-text">
                    <h2>ElPosturo</h2>
                    <p>Smart Posture System</p>
                </div>
            </div>
            
            <nav class="nav-menu">
                <a href="{{ route('dashboard') }}" class="nav-item {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                    <i class="fas fa-chart-line"></i>
                    <span>Real-time Monitor</span>
                </a>
                <a href="{{ route('riwayat') }}" class="nav-item {{ request()->routeIs('riwayat') ? 'active' : '' }}">
                    <i class="fas fa-history"></i>
                    <span>Data History</span>
                </a>
            </nav>
            
            <div class="sidebar-stats">
                <div class="stat-mini">
                    <i class="fas fa-microchip"></i>
                    <div>
                        <span class="stat-label">Device Status</span>
                        <span class="stat-value">
                            <span class="pulse-dot"></span> Active
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="sidebar-footer">
                <div class="footer-info">
                    <p>© 2026 ElPosturo</p>
                    <p class="version">Version 1.0.0</p>
                </div>
                <div class="footer-badge">
                    <i class="fas fa-shield-alt"></i>
                    IoT Powered
                </div>
            </div>
        </aside>

        <main class="main-content">
            @yield('content')
        </main>
    </div>

    <!-- Firebase Config -->
    <script>
        // Firebase Configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDl5degKhQkT-TPoDHjxSN960uqGE9oB0A",
            authDomain: "elposturo-b4950.firebaseapp.com",
            databaseURL: "https://elposturo-b4950-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "elposturo-b4950",
            storageBucket: "elposturo-b4950.firebasestorage.app",
            messagingSenderId: "417734727583",
            appId: "1:417734727583:web:5e4beb2a7e8c5b47cc8faa"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        
        console.log('✅ Firebase initialized (CDN v8)');
        console.log('📡 Database URL:', firebaseConfig.databaseURL);
    </script>
    
    @yield('additional-js')
</body>
</html>
