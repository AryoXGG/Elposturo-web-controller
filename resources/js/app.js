import './bootstrap'; // Bawaan Laravel, biarkan saja

function getCsrfToken() {
    const m = document.querySelector('meta[name="csrf-token"]');
    return m ? m.getAttribute('content') : '';
}

// 1. FUNGSI AMBIL DATA SENSOR
async function fetchPosture() {
    const statusEl = document.getElementById('statusValue');
    const pressureEl = document.getElementById('pressureValue');
    
    // Kalau elemen tidak ada di halaman ini, stop.
    if (!statusEl || !pressureEl) return;

    try {
        const res = await fetch('/api/posture');
        if (!res.ok) throw new Error('no-api');
        
        const json = await res.json();
        
        // Update tampilan kalau data berhasil didapat
        statusEl.textContent = json.status ?? '...';
        pressureEl.textContent = (json.pressure != null ? json.pressure + '°' : '0°');

    } catch (e) {
        // ERROR HANDLER: Kalau API mati/error, biarkan tetap kosong/default
      
        console.log("Menunggu data API..."); 
        statusEl.textContent = '...';
        pressureEl.textContent = '0°';
    }
}

// 2. FUNGSI AMBIL RIWAYAT
async function fetchHistory() {
    const tbody = document.getElementById('historyBody');
    if (!tbody) return;

    // Kosongkan tabel dulu sebelum isi data baru
    tbody.innerHTML = '';

    try {
        const res = await fetch('/api/history');
        if (!res.ok) throw new Error('no-api');
        
        const rows = await res.json();
        
        // Kalau data kosong (array kosong)
        if (!Array.isArray(rows) || rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">Belum ada data riwayat</td></tr>';
            return;
        }

        // Kalau ada data, masukkan ke tabel
        rows.forEach(r => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="ps-4">${r.tanggal ?? '-'}</td>
                <td>${r.mulai ?? '-'}</td>
                <td>${r.selesai ?? '-'}</td>
                <td style="text-align:center">${r.bungkuk ?? '0'}</td>
                <td class="pe-4">${r.status ?? '-'}</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (e) {
        // ERROR HANDLER: Kalau API mati, tampilkan pesan kosong saja
        // SAYA HAPUS BAGIAN SAMPLE DATA DI SINI
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">Belum ada data riwayat (Menunggu Koneksi)</td></tr>';
    }
}

// 3. FUNGSI KIRIM TIMER
async function submitTimer(minutes, seconds) {
    try {
        const payload = { minutes: Number(minutes) || 0, seconds: Number(seconds) || 0 };
        const res = await fetch('/api/timer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('send-failed');
        return await res.json();
    } catch (e) {
        // Backend belum siap, abaikan saja errornya biar gak ganggu UI
        console.log("Timer belum terkoneksi ke backend");
        return { ok: false };
    }
}

// 4. INISIALISASI HALAMAN
function initDashboard() {
    const sendBtn = document.getElementById('sendTimer');
    const resetBtn = document.getElementById('resetBtn');

    // Logic Tombol Kirim
    sendBtn && sendBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const m = document.getElementById('minutesInput').value;
        const s = document.getElementById('secondsInput').value;
        
        const originalText = sendBtn.textContent;
        sendBtn.textContent = 'Mengirim...';
        sendBtn.disabled = true;

        await submitTimer(m, s);
        
        // Balikin tombol jadi normal
        setTimeout(() => {
            sendBtn.textContent = originalText;
            sendBtn.disabled = false;
        }, 500);
    });

    // Logic Tombol Reset
    resetBtn && resetBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        document.getElementById('minutesInput').value = 0;
        document.getElementById('secondsInput').value = 15;
    });

    // Panggil fetchPosture sekali saat halaman dibuka
    fetchPosture();
    
    // Opsi: Auto refresh setiap 2 detik (Nyalakan kalau backend sudah siap)
    // setInterval(fetchPosture, 2000); 
}

function initRiwayat() {
    fetchHistory();
}

// JALANKAN SAAT WEBSITE SELESAI LOADING
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('statusValue')) initDashboard();
    if (document.getElementById('historyBody')) initRiwayat();
});