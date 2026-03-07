# Admin Account Setup - The Minimalist Greenery

## 🔐 Setup Akun Administrator

### Cara Membuat Akun Admin:

#### 1. Akses Halaman Setup
Buka: http://localhost:8080/setup-admin.html

#### 2. Isi Form Admin
- **Email Admin:** admin@minimalistgreenery.com (atau email pilihan)
- **Nama Lengkap:** Nama administrator
- **Password:** Minimal 8 karakter
- **Security Question:** Pilih pertanyaan keamanan
- **Jawaban:** Jawaban pertanyaan keamanan

#### 3. Validasi Otomatis
- System akan cek apakah akun admin sudah ada
- Password harus cocok dengan konfirmasi
- Security question untuk recovery

### 🔑 Default Admin Credentials

Jika Anda ingin menggunakan credentials default:

**Email:** admin@minimalistgreenery.com  
**Password:** admin123

### 🛡️ Security Features

1. **Password Validation:**
   - Minimal 8 karakter
   - Konfirmasi password harus cocok

2. **Security Question:**
   - Untuk recovery account
   - Tersimpan terenkripsi

3. **Admin Uniqueness:**
   - Hanya satu akun admin yang dibolehkan
   - Auto-redirect jika admin sudah ada

### 📁 File Terkait

- `setup-admin.html` - Halaman setup admin
- `login.html` - Halaman login
- `admin.html` - Dashboard admin
- `auth.js` - Sistem autentikasi

### 🔄 Setup Flow

1. **First Time Setup:**
   - Akses `setup-admin.html`
   - Buat akun admin
   - Auto-redirect ke login

2. **Normal Login:**
   - Akses `login.html`
   - Gunakan credentials yang sudah dibuat
   - Akses dashboard admin

### 🚨 Security Notes

- **Production:** Gunakan proper password hashing
- **HTTPS:** Selalu gunakan HTTPS di production
- **Environment Variables:** Simpan credentials di environment variables
- **Rate Limiting:** Implement rate limiting untuk login attempts

### 🛠️ Troubleshooting

**Lupa Password Admin:**
1. Hapus admin account dari localStorage
2. Akses kembali `setup-admin.html`
3. Buat akun admin baru

**Clear Admin Account:**
```javascript
// Di browser console
localStorage.removeItem('minimalist-greenery-users');
```

### 📱 Mobile Support

Halaman setup admin fully responsive untuk:
- Desktop
- Tablet
- Mobile

---

*Setup admin account untuk mulai mengelola konten website!*
