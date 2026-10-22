# NGOFFEE ID - Cafe & Hotel

Aplikasi web berbasis Spring Boot 3 untuk NGOFFE ID (Cafe & Hotel) dengan pemesanan QR per kamar/meja, dashboard staf per role, manajemen menu/inventory, dan ringkasan keuangan.

## Teknologi
- Java 21, Spring Boot 3.5.16
- Spring Security 6, Spring Data JPA, Flyway
- Thymeleaf 3.1.5, H2/PostgreSQL
- Maven

## Fitur Utama
- Halaman publik: Beranda, Menu, Galeri, Kontak
- Pemesanan QR: scan QR per lokasi/kamar -> menu -> keranjang -> checkout -> halaman konfirmasi & status pesanan
- Autentikasi & profil pengguna
- Dashboard Admin, Kasir, Dapur, Pengantar
- Manajemen: Menu/Kategori, Lokasi/Ruangan, QR Code, Staf, Inventori, Pengeluaran, Keuangan, Pengaturan
- Halaman error kustom (400/403/404/500)

## Menjalankan di Development
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```
Aplikasi berjalan di `http://localhost:8080` (atau sesuai `SERVER_PORT`). Data seed dev aktif (akun demo tersedia).

## Build & Jalankan JAR
```bash
mvn clean package -DskipTests
java -jar target/ngoffee-id-1.0.0.jar --spring.profiles.active=dev --server.port=8090
```

## Akun Demo (dev/seed)
| Role | Username | Password |
|---|---|---|
| Admin | admin | admin123 |
| Kasir | kasir | kasir123 |
| Dapur | kitchen | kitchen123 |
| Pengantar | delivery | delivery123 |

## Testing
```bash
mvn test
```
Seluruh test (35) dalam keadaan hijau.

## Catatan
- Format angka Indonesia: `Rp 1.000,00` via Thymeleaf number formatting
- CSRF aktif untuk form POST
- `spring.jpa.open-in-view=true` untuk render view aman
- Migrasi skema dikelola Flyway (`src/main/resources/db/migration/V1__init.sql`)
