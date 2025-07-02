// backend/routes/class.js YENİ HALİ

const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// ROUTE 1: Yeni Sınıf Oluşturma (POST /api/classes)
router.post('/', async (req, res) => {
    try {
        const { name } = req.body; // Frontend 'className' gönderiyor ama backend 'name' bekliyordu, bunu düzelttik.

        if (!name) {
            return res.status(400).json({ message: 'Sınıf adı boş olamaz.' }); // Mesajı değiştirdim, daha anlaşılır.
        }

        const newClass = new Class({ name });
        await newClass.save();

        res.status(201).json({ message: 'Sınıf başarıyla oluşturuldu.', class: newClass }); // Yanıtı daha açıklayıcı yaptım

    } catch (error) {
        // *** BURAYI GÜNCELLEMİŞ HALİ ***
        console.error("Sınıf eklenirken hata:", error);
        if (error.code === 11000) { // MongoDB duplicate key error (aynı isimde sınıf varsa)
            return res.status(409).json({ message: 'Bu sınıf adı zaten mevcut.' });
        }
        res.status(500).json({ message: 'Sunucu hatası: Sınıf oluşturulamadı.', error: error.message });
    }
});

// ROUTE 2: Tüm Sınıfları Listeleme (GET /api/classes)
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find().sort({ name: 1 });
        res.json(classes);
    } catch (error) {
        console.error("Sınıflar getirilirken hata:", error);
        res.status(500).json({ message: 'Sunucu hatası: Sınıflar getirilemedi.', error: error.message });
    }
});

module.exports = router;