@extends('layouts.app')

@section('title', 'Data History')

@section('content')
<!-- Top Bar -->
<div class="top-bar">
    <div class="page-title">
        <h1><i class="fas fa-history"></i> Data History</h1>
        <p>Riwayat monitoring postur tubuh</p>
    </div>
    <div class="stats-mini">
        <div class="stat-badge">
            <i class="fas fa-database"></i>
            <div>
                <span class="stat-number" id="totalRecordsTop">0</span>
                <span class="stat-text">Total Records</span>
            </div>
        </div>
    </div>
</div>

<!-- Filter Section -->
<div class="glass-card filter-card">
    <div class="filter-row">
        <div class="filter-group">
            <label><i class="fas fa-microchip"></i> Device</label>
            <select id="filterDevice" class="filter-select">
                <option value="all">Semua Device</option>
                <option value="device_001">Device 001</option>
            </select>
        </div>
        <div class="filter-group">
            <label><i class="fas fa-calendar"></i> Tanggal</label>
            <input type="date" id="filterDate" class="filter-input">
        </div>
        <div class="filter-group">
            <label><i class="fas fa-filter"></i> Warning Level</label>
            <select id="filterWarning" class="filter-select">
                <option value="all">Semua Level</option>
                <option value="NORMAL">Normal</option>
                <option value="SEDANG">Sedang</option>
                <option value="TINGGI">Tinggi</option>
            </select>
        </div>
        <div class="filter-actions">
            <button class="btn-modern btn-primary" onclick="exportData()">
                <i class="fas fa-download"></i>
                Export CSV
            </button>
            <button class="btn-modern btn-secondary" onclick="clearFilters()">
                <i class="fas fa-times"></i>
                Clear
            </button>
        </div>
    </div>
</div>

<!-- Table Section -->
<div class="glass-card table-card">
    <div class="table-header">
        <h3><i class="fas fa-table"></i> History Data</h3>
        <div class="table-actions">
            <span class="record-count" id="recordCount">Showing 0 records</span>
        </div>
    </div>
    
    <div class="table-wrapper">
        <table class="modern-table">
            <thead>
                <tr>
                    <th><i class="fas fa-calendar"></i> Tanggal</th>
                    <th><i class="fas fa-clock"></i> Waktu</th>
                    <th><i class="fas fa-arrows-alt-v"></i> Pitch</th>
                    <th><i class="fas fa-arrows-alt-h"></i> Roll</th>
                    <th><i class="fas fa-exclamation-triangle"></i> Deviasi</th>
                    <th><i class="fas fa-user"></i> Status Postur</th>
                    <th><i class="fas fa-flag"></i> Warning</th>
                    <th><i class="fas fa-thermometer-half"></i> Suhu</th>
                    <th><i class="fas fa-chart-line"></i> Aksi</th>
                </tr>
            </thead>
            <tbody id="historyTableBody">
                <tr>
                    <td colspan="9" class="loading-cell">
                        <div class="loader-container">
                            <div class="modern-loader"></div>
                            <p>Loading data history...</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="table-footer">
        <div class="pagination-info">
            <span id="paginationInfo">Page 1 of 1</span>
        </div>
        <div class="pagination-controls">
            <button class="btn-page" onclick="firstPage()" id="btnFirst">
                <i class="fas fa-angle-double-left"></i>
            </button>
            <button class="btn-page" onclick="prevPage()" id="btnPrev">
                <i class="fas fa-angle-left"></i>
            </button>
            <button class="btn-page" onclick="nextPage()" id="btnNext">
                <i class="fas fa-angle-right"></i>
            </button>
            <button class="btn-page" onclick="lastPage()" id="btnLast">
                <i class="fas fa-angle-double-right"></i>
            </button>
        </div>
        <div class="page-size-selector">
            <label>Show:</label>
            <select id="pageSize" onchange="changePageSize()">
                <option value="10">10</option>
                <option value="20" selected>20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    </div>
</div>
@endsection

@section('additional-css')
<style>
.empty-state,
.error-state {
    text-align: center;
    padding: 60px 20px;
}

.empty-icon,
.error-icon {
    font-size: 4rem;
    margin-bottom: 20px;
}

.empty-state p,
.error-state p {
    font-size: 1.1rem;
    color: var(--gray-600);
    margin-bottom: 15px;
}

.btn-retry {
    padding: 10px 20px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
}

.btn-retry:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
}

.table-row-animated {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.angle-cell {
    font-family: 'Courier New', monospace;
    font-weight: 700;
    color: var(--primary);
}

.angle-cell.deviation {
    color: var(--danger);
}

.status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
}

.status-normal {
    background: #d1fae5;
    color: #065f46;
}

.status-warning {
    background: #fef3c7;
    color: #92400e;
}

.status-danger {
    background: #fee2e2;
    color: #991b1b;
}

.warning-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
}

.badge-normal {
    background: #d1fae5;
    color: #065f46;
}

.badge-warning {
    background: #fef3c7;
    color: #92400e;
}

.badge-danger {
    background: #fee2e2;
    color: #991b1b;
}

.btn-action {
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;
}

.btn-detail {
    background: var(--info);
    color: white;
}

.btn-detail:hover {
    background: #2563eb;
    transform: scale(1.1);
}
</style>
@endsection

@section('additional-js')
<script src="{{ asset('js/riwayat.js') }}"></script>
@endsection
