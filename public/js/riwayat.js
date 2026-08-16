// public/js/riwayat.js

const DEVICE_ID = 'device_001';
let allHistoryData = [];
let filteredData = [];
let currentPage = 1;
let pageSize = 20;

console.log('📜 Riwayat.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM Ready - Riwayat Page');
    loadHistoryData();
    setupEventListeners();
});

// ========================================
// LOAD HISTORY FROM FIREBASE
// ========================================
function loadHistoryData() {
    console.log('📥 Loading history data from Firebase...');
    
    const historyRef = database.ref(`posture_monitoring/${DEVICE_ID}/history`);
    
    historyRef.orderByChild('timestamp').limitToLast(500).once('value')
        .then(snapshot => {
            allHistoryData = [];
            
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                data.id = childSnapshot.key;
                allHistoryData.push(data);
            });
            
            // Sort descending (newest first)
            allHistoryData.sort((a, b) => b.timestamp - a.timestamp);
            
            console.log(`✅ Loaded ${allHistoryData.length} records`);
            
            filteredData = [...allHistoryData];
            updateRecordCount();
            renderTable();
            
        })
        .catch(error => {
            console.error('❌ Error loading history:', error);
            showErrorState();
        });
}

// ========================================
// RENDER TABLE
// ========================================
function renderTable() {
    const tbody = document.getElementById('historyTableBody');
    
    if (!tbody) {
        console.error('❌ Table body not found');
        return;
    }
    
    tbody.innerHTML = '';
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-state">
                    <div class="empty-icon">📭</div>
                    <p>Tidak ada data history</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);
    currentPage = Math.min(currentPage, Math.max(1, totalPages));
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredData.length);
    const pageData = filteredData.slice(startIndex, endIndex);
    
    // Render rows
    pageData.forEach(record => {
        const row = createTableRow(record);
        tbody.innerHTML += row;
    });
    
    updatePagination();
    console.log(`✅ Rendered ${pageData.length} rows (Page ${currentPage}/${totalPages})`);
}

function createTableRow(data) {
    const timestamp = new Date(data.timestamp);
    const tanggal = timestamp.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const waktu = timestamp.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Warning badge class
    let warningClass = 'badge-normal';
    if (data.warning_level === 'SEDANG') warningClass = 'badge-warning';
    if (data.warning_level === 'TINGGI') warningClass = 'badge-danger';
    
    // Status color
    let statusClass = 'status-normal';
    if (data.warning_level === 'SEDANG') statusClass = 'status-warning';
    if (data.warning_level === 'TINGGI') statusClass = 'status-danger';
    
    return `
        <tr class="table-row-animated">
            <td>${tanggal}</td>
            <td>${waktu}</td>
            <td class="angle-cell">${data.pitch?.toFixed(2) || '0.00'}°</td>
            <td class="angle-cell">${data.roll?.toFixed(2) || '0.00'}°</td>
            <td class="angle-cell deviation">${data.deviation?.toFixed(2) || '0.00'}°</td>
            <td><span class="status-badge ${statusClass}">${data.status || '-'}</span></td>
            <td><span class="warning-badge ${warningClass}">${data.warning_level || '-'}</span></td>
            <td>${data.temperature?.toFixed(1) || '-'}°C</td>
            <td>
                <button class="btn-action btn-detail" onclick="showDetailModal('${data.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `;
}

