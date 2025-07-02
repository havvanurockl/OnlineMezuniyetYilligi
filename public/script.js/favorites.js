// backend/public/script.js/favorites.js - YENİ HALİ

// Backend API URL'i
const API_BASE_URL = 'https://havvanur-yil-backend.onrender.com'; // BURAYI KENDİ CANLI BACKEND URL'İNİZLE DEĞİŞTİRİN

const favoritesList = document.getElementById("favoritesList");
const toast = document.getElementById("toast"); // HTML'de toast div'inin ID'si "toast" olmalı
const token = localStorage.getItem("token"); // Token'ı al

// Toast fonksiyonu (Diğer sayfalardaki ile uyumlu hale getirildi)
function showToast(message, type = 'success', duration = 3000) {
    if (!toast) {
        console.warn('Toast elementi bulunamadı. Lütfen favorites.html dosyasında <div id="toast" class="toast"></div> elementinin olduğundan emin olun.');
        return;
    }

    toast.textContent = message;
    toast.className = `toast ${type} show`; // 'show' sınıfı CSS geçişleri için
    toast.style.display = 'block'; // Elementi görünür yapar

    setTimeout(() => {
        toast.classList.remove('show'); // 'show' sınıfını kaldırarak gizleme geçişini başlat
        toast.addEventListener('transitionend', function handler() {
            toast.style.display = 'none'; // Geçiş bitince elementi tamamen gizle
            toast.removeEventListener('transitionend', handler); // Dinleyiciyi kaldır
        }, { once: true });
    }, duration);
}


// Favorileri yükleme fonksiyonu
async function loadFavorites() {
    favoritesList.innerHTML = ''; // Listeyi her zaman temizle
    
    if (!token) {
        showToast("Favorileri görmek için giriş yapmalısınız.", "error");
        favoritesList.innerHTML = "<p style='text-align:center; color: #888;'>Favorileri görmek için giriş yapmalısınız.</p>";
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/favorites`, { // API_BASE_URL kullanıldı
            headers: {
                Authorization: `Bearer ${token}` // Token'ı gönder
            }
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Favoriler alınamadı.");
        }

        const favorites = await res.json(); // Backend'den gelen favori yıllık girişleri

        if (!favorites || favorites.length === 0) { // Favori yoksa mesajı göster
            favoritesList.innerHTML = "<p style='text-align:center; color: #888;'>Henüz favori eklemediniz.</p>";
            return;
        }

        favorites.forEach((entry) => { // Her bir favori yıllık girişi için kart oluştur
            const card = document.createElement("div");
            card.className = "favorite-card"; // Bu sınıf için favorites.html'de CSS olmalı
            card.id = `favorite-card-${entry._id}`; // Favoriden kaldırma işlemi için ID

            let mediaContent = '';
            // Backend'deki public/uploads klasöründeki fotoğrafın tam yolu
            const photoSrc = entry.photo ? `${API_BASE_URL.replace('/api', '')}${entry.photo}` : '';
            const videoSrc = entry.video ? `${API_BASE_URL.replace('/api', '')}${entry.video}` : '';

            if (entry.photo) {
                mediaContent += `<img class="favorite-photo" src="${photoSrc}" alt="${entry.name}">`;
            }
            if (entry.video) {
                mediaContent += `<video class="favorite-video" controls src="${videoSrc}"></video>`;
            }

            // HTML şablonu güncellendi (profile ve yearbooklist ile uyumlu)
            card.innerHTML = `
                ${mediaContent}
                <div class="favorite-info">
                    <h3>${entry.name || '-'} ${entry.surname || ''} (${entry.nickname || '-'})</h3>
                    <p><strong>Sınıf:</strong> ${entry.class || '-'}</p>
                    <p><strong>En Sevdiği Ders:</strong> ${entry.lesson || '-'}</p>
                    <p><strong>Not:</strong> ${entry.note || '-'}</p>
                </div>
                <button class="remove-btn" data-id="${entry._id}"><i class="fas fa-trash-alt"></i> Favoriden Kaldır</button>
            `; 
            
            // "Favoriden Kaldır" butonuna olay dinleyicisi ekle
            card.querySelector(".remove-btn").addEventListener("click", async () => {
                if (!confirm("Bu yıllık girişini favorilerinizden kaldırmak istediğinize emin misiniz?")) {
                    return;
                }
                try {
                    const res = await fetch(`${API_BASE_URL}/favorites/${entry._id}`, { // API_BASE_URL kullanıldı
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}` // Token'ı gönder
                        }
                    });

                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.message || "Favoriden kaldırılamadı.");
                    }
                    showToast("Favoriden başarıyla kaldırıldı.", "success");
                    card.remove(); // Kartı DOM'dan kaldır

                    // Eğer favori listesi boşalırsa mesajı güncelle
                    if (favoritesList.children.length === 0) {
                        favoritesList.innerHTML = "<p style='text-align:center; color: #888;'>Henüz favori eklemediniz.</p>";
                    }

                } catch (err) {
                    showToast("Hata: " + err.message, "error");
                    console.error("Favoriden kaldırılırken hata:", err);
                }
            });

            favoritesList.appendChild(card);
        });
    } catch (err) {
        favoritesList.innerHTML = "<p style='text-align:center; color: #888;'>Favoriler yüklenirken bir hata oluştu.</p>";
        showToast("Favoriler yüklenirken hata: " + err.message, "error");
        console.error(err);
    }
}

// Sayfa yüklendiğinde favorileri getir
document.addEventListener('DOMContentLoaded', loadFavorites);