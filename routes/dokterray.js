const express = require('express');
const router = express.Router();

let dokterList = [
    {
        id: 1, 
        nama: "Dr. John Doe", 
        spesialisasi: "Kardiologi", 
        telepon: "081234567890", 
        email: "john.doe@example.com"
    },
    {
        id: 2, 
        nama: "Dr. Jane Smith", 
        spesialisasi: "Penyakit Dalam", 
        telepon: "082345678901", 
        email: "jane.smith@example.com"
    }
];

// Endpoint untuk mendapatkan data dokter
router.get('/', (req, res) => {
    res.json(dokterList);
});

// Endpoint untuk menambah dokter baru
router.post('/', (req, res) => {
    const { nama, spesialisasi, telepon, email } = req.body;

    // Validasi input
    if (!nama || !spesialisasi || !telepon || !email) {
        return res.status(400).json({ message: 'Semua data dokter harus diisi' });
    }

    const newDokter = {
        id: dokterList.length + 1, // ID auto increment
        nama,
        spesialisasi,
        telepon,
        email
    };

    dokterList.push(newDokter);
    res.status(201).json(newDokter); // Kembalikan dokter yang baru ditambahkan
});

// PUT: Update data dokter berdasarkan ID
router.put('/:id', (req, res) => {
    const dokterId = parseInt(req.params.id);
    const { nama, spesialisasi, telepon, email } = req.body;

    // Cari dokter berdasarkan ID
    const dokterIndex = dokterList.findIndex(dokter => dokter.id === dokterId);

    if (dokterIndex !== -1) {
        // Update data dokter dengan data baru
        dokterList[dokterIndex] = {
            ...dokterList[dokterIndex],
            nama: nama !== undefined ? nama : dokterList[dokterIndex].nama,
            spesialisasi: spesialisasi !== undefined ? spesialisasi : dokterList[dokterIndex].spesialisasi,
            telepon: telepon !== undefined ? telepon : dokterList[dokterIndex].telepon,
            email: email !== undefined ? email : dokterList[dokterIndex].email
        };

        res.json(dokterList[dokterIndex]); // Kembalikan dokter yang sudah diupdate
    } else {
        res.status(404).json({ message: 'Dokter tidak ditemukan' });
    }
});

// DELETE: Hapus dokter berdasarkan ID
router.delete('/:id', (req, res) => {
    const dokterId = parseInt(req.params.id);

    // Cari dokter berdasarkan ID
    const dokterIndex = dokterList.findIndex(dokter => dokter.id === dokterId);

    if (dokterIndex !== -1) {
        // Hapus dokter dari array
        const deletedDokter = dokterList.splice(dokterIndex, 1);
        res.json(deletedDokter[0]); // Kembalikan dokter yang dihapus
    } else {
        res.status(404).json({ message: 'Dokter tidak ditemukan' });
    }
});

module.exports = router;
