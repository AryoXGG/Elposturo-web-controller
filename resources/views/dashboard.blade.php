@extends('layouts.app')

@section('title', 'Real-time Dashboard')

@section('content')
<!-- Top Bar -->
<div class="top-bar">
    <div class="page-title">
        <h1><i class="fas fa-chart-line"></i> Real-time Monitoring</h1>
        <p>Dashboard pemantauan postur tubuh secara langsung</p>
    </div>
    <div class="connection-status">
        <div class="status-badge" id="connectionBadge">
            <div class="status-dot"></div>
            <span id="connectionText">Connecting...</span>
        </div>
    </div>
</div>

<!-- Hero Status Card (Full Width) -->
<div class="hero-card" id="heroCard">
    <div class="hero-background"></div>
    <div class="hero-content">
        <div class="status-icon-large">
            <i class="fas fa-user-check"></i>
        </div>
        <h2 id="heroStatus">MENUNGGU DATA</h2>
        <p id="heroDescription">Sistem sedang terhubung ke sensor...</p>
        <div class="hero-stats">
            <div class="hero-stat">
                <i class="fas fa-temperature-high"></i>
                <span id="heroTemp">--°C</span>
            </div>
            <div class="hero-stat">
                <i class="fas fa-clock"></i>
                <span id="heroTime">--:--</span>
            </div>
        </div>
    </div>
</div>

<!-- Angle Cards (3 Columns) -->
<div class="angle-cards-row">
    <div class="angle-card gradient-purple">
        <div class="angle-header">
            <i class="fas fa-arrows-alt-v"></i>
            <span>PITCH</span>
        </div>
        <div class="angle-display">
            <div class="angle-value" id="pitchAngle">0.00°</div>
            <div class="angle-label">Depan/Belakang</div>
        </div>
        <div class="angle-progress">
            <div class="progress-bar" id="pitchProgress"></div>
        </div>
    </div>

    <div class="angle-card gradient-blue">
        <div class="angle-header">
            <i class="fas fa-arrows-alt-h"></i>
            <span>ROLL</span>
        </div>
        <div class="angle-display">
            <div class="angle-value" id="rollAngle">0.00°</div>
            <div class="angle-label">Kiri/Kanan</div>
        </div>
        <div class="angle-progress">
            <div class="progress-bar" id="rollProgress"></div>
        </div>
    </div>

    <div class="angle-card gradient-pink">
        <div class="angle-header">
            <i class="fas fa-exclamation-triangle"></i>
            <span>DEVIASI</span>
        </div>
        <div class="angle-display">
            <div class="angle-value" id="deviationAngle">0.00°</div>
            <div class="angle-label">Total Kemiringan</div>
        </div>
        <div class="angle-progress">
            <div class="progress-bar deviation" id="deviationProgress"></div>
        </div>
    </div>
</div>

<!-- Canvas + Device Info (2 Columns) -->
<div class="bottom-grid">
    <!-- Canvas Visualization -->
    <div class="glass-card canvas-card">
        <div class="card-header-modern">
            <i class="fas fa-crosshairs"></i>
            <h3>Visualisasi Postur</h3>
        </div>
        <div class="canvas-container">
            <canvas id="postureCanvas" width="400" height="450"></canvas>
        </div>
        <div class="canvas-legend">
            <div class="legend-item">
                <span class="dot green"></span>
                <span>Normal (&lt;15°)</span>
            </div>
            <div class="legend-item">
                <span class="dot orange"></span>
                <span>Warning (15-30°)</span>
            </div>
            <div class="legend-item">
                <span class="dot red"></span>
                <span>Danger (&gt;30°)</span>
            </div>
        </div>
    </div>

    <!-- Device Information -->
    <div class="glass-card info-card">
        <div class="card-header-modern">
            <i class="fas fa-microchip"></i>
            <h3>Device Information</h3>
        </div>
        <div class="info-grid">
            <div class="info-row">
                <span class="info-label"><i class="fas fa-tag"></i> Device ID</span>
                <span class="info-value" id="deviceId">-</span>
            </div>
            <div class="info-row">
                <span class="info-label"><i class="fas fa-thermometer-half"></i> Temperature</span>
                <span class="info-value" id="deviceTemp">-</span>
            </div>
            <div class="info-row">
                <span class="info-label"><i class="fas fa-exclamation-circle"></i> Warning Level</span>
                <span class="info-value">
                    <span class="warning-badge" id="warningBadge">-</span>
                </span>
            </div>
            <div class="info-row">
                <span class="info-label"><i class="fas fa-clock"></i> Last Update</span>
                <span class="info-value timestamp" id="lastUpdate">-</span>
            </div>
        </div>

        <!-- Real-time Stats -->
        <div class="stats-section">
            <h4><i class="fas fa-chart-bar"></i> Live Statistics</h4>
            <div class="stat-item">
                <div class="stat-circle green">
                    <i class="fas fa-check"></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Status Sistem</span>
                    <span class="stat-value" id="systemStatus">Active</span>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-circle blue">
                    <i class="fas fa-wifi"></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Koneksi</span>
                    <span class="stat-value" id="connectionStatus">Real-time</span>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('additional-css')
<style>
/* Layout Fix */
.hero-card {
    margin-bottom: 25px;
}

.angle-cards-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 25px;
}

.bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
}

/* Canvas Enhancement */
.canvas-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
    border-radius: 15px;
    padding: 20px;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
}

#postureCanvas {
    border-radius: 15px;
    background: transparent;
    display: block;
}

.canvas-legend {
    margin-top: 20px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--gray-700);
    font-weight: 600;
}

.legend-item .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
}

.dot.green { background: var(--success); }
.dot.orange { background: var(--warning); }
.dot.red { background: var(--danger); }

/* Device Info Card Enhancement */
.info-card {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.stats-section {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 2px solid var(--gray-100);
}

.stats-section h4 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--gray-900);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: var(--gray-50);
    border-radius: 12px;
    margin-bottom: 12px;
    transition: all 0.3s;
}

.stat-item:hover {
    background: var(--gray-100);
    transform: translateX(5px);
}

.stat-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: white;
}

.stat-circle.green {
    background: linear-gradient(135deg, var(--success), #059669);
}

.stat-circle.blue {
    background: linear-gradient(135deg, var(--info), #2563eb);
}

.stat-info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.stat-label {
    font-size: 0.85rem;
    color: var(--gray-600);
    font-weight: 600;
}

.stat-value {
    font-size: 1rem;
    color: var(--gray-900);
    font-weight: 700;
}

/* Responsive */
@media (max-width: 1200px) {
    .bottom-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .angle-cards-row {
        grid-template-columns: 1fr;
    }
}
</style>
@endsection

@section('additional-js')
<script src="{{ asset('js/dashboard.js') }}"></script>
@endsection
