const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());

const userRouter = require('./routes/users');
app.use('/users', userRouter);

async function startServer() {
    try {
        await pool.getConnection();
        console.log('Berhasil konek di database');

        app.listen(process.env.PORT, () => {
            console.log(`Server berjalan di port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('gagal konek ke database:', err.message);
    }
}

startServer();