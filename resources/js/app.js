function getCsrfToken() {
    const m = document.querySelector('meta[name="csrf-token"]');
    return m ? m.getAttribute('content') : '';
}

async function fetchPosture() {
    const statusEl = document.getElementById('statusValue');
    const pressureEl = document.getElementById('pressureValue');
    try {
        const res = await fetch('/api/posture');
        if (!res.ok) throw new Error('no-api');
        const json = await res.json();
        statusEl.textContent = json.status ?? '—';
        pressureEl.textContent = (json.pressure != null ? json.pressure + '°' : '—°');
    } catch (e) {
        // fallback sample data when backend not ready
        statusEl.textContent = 'Normal';
        pressureEl.textContent = '14°';
    }
}

/* Theme handling removed (dark mode disabled) */
async function fetchHistory() {
    const tbody = document.getElementById('historyBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    try {
        const res = await fetch('/api/history');
        if (!res.ok) throw new Error('no-api');
        const rows = await res.json();
        if (!Array.isArray(rows) || rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="opacity:.7">Belum ada data riwayat</td></tr>';
            return;
        }
        rows.forEach(r => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
				<td>${r.tanggal ?? ''}</td>
				<td>${r.mulai ?? ''}</td>
				<td>${r.selesai ?? ''}</td>
				<td style="text-align:center">${r.bungkuk ?? ''}</td>
				<td>${r.status ?? ''}</td>
			`;
            tbody.appendChild(tr);
        });
    } catch (e) {
        // fallback sample rows
        const sample = [
            { tanggal: '23-11-2025', mulai: '11:30:17', selesai: '11:30:40', bungkuk: 1, status: 'Normal' },
            { tanggal: '23-11-2025', mulai: '11:33:15', selesai: '11:33:38', bungkuk: 0, status: 'Normal' }
        ];
        sample.forEach(r => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
				<td>${r.tanggal}</td>
				<td>${r.mulai}</td>
				<td>${r.selesai}</td>
				<td style="text-align:center">${r.bungkuk}</td>
				<td>${r.status}</td>
			`;
            tbody.appendChild(tr);
        });
    }
}

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
        // backend not available — just return mock success
        return { ok: true };
    }
}

function initDashboard() {
    const sendBtn = document.getElementById('sendTimer');
    const resetBtn = document.getElementById('resetBtn');
    sendBtn && sendBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const m = document.getElementById('minutesInput').value;
        const s = document.getElementById('secondsInput').value;
        sendBtn.textContent = 'Mengirim...';
        await submitTimer(m, s);
        sendBtn.textContent = 'Kirim Timer';
    });
    resetBtn && resetBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        document.getElementById('minutesInput').value = 0;
        document.getElementById('secondsInput').value = 15;
    });

    // initial fetch
    fetchPosture();
}

function initRiwayat() {
    fetchHistory();
}

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('statusValue')) initDashboard();
    if (document.getElementById('historyBody')) initRiwayat();
});
