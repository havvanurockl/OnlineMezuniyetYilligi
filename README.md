# YILLIK UYGULAMASI (YEARLOG)

Bu proje, geleneksel kağıt tabanlı okul yıllıklarının dijital ortama taşınarak modern bir web platformu aracılığıyla daha erişilebilir, sürdürülebilir ve interaktif hale getirilmesini amaçlayan bir web uygulamasıdır. Kullanıcıların (özellikle öğrencilerin) kendi anılarını, düşüncelerini ve arkadaşlarıyla ilgili hatıralarını dijital olarak kaydedip paylaşabilecekleri kullanıcı dostu bir sistem sunar.

## ✨ Özellikler

* **Kullanıcı Yönetimi:** Hesap oluşturma, giriş yapma, profil bilgilerini güncelleme ve hesap silme.
* **Sınıf/Grup Oluşturma:** Yıllıkların organize edilmesi için sınıflar veya gruplar oluşturma.
* **Yıllık Girişi Oluşturma:** Ad, soyad, lakap, en sevilen ders, kişisel not, fotoğraf ve isteğe bağlı video ile zenginleştirilmiş yıllık kayıtları oluşturma.
* **Yıllık Listeleme:** Oluşturulan tüm yıllık kayıtlarını sınıfa göre filtreleyerek listeleme.
* **Favorilere Ekleme:** Beğenilen yıllık kayıtlarını favori listesine ekleme ve yönetme.
* **PDF İndirme:** Her bir yıllık kaydını anında yüksek kalitede PDF formatında indirme.
* **Çok Kanallı Paylaşım:** Yıllık bağlantılarını WhatsApp, E-posta ve doğrudan bağlantı kopyalama seçenekleriyle paylaşma.
* **Duyarlı Tasarım (Responsive Design):** Uygulama, masaüstü, tablet ve mobil cihazlarda sorunsuz bir kullanıcı deneyimi sunar.
* **Güvenli Kimlik Doğrulama:** JSON Web Token (JWT) tabanlı güvenli oturum yönetimi.
* **Dosya Yükleme:** Multer kütüphanesi ile fotoğraf ve video dosyalarını güvenli bir şekilde sunucuya yükleme.

## 🚀 Teknolojiler

**Frontend:**
* **HTML5:** Sayfa yapısı için.
* **CSS3:** Modern ve duyarlı arayüz tasarımı için.
* **JavaScript (Vanilla JS):** Dinamik etkileşimler ve API çağrıları için.
* **Font Awesome:** İkon kullanımı için.
* **Google Fonts:** Estetik yazı tipleri için.
* **html2canvas.js, jspdf.umd.min.js, html2pdf.bundle.min.js:** İstemci tarafı PDF oluşturma ve indirme işlemleri için.

**Backend:**
* **Node.js:** Sunucu tarafı uygulamaları çalıştırmak için.
* **Express.js:** RESTful API'ler oluşturmak için web çatısı.
* **MongoDB (MongoDB Atlas):** NoSQL doküman tabanlı bulut veritabanı.
* **Mongoose:** MongoDB ile Node.js arasında ORM katmanı.
* **bcryptjs:** Şifre güvenliği için.
* **jsonwebtoken (JWT):** Kimlik doğrulama ve yetkilendirme için.
* **cors:** Çapraz kaynak isteği yönetimi için.
* **multer:** Dosya yükleme işlemleri için.
* **dotenv:** Ortam değişkeni yönetimi için.
* **fs, path:** Dosya sistemi işlemleri için.
