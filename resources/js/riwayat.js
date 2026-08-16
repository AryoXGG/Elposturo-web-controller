const DEVICE_ID = 'device_001';
const DEFAULT_PAGE_SIZE = 20;

let historyData = [];
let filteredData = [];
let currentPage = 1;
let pageSize = DEFAULT_PAGE_SIZE;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Riwayat page initialized');
    
    loadHistoryData();
    setupFilters();
    setupPageSize();
});

// ========================================
// LOAD DATA FROM FIREBASE
// ========================================

function loadHistoryData() {
    const historyRef = database.ref(`posture_monitoring/${DEVICE_ID}/history`)
        .orderByChild('timestamp')
        .limitToLast(500); // Ambil 500 data terakhir
    
    console.log('👂 Loading history data...');
    
    historyRef.on('value', (snapshot) => {
        historyData = [];
        
        snapshot.forEach((childSnapshot) => {
            historyData.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Urutkan dari terbaru
        historyData.reverse();
        
        console.log(`📊 Loaded ${historyData.length} records`);
        
        // Update total records
        document.getElementById('totalRecords').textContent = 
            `Total: ${historyData.length} records`;
        
        // Apply filters
        applyFilters();
    }, (error) => {
        console.error('❌ Error loading history:', error);
        showError('Gagal memuat data riwayat');
    });
}

// ========================================
// FILTERS
// ========================================

function setupFilters() {
    document.getElementById('filterDevice').addEventListener('change', applyFilters);
    document.getElementById('filterDate').addEventListener('change', applyFilters);
}

function applyFilters() {
    const deviceFilter = document.getElementById('filterDevice').value;
    const dateFilter = document.getElementById('filterDate').value;
    
    filteredData = historyData.filter(item => {
        let match = true;
        
        // Filter by device
        if (deviceFilter !== 'all') {
            match = match && item.device_id === deviceFilter;
        }
        
        // Filter by date
        if (dateFilter) {
            const itemDate = new Date(item.timestamp);
            const filterDate = new Date(dateFilter);
            
            match = match && 
                itemDate.getDate() === filterDate.getDate() &&
                itemDate.getMonth() === filterDate.getMonth() &&
                itemDate.getFullYear() === filterDate.getFullYear();
        }
        
        return match;
    });
    
    console.log(`🔍 Filtered: ${filteredData.length} / ${historyData.length} records`);
    
    // Reset to page 1
    currentPage = 1;
    renderTable();
}

// ========================================
// RENDER TABLE
// ========================================

function renderTable() {
    const tbody = document.getElementById('historyTable');
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" class="no-data">
                    <div>📭</div>
                    <p>Belum ada data riwayat</p>
                </td>
            </tr>
        `;
        updatePagination();
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, filteredData.length);
    const pageData = filteredData.slice(start, end);
    
    // Render rows
    tbody.innerHTML = pageData.map((item, index) => {
        const date = new Date(item.timestamp);
        const dateStr = date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const timeStr = date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Calculate status akhir based on warning level
        let statusAkhir = '';
        let badgeClass = '';
        
        if (item.warning_level === 'NORMAL') {
            statusAkhir = 'BAIK';
            badgeClass = 'badge-normal';
        } else if (item.warning_level === 'SEDANG') {
            statusAkhir = 'WARNING';
            badgeClass = 'badge-sedang';
        } else if (item.warning_level === 'TINGGI') {
            statusAkhir = 'BURUK';
            badgeClass = 'badge-tinggi';
        }
        
        // Calculate jumlah bungkuk (simplified - bisa dikembangkan)
        const jmlBungkuk = item.deviation > 15 ? '1' : '-';
        
        return `
            <tr>
                <td>${dateStr}</td>
                <td>${timeStr}</td>
                <td>-</td>
                <td>${item.pitch.toFixed(2)}°</td>
                <td>${item.roll.toFixed(2)}°</td>
                <td><strong>${item.deviation.toFixed(2)}°</strong></td>
                <td>${item.status}</td>
                <td><span class="badge ${badgeClass}">${item.warning_level}</span></td>
                <td>${item.temperature}°C</td>
                <td>${jmlBungkuk}</td>
                <td><span class="badge ${badgeClass}">${statusAkhir}</span></td>
            </tr>
        `;
    }).join('');
    
    updatePagination();
}

// ========================================
// PAGINATION
// ========================================

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const pageInfo = document.getElementById('pageInfo');
    
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Disable/enable buttons
    const prevBtn = document.querySelector('.pagination .btn-sm:nth-child(2)');
    const nextBtn = document.querySelector('.pagination .btn-sm:nth-child(4)');
    
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
}

function firstPage() {
    currentPage = 1;
    renderTable();
    console.log('⏮️ First page');
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
        console.log(`◀️ Previous page: ${currentPage}`);
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
        console.log(`▶️ Next page: ${currentPage}`);
    }
}

function lastPage() {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    currentPage = totalPages || 1;
    renderTable();
    console.log('⏭️ Last page');
}

function setupPageSize() {
    document.getElementById('pageSize').addEventListener('change', changePageSize);
}

function changePageSize() {
    pageSize = parseInt(document.getElementById('pageSize').value);
    currentPage = 1;
    renderTable();
    console.log(`📏 Page size changed: ${pageSize}`);
}

// ========================================
// EXPORT TO CSV
// ========================================

function exportData() {
    if (filteredData.length === 0) {
        alert('⚠️ Tidak ada data untuk di-export');
        return;
    }
    
    console.log('📥 Exporting data...');
    
    // CSV Headers
    const headers = [
        'Timestamp',
        'Tanggal',
        'Jam',
        'Device ID',
        'Pitch (°)',
        'Roll (°)',
        'Deviasi (°)',
        'Status',
        'Warning Level',
        'Suhu (°C)'
    ];
    
    // CSV Rows
    const rows = filteredData.map(item => {
        const date = new Date(item.timestamp);
        const dateStr = date.toLocaleDateString('id-ID');
        const timeStr = date.toLocaleTimeString('id-ID');
        
        return [
            item.timestamp,
            dateStr,
            timeStr,
            item.device_id,
            item.pitch.toFixed(2),
            item.roll.toFixed(2),
            item.deviation.toFixed(2),
            item.status,
            item.warning_level,
            item.temperature
        ];
    });
    
    // Build CSV content
    let csvContent = headers.join(',') + '\n';
    csvContent += rows.map(row => row.join(',')).join('\n');
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const filename = `elposturo-history-${new Date().toISOString().split('T')[0]}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`✅ Exported: ${filename}`);
    alert(`✅ Data berhasil di-export!\n\nFile: ${filename}\nRecords: ${filteredData.length}`);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showError(message) {
    const tbody = document.getElementById('historyTable');
    tbody.innerHTML = `
        <tr>
            <td colspan="11" class="no-data">
                <div>❌</div>
                <p>${message}</p>
            </td>
        </tr>
    `;
}

// Log
console.log('✅ Riwayat.js loaded');
