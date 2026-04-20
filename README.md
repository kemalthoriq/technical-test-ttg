# Technical Test — Dokumentasi

Repositori ini berisi jawaban dari 4 soal dalam sesi technical test. Setiap soal berada di folder terpisah dengan implementasinya masing-masing.

---

## Daftar Isi

- [Soal 1 — Form Pendaftaran (Frontend)](#soal-1--form-pendaftaran-frontend)
- [Soal 2 — REST API Users (Backend)](#soal-2--rest-api-users-backend)
- [Soal 3 — Mencari Angka yang Hilang (Algoritma)](#soal-3--mencari-angka-yang-hilang-algoritma)
- [Soal 4 — Ekspresi Matematika (Algoritma)](#soal-4--ekspresi-matematika-algoritma)
- [Struktur Proyek](#struktur-proyek)

---

## Soal 1 — Form Pendaftaran (Frontend)

**Lokasi:** `soal-1/`

### Deskripsi

Form pendaftaran pengguna berbasis HTML murni dengan validasi sisi klien menggunakan JavaScript.

### Fitur

- Input: Nama Lengkap, Email, Password, Konfirmasi Password
- Validasi real-time saat form di-submit:
  - Nama tidak boleh kosong
  - Email tidak boleh kosong dan harus berformat valid
  - Password minimal 8 karakter
  - Konfirmasi password harus cocok dengan password
- Menampilkan pesan error di bawah tiap field yang gagal validasi
- Menampilkan pesan sukses `"Pendaftaran Berhasil"` jika semua validasi lolos

### Cara Menjalankan

Buka file `soal-1/index.html` langsung di browser — tidak memerlukan server atau dependensi tambahan.

---

## Soal 2 — REST API Users (Backend)

**Lokasi:** `soal-2/`

### Deskripsi

REST API manajemen pengguna dibangun dengan **Node.js**, **Express.js**, dan **MySQL** sebagai database.

### Teknologi

| Paket       | Versi    |
|-------------|----------|
| express     | ^5.2.1   |
| mysql2      | ^3.22.1  |
| dotenv      | ^17.4.2  |

### Endpoint

| Method   | Endpoint      | Deskripsi                        |
|----------|---------------|----------------------------------|
| `POST`   | `/users`      | Tambah pengguna baru             |
| `GET`    | `/users`      | Ambil semua pengguna             |
| `GET`    | `/users/:id`  | Ambil pengguna berdasarkan ID    |
| `DELETE` | `/users/:id`  | Hapus pengguna berdasarkan ID    |

### Detail Endpoint

#### `POST /users`

**Request Body:**
```json
{
  "nama": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response Sukses** `201 Created`:
```json
{
  "message": "Pengguna berhasil ditambahkan",
  "id": 1
}
```

**Response Error:**
- `400` — Field tidak lengkap
- `409` — Email sudah digunakan

---

#### `GET /users`

**Response Sukses** `200 OK`:
```json
[
  {
    "id": 1,
    "nama": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-04-20T10:00:00.000Z"
  }
]
```

---

#### `GET /users/:id`

**Response Sukses** `200 OK`:
```json
{
  "id": 1,
  "nama": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-04-20T10:00:00.000Z"
}
```

**Response Error:**
- `404` — Pengguna tidak ditemukan

---

#### `DELETE /users/:id`

**Response Sukses** `200 OK`:
```json
{
  "message": "Pengguna berhasil dihapus"
}
```

**Response Error:**
- `404` — Pengguna tidak ditemukan

---

### Konfigurasi Environment

Buat file `.env` di dalam folder `soal-2/` dengan isi:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
```

### Skema Database

```sql
CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nama       VARCHAR(255)        NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255)        NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Cara Menjalankan

```bash
cd soal-2
npm install
node server.js
```

---

## Soal 3 — Mencari Angka yang Hilang (Algoritma)

**Lokasi:** `soal-3/solution.js`

### Deskripsi

Diberikan sebuah array angka, fungsi `findMissingNumbers(arr)` mengembalikan semua angka yang hilang di antara nilai **minimum** dan **maksimum** array tersebut.

### Pendekatan

1. Tentukan nilai `min` dan `max` dari array
2. Masukkan seluruh elemen array ke dalam `Set` untuk pencarian O(1)
3. Iterasi dari `min` hingga `max`, kumpulkan angka yang tidak ada di `Set`

**Kompleksitas:** O(n) waktu, O(n) ruang

### Contoh

```js
findMissingNumbers([3, 0, 2, 4])        // [1]
findMissingNumbers([3102, 3104, 3105, 3106, 3107]) // [3103]
findMissingNumbers([1, 2, 4, 6, 7, 10]) // [3, 5, 8, 9]
findMissingNumbers([100, 102, 105, 107]) // [101, 103, 104, 106]
```

### Cara Menjalankan

```bash
node soal-3/solution.js
```

---

## Soal 4 — Ekspresi Matematika (Algoritma)

**Lokasi:** `soal-4/solution.js`

### Deskripsi

Diberikan array angka `source` dan sebuah angka `target`, fungsi `solve(source, target)` mengembalikan semua ekspresi matematika unik yang menggunakan **seluruh angka** dari `source` (dengan operator `+`, `-`, `*`) yang menghasilkan nilai sama dengan `target`.

### Pendekatan

Menggunakan dua teknik rekursif:

1. **`permutations(arr)`** — Menghasilkan semua kemungkinan urutan angka (n! permutasi)
2. **`buildExpressions(nums)`** — Untuk setiap urutan, membangun semua pohon ekspresi dengan memilih titik pemisah (split point) dan operator

Tanda kurung ditambahkan secara otomatis sesuai prioritas operator untuk memastikan ekspresi yang ditampilkan akurat secara matematis.

**Kompleksitas:** Eksponensial — cocok untuk input kecil (≤ 5 angka)

### Contoh

```js
solve([1, 4, 5, 6], 16)
// Contoh solusi: "1 + 4 + 5 + 6", "5 * 4 - 6 + 1", dst.

solve([2, 3, 5, 10], 25)
// Contoh solusi: "5 * (10 - 3) - 2 * 5", dst.
```

### Cara Menjalankan

```bash
node soal-4/solution.js
```

---

## Struktur Proyek

```
TECHNICAL-TEST/
├── soal-1/
│   ├── index.html       # Markup form pendaftaran
│   ├── style.css        # Styling form
│   └── script.js        # Logika validasi client-side
│
├── soal-2/
│   ├── server.js        # Entry point Express server
│   ├── db.js            # Konfigurasi koneksi MySQL pool
│   ├── package.json
│   └── routes/
│       └── users.js     # Route handler CRUD pengguna
│
├── soal-3/
│   └── solution.js      # Fungsi findMissingNumbers
│
├── soal-4/
│   └── solution.js      # Fungsi solve (ekspresi matematika)
│
└── README.md
```
