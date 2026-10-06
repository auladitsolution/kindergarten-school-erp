# 🌈 Bloom Kindergarten & Junior Academy - School ERP & Public Portal

A complete, production-ready, visually stunning, modern, colorful, and responsive **Kindergarten School Website and Integrated School Management System (School ERP)** built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **MongoDB Atlas**, **Firebase Authentication**, **Cloudinary**, and **Radix UI**.

Deployed seamlessly to **Vercel**.

---

## 🚀 Key Features

### 1. 🎨 Public School Website (Bilingual: বাংলা & English)
- **Vibrant Hero Section**: Welcoming animations, playful shapes, live statistics, admission call-to-action badges.
- **Academic Programs**: Play Group (2.5–3.5 yrs), Nursery (3.5–4.5 yrs), KG (4.5–5.5 yrs), Class 1 (5.5+ yrs) with curriculum milestones, skill focus, and section capacities.
- **Online Admission Application & Live Status Tracker**: Real-time form with instant reference code generation (`ADM-2026-XXX`) and parent tracking lookup.
- **Faculty & Teachers Showcase**: Qualifications, photos, assigned classes, and bios.
- **Photo & Event Gallery**: Category filtering (Campus, Art Lab, Sports, Celebrations) with lightbox preview.
- **Notice Board & Calendar**: Filterable notices, printable notices, upcoming festivals and sports meet calendar.
- **Campus & Contact Info**: Dhaka Uttara campus location, direct message form with toast confirmation, hours, phone, and emergency hotlines.

### 2. 🏫 Integrated School ERP Dashboard
- **Executive Analytics Dashboard**: Total students, attendance rates, monthly fee collection, outstanding dues, pending admissions, class-wise attendance charts, and 5-month revenue growth trends.
- **Student Management**: Full CRUD, admission numbers, roll assignment, guardian records, emergency contacts, and **Printable Digital Student ID Cards** (with photo, barcodes, and emergency information).
- **Online Admissions Desk**: Review parent submissions, approve/reject with principal notes, and **1-click auto-enrollment into the student database**.
- **Faculty & Staff Directory**: Employee IDs, designations, class teacher assignments, salary records, and contact details.
- **Academic Classes & Curriculums**: Class levels, section capacities (Rose, Tulip, Lily, Jasmine), and assigned subjects.
- **Daily Attendance System**: Real-time bulk attendance entry (Present, Absent, Late, Excused), rate calculations, and Asia/Dhaka timezone normalized uniqueness.
- **Examination & Result Engine**: Marks and kindergarten developmental skill assessments (Motor skills, Phonics, Social interaction) with **Printable A4 Progress Report Cards** (stars, grades, teacher remarks, and signatures).
- **Fees & Financial Management**: Tuition, transport, and activity fee structures, invoice generation, cash/bKash/Nagad payment recording, balance tracking, and **Official Printable Fee Receipts / Challans**.
- **Notices & Communication Center**: Publish segmented circulars (All, Parents, Teachers, Public) with priority badges (Urgent, Important).
- **Website CMS**: Live editing of school branding, phone numbers, addresses, and principal messages without code modification.
- **Settings & Audit Trail**: Real-time traceability logs for security compliance and database test seed triggers.

### 3. 👨‍👩‍👧‍👦 Dedicated Parent & Teacher Portals
- **Parent Portal (`/portal/parent`)**: Child-centric dashboard (attendance percentage, daily classroom activities, teacher remarks, invoice payment history, printable receipts, and progress reports).
- **Teacher Portal (`/portal/teacher`)**: Teacher assigned class roster, one-click attendance recording, and homework assignment.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript (Strict Mode) |
| **Styling & Design** | Tailwind CSS v4, Playful Kindergarten Design Tokens, Radix UI |
| **Icons & Alerts** | Lucide React, Sonner Toaster |
| **Charts & Data** | Recharts, ResponsiveContainer |
| **Database & ODM** | MongoDB Atlas, Mongoose (Pooled & Cached Connection Engine) |
| **Authentication** | Firebase Authentication (Google Sign-In, Email/Password), Firebase Admin SDK |
| **Media Storage** | Cloudinary (Signed uploads, secure folder delivery) |
| **Localization** | Dual Language (Bangla `bn` & English `en`), BDT Currency (`৳`), Asia/Dhaka Timezone |
| **Deployment Target**| Vercel Serverless / Edge Runtime |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public pages)/
│   │   ├── page.tsx               # Rich Colorful Homepage
│   │   ├── about/page.tsx         # School History, Mission & Governance
│   │   ├── academics/page.tsx     # Curriculum, Daily Routines & Skills
│   │   ├── admission/page.tsx     # Online Admission & Status Tracker
│   │   ├── faculty/page.tsx       # Faculty & Teachers Directory
│   │   ├── gallery/page.tsx       # Photo Gallery with Lightbox
│   │   ├── notices/page.tsx       # Searchable & Printable Notice Board
│   │   ├── events/page.tsx        # Event Calendar & Celebrations
│   │   ├── contact/page.tsx       # Campus Map & Contact Form
│   │   └── login/page.tsx         # Unified Auth & Instant Demo Switcher
│   ├── dashboard/                 # School ERP Admin Dashboard
│   │   ├── layout.tsx             # Collapsible Sidebar & Top Navbar
│   │   ├── page.tsx               # Analytics Metrics & Operations
│   │   ├── students/page.tsx      # Student CRUD & ID Card Generator
│   │   ├── admissions/page.tsx    # Admission Reviews & Auto-Enroll
│   │   ├── teachers/page.tsx      # Faculty Management & Payroll
│   │   ├── academics/page.tsx     # Classes, Sections & Subjects
│   │   ├── attendance/page.tsx    # Daily Attendance Sheet & Stats
│   │   ├── examinations/page.tsx  # Exams & Printable Report Cards
│   │   ├── fees/page.tsx          # Invoices, Payments & Receipts
│   │   ├── notices/page.tsx       # Notice Publishing & Broadcasting
│   │   ├── cms/page.tsx           # Website Content Management
│   │   └── settings/page.tsx      # Audit Trail & System Configuration
│   ├── portal/
│   │   ├── parent/page.tsx        # Parent Child Workspace
│   │   └── teacher/page.tsx       # Teacher Class Workspace
│   └── api/                       # Robust Next.js Route Handlers
│       ├── admissions/            # POST submission, GET list, [id] patch, track
│       ├── attendance/            # GET records, POST bulk upsert
│       ├── auth/                  # /me, /demo-login, /logout
│       ├── fees/                  # /invoices, /payments
│       ├── seed/                  # /api/seed (Initial DB Populator)
│       └── students/              # /api/students CRUD
├── components/
│   ├── ui/                        # Button, Card, Badge, Input, Table
│   ├── shared/                    # Navbar, Footer, LanguageToggle, PlayfulDecorations
│   └── dashboard/                 # Sidebar, TopNavbar
├── lib/
│   ├── db.ts                      # Cached MongoDB Atlas Connection
│   ├── seedData.ts                # Realistic Kindergarten Seed Engine
│   ├── utils.ts                   # Currency (৳), Bengali Digits, ID Generators
│   ├── auth/                      # Session retrieval & RBAC Matrix
│   ├── firebase/                  # Client & Admin SDK initializers
│   └── i18n/                      # English & Bengali Dictionaries & Context
├── models/                        # Mongoose Schemas (23 Collections)
└── types/                         # Strict TypeScript Definitions
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- Node.js `v18+` or `v20+` (Tested on Node `v22`)
- npm `v10+` or `v11+`

### 2. Clone and Install Dependencies
```bash
git clone <repo-url>
cd kindergarten-school
npm install
```
> **Note**: In development mode with `NEXT_PUBLIC_DEMO_MODE="true"`, you can test all features and role switchers immediately out-of-the-box.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Seed Test Database
To seed the initial classes, students, fees, attendance, notices, and teachers:
- Navigate to `/api/seed` in your browser or click **"Re-Sync / Seed Test Data"** in the Dashboard Settings page (`/dashboard/settings`).

---

## 👥 Instant Demo Roles & Credentials

Visit `/login` to access the **One-Click Instant Role Switcher**:
- **Super Administrator**: Complete ERP & School Settings (`/dashboard`)
- **School Administrator**: Student Enrollment, Attendance & Academics (`/dashboard`)
- **Class Teacher**: Class Attendance, Student Performance & Homework (`/portal/teacher`)
- **Senior Accountant**: Fee Structures, Invoices, bKash/Cash Payments & Receipts (`/dashboard/fees`)
- **Parent**: Rayan's Parent (Child Progress, Daily Updates, Fee Receipts & Report Cards) (`/portal/parent`)

---

## 🚢 Deploying to Vercel

1. Push your repository to **GitHub** / **GitLab**.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the `kindergarten-school` repository.
4. Framework Preset will automatically detect **Next.js**.
5. In **Environment Variables**, add the values from `.env.example`:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
6. Click **Deploy**. Vercel will build and launch your application globally!

---

## 🔒 Security & Privacy Architecture

- **Server-Side Session Verification**: Firebase Admin verification coupled with MongoDB role authorization guards.
- **Restricted Default Status**: New accounts start in `pending` status until verified by school administrators.
- **Protected Child Data**: Parents can only access records linked to their verified children.
- **Audit Logging**: Traceable activity logs recorded for financial and academic modifications.
- **Safe Monetary Math**: Financial items handled with safe precision and non-destructive payment tracking.
