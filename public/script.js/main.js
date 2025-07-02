// public/script.js/main.js - BASİTLEŞTİRİLMİŞ YENİ HALİ

// Backend API URL'i (Bu dosya doğrudan API çağrısı yapmasa da, standartlık için tutulabilir)
const API_BASE_URL = 'https://havvanur-yil-backend.onrender.com/api'; // KENDİ CANLI BACKEND URL'İNİZLE DEĞİŞTİRİN

// Global toast elementi referansı (main.js'nin yüklendiği sayfalarda toast div'i olmalı)
const toastElement = document.getElementById('toast'); 

// ✅ Toast mesajı gösterme - MODERN HALİ
function showToast(message, type = 'success', duration = 3000) {
    if (!toastElement) {
        console.warn('Toast elementi bulunamadı. Lütfen ilgili HTML dosyasında <div id="toast" class="toast"></div> elementinin olduğundan emin olun.');
        return;
    }

    toastElement.textContent = message;
    toastElement.className = `toast ${type} show`;
    toastElement.style.display = 'block';

    setTimeout(() => {
        toastElement.classList.remove('show');
        toastElement.addEventListener('transitionend', function handler() {
            toastElement.style.display = 'none';
            toastElement.removeEventListener('transitionend', handler);
        }, { once: true });
    }, duration);
}

// ✅ Sayfa yüklendiğinde yapılacaklar (Genel UI etkileşimleri)
document.addEventListener("DOMContentLoaded", () => {
    // Menü butonu (navbar olan tüm sayfalarda)
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Arama butonu (varsa ve main.js tarafından yönetiliyorsa)
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const term = prompt("Sayfa içinde aramak istediğiniz kelime nedir?");
            if (term) {
                const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
                let found = false;
                elements.forEach(el => {
                    if (el.textContent.toLowerCase().includes(term.toLowerCase())) {
                        el.scrollIntoView({ behavior: "smooth" });
                        el.style.backgroundColor = "#ffff99"; // Vurgulama rengi
                        found = true;
                    }
                });
                if (!found) showToast("Aradığınız kelime bulunamadı.", "info"); // alert yerine toast kullanıldı
            }
        });
    }

    // Yıllık Listesi sayfasına yönlendir butonu (create.html'de olabilir)
    const showListBtn = document.getElementById("showYearbookListBtn");
    if (showListBtn) {
        showListBtn.addEventListener("click", () => {
            window.location.href = "yearbookList.html";
        });
    }

    // Eğer PDF indirme butonu global ve bu main.js tarafından yönetiliyorsa (create.html'de varsa)
    // create.html'de tek bir yıllık indirildiği için oradaki inline script'i tercih ediyoruz.
    // Bu kısım main.js'de tekrar etmemeli eğer create.html'de kendi mantığı varsa.

    // Eğer sınıf seçme kutusu global bir işlev görüyorsa (yearbookList.html'de kendi mantığı var)
    // create.html'de de sınıf seçenekleri yükleniyor. Bu kısımlar sayfanın kendi JS'inde olmalı.
});