# Halaman Produk Marketplace — React dan Tailwind CSS

## Tentang Proyek

Proyek ini adalah halaman detail produk **Kemeja Linen Biru** untuk marketplace Escentric Molecules. Halaman dikembangkan dari versi HTML, CSS, dan JavaScript di folder `reference` menjadi aplikasi React dengan Vite dan Tailwind CSS.

Pengguna dapat melihat galeri dan memperbesar foto, memilih ukuran dan jumlah, menyimpan pilihan ke tas, serta melihat ringkasan pesanan. Tombol **Update Pilihan** menjalankan proses async dengan loading sebelum menampilkan hasil atau pesan kesalahan. Setelah berhasil, muncul status tersimpan dan animasi bola menuju Tas. Isi tas, jumlah pada header, dan ringkasan pesanan menggunakan data yang sama, sementara isi tas disimpan melalui `localStorage`.

Proyek berfokus pada satu halaman utama sesuai panduan tugas: penerapan styling, pembagian komponen React, dan penggunaan props. Halaman ini merupakan demo frontend; checkout hanya menampilkan notifikasi simulasi.

## Struktur Folder

```text
myapp/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layouts/
│   │   ├── product/
│   │   ├── cart/
│   │   └── ui/
│   ├── data/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

| Folder | Kegunaan |
| --- | --- |
| `public/` | Menyimpan aset statis yang dapat diakses langsung melalui URL, seperti favicon dan berkas ikon. |
| `src/` | Menampung kode utama aplikasi React, mulai dari tampilan, data, sampai fungsi pendukung. |
| `src/assets/` | Menampung aset lokal yang bisa diimpor dari kode. Saat ini berisi aset bawaan template; foto produk menggunakan URL pada `data/product.js`. |
| `src/components/` | Mengelompokkan bagian tampilan menjadi komponen dengan tanggung jawab masing-masing. |
| `src/components/layouts/` | Kerangka halaman: `Header` untuk merek, navigasi, dan tombol Tas; `Breadcrumbs` untuk jalur halaman; serta `Footer` untuk bagian bawah halaman. |
| `src/components/product/` | Tampilan dan interaksi produk: galeri, thumbnail, zoom, informasi produk, pilihan ukuran, jumlah, stok, wishlist, accordion, dan ringkasan pesanan. |
| `src/components/cart/` | Tampilan tas belanja. `CartPanel` menyusun panel, daftar barang, dan total; `CartItem` menampilkan satu ukuran beserta jumlah, subtotal, dan tombol hapus. |
| `src/components/ui/` | Elemen pendukung seperti `Button`, `Spinner`, `Alert`, `Toast`, `Modal`, `AccordionItem`, dan `CartFlight`. Elemen umum seperti tombol dan modal digunakan kembali di beberapa bagian halaman. |
| `src/data/` | Data produk dan toko dalam `product.js`, termasuk nama, harga, foto, ukuran, stok, merek, dan batas gratis ongkir. |
| `src/pages/` | Menyusun halaman utama melalui `ProductPage`. Folder ini menjadi tempat penghubung komponen, state pilihan dan tas, serta handler interaksi pengguna. |
| `src/utils/` | Fungsi pendukung: `formatCurrency.js` untuk format rupiah, `order.js` untuk validasi dan simulasi request, serta `cart.js` untuk pengolahan, perhitungan total, dan penyimpanan tas. |

`main.jsx` memasang aplikasi ke elemen root HTML. `App.jsx` mengambil data produk dan toko lalu mengirimkannya ke `ProductPage`. `index.css` memuat Tailwind, tema warna dan font, gaya dasar, serta animasi. `vite.config.js` mengatur plugin React dan Tailwind untuk Vite, sedangkan `package.json` mencatat dependensi dan perintah proyek.

## Penerapan Indikator Penilaian

Mengacu pada **Mini Project Full Stack Web Development - Styling React.docx**, proyek menerapkan enam parameter berikut.

### 1. Styling pada bagian utama halaman — 15 poin

Styling diterapkan menggunakan class Tailwind pada header, area konten produk, daftar barang dalam tas, dan ringkasan pesanan.

- `Header` memakai `flex` untuk susunan elemen, `border-b` sebagai pembatas, serta warna tema `bg-paper`.
- `ProductPage` menggunakan `grid grid-cols-1 lg:grid-cols-2` agar galeri dan informasi tersusun satu kolom pada layar kecil dan berdampingan pada layar lebih besar.
- `CartItem` memakai `flex gap-4`, `border-b`, dan `py-5` untuk memisahkan setiap barang secara konsisten.
- `Button` menggunakan warna `bg-moss`, perubahan warna saat hover, dan tampilan nonaktif selama loading.

Warna krem, hijau, teks, dan garis ditetapkan pada `@theme` di `src/index.css`, sehingga komponen menggunakan palet yang sama.

### 2. Perbedaan judul, teks isi, jarak, dan tata letak — 15 poin

`ProductInfo` menampilkan nama produk dengan `font-serif text-5xl` dan ukuran yang meningkat pada breakpoint lebih besar. Deskripsi menggunakan `text-base`, sedangkan informasi pendukung seperti stok dan ongkir memakai `text-xs`. Perbedaan ini membuat nama produk, isi, dan keterangan memiliki tingkat penekanan yang jelas.

Jarak antarbagian diatur dengan class seperti `gap-4`, `gap-8`, `mt-6`, dan `py-4`. Class `.page-container` menjaga lebar serta posisi konten header, halaman, dan ringkasan tetap sejajar. Breakpoint `sm`, `lg`, dan `xl` menyesuaikan ukuran teks serta susunan elemen dengan lebar layar.

### 3. Komponen React dengan fungsi yang jelas — 20 poin

Halaman dipecah berdasarkan tanggung jawabnya. `ProductGallery` mengelola pilihan foto dan zoom, `ProductInfo` menampilkan informasi produk, `PurchaseForm` menyusun kontrol pembelian, `CartPanel` menampilkan tas, dan `CartItem` menampilkan satu baris barang.

Bagian yang digunakan berulang dibuat menjadi komponen tersendiri. `Thumbnail` dipakai pada galeri dan dialog zoom, `Modal` dipakai untuk zoom dan tas, serta `Button` dipakai untuk Update Pilihan, Lihat Tas, dan checkout. Pembagian ini membuat setiap komponen menangani bagian yang jelas dan mengurangi pengulangan markup.

### 4. Merangkai komponen dan daftar item pada halaman utama — 20 poin

Alur penyusunan halaman dimulai dari `main.jsx` → `App` → `ProductPage`. `ProductPage` merangkai `Header`, `Breadcrumbs`, `ProductGallery`, `ProductInfo`, dan `Footer`, serta menampilkan ringkasan dan panel tas sesuai state.

Daftar tampilan dibuat dari data menggunakan `.map()`: `ProductGallery` merender thumbnail dari `images`, `SizeSelector` merender tombol dari `variants`, `ProductDetails` merender bagian accordion, dan `CartPanel` merender `CartItem` dari isi tas. Setiap daftar tersebut diberi `key` agar React dapat mengenali itemnya.

`ProductPage` menyimpan state tas sebagai sumber data untuk badge header, ringkasan, dan panel tas. Setelah pilihan berhasil disimpan atau jumlah di tas diubah, bagian-bagian tersebut dirender ulang dengan nilai yang sama.

### 5. Mengirim data dari induk ke anak melalui props — 15 poin

Data produk dan toko disimpan di `src/data/product.js`, kemudian dikirim oleh `App` ke `ProductPage`:

```jsx
<ProductPage product={product} store={store} />
```

`ProductPage` meneruskan data sesuai kebutuhan anaknya: `product.images` ke `ProductGallery`, objek `product` ke `ProductInfo`, serta isi tas dan total ke `CartPanel` dan `CheckoutSummary`.

Props juga digunakan untuk mengirim fungsi. Contohnya, `onSizeChange` diteruskan dari `ProductPage` melalui `ProductInfo` dan `PurchaseForm` ke `SizeSelector`. Ketika ukuran diklik, komponen anak memanggil fungsi tersebut untuk memperbarui state di induk.

### 6. Menampilkan data berdasarkan nilai props — 15 poin

Komponen anak menggunakan props untuk menentukan informasi yang tampil:

| Komponen | Props yang digunakan | Hasil pada tampilan |
| --- | --- | --- |
| `ProductInfo` | `product` | Nama, harga dalam rupiah, deskripsi singkat, dan total stok produk. |
| `ProductGallery` | `images` | Foto utama dan daftar thumbnail berdasarkan gambar yang diterima. |
| `SizeSelector` | `variants`, `selectedSize` | Label ukuran, penanda pilihan aktif, dan tombol nonaktif jika stok habis. |
| `CartItem` | `item`, `product` | Foto dan nama produk, ukuran, jumlah, harga satuan, serta subtotal untuk baris tersebut. |
| `CheckoutSummary` | `items`, `product`, `totals` | Seluruh ukuran tersimpan, rincian unit, harga satuan, subtotal, dan informasi gratis ongkir. |
| `Header` | `store`, `itemCount` | Nama merek, batas gratis ongkir, dan jumlah barang dalam tas. |

Contohnya, `CartItem` menampilkan `{product.name}`, `{item.size}`, dan `{item.quantity}`, lalu menghitung subtotal baris dengan `product.price * item.quantity`. Komponen yang sama dapat menampilkan ukuran S atau M sesuai data yang diterimanya.

## Validasi Error dan Notifikasi Informasi

### Validasi saat Update Pilihan

Validasi dijalankan oleh `createOrder()` di `src/utils/order.js`. Fungsi ini dipanggil dalam **`async function handleSubmit(event)`** pada `ProductPage`, setelah `await waitForRequest()` selesai. Selama sekitar satu detik, tombol menampilkan **Memproses…** dan spinner, serta kontrol pembelian dinonaktifkan untuk mencegah submit berulang. Simulasi ini menggunakan Promise dan timer, tanpa request API.

| Kondisi | Pesan error |
| --- | --- |
| Ukuran belum dipilih. | `Pilih ukuran dulu.` |
| Ukuran tidak ditemukan pada data produk. | `Ukuran tidak valid.` |
| Jumlah kosong, nol, negatif, atau bukan bilangan bulat. | `Jumlah harus bilangan bulat positif.` |
| Harga produk bukan angka finite atau nilainya tidak lebih dari nol. | `Harga produk belum tersedia.` |
| Ukuran yang dipilih memiliki stok nol. | `Ukuran L sedang habis.` — huruf ukuran mengikuti data. |
| Jumlah melebihi stok ukuran terpilih. | `Jumlah melebihi stok (sisa 3).` — angka mengikuti stok. |

Ukuran yang habis sudah dinonaktifkan pada pilihan ukuran. Pemeriksaan ukuran dan harga dalam fungsi tetap disediakan untuk memvalidasi data yang diterima.

Jika validasi gagal, `throw new Error()` ditangkap oleh `catch` pada handler submit. Pesannya disimpan dalam state `error`, diteruskan melalui props ke `PurchaseForm`, lalu ditampilkan oleh `Alert` dengan latar merah dan `role="alert"`. Pesan baru muncul setelah loading selesai, dan isi tas sebelumnya tetap dipertahankan. Bagian `finally` mengakhiri loading agar pengguna bisa memperbaiki pilihan dan mencoba kembali.

### Batas jumlah dan penyimpanan tas

Tombol jumlah pada form memiliki pemeriksaan langsung, tanpa menunggu loading submit:

- Menekan **+** sebelum memilih ukuran menampilkan `Pilih ukuran dulu.`
- Menekan **−** saat jumlah sudah 1 menampilkan `Jumlah minimal 1.`
- Menekan **+** saat mencapai stok menampilkan, misalnya, `Maksimal 5, sesuai stok.`
- Jika nilai jumlah tidak valid ketika tombol −/+ ditekan, nilainya dikembalikan ke 1; tombol + tetap meminta ukuran dipilih terlebih dahulu.

Di panel tas, tombol − dinonaktifkan pada jumlah 1 dan tombol + dinonaktifkan ketika mencapai stok. Perubahan jumlah juga diperiksa melalui `createOrder()`; jika gagal, pesan ditampilkan oleh `Alert` di panel tas.

Jika penulisan `localStorage` gagal, panel menampilkan informasi: **“Browser tidak mengizinkan penyimpanan. Tas tetap bisa dipakai selama halaman ini terbuka.”** Isi tas tetap tersedia dalam state selama halaman terbuka. Data tersimpan yang rusak atau tidak valid ditangani saat dimuat: data tidak sesuai diabaikan dan jumlah yang melebihi stok dibatasi ke stok terkini.

### Informasi setelah berhasil dan status lainnya

| Kejadian | Informasi yang ditampilkan |
| --- | --- |
| Update Pilihan berhasil. | Pesan hijau di bawah tombol, misalnya `✓ Ukuran S · 2 barang sudah di tas.`, dan ikon tombol berubah menjadi centang. Bola kecil terbang menuju Tas, kecuali pengaturan pengurangan gerakan aktif. |
| Isi tas berhasil diperbarui. | Badge jumlah pada header, rincian unit, subtotal, dan informasi ongkir di ringkasan serta panel tas mengikuti data terbaru. Ringkasan menampilkan `✓ Tersimpan di tas`. |
| Jumlah pada form diubah tetapi belum disimpan. | Pesan berubah menjadi informasi berwarna kuning, misalnya `Di tas: ukuran S · 2 barang. Klik Update Pilihan untuk menyimpan jumlah baru.` Isi tas tetap memakai jumlah sebelumnya sampai submit berhasil. |
| Satu ukuran dihapus dari tas. | Panel menampilkan, misalnya, `Ukuran S dihapus dari tas.` |
| Seluruh isi tas dihapus. | Panel menampilkan `Tas sudah dikosongkan.` dan tampilan `Tas masih kosong`. |
| Subtotal mencapai Rp300.000. | Ringkasan dan panel tas menampilkan `Gratis ongkir!`. Jika belum mencapai batas, ditampilkan nominal tambahan yang diperlukan. |
| Wishlist diaktifkan. | Ikon hati terisi dan teks berubah menjadi `Ditambahkan ke wishlist`. |
| Tombol Lanjutkan Pembayaran diklik. | Toast menampilkan `Demo: halaman pembayaran belum tersedia.` selama 2,5 detik atau sampai ditutup pengguna. Pesan ini hanya informasi demo, bukan konfirmasi pembayaran berhasil. |

Pesan sukses penyimpanan tampil sebagai status pada form dan ringkasan. Komponen `Toast` digunakan untuk informasi checkout demo. Pesan status menggunakan `role="status"` agar perubahan informasi dapat diumumkan oleh pembaca layar.
