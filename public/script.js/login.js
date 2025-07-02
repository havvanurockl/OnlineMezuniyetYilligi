// public/script.js/login.js - YENİ HALİ

// Backend API URL'i
const API_BASE_URL = 'https://havvanur-yil-backend.onrender.com/api'; // BURAYI KENDİ CANLI BACKEND URL'İNİZLE DEĞİŞTİRİN

// Global toast elementi referansı (login.html'de <div id="toast" class="toast"></div> olmalı)
const toastElement = document.getElementById('toast');

// Toast bildirim fonksiyonu (Diğer sayfalardaki ile aynı)
function showToast(message, type = 'success', duration = 3000) {
    if (!toastElement) {
        console.warn('Toast elementi bulunamadı. Lütfen login.html dosyasında <div id="toast" class="toast"></div> elementinin olduğundan emin olun.');
        return;
    }

    toastElement.textContent = message;
    toastElement.className = `toast ${type} show`; // 'show' sınıfı CSS geçişleri için
    toastElement.style.display = 'block'; // Elementi görünür yapar

    setTimeout(() => {
        toastElement.classList.remove('show'); // 'show' sınıfını kaldırarak gizleme geçişini başlat
        toastElement.addEventListener('transitionend', function handler() {
            toastElement.style.display = 'none'; // Geçiş bitince elementi tamamen gizle
            toastElement.removeEventListener('transitionend', handler); // Dinleyiciyi kaldır
        }, { once: true });
    }, duration);
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${API_BASE_URL}/login`, { // API_BASE_URL kullanıldı
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'Giriş başarısız'); // data.message de hata içerebilir
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        showToast('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');

        setTimeout(() => {
            window.location.href = 'create.html';
        }, 2000);

    } catch (error) {
        console.error('Giriş hatası detayı:', error);
        showToast(error.message || 'Sistemsel bir hata oluştu!', 'error'); // Hata tipi belirtildi
    }
});