// backend/public/script.js/profile.js - YENİ HALİ

// Backend API URL'i
const API_BASE_URL = 'https://havvanur-yil-backend.onrender.com/api'; // BURAYI KENDİ CANLI BACKEND URL'İNİZLE DEĞİŞTİRİN

document.addEventListener('DOMContentLoaded', async () => {
    const profileForm = document.getElementById('profileForm');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const deleteAccountBtn = document.getElementById('deleteAccount');
    const toast = document.getElementById('toast'); // Toast elementi için doğru referans

    // Toast bildirim fonksiyonu
    function showToast(message, type = 'success', duration = 3000) {
        if (!toast) {
            console.warn('Toast elementi bulunamadı.');
            return;
        }

        toast.textContent = message;
        toast.className = `toast ${type} show`;
        toast.style.display = 'block';

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', function handler() {
                toast.style.display = 'none';
                toast.removeEventListener('transitionend', handler);
            }, { once: true });
        }, duration);
    }

    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al

    // Eğer token yoksa, kullanıcıyı login sayfasına yönlendir
    if (!token) {
        showToast("Profil bilgileri için giriş yapmalısınız.", "error", 2000);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    // Profil bilgilerini yükle
    async function loadProfile() {
        try {
            const response = await fetch(`${API_BASE_URL}/profile`, { // API_BASE_URL kullanıldı
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Token'ı gönder
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Profil bilgileri çekilirken hata:', errorData.message);
                showToast(errorData.message || 'Profil bilgileri getirilirken hata oluştu.', "error");
                // Eğer token geçersizse, kullanıcıyı login sayfasına yönlendir.
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }
                return;
            }

            const user = await response.json();
            nameInput.value = user.name;
            surnameInput.value = user.surname;
            emailInput.value = user.email;

        } catch (error) {
            console.error("Profil yüklenirken hata:", error);
            showToast(`Profil yüklenirken bir hata oluştu.`, "error");
            localStorage.removeItem('token');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    }

    // Profil güncelleme submit olayı
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedName = nameInput.value;
        const updatedSurname = surnameInput.value;

        try {
            const response = await fetch(`${API_BASE_URL}/profile`, { // API_BASE_URL kullanıldı
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: updatedName, surname: updatedSurname })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Profil güncellenirken bir hata oluştu.');
            }

            const data = await response.json();
            showToast(data.message || "Profil başarıyla güncellendi.", "success");

        } catch (error) {
            console.error("Profil güncellenirken hata:", error);
            showToast(`Profil güncellenirken hata: ${error.message}`, "error");
        }
    });

    // Hesabı sil butonu olayı
    deleteAccountBtn.addEventListener('click', async () => {
        if (!confirm("Hesabınızı kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) {
            return; // Kullanıcı iptal etti
        }

        try {
            const response = await fetch(`${API_BASE_URL}/profile`, { // API_BASE_URL kullanıldı
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Hesap silinirken bir hata oluştu.');
            }

            showToast("Hesabınız başarıyla silindi.", "success");
            localStorage.removeItem('token'); // Token'ı kaldır

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);

        } catch (error) {
            console.error("Hesap silinirken hata:", error);
            showToast(`Hesap silinirken hata: ${error.message}`, "error");
        }
    });

    // Sayfa yüklendiğinde profili yükle
    await loadProfile();
});