// public/js/dashboard.js

const DEVICE_ID = 'device_001';
let canvas, ctx;
let timerInterval;
let timerSeconds = 15;

console.log('🚀 Dashboard.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM ready');
    
    canvas = document.getElementById('postureCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        initCanvas();
    }
    
    listenToCurrentState();
    updateTimerDisplay();
});

// ========================================
// FIREBASE LISTENER (v8 syntax)
// ========================================
function listenToCurrentState() {
    console.log('👂 Listening to Firebase...');
    
    const dbRef = database.ref(`posture_monitoring/${DEVICE_ID}/current_state`);
    
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        
        if (data) {
            console.log('📥 Data received:', data);
            updateDashboard(data);
            setConnectionStatus('connected');
        } else {
            console.log('⚠️ No data available');
            setConnectionStatus('waiting');
        }
    }, (error) => {
        console.error('❌ Firebase error:', error);
        setConnectionStatus('disconnected');
    });
}

// ========================================
// UPDATE DASHBOARD
// ========================================
function updateDashboard(data) {
    updateStatusCard(data);
    updateAngles(data);
    if (canvas) drawPosture(data.pitch, data.roll);
    updateDeviceInfo(data);
}

function updateStatusCard(data) {
    const statusText = document.getElementById('heroStatus');
    const statusDesc = document.getElementById('heroDescription');
    const heroCard = document.getElementById('heroCard');
    
    if (statusText) statusText.textContent = data.status || 'NO DATA';
    
    let description = '';
    let cardClass = 'hero-card';
    
    switch(data.warning_level) {
        case 'NORMAL':
            description = '✅ Postur Anda Baik';
            cardClass += ' status-normal';
            break;
        case 'SEDANG':
            description = '⚠️ Perbaiki Postur Anda';
            cardClass += ' status-warning';
            break;
        case 'TINGGI':
            description = '🚨 Postur Sangat Buruk!';
            cardClass += ' status-danger';
            break;
        default:
            description = 'Menunggu data sensor';
    }
    
    if (statusDesc) statusDesc.textContent = description;
    if (heroCard) heroCard.className = cardClass;
}

function updateAngles(data) {
    const pitchAngle = document.getElementById('pitchAngle');
    const pitchProgress = document.getElementById('pitchProgress');
    if (pitchAngle) pitchAngle.textContent = `${data.pitch.toFixed(2)}°`;
    if (pitchProgress) pitchProgress.style.width = `${Math.min(Math.abs(data.pitch) * 2, 100)}%`;
    
    const rollAngle = document.getElementById('rollAngle');
    const rollProgress = document.getElementById('rollProgress');
    if (rollAngle) rollAngle.textContent = `${data.roll.toFixed(2)}°`;
    if (rollProgress) rollProgress.style.width = `${Math.min(Math.abs(data.roll) * 2, 100)}%`;
    
    const deviationAngle = document.getElementById('deviationAngle');
    const deviationProgress = document.getElementById('deviationProgress');
    if (deviationAngle) deviationAngle.textContent = `${data.deviation.toFixed(2)}°`;
    if (deviationProgress) deviationProgress.style.width = `${Math.min(Math.abs(data.deviation) * 2, 100)}%`;
}

function updateDeviceInfo(data) {
    const deviceId = document.getElementById('deviceId');
    const deviceTemp = document.getElementById('deviceTemp');
    const warningBadge = document.getElementById('warningBadge');
    const lastUpdate = document.getElementById('lastUpdate');
    const heroTemp = document.getElementById('heroTemp');
    const heroTime = document.getElementById('heroTime');
    
    if (deviceId) deviceId.textContent = data.device_id || '-';
    if (deviceTemp) deviceTemp.textContent = `${data.temperature}°C`;
    if (heroTemp) heroTemp.textContent = `${data.temperature}°C`;
    
    if (warningBadge) {
        warningBadge.textContent = data.warning_level || '-';
        warningBadge.className = 'warning-badge';
        
        if (data.warning_level === 'NORMAL') {
            warningBadge.className += ' normal';
        } else if (data.warning_level === 'SEDANG') {
            warningBadge.className += ' sedang';
        } else if (data.warning_level === 'TINGGI') {
            warningBadge.className += ' tinggi';
        }
    }
    
    const timestamp = new Date(data.timestamp);
    const timeStr = timestamp.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    if (lastUpdate) lastUpdate.textContent = timestamp.toLocaleString('id-ID');
    if (heroTime) heroTime.textContent = timeStr;
}

function setConnectionStatus(status) {
    const badge = document.getElementById('connectionBadge');
    const text = document.getElementById('connectionText');
    
    if (!badge || !text) return;
    
    badge.className = 'status-badge';
    
    switch(status) {
        case 'connected':
            badge.classList.add('connected');
            text.textContent = 'Connected';
            break;
        case 'disconnected':
            badge.classList.add('disconnected');
            text.textContent = 'Disconnected';
            break;
        case 'waiting':
            text.textContent = 'Waiting...';
            break;
        default:
            text.textContent = 'Connecting...';
    }
}

// ========================================
// CANVAS
// ========================================
function initCanvas() {
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 140, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 70, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#667eea';
    ctx.fill();
}

function drawPosture(pitch, roll) {
    initCanvas();
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxAngle = 45;
    const maxRadius = 140;
    
    const x = centerX + (roll / maxAngle) * maxRadius;
    const y = centerY + (pitch / maxAngle) * maxRadius;
    
    const finalX = Math.max(20, Math.min(canvas.width - 20, x));
    const finalY = Math.max(20, Math.min(canvas.height - 20, y));
    
    const deviation = Math.sqrt(pitch * pitch + roll * roll);
    
    let color;
    if (deviation < 15) {
        color = '#10b981';
    } else if (deviation < 30) {
        color = '#f59e0b';
    } else {
        color = '#ef4444';
    }
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(finalX, finalY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(finalX, finalY, 14, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(finalX, finalY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}

// ========================================
// TIMER
// ========================================
function setTimer() {
    const minutes = parseInt(document.getElementById('timerMinute')?.value) || 0;
    const seconds = parseInt(document.getElementById('timerSecond')?.value) || 0;
    
    timerSeconds = (minutes * 60) + seconds;
    
    if (timerSeconds <= 0) {
        alert('⚠️ Masukkan waktu yang valid!');
        return;
    }
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert('⏰ Waktu habis! Cek postur Anda.');
        }
    }, 1000);
    
    updateTimerDisplay();
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    timerSeconds = 15;
    
    const minuteInput = document.getElementById('timerMinute');
    const secondInput = document.getElementById('timerSecond');
    
    if (minuteInput) minuteInput.value = 0;
    if (secondInput) secondInput.value = 15;
    
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) timerDisplay.textContent = display;
}

console.log('✅ Dashboard.js ready');
