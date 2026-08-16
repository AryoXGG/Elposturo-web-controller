<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ElPosturo - Smart Posture Monitoring System</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: #0f0f23;
            color: white;
            overflow-x: hidden;
        }
        
        /* Animated Background */
        .hero-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }
        
        .gradient-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.6;
            animation: float 20s ease-in-out infinite;
        }
        
        .orb-1 {
            width: 500px;
            height: 500px;
            background: #667eea;
            top: -250px;
            left: -250px;
            animation-delay: 0s;
        }
        
        .orb-2 {
            width: 400px;
            height: 400px;
            background: #f093fb;
            bottom: -200px;
            right: -200px;
            animation-delay: 7s;
        }
        
        .orb-3 {
            width: 350px;
            height: 350px;
            background: #764ba2;
            top: 50%;
            left: 50%;
            animation-delay: 14s;
        }
        
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        /* Container */
        .hero-container {
            position: relative;
            z-index: 1;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        }
        
        .hero-content {
            max-width: 1200px;
            width: 100%;
            text-align: center;
        }
        
        /* Logo Animation */
        .logo-hero {
            font-size: 6rem;
            margin-bottom: 30px;
            animation: pulse 2s ease-in-out infinite;
            filter: drop-shadow(0 10px 30px rgba(255,255,255,0.3));
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        h1 {
            font-size: 5rem;
            font-weight: 900;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 5px 20px rgba(0,0,0,0.3);
            animation: slideDown 1s ease-out;
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .tagline {
            font-size: 1.8rem;
            margin-bottom: 50px;
            opacity: 0.95;
            animation: slideUp 1s ease-out 0.3s both;
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 60px 0;
            animation: fadeIn 1s ease-out 0.6s both;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 40px 30px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .feature-card:hover {
            transform: translateY(-10px) scale(1.02);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .feature-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            display: inline-block;
            transition: transform 0.3s;
        }
        
        .feature-card:hover .feature-icon {
            transform: rotateY(360deg);
        }
        
        .feature-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .feature-desc {
            font-size: 1rem;
            opacity: 0.9;
            line-height: 1.6;
        }
        
        /* CTA Buttons */
        .cta-buttons {
            display: flex;
            gap: 25px;
            justify-content: center;
            flex-wrap: wrap;
            margin: 50px 0;
        }
        
        .btn-hero {
            padding: 18px 45px;
            border: none;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: 700;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .btn-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }
        
        .btn-hero:hover::before {
            left: 100%;
        }
        
        .btn-primary {
            background: white;
            color: #667eea;
            box-shadow: 0 10px 40px rgba(255,255,255,0.3);
        }
        
        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 50px rgba(255,255,255,0.4);
        }
        
        .btn-secondary {
            background: transparent;
            color: white;
            border: 3px solid white;
        }
        
        .btn-secondary:hover {
            background: white;
            color: #667eea;
            transform: translateY(-3px);
        }
        
        /* Stats */
        .stats-section {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 60px;
            flex-wrap: wrap;
        }
        
        .stat-box {
            text-align: center;
            padding: 30px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            min-width: 180px;
            transition: all 0.3s;
        }
        
        .stat-box:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .stat-number {
            font-size: 3.5rem;
            font-weight: 900;
            display: block;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .stat-label {
            font-size: 1rem;
            opacity: 0.9;
            font-weight: 600;
        }
        
        /* Floating Animation */
        @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .feature-card:nth-child(1) { animation: floatSlow 6s ease-in-out infinite; }
        .feature-card:nth-child(2) { animation: floatSlow 7s ease-in-out infinite; }
        .feature-card:nth-child(3) { animation: floatSlow 8s ease-in-out infinite; }
        .feature-card:nth-child(4) { animation: floatSlow 9s ease-in-out infinite; }
        
        /* Responsive */
        @media (max-width: 768px) {
            h1 { font-size: 3rem; }
            .tagline { font-size: 1.2rem; }
            .logo-hero { font-size: 4rem; }
            .stats-section { gap: 30px; }
        }
    </style>
</head>
<body>
    <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
    </div>

    <div class="hero-container">
        <div class="hero-content">
            <div class="logo-hero">🧘</div>
            <h1>ElPosturo</h1>
            <p class="tagline">Your Smart IoT-Based Posture Monitoring System</p>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <div class="feature-title">Real-time Monitoring</div>
                    <div class="feature-desc">Monitor postur tubuh secara real-time dengan sensor MPU6050 dan visualisasi interaktif</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📳</div>
                    <div class="feature-title">Smart Alert System</div>
                    <div class="feature-desc">Peringatan getaran otomatis ketika postur buruk terdeteksi untuk mencegah cedera</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">☁️</div>
                    <div class="feature-title">Cloud Connected</div>
                    <div class="feature-desc">Data tersimpan aman di Firebase Cloud untuk akses dari mana saja</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📈</div>
                    <div class="feature-title">Data Analytics</div>
                    <div class="feature-desc">Analisis riwayat postur dengan export CSV untuk evaluasi jangka panjang</div>
                </div>
            </div>
            
            <div class="cta-buttons">
                <a href="{{ route('dashboard') }}" class="btn-hero btn-primary">
                    <i class="fas fa-chart-line"></i>
                    Mulai Monitoring
                </a>
                <a href="{{ route('riwayat') }}" class="btn-hero btn-secondary">
                    <i class="fas fa-history"></i>
                    Lihat Riwayat
                </a>
            </div>
            
            <div class="stats-section">
                <div class="stat-box">
                    <span class="stat-number" id="deviceCount">1</span>
                    <span class="stat-label">Active Device</span>
                </div>
                <div class="stat-box">
                    <span class="stat-number" id="recordCount">0</span>
                    <span class="stat-label">Total Records</span>
                </div>
                <div class="stat-box">
                    <span class="stat-number">24/7</span>
                    <span class="stat-label">Monitoring</span>
                </div>
            </div>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>
    
    <script>
        const firebaseConfig = {
            apiKey: "AIzaSyDl5degKhQkT-TPoDHjxSN960uqGE9oB0A",
            authDomain: "elposturo-b4950.firebaseapp.com",
            databaseURL: "https://elposturo-b4950-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "elposturo-b4950",
            storageBucket: "elposturo-b4950.firebasestorage.app",
            messagingSenderId: "417734727583",
            appId: "1:417734727583:web:5e4beb2a7e8c5b47cc8faa"
        };
        
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        
        // Get record count
        database.ref('posture_monitoring/device_001/history').limitToLast(1).once('value', (snapshot) => {
            let count = 0;
            snapshot.forEach(() => count++);
            document.getElementById('recordCount').textContent = count;
            
            // Animate count
            animateCount('recordCount', count);
        });
        
        function animateCount(id, target) {
            const element = document.getElementById(id);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 30);
        }
    </script>
</body>
</html>
