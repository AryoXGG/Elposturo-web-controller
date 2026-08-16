// public/js/dashboard.js

const DEVICE_ID = 'device_001';
let canvas, ctx;

console.log('=================================');
console.log('🚀 DASHBOARD.JS LOADED');
console.log('=================================');

document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM Ready');
    
    canvas = document.getElementById('postureCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        initCanvas();
        console.log('✅ Canvas initialized');
    }
    
    listenToCurrentState();
});

// ========================================
// FIREBASE LISTENER
// ========================================
function listenToCurrentState() {
    console.log('👂 Starting Firebase listener...');
    console.log('📍 Path: posture_monitoring/' + DEVICE_ID + '/current_state');
    
    const dbRef = database.ref(`posture_monitoring/${DEVICE_ID}/current_state`);
    
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        
        if (data) {
            console.log('📥 DATA RECEIVED:', data);
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
    console.log('🔄 Updating dashboard...');
    updateStatusCard(data);
    updateAngles(data);
    if (canvas && ctx) drawPosture(data.pitch, data.roll);
    updateDeviceInfo(data);
    console.log('✅ Dashboard updated');
}

function updateStatusCard(data) {
    const heroStatus = document.getElementById('heroStatus');
    const heroDescription = document.getElementById('heroDescription');
    const heroCard = document.getElementById('heroCard');
    
    if (heroStatus) {
        heroStatus.textContent = data.status || 'NO DATA';
        console.log('✅ Status updated:', data.status);
    }
    
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
    
    if (heroDescription) heroDescription.textContent = description;
    if (heroCard) heroCard.className = cardClass;
}

function updateAngles(data) {
    // Pitch
    const pitchAngle = document.getElementById('pitchAngle');
    const pitchProgress = document.getElementById('pitchProgress');
    if (pitchAngle) {
        pitchAngle.textContent = `${data.pitch.toFixed(2)}°`;
        console.log('✅ Pitch:', data.pitch);
    }
    if (pitchProgress) {
        pitchProgress.style.width = `${Math.min(Math.abs(data.pitch) * 2, 100)}%`;
    }
    
    // Roll
    const rollAngle = document.getElementById('rollAngle');
    const rollProgress = document.getElementById('rollProgress');
    if (rollAngle) {
        rollAngle.textContent = `${data.roll.toFixed(2)}°`;
        console.log('✅ Roll:', data.roll);
    }
    if (rollProgress) {
        rollProgress.style.width = `${Math.min(Math.abs(data.roll) * 2, 100)}%`;
    }
    
    // Deviation
    const deviationAngle = document.getElementById('deviationAngle');
    const deviationProgress = document.getElementById('deviationProgress');
    if (deviationAngle) {
        deviationAngle.textContent = `${data.deviation.toFixed(2)}°`;
        console.log('✅ Deviation:', data.deviation);
    }
    if (deviationProgress) {
        deviationProgress.style.width = `${Math.min(Math.abs(data.deviation) * 2, 100)}%`;
    }
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
    
    // Warning Badge
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
    
    // Timestamp
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
            console.log('✅ Status: Connected');
            break;
        case 'disconnected':
            badge.classList.add('disconnected');
            text.textContent = 'Disconnected';
            console.log('❌ Status: Disconnected');
            break;
        case 'waiting':
            text.textContent = 'Waiting...';
            console.log('⏳ Status: Waiting');
            break;
        default:
            text.textContent = 'Connecting...';
    }
}

// ========================================
// CANVAS VISUALIZATION - HUMAN BODY
// ========================================
function initCanvas() {
    if (!canvas || !ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw background circles
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 150, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 75, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Draw axis
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(30, centerY);
    ctx.lineTo(width - 30, centerY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, 30);
    ctx.lineTo(centerX, height - 30);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DEPAN', centerX, 20);
    ctx.fillText('BELAKANG', centerX, height - 10);
    ctx.fillText('KIRI', 40, centerY - 5);
    ctx.fillText('KANAN', width - 40, centerY - 5);
}

function drawPosture(pitch, roll) {
    initCanvas();
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const deviation = Math.sqrt(pitch * pitch + roll * roll);
    
    let bodyColor, shadowColor;
    if (deviation < 15) {
        bodyColor = '#10b981';
        shadowColor = 'rgba(16, 185, 129, 0.3)';
    } else if (deviation < 30) {
        bodyColor = '#f59e0b';
        shadowColor = 'rgba(245, 158, 11, 0.3)';
    } else {
        bodyColor = '#ef4444';
        shadowColor = 'rgba(239, 68, 68, 0.3)';
    }
    
    ctx.save();
    ctx.translate(centerX, centerY);
    
    const rollRad = (roll * Math.PI) / 180;
    ctx.rotate(rollRad);
    
    const pitchOffset = pitch * 1.5;
    ctx.translate(0, pitchOffset);
    
    const scale = 1 + (deviation / 500);
    ctx.scale(scale, scale);
    
    // Shadow
    ctx.fillStyle = shadowColor;
    ctx.beginPath();
    ctx.ellipse(0, 90, 35, 10, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Human body
    drawHumanBody(bodyColor);
    
    ctx.restore();
    
    // Text
    ctx.fillStyle = bodyColor;
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${deviation.toFixed(1)}°`, centerX, canvas.height - 30);
    
    ctx.font = '14px Inter, sans-serif';
    let statusText = '';
    if (deviation < 15) {
        statusText = '✓ POSTUR NORMAL';
    } else if (deviation < 30) {
        statusText = '⚠ PERBAIKI POSTUR';
    } else {
        statusText = '✗ POSTUR BURUK';
    }
    ctx.fillText(statusText, centerX, canvas.height - 10);
}

function drawHumanBody(color) {
    ctx.fillStyle = color;
    
    // Head
    ctx.beginPath();
    ctx.arc(0, -60, 20, 0, 2 * Math.PI);
    ctx.fill();
    
    // Neck
    ctx.fillRect(-4, -40, 8, 15);
    
    // Body
    ctx.beginPath();
    ctx.moveTo(-25, -25);
    ctx.lineTo(25, -25);
    ctx.lineTo(20, 30);
    ctx.lineTo(-20, 30);
    ctx.closePath();
    ctx.fill();
    
    // Left arm
    ctx.beginPath();
    ctx.moveTo(-25, -20);
    ctx.lineTo(-40, 10);
    ctx.lineTo(-35, 15);
    ctx.lineTo(-20, -15);
    ctx.closePath();
    ctx.fill();
    
    // Right arm
    ctx.beginPath();
    ctx.moveTo(25, -20);
    ctx.lineTo(40, 10);
    ctx.lineTo(35, 15);
    ctx.lineTo(20, -15);
    ctx.closePath();
    ctx.fill();
    
    // Left leg
    ctx.beginPath();
    ctx.moveTo(-15, 30);
    ctx.lineTo(-18, 70);
    ctx.lineTo(-10, 70);
    ctx.lineTo(-8, 30);
    ctx.closePath();
    ctx.fill();
    
    // Right leg
    ctx.beginPath();
    ctx.moveTo(8, 30);
    ctx.lineTo(10, 70);
    ctx.lineTo(18, 70);
    ctx.lineTo(15, 30);
    ctx.closePath();
    ctx.fill();
    
    // Outline
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(0, -60, 20, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(-25, -25);
    ctx.lineTo(25, -25);
    ctx.lineTo(20, 30);
    ctx.lineTo(-20, 30);
    ctx.closePath();
    ctx.stroke();
}

console.log('✅ Dashboard.js ready - NO TIMER');
