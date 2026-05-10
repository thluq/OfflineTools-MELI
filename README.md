## 📦 OfflineTools-MELI  
Logistics tools hub for operational support. Runs entirely in the browser, with no need for a database or internet connection after the initial load.

---

## Tools

### 01. Route Auditing

Developed to assist in the balancing/audit process and cart checking, especially in situations involving system issues, counting discrepancies, or errors when drivers submit package counts.

**Features:**
- **Real-Time Checklist:** The list of expected IDs is displayed on screen and automatically checked off as scans occur.  
- **Smart Validation (Regex):** Automatically filters label scans (11 digits starting with `4`), treating out-of-pattern codes as "Invalid".   
- **Duplicate Handling:** Removes repeated IDs from the database and alerts the user if the same package is scanned more than once.  
- **CSV Export:** Generates a complete report containing verified, missing, and exception items.  

### 02. Label Generator (Etiqueta Master)

Module for local generation of package labels, designed for situations where reprinting through *Logistics* is unavailable (MELI-MELI or missing file) or for creating *Dummy Boxes*.

**Features:**
- Input fields for destination facility, origin, cluster, promise, and Seller/Buyer information.
- Barcode and QR Code generation using lightweight libraries (JsBarcode and QRCode.js).
- Developer mode for advanced fields(password: 3831213 or cajadummy).

### 03. Label Without ID (Etiqueta sem ID)

Generates labels for packages that have no identification, using a sequential numbering system per facility.

**Features:**
- Configurable facility code and starting number.
- Batch generation of multiple labels.
- Auto-print after generation.

### 04. Concatenate IDs

Utility tool that extracts package IDs from raw text (using the same `4XXXXXXXXXX` regex pattern) and concatenates them with a configurable separator for bulk SQL queries.

**Features:**
- Paste raw text, spreadsheet data, or import files.
- Automatic duplicate removal with count.
- SQL-ready output with `IN(...)` formatting.
- Copy to clipboard and download as `.txt`.

### 05. HU Gaylord Salvados

Generates identification labels for Gaylord.

**Features:**
- Configurable facility code and numbering.
- Large QR code for easy scanning.
- Same 100mm × 150mm print format.

---

## Project Structure

```
OfflineTools-MELI/
├── index.html              # Main menu / hub
├── pages/                  # Tool pages
│   ├── auditoria.html
│   ├── etiqueta-master.html
│   ├── etiqueta-semid.html
│   ├── concatenar.html
│   └── gaylord.html
├── css/                    # Stylesheets
│   ├── global.css          # Shared styles (header, footer, variables)
│   ├── index.css
│   ├── auditoria.css
│   ├── etiqueta-master.css
│   ├── etiqueta-semid.css
│   ├── concatenar.css
│   └── gaylord.css
├── js/                     # Scripts
│   ├── utils.js            # Shared utilities
│   ├── auditoria.js
│   ├── etiqueta-master.js
│   ├── etiqueta-semid.js
│   ├── concatenar.js
│   └── gaylord.js
├── libs/                   # Third-party libraries
│   ├── JsBarcode.all.min.js
│   └── qrcode.min.js
├── icons/                  # SVG/PNG assets
└── README.md
```

---

## Technologies Used

- **HTML5 & CSS3:** Responsive interface following the "Mercado Livre" visual identity.  
- **JavaScript (Vanilla):** Data processing logic, DOM manipulation, and Regex.  
- **CSS Custom Properties:** Design tokens for consistent theming.
- **Git & GitHub:** Version control and deployment.  

---

##  How to Use

Access the tool locally or via [GitHub Pages](https://thluq.github.io/OfflineTools-MELI/).

---

##  Developer

**Thiago Lucas Nunes Gonçalves** (SSP20)  
*Computer Engineering Student*  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thiago-lucas-76b293208)

---

##  Disclaimer

This tool is an independent local automation project and **does not constitute an official system or product**.  

All rights related to logos, trademarks, and the names *"Mercado Livre"* and *"Mercado Envios"* belong exclusively to **Ebazar.com.br LTDA**.  

The use of this visual identity is solely intended to facilitate operational familiarity for collaborators, with no intention of misuse, commercialization, or violation of intellectual property.
**This tool does not collect any data.** Feel free to review the code!
