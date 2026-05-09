# SmartQuotation: Features & Technology Stack

This document provides a comprehensive overview of the **SmartQuotation** project, detailing its core features, architecture, and the technology stack powering the application.

## 🚀 Key Features Implemented

### 1. Quotation Management
* **Automated Quote Generation**: Generate professional quotes with automated tracking numbers (e.g., `MRSP-2026-001`).
* **Section-wise Bill of Quantities**: Organize quotation items into logical sections (A–D).
* **Drafting & Auto-Save**: Quotations feature a draft mode with debounced auto-save to prevent data loss during long editing sessions.
* **Duplication**: Quickly duplicate existing quotations for new customers to streamline workflow.
* **Soft Deletion**: Quotations are soft-deleted (`deletedAt`), keeping historical records intact without cluttering the UI.

### 2. Document Export & Sharing
* **PDF Export**: Generates high-quality PDF documents using headless Chromium (Puppeteer), fully compatible with Vercel serverless environments.
* **Word Document (.docx) Export**: Compiles quotation data into native Microsoft Word formats for further manual editing by users.
* **Printable Preview**: HTML-based printable preview directly in the browser.
* **WhatsApp Integration**: Generates a quick-share link that prefills a WhatsApp message with a link to the quote.

### 3. Financial & Localization Features
* **Automated Tax Calculations**: Automatically calculates line-item subtotals, GST amounts, and the grand total.
* **Indian Number Format Translation**: Automatically converts the final grand total into "Amount in Words" tailored for the Indian numbering system.

### 4. Master Data Management
* **Customer Database**: Maintain a registry of customers including their names, addresses, and contact details.
* **Product Catalog**: Manage a master list of products/services with default rates, categories, unit types, and warranty periods.
* **Company Settings**: Dynamically update company branding, including the company name, logo, signature, GSTIN, default GST rate, and standard terms & conditions.

### 5. Security & Authentication
* **Role-Based Access**: Supports `ADMIN` and `USER` roles.
* **Secure Sessions**: Utilizes encrypted, cookie-based session management (`iron-session`).
* **Password Hashing**: Securely hashes user credentials using `bcryptjs`.

---

## 🛠️ Technology Stack

The project is built on a modern, high-performance web architecture:

### Frontend
* **Framework**: Next.js 15 (App Router)
* **Library**: React 19
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4
* **UI Components**: Radix UI (accessible primitives for dialogs, dropdowns, tabs, etc.)
* **State Management**: Zustand (for draft store and UI state management)
* **Forms**: React Hook Form
* **Validation**: Zod (schema-based form validation)

### Backend & API
* **Runtime**: Node.js (v20+)
* **Database**: PostgreSQL
* **ORM**: Prisma Client v6
* **Authentication**: iron-session & bcryptjs

### Document Generation
* **PDF Engine**: `puppeteer` & `puppeteer-core`
* **Serverless Chromium**: `@sparticuz/chromium` (optimized for Vercel deployment)
* **Word Engine**: `docx` package

### Tooling & DevOps
* **Local DB Management**: Docker Compose for localized PostgreSQL database handling.
* **Linting**: ESLint
* **Build Tool**: Turbopack (Next.js default for fast local development)
