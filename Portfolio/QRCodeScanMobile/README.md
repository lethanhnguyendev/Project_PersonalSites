# 📱 Barcode Scanner Inventory



<p align="center">
  <img src="QRCodeScanMobile/ReadmeImages/BACKGROUND.png" alt="Barcode Scanner Inventory" width="100%" />
</p>

<p align="center">
  <img src="QRCodeScanMobile/ReadmeImages/icon.png" alt="App Icon" width="120" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-5.0-512BD4?style=flat-square&logo=dotnet" alt=".NET" />
  <img src="https://img.shields.io/badge/Xamarin.Forms-5.0-3498DB?style=flat-square" alt="Xamarin" />
  <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=flat-square&logo=android" alt="Android" />
  <img src="https://img.shields.io/badge/Release-07%2FJuly%2F2023-2E7D32?style=flat-square" alt="Release" />
</p>

A cross-platform mobile application (Android | IO) built with **Xamarin.Forms** for scanning QR codes and barcodes, managing inventory items, and exporting professional Excel reports. Designed for warehouse management, asset tracking, and inventory control—perfect for teams who need to capture and report data on the go.

**Release date:** July 7, 2023

---

## ✨ Features

### 📷 **Barcode & QR Code Scanning**
- Fast and accurate scanning using ZXing library
- Support for QR codes and various barcode formats
- Haptic feedback (vibration) and sound feedback on successful scan
- Real-time camera preview with optimized scanning options

### 📦 **Inventory Management**
- **Add items** with barcode, item name, amount, and user attribution
- **View scanned items** in a clean, organized collection view
- **Delete individual items** with tap-to-delete interaction
- **Clear all items** with confirmation dialog
- **Local storage** — data persists on device using JSON files

### 📊 **Excel Report Export**
- Export all scanned items to professionally formatted Excel (.xlsx) files
- Includes: serial number, date/time, barcode, item name, amount, and person who scanned
- One-tap share to email, cloud storage, or messaging apps
- Built with EPPlus for reliable Excel generation

### 🌐 **Multi-Language Support**
- **English** and **Vietnamese (Tiếng Việt)** localization
- Language preference saved and restored on app launch
- Full UI translation via resource files (RESX)

### ⚙️ **Settings & Permissions**
- Camera permission management with visual status indicators
- Network status monitoring
- One-tap permission request for camera, vibration, and network
- Links to developer website and Google Play channel

### 🔧 **Production-Ready Integrations**
- **Microsoft App Center** — Analytics and crash reporting for monitoring app health
- **Xamarin.Essentials** — Cross-platform APIs for permissions, storage, sharing, and device info

---

## 🎯 Use Cases

- **Warehouse & Logistics** — Quick inventory counting and item tracking
- **Retail** — Product scanning and stock management
- **Event Management** — Attendee/asset check-in with QR codes
- **Asset Management** — Track equipment and devices by barcode
- **Small Business** — Simple, offline-capable inventory without complex backend

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Xamarin.Forms 5.0 |
| **Language** | C# / .NET Standard 2.0 |
| **Barcode Scanning** | ZXing.Net.Mobile |
| **Excel Export** | EPPlus |
| **UI Components** | DevExpress XamarinForms (CollectionView, Editors) |
| **Analytics & Crashes** | Microsoft App Center |
| **Utilities** | Xamarin.Essentials, Newtonsoft.Json, Xamarin.CommunityToolkit |

---

## 📁 Project Structure

```
QRCodeScanMobile/
├── QRCodeScanMobile/           # Shared UI & logic
│   ├── Models/
│   │   └── Item.cs             # Data model for scanned items
│   ├── Services/
│   │   ├── Services.cs         # Core logic: storage, permissions, Excel export, App Center
│   │   └── AdmobServiecs.cs    # AdMob integration
│   ├── Views/
│   │   ├── MainPage.xaml       # Main tabbed interface (Scan, Items, Settings)
│   │   ├── SplashScreenPage.xaml
│   │   └── WellcomePage.xaml
│   └── Resx/                   # Localization resources
├── QRCodeScanMobile.Android/   # Android platform project
│   ├── MainActivity.cs
│   ├── Assets/                 # Audio (beep, done)
│   └── Resources/              # Icons, drawables
└── QRCodeScanMobile.sln
```

