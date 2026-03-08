# RESTful API Backend – Electrical Equipment Information in Cantho Power Company

## Introduction

The **Electrical Testing Digital Transformation PCCT** system is a serverless backend solution built on **Azure Functions**, serving electrical testing process management for Can Tho Power Corporation (PCCT). The system supports the full lifecycle from accepting testing requests, managing construction projects & equipment, file storage, document signing to customer SMS notifications.

**Data separation architecture**: Uses **SQL Server** and **ASP.NET RESTful API** for internal user management and authentication. After successful authentication, the system calls **Azure Functions** (FunctionApp) to query and store electrical equipment and construction data in **Cosmos DB** – suitable for large data volumes, ensuring performance and scalability.

This API Backend serves as a critical infrastructure platform layer, providing the backend platform for other application components (web app, mobile app, partner integrations, etc.) to connect and operate.

---

## Main Features

### 1. Construction Management
- **CRUD construction**: Create, update, delete, and query testing construction projects
- **Basic search**: Keyword search (project name, address, management unit, staff, request content, etc.) with `offset/limit` pagination
- **Advanced search**: Filter by multiple fields (constructionName, constructionAddress, managementUnit, requestContent, staffName) and date range (dateFrom – dateTo)
- **Equipment catalog per construction**: Link testing equipment to each construction project
- **Construction library**: Query templates and standard catalogs from library

### 2. Request / Ticket Management (Ticket)
- **Testing request registration**: Customer registration, lookup requests, consultation
- **CRUD tickets**: Create, update, delete, query tickets by ID and phone number (partition key)
- **Status management**: PENDING → ACCEPTED
- **Processing history**: Record acceptance and execution history
- **Link to Construction**: Connect ticket to construction code via `TAG`

### 3. Equipment Management
- **CRUD equipment**: Create, update, delete, query testing equipment
- **Link to construction**: Each equipment is tied to `constructionId`
- **Testing data management**: Store data list (`testDataList`) for each equipment
- **Equipment library**: Retrieve standard equipment templates and common data

### 4. User Management (User)
- **CRUD staff**: Create, update, delete, query staff information (SQL Server – internal users)
- **Login**: Authentication by employee ID and password (ASP.NET API)
- **Staff information**: Employee ID, full name, title, unit, phone number

### 5. File Management (File)
- **Upload file**: Store Base64-encoded files in Azure Blob Storage by `id`
- **Download file**: Retrieve files as Base64
- **File list**: List all files in the corresponding container

### 6. Document Signing (KYSO - Digital Documents)
- **Create document**: Create digital document with content, type (BBTN, Detailed Calculation, etc.), save file content to Blob
- **Document numbering**: Auto-assign document numbers in format `{number}/PCCT-KT-{documentType}`
- **Signing workflow**: Multi-turn signing, status PENDING SIGNATURE → PENDING RELEASE → RELEASED
- **Query**: By tag, signer, date range, Admin search
- **Signature image**: Store and download staff signature images

### 7. Customer API (Customers)
- **Public API**: For external partners
- Query construction by month, year; query equipment by `constructionId`

### 8. Utility Services (ServiceAPI)
- **Check IP**: Verify IP via Viettel service
- **Send SMS**: Send SMS via Viettel SOAP API (AMS Branded Messaging)

---

## Technologies

| Category       | Technology                               |
|----------------|------------------------------------------|
| Runtime        | .NET 8                                   |
| Main backend   | Azure Functions v4 (HTTP Trigger)        |
| Auth API       | ASP.NET RESTful API                      |
| Database       | SQL Server (internal users), Azure Cosmos DB (large data: construction, equipment) |
| File storage   | Azure Blob Storage                       |
| SMS            | Viettel Bulk SMS (SOAP)                  |
| JSON           | Newtonsoft.Json                          |

---

## System Architecture

- **ASP.NET API + SQL Server**: Manages internal users, handles login and Bearer Token issuance.
- **Azure Functions + Cosmos DB**: After authentication, clients call FunctionApp to query and store construction and electrical equipment – leveraging Cosmos DB’s large data handling.
- **Blob Storage**: Stores files, digital documents, signature images.
- **Viettel SMS**: Sends SMS notifications.

```
┌─────────────────────┐     Bearer Token      ┌─────────────────────────────────┐
│ ASP.NET API         │ ───────────────────▶  │ Azure Functions (large data)    │
│ (Authentication &   │                        │ ConstructionAPI │ EquipmentAPI │ …  │
│  Internal users)    │                        └─────────────────────────────────┘
└─────────────────────┘                                         │
        │                                                       ▼
        ▼                                              ┌───────────────┐
┌───────────────┐                                      │ Cosmos DB     │
│ SQL Server    │                                      │ (Construction,│
│ (User)        │                                      │  Equipment)   │
└───────────────┘                                      └───────────────┘
```

### Layer Model

- **API Layer**: Azure Functions HTTP Trigger – receives request, validates Bearer Token, calls Service
- **Service Layer**: Business logic, interacts with Cosmos DB & Blob Storage

---

## Service Overview

- **ConstructionService**: CRUD construction, basic and advanced search with pagination, construction library.
- **TicketService**: CRUD request tickets, management by phone number, delete with Blob container.
- **EquipmentService**: CRUD equipment linked to construction, equipment templates and common data.
- **UserService**: CRUD staff, login (can integrate SQL Server for internal users).
- **FileService**: Upload, download Base64 files, list files by container.
- **SignService (KYSO)**: Digital document lifecycle (create, sign, release), multi-condition query, download files and signatures.
- **CustomersService**: Query construction by month/year, equipment by constructionId for public API.

---

## Security

- **Bearer Token**: Internal APIs use `Authorization: Bearer {token}` for authentication. Token is issued after successful login via ASP.NET API.
- **Customers API**: No token required, serves public lookup by month/year and constructionId.

---

## Main Data Models

- **Construction**
- **Ticket**
- **Equipment**
- **Document** (Digital document)
- **User**
