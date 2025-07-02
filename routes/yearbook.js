const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // fs modülünü ekledik (multer destination'da kullanmak için)

const YearbookEntry = require('../models/YearbookEntry');

// --- Multer Depolama Ayarları ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/uploads'); // Doğru yol
        // Klasör yoksa oluştur
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- API Endpoint'leri ---

// ROUTE 1: Yeni Bir Yıllık Girişi Oluşturma (POST /api/yearbook)
// server.js'de '/api/yearbook' ön eki verildiği için burada sadece '/' yeterli
router.post('/', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
        const { class: className, name, surname, nickname, lesson, note } = req.body;

        const photoPath = req.files['photo'] ? `/uploads/${req.files['photo'][0].filename}` : null;
        const videoPath = req.files['video'] ? `/uploads/${req.files['video'][0].filename}` : null;

        if (!className || !name || !surname || !nickname || !lesson || !note || !photoPath) {
            return res.status(400).json({ message: 'Tüm zorunlu alanlar doldurulmalıdır (Fotoğraf dahil).' });
        }

        const newYearbookEntry = new YearbookEntry({
            class: className,
            name,
            surname,
            nickname,
            lesson,
            note,
            photo: photoPath,
            video: videoPath
        });

        await newYearbookEntry.save();
        res.status(201).json({ message: 'Yıllık başarıyla oluşturuldu!', entry: newYearbookEntry });

    } catch (error) {
        console.error("Yıllık oluşturulurken hata:", error);
        res.status(500).json({ message: 'Yıllık oluşturulurken bir hata oluştu.', error: error.message });
    }
});

// ROUTE 2: Tüm Yıllık Girişlerini Listeleme (GET /api/yearbook/all)
// server.js'de '/api/yearbook' ön eki verildiği için burada sadece '/all' yeterli
router.get('/all', async (req, res) => {
    try {
        const yearbookEntries = await YearbookEntry.find({});
        res.status(200).json(yearbookEntries);
    } catch (error) {
        console.error("Yıllık girişleri getirilirken hata:", error);
        res.status(500).json({ message: 'Yıllık girişleri getirilirken bir hata oluştu.', error: error.message });
    }
});

module.exports = router;