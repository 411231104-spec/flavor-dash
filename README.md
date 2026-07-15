# 🍽️ FlavorDash — Food Catalog & Order Delivery App

Aplikasi mobile berbasis **React Native + Expo** untuk katalog makanan dan manajemen pesanan.
Dikembangkan untuk memenuhi requirement **Ujian Akhir Semester (UAS)**.

---

## 📱 Fitur Utama

| Fitur | Status | Keterangan |
|-------|--------|------------|
| 🔐 JWT Authentication | ✅ | Login dengan simulasi JWT, disimpan di AsyncStorage |
| 🛡️ Route Protection | ✅ | Detail pesanan hanya bisa diakses setelah login |
| 🍕 Food Catalog | ✅ | Mengambil data dari Mock API (dummyjson.com) |
| 📋 Detail Pesanan | ✅ | Nama, jumlah, harga, status, ID pesanan |
| 📷 Camera | ✅ | Ambil foto bukti penerimaan pesanan |
| 🗺️ Maps | ✅ | Peta interaktif dengan Leaflet.js (OpenStreetMap) |
| 🌙 Light / Dark Mode | ✅ | Toggle mode warna — light (biru) & dark (slate) |
| 📐 Responsive Layout | ✅ | Flexbox + Dimensions, responsif semua ukuran layar |

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app di HP Android/iOS

### Langkah

```bash
# Clone / buka folder project
cd flavour-dash

# Install dependencies
npm install

# Jalankan dev server
npx expo start

# Scan QR code dengan Expo Go
```

---

## 🏗️ Struktur Project

```
flavour-dash/
├── app/
│   ├── _layout.js              # Root layout (ThemeProvider + AuthProvider)
│   ├── index.js                # Halaman Katalog Makanan
│   ├── login.js                # Halaman Login (JWT)
│   ├── detail.js               # Halaman Detail Pesanan (protected)
│   ├── camera.js               # Halaman Kamera (bukti foto)
│   ├── maps.js                 # Halaman Peta Restoran
│   ├── components/
│   │   └── FoodCard.js         # Komponen card makanan
│   ├── context/
│   │   ├── AuthContext.js      # JWT Auth + AsyncStorage
│   │   └── ThemeContext.js     # Light/Dark mode
│   ├── data/
│   │   └── foodData.js         # Data statis (legacy)
│   └── services/
│       └── foodService.js      # Mock API service
├── app.json                    # Konfigurasi Expo + permissions
└── package.json
```

---

## 🔐 Autentikasi (FR-01, FR-02)

- Login menggunakan username dan password **apapun** (tidak boleh kosong)
- Token JWT di-generate secara lokal dengan format `header.payload.signature`
- Token disimpan di **AsyncStorage** — tetap tersimpan meski app di-restart
- Logout akan menghapus token dari AsyncStorage
- Halaman **Detail Pesanan**, **Kamera**, dan **Maps** terlindungi oleh route protection

---

## 🌐 Mock API (FR-03)

Data makanan diambil dari **[DummyJSON](https://dummyjson.com/recipes)** — free REST API tanpa autentikasi.
Jika request gagal (offline/error), sistem otomatis menggunakan data lokal sebagai fallback.

---

## 📷 Kamera (FR-06)

1. Buka Detail Pesanan → tap **"Ambil Bukti Foto"**
2. App meminta izin kamera
3. Tampil viewfinder dengan guide frame
4. Tap tombol capture (lingkaran putih)
5. Preview foto + pilihan **"Foto Ulang"** atau **"Gunakan Foto Ini"**

---

## 🗺️ Maps (FR-07)

- Menggunakan **Leaflet.js + OpenStreetMap** via WebView (**tanpa Google Maps API Key**)
- Menampilkan **2 marker**: lokasi restoran (🍽️) dan lokasi pengiriman (📍)
- Garis rute **dashed** antara restoran dan tujuan pengiriman

---

## 🎨 Tema

| Mode | Warna Utama | Background |
|------|-------------|------------|
| ☀️ Light | `#2563EB` (Blue 600) | `#EFF6FF` (Blue 50) |
| 🌙 Dark | `#3B82F6` (Blue 500) | `#0F172A` (Slate 900) |

Toggle mode tersedia di header halaman Katalog dan di pojok kanan atas halaman Login.

---

## 📦 Dependencies

| Package | Kegunaan |
|---------|----------|
| `expo-router` | File-based routing |
| `expo-camera` | Fitur kamera |
| `@react-native-async-storage/async-storage` | Simpan JWT token |
| `react-native-webview` | Embed peta Leaflet.js |
| `react-native-safe-area-context` | SafeAreaView cross-platform |

---

## 👨‍💻 Developer

**FlavorDash** — Proyek UAS React Native  
Dibuat dengan ❤️ menggunakan Expo + React Native