function showErrorState() {
    const tbody = document.getElementById('historyTableBody');
    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="error-state">
                    <div class="error-icon">⚠️</div>
                    <p>Gagal memuat data</p>
                    <button class="btn-retry" onclick="loadHistoryData()">
                        <i class="fas fa-redo"></i> Coba Lagi
                    </button>
                </td>
            </tr>
        `;
    }
}

// ========================================
// FILTER FUNCTIONS
// ========================================
function applyFilters() {
    const deviceFilter = document.getElementById('filterDevice')?.value || 'all';
    const dateFilter = document.getElementById('filterDate')?.value || '';
    const warningFilter = document.getElementById('filterWarning')?.value || 'all';
    
    filteredData = allHistoryData.filter(record => {
        // Device filter
        if (deviceFilter !== 'all' && record.device_id !== deviceFilter) {
            return false;
        }
        
        // Date filter
        if (dateFilter) {
            const recordDate = new Date(record.timestamp).toISOString().split('T')[0];
            if (recordDate !== dateFilter) {
                return false;
            }
        }
        
        // Warning filter
        if (warningFilter !== 'all' && record.warning_level !== warningFilter) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    updateRecordCount();
    renderTable();
    
    console.log(`🔍 Filtered: ${filteredData.length} of ${allHistoryData.length} records`);
}

function clearFilters() {
    document.getElementById('filterDevice').value = 'all';
    document.getElementById('filterDate').value = '';
    document.getElementById('filterWarning').value = 'all';
    
    filteredData = [...allHistoryData];
    currentPage = 1;
    updateRecordCount();
    renderTable();
    
    console.log('🧹 Filters cleared');
}

// ========================================
// PAGINATION
// ========================================
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginationInfo = document.getElementById('paginationInfo');
    
    if (paginationInfo) {
        paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    // Update button states
    document.getElementById('btnFirst')?.toggleAttribute('disabled', currentPage === 1);
    document.getElementById('btnPrev')?.toggleAttribute('disabled', currentPage === 1);
    document.getElementById('btnNext')?.toggleAttribute('disabled', currentPage === totalPages);
    document.getElementById('btnLast')?.toggleAttribute('disabled', currentPage === totalPages);
}

function firstPage() {
    currentPage = 1;
    renderTable();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

function lastPage() {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    currentPage = totalPages;
    renderTable();
}

function changePageSize() {
    pageSize = parseInt(document.getElementById('pageSize')?.value) || 20;
    currentPage = 1;
    renderTable();
    console.log(`📄 Page size changed to ${pageSize}`);
}

// ========================================
// EXPORT CSV
// ========================================
function exportData() {
    if (filteredData.length === 0) {
        alert('⚠️ Tidak ada data untuk diekspor');
        return;
    }
    
    console.log('📤 Exporting CSV...');
    
    // CSV Headers
    let csv = 'Tanggal,Waktu,Pitch,Roll,Deviasi,Status,Warning Level,Suhu,Device ID\n';
    
    // CSV Data
    filteredData.forEach(record => {
        const timestamp = new Date(record.timestamp);
        const tanggal = timestamp.toLocaleDateString('id-ID');
        const waktu = timestamp.toLocaleTimeString('id-ID');
        
        csv += `"${tanggal}","${waktu}",`;
        csv += `${record.pitch || 0},${record.roll || 0},${record.deviation || 0},`;
        csv += `"${record.status || '-'}","${record.warning_level || '-'}",`;
        csv += `${record.temperature || 0},"${record.device_id || '-'}"\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const filename = `elposturo_history_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`✅ CSV exported: ${filename}`);
}

// ========================================
// DETAIL MODAL
// ========================================
function showDetailModal(recordId) {
    const record = allHistoryData.find(r => r.id === recordId);
    
    if (!record) {
        alert('⚠️ Data tidak ditemukan');
        return;
    }
    
    const timestamp = new Date(record.timestamp);
    const datetime = timestamp.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    alert(`
📊 DETAIL DATA POSTUR

⏰ Waktu: ${datetime}
📍 Device: ${record.device_id}

📐 Sudut Kemiringan:
   • Pitch (Depan/Belakang): ${record.pitch?.toFixed(2)}°
   • Roll (Kiri/Kanan): ${record.roll?.toFixed(2)}°
   • Deviasi Total: ${record.deviation?.toFixed(2)}°

🧍 Status Postur: ${record.status}
⚠️ Warning Level: ${record.warning_level}
🌡️ Suhu: ${record.temperature}°C
    `);
}

// ========================================
// UPDATE RECORD COUNT
// ========================================
function updateRecordCount() {
    const recordCount = document.getElementById('recordCount');
    const totalRecords = document.getElementById('totalRecordsTop');
    
    if (recordCount) {
        recordCount.textContent = `Showing ${filteredData.length} records`;
    }
    
    if (totalRecords) {
        totalRecords.textContent = allHistoryData.length;
    }
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Filter change events
    document.getElementById('filterDevice')?.addEventListener('change', applyFilters);
    document.getElementById('filterDate')?.addEventListener('change', applyFilters);
    document.getElementById('filterWarning')?.addEventListener('change', applyFilters);
}

// Export functions to global scope
window.exportData = exportData;
window.clearFilters = clearFilters;
window.firstPage = firstPage;
window.prevPage = prevPage;
window.nextPage = nextPage;
window.lastPage = lastPage;
window.changePageSize = changePageSize;
window.showDetailModal = showDetailModal;

console.log('✅ Riwayat.js ready');
