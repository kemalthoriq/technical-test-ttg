const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    try {
        const { nama, email, password} = req.body;

        if (!nama || !email || !password) {
            console.log('[POST /users] Gagal: field tidak lengkap');
            return res.status(400).json({ error: 'Field nama, email, dan password wajib diisi'});
        }

        const [existing] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            console.log(`[POST /users] Gagal: email "${email}" sudah digunakan`);
            return res.status(409).json({ error: 'Email sudah digunakan'});
        }

        const [result] = await pool.query(
            'INSERT INTO users (nama, email, password) VALUES (?, ?, ?)',
            [nama, email, password]
        );

        console.log(`[POST /users] Pengguna baru ditambahkan → ID: ${result.insertId}, Nama: ${nama}, Email: ${email}`);
        res.status(201).json({
            message: 'Pengguna berhasil ditambahkan',
            id: result.insertId
        });
    } catch (err) {
        console.error('[POST /users] Error:', err.message);
        res.status(500).json({ error: err.message});
    }
});

router.get('/:id', async (req, res ) => {
    try {
        const [users] = await pool.query(
            'SELECT id, nama, email, created_at FROM users WHERE id = ?',
            [req.params.id]
        );

        if (users.length === 0) {
            console.log(`[GET /users/${req.params.id}] Gagal: pengguna tidak ditemukan`);
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }

        console.log(`[GET /users/${req.params.id}] Data ditemukan → Nama: ${users[0].nama}, Email: ${users[0].email}`);
        res.json(users[0]);
    } catch (err) {
        console.error(`[GET /users/${req.params.id}] Error:`, err.message);
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, nama, email, created_at FROM users'
    );

    console.log(`[GET /users] Mengambil semua pengguna → Total: ${users.length} data`);
    res.json(users);

  } catch (err) {
    console.error('[GET /users] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM users WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            console.log(`[DELETE /users/${req.params.id}] Gagal: pengguna tidak ditemukan`);
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }

        console.log(`[DELETE /users/${req.params.id}] Pengguna berhasil dihapus`);
        res.json({ message: 'Pengguna berhasil dihapus' });
    } catch (err) {
        console.error(`[DELETE /users/${req.params.id}] Error:`, err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;