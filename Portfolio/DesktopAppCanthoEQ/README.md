# Electrical Equipment Information Management Desktop App

## Introduction

**Electrical Equipment Information Management Desktop App** is a Windows desktop application for creating, managing, and exporting electrical testing reports for Can Tho Power Corporation (PCCT). It connects to the **RESTful API Backend** (Azure Functions) to fetch construction and equipment data, then generates Word (.docx) reports and Excel (.xlsx) exports for testing staff.

The application is the **desktop client** of the electrical testing digital transformation ecosystem, complementing the cloud-based API backend. It provides an intuitive interface for field staff to search, manage, confirm test data, and export official reports and certificates.

---

## Main Features

### 1. Login
- Authentication via employee ID and password against the backend API (UserAPI)
- Optional save username/password (Settings)
- Loads library data (templates, common values) on startup

### 2. Search & View (Search_Form)
- **Construction list**: Query construction projects by month and year, display in DevExpress Grid
- **Equipment list**: View equipment pending confirmation (`TINHTRANG = 'CHỜ XÁC NHẬN'`) from Cosmos DB
- Search and filter construction data; column customization, footer summary
- Navigate to Manager form to edit or create report for selected construction/equipment

### 3. Manager (Manager_Form)
- **Construction (Công trình)**: Add/edit construction info (name, address, management unit, request content, equipment list, status, staff, etc.)
- **Equipment per construction**: Add/remove equipment items (name, quantity) in a grid
- Save construction and equipment data to the backend via ConstructionAPI and EquipmentAPI
- Load images/files from backend (FileAPI/MediaService) for equipment or attachments

### 4. Create Report (CreateBBTN_Form)
- Create test reports (BBTN), inspection reports (BBKD), certificates (GCN)
- Fill in: test time, inspector (NVKIEMSOAT), department head (PHOPHONG), director (PHOGIAMDOC), conclusion (KETLUAN), document number (MASOBBTN)
- **Export to Word (.docx)** using DocX (Xceed.Words.NET): loads template from Azure Blob Storage, fills placeholders, saves to local file
- Supports multiple equipment types (MBA1PHA, MBA3PHA, DTTD, MCCB, CAPNGAM, etc.) with specific report formats

### 5. Export Data by Month (ExportDatMonth_Form)
- Select month and year
- Query all construction and equipment data for that period from backend
- **Export to Excel (.xlsx)** in bulk using EPPlus
- Used for periodic reporting, data backup, and analysis

---

## Technology Stack

| Category        | Technology                                            |
|----------------|--------------------------------------------------------|
| Language       | C#                                                    |
| Framework      | .NET Framework 4.7.2                                  |
| UI             | Windows Forms, DevExpress v22.2 (XtraEditors, XtraGrid, XtraLayout, XtraPrinting) |
| HTTP Client    | System.Net.Http                                       |
| JSON           | Newtonsoft.Json                                       |
| Word export    | DocX (Xceed.Words.NET)                                |
| Excel export   | EPPlus                                                |
| Backend API    | Azure Functions (thinghiemdiencanthofunctionapp)      |
| Storage        | Azure Blob Storage (report templates)                 |

---

## System Architecture

The desktop application connects to and queries data from the **API Backend** of the electrical testing project (RESTful API Backend – Can Tho Power). It sends and receives construction, equipment, user, and file data over HTTP; report templates are loaded from backend storage as needed.

---

## Project Structure

```
BienBanThiNghiem_Desktop/
├── Models/           # Construction, Equipment, Document (test report), User
├── Views/            # Login_Form, Search_Form, Manager_Form, CreateBBTN_Form, ExportDatMonth_Form
├── Services/         # ConstructionService, EquipmentService, UserService, MediaService, UtilityService, Config, AppSettings
├── Properties/       # Settings, Resources
├── Program.cs
└── App.config
```

### Views
- **Login_Form**: Login screen, calls UserService.Login
- **Search_Form**: Main search/dashboard — construction by month/year, equipment pending confirmation
- **Manager_Form**: Construction and equipment CRUD, save to backend
- **CreateBBTN_Form**: Create and export BBTN/BBKD/GCN to Word
- **ExportDatMonth_Form**: Bulk export construction + equipment to Excel by month

### Services
- **ConstructionService**: Query construction from ConstructionAPI
- **EquipmentService**: CRUD equipment via EquipmentAPI, export Word/Excel (BBTN, BBKD, GCN, bulk Excel)
- **UserService**: Login via UserAPI
- **MediaService**: Download files and list files from FileAPI
- **Config**: HttpClient instances, Bearer Token, API base URL
- **AppSettings**: Load library data (templates, common values)
- **UtilityService**: Token generation, helpers

---

## Configuration

- **App.config**: Application settings
- **Config.cs**: API endpoint `https://thinghiemdiencanthofunctionapp.azurewebsites.net/api/` (or localhost for dev)
- **Settings**: Username, password (optional persistence)

---

## Main Data Models

- **Construction**: id, creationTime, constructionName, constructionAddress, managementUnit, requestContent, equipmentList, constructionType, purpose, status, staffName, contact
- **Equipment**: id, constructionId, creationTime, equipmentType, position, remarks, conclusion, status, staffName, testDataList
- **Document** (test report header): documentNumber, creationTime, inspector, departmentHead, director, Construction, equipmentList
- **User**: id, employeeId, password, fullName, phone, title, unit

---

## Context

Part of the **Electrical Testing Digital Transformation** for Can Tho Power Corporation. The desktop app is the client-side tool for staff to interact with the cloud backend, manage construction and equipment data, and produce official test reports and certificates.
