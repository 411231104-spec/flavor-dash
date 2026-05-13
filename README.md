# Analisis Teknis Proyek Aplikasi FlavorDash - UTS Pemrograman Mobile

## 

## 1\. Analisis Responsivitas Katalog 

* ### Implementasi Flexbox \& Nested View

Dalam proyek ini, tata letak katalog dirancang menggunakan komponen dasar React Native (`View`, `Text`, `Image`) dengan pendekatan **Flexbox**.

* **`flexDirection: 'row'`**: Digunakan pada container utama untuk menyejajarkan gambar produk dan blok deskripsi secara horizontal dalam satu baris.
* **Nested View**: Struktur ini memungkinkan pemisahan logika layout antara aset visual (gambar) dan informasi tekstual (deskripsi), sehingga pengaturan spasi (margin/padding) menjadi lebih presisi.
* ### Solusi Terhadap Fragmentasi Layar

Penggunaan **unit proporsional (`flex: 1`)** pada container deskripsi adalah kunci utama dalam menangani fragmentasi layar pada ekosistem mobile (Android \& iOS).

* **Alasan Teknis**: Perangkat mobile memiliki resolusi dan *density* pixel yang sangat beragam. Jika menggunakan ukuran absolut (pixel tetap), layout berisiko terpotong pada layar kecil atau terlihat tidak proporsional pada layar besar.
* **Hasil**: Dengan `flex: 1`, area deskripsi akan secara otomatis melebar untuk mengisi sisa ruang yang tersedia setelah lebar gambar ditentukan. Hal ini memastikan UI tetap konsisten, fungsional, dan estetis di berbagai tipe perangkat.

\-------------------

## 2\. Analisis Keamanan Stateless \& JWT

### Mekanisme Middleware \& Route Protection

Aplikasi ini menggunakan **Expo Router** untuk manajemen navigasi. Proteksi rute diimplementasikan pada level **Middleware** (di dalam `\_layout.js`).

* **Alur Kerja**: Sebelum sebuah halaman (seperti 'Detail Pesanan') dirender, middleware akan mengecek keberadaan token JWT di penyimpanan lokal. Jika token tidak ditemukan atau tidak valid, pengguna akan secara otomatis diarahkan kembali ke halaman Login.

### Anatomi JSON Web Token (JWT)

Implementasi keamanan ini didasarkan pada tiga komponen utama JWT:

1. **Header**: Mendefinisikan tipe token dan algoritma enkripsi yang digunakan.
2. **Payload**: Berisi klaim atau data pengguna (seperti user\_id) yang diperlukan oleh aplikasi.
3. **Signature**: Bagian krusial yang menjamin integritas token. Signature dibuat dengan menggabungkan encoded header, payload, dan secret key untuk memastikan token tidak dimodifikasi oleh pihak yang tidak berwenang.

### Efisiensi Stateless vs Stateful

Tim memilih metode **Stateless Authentication** karena aplikasi direncanakan untuk skala besar dengan jutaan pengguna.

* **Skalabilitas**: Berbeda dengan *Stateful (Session-based)* yang mengharuskan server menyimpan data sesi di memori (RAM) atau database untuk setiap user aktif, *Stateless* memindahkan beban tersebut ke sisi klien.
* **Performa**: Server hanya perlu memvalidasi Signature dari token yang dikirimkan. Tanpa perlu melakukan *query* database sesi berulang kali, penggunaan sumber daya server menjadi jauh lebih efisien dan respons aplikasi menjadi lebih cepat bagi jutaan pengguna sekaligus.

\---