---

## 🚀 Getting Started

### Prerequisites

- **Visual Studio 2022** (or later) with:
  - .NET workloads
  - Mobile development with .NET (Xamarin)
  - Android SDK (API 21+)
- **Android device** or **emulator** with camera support

### Build & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/lethanhnguyendev/QRCodeScanMobile.git
   cd QRCodeScanMobile
   ```

2. **Restore NuGet packages**
   ```bash
   dotnet restore QRCodeScanMobile.sln
   ```

3. **Build the solution**
   ```bash
   dotnet build QRCodeScanMobile.sln -c Release
   ```

4. **Deploy to Android**
   - Open `QRCodeScanMobile.sln` in Visual Studio
   - Select `QRCodeScanMobile.Android` as startup project
   - Choose an Android device or emulator
   - Press **F5** or click **Run**

---

## 📱 Screenshots

### App Preview

<p align="center">
  <img src="QRCodeScanMobile/ReadmeImages/z4453081405278_f528f3ea04e79b37a9eff05b189daaa5.jpg" width="200" />  <img src="QRCodeScanMobile/ReadmeImages/z4453081392093_dd92aa40f0ca39243b264ed72d81a827.jpg" width="200" />
  <img src="QRCodeScanMobile/ReadmeImages/z4453081395131_9133eda989b72432b422c4398590a269.jpg" width="200" />
</p>
<p align="center"><i>Loading Page • Settings Page • Add Item Page</i></p>

<p align="center">
  <img src="QRCodeScanMobile/ReadmeImages/z4454126225780_77e376a1cdb316c288f4c5e61f848bfb.jpg" width="200" />
  <img src="QRCodeScanMobile/ReadmeImages/z4454126263266_83387cf2e071d6a7009ed49ba5bc1020.jpg" width="200" />
  <img src="QRCodeScanMobile/ReadmeImages/z4453081444640_9fef93e74fc3c1d11524061e5014c4b6.jpg" width="200" />
</p>
<p align="center"><i>Scanning Feature: Barcode/QR-Code</i></p>

<p align="center">
  <img src="QRCodeScanMobile/ReadmeImages/z4454135097873_fca45c0650c5ecc10e148b9cf0eb3cf1.jpg" width="200" />
  <img src="QRCodeScanMobile/ReadmeImages/z4453081432410_764de3134de03e1bc22d60baaa727ea3.jpg" width="200" />
</p>
<p align="center"><i>Items Scanned • Inventory View</i></p>

<p align="center">
  <img src="QRCodeScanMobile/ReadmeImages/z4454141069336_6180f1948d5e68cd1699cea67a23da2a.jpg" width="100%" />
</p>
<p align="center"><i>Export to Excel Feature</i></p>

<p align="center">
  <img src="QRCodeScanMobile/ReadmeImages/z4453081447509_7cee016b27be5af65038bfb210ab8931.jpg" width="200" />
  <img src="QRCodeScanMobile/ReadmeImages/z4453190195278_1ca9942dd84aadeb916c38022558fd03.jpg" width="200" />
</p>
<p align="center"><i>Multi-language: English & Vietnamese</i></p>

---

## 🏆 Impact & Achievements

This application has been deployed in real-world business environments with measurable results:

| Achievement | Description |
|-------------|-------------|
| **Enterprise deployment** | A **premium private version** for enterprises—with direct data sync to cloud database—was adopted by **Cantho Power Electric Company (Vietnam)** for product inventory management. |
| **Scale** | Warehouse staff used the app to inventory **over 10,000 electrical devices** in 2024. |
| **Efficiency** | Inventory time was reduced to **1/5** compared to manual counting methods. |

---

## 👤 Author

**Le Thanh Nguyen (Tom)**

- 🌐 Website: [www.nguyenlethanh.com](https://www.nguyenlethanh.com)
- 📱 Google Play: [View more apps](https://play.google.com/store/apps/dev?id=7763192101289353574)