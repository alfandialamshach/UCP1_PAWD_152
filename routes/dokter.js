const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Tampilkan semua dokter
router.get('/', (req, res) => {
    db.query('SELECT * FROM dokter', (err, dokterList) => {
        if (err) return res.status(500).send('Kesalahan Server');
        res.render('dokterr', {
            layout: 'layouts/main-layout',
            dokterList,
            dokter: null, // Tidak ada dokter yang sedang diedit
        });
    });
});

// Tampilkan form edit dokter berdasarkan ID
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;

    // Ambil data dokter berdasarkan ID
    db.query('SELECT * FROM dokter WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Kesalahan Server');
        if (results.length === 0) return res.status(404).send('Dokter tidak ditemukan');

        // Ambil semua dokter untuk ditampilkan dalam tabel
        db.query('SELECT * FROM dokter', (err, dokterList) => {
            if (err) return res.status(500).send('Kesalahan Server');
            res.render('dokterr', {
                layout: 'layouts/main-layout',
                dokterList,
                dokter: results[0], // Kirimkan dokter yang akan diedit
            });
        });
    });
});

// Tambah dokter baru
router.post('/', (req, res) => {
    const { nama, spesialisasi, telepon, email } = req.body;

    // Validasi input
    if (!nama || !spesialisasi || !telepon || !email) {
        return res.status(400).send('Semua data wajib diisi!');
    }

    db.query(
        'INSERT INTO dokter (nama, spesialisasi, telepon, email) VALUES (?, ?, ?, ?)',
        [nama.trim(), spesialisasi.trim(), telepon.trim(), email.trim()],
        (err) => {
            if (err) return res.status(500).send('Kesalahan Server');
            res.redirect('/dokter');
        }
    );
});

// Update data dokter berdasarkan ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nama, spesialisasi, telepon, email } = req.body;

    // Validasi input
    if (!nama || !spesialisasi || !telepon || !email) {
        return res.status(400).send('Semua data wajib diisi!');
    }

    db.query(
        'UPDATE dokter SET nama = ?, spesialisasi = ?, telepon = ?, email = ? WHERE id = ?',
        [nama.trim(), spesialisasi.trim(), telepon.trim(), email.trim(), id],
        (err) => {
            if (err) return res.status(500).send('Kesalahan Server');
            res.redirect('/dokter'); // Kembali ke daftar dokter setelah update
        }
    );
});

// Rute untuk memperbarui data dokter
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nama, spesialisasi, telepon, email } = req.body;

    // Validasi input
    if (!nama || !spesialisasi || !telepon || !email) {
        return res.status(400).send('Semua data dokter harus diisi');
    }

    // Query untuk memperbarui data dokter
    db.query(
        'UPDATE dokter SET nama = ?, spesialisasi = ?, telepon = ?, email = ? WHERE id = ?',
        [nama.trim(), spesialisasi.trim(), telepon.trim(), email.trim(), id],
        (err) => {
            if (err) return res.status(500).send('Kesalahan Server');
            res.redirect('/dokter');
        }
    );
});

// Hapus dokter berdasarkan ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM dokter WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send('Kesalahan Server');
        res.redirect('/dokter'); // Kembali ke daftar dokter setelah penghapusan
    });
});

module.exports = router;
