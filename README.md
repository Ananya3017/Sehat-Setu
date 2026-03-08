<div align="center">

# 🏥 SehatSetu

### *Bridging India's Healthcare Gap with AI, Blockchain & Digital Twin Technology*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)](https://nodejs.org)
[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-627EEA?logo=ethereum)](https://ethereum.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://mongodb.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5Flash-4285F4?logo=google)](https://ai.google.dev)
[![IPFS](https://img.shields.io/badge/IPFS-Decentralized-65C2CB)](https://ipfs.io)

<br/>

> **SehatSetu** *(Hindi: सेहत सेतु — "Bridge to Health")* is a full-stack, decentralized healthcare data platform that gives every Indian citizen a unified, AI-powered, blockchain-secured digital health identity — from their first prescription to their last discharge summary.

<br/>

[🚀 Live Demo](#) · [📖 Docs](#) · [🐛 Report Bug](../../issues) · [💡 Request Feature](../../issues)

</div>

---

## 📌 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Features](#-key-features)
- [Architecture Overview](#-architecture-overview)
- [Technology Stack](#-technology-stack)
- [AI Capabilities](#-ai-capabilities)
- [Blockchain & IPFS Integration](#-blockchain--ipfs-integration)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Example API Workflow](#-example-api-workflow)
- [Screenshots](#-screenshots)
- [Future Roadmap](#-future-roadmap)
- [Contributors](#-contributors)
- [License](#-license)
- [Impact](#-impact)

---

## 🔴 Problem Statement

India's healthcare system is deeply fragmented. **1.4 billion people** generate billions of health records every year — yet:

| Problem | Scale |
|---|---|
| 📂 Medical records scattered across hospitals | No unified patient identity |
| 🔓 Zero data ownership for patients | Hospitals own your health data, not you |
| 🤖 No predictive healthcare | Doctors treat disease, not risk |
| 💸 Insurance fraud & manual claim processing | ₹45,000 Cr lost annually |
| 🏥 Doctor-patient information asymmetry | Critical context lost at every handoff |
| 🌐 No interoperability between providers | Apollo can't see your AIIMS reports |

> *"In India, patients carry physical folders of reports from hospital to hospital. A cardiac event on the road means doctors treat a stranger — not a person with a health history."*

---

## 💡 Solution Overview

**SehatSetu** is a unified, patient-owned health data platform that combines:

- 🧬 **Digital Health Twin** — a live computational model of each patient's biological state
- 🔐 **Blockchain Health Vault** — tamper-proof, patient-controlled medical records on Ethereum + IPFS
- 💳 **Health CIBIL Score** — a 300–900 wellness score that unlocks insurance discounts and preventive incentives
- 🤖 **Gemini AI Assistant** — real-time insights, risk predictions, and what-if health simulations

Every citizen gets a **SehatSetu health ID** — one identity, every record, forever.

---

## ✨ Key Features

### 🔐 Blockchain Health Vault
- Upload medical documents → stored on **IPFS via Pinata**
- Document hash + access control recorded on **Ethereum Sepolia** via `HealthVault.sol`
- Patient-signed consent grants time-limited access to insurers, doctors, and employers
- Tamper-proof audit trail of every access event on-chain

### 🧬 Digital Health Twin
- Live patient model built from vitals, lab reports, demographics, and lifestyle data
- Organ-level risk visualization (Heart, Lungs, Pancreas, Liver)
- **What-If Simulator** — adjust exercise / sleep / diet → see projected risk changes in real time
- Health trajectory forecasting over 3, 6, and 12 months

### 💳 Health CIBIL Score (300–900)
Composite score calculated from 4 weighted components:

| Component | Weight | Signal |
|---|---|---|
| Medical Compliance | 30% | Medication adherence, follow-up visits |
| Preventive Care | 25% | Vaccinations, annual checkups completed |
| Lifestyle & Vitals | 25% | BP, glucose, BMI, sleep within range |
| Record Completeness | 20% | Verified documents in vault |

Score unlocks **insurance premium discounts up to 20%** and gamified improvement tips with projected point gains.

### 🤖 Gemini AI Insights
- Personalized health recommendations from the patient's full medical history
- Risk flag detection across all patients (surfaced in the doctor dashboard)
- Natural language Q&A: *"Why is my BP elevated?"*
- Automated clinical note summarization for doctors

---


## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                  │
│   React 18 + Vite + TypeScript + Tailwind CSS + Shadcn UI           │
│   Patient Dashboard  ←→  Doctor Dashboard  ←→  Auth Flow            │
└────────────────────────────┬────────────────────────────────────────┘
                             │ REST API (JWT)
┌────────────────────────────▼────────────────────────────────────────┐
│                        API LAYER                                     │
│   Node.js + Express.js                                               │
│   /auth  /patients  /records  /vitals  /score  /twin  /insights      │
└──────┬──────────────────┬──────────────────┬───────────────────────┘
       │                  │                  │
┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼──────────────────────┐
│  MongoDB    │  │  Gemini 2.5     │  │  Blockchain Layer           │
│  (Mongoose) │  │  Flash AI       │  │                             │
│             │  │                 │  │  ┌─────────────────────┐    │
│  Users      │  │  Risk engine    │  │  │ Ethereum Sepolia    │    │
│  Records    │  │  Insights       │  │  │ HealthVault.sol     │    │
│  Vitals     │  │  Chat Q&A       │  │  │ (Alchemy RPC)       │    │
│  Scores     │  │  Summaries      │  │  └──────────┬──────────┘    │
│  Consents   │  └─────────────────┘  │             │               │
└─────────────┘                       │  ┌──────────▼──────────┐    │
                                      │  │  IPFS via Pinata    │    │
                                      │  │  (Encrypted docs)   │    │
                                      │  └─────────────────────┘    │
                                      └────────────────────────────┘
```

### Data Flow: Record Upload

```
Patient uploads PDF
      ↓
AES-256 encrypt on backend
      ↓
Pin encrypted file to IPFS → returns CID (e.g. QmXyz...)
      ↓
Call HealthVault.sol → store (patientId, CID, hash, timestamp) on-chain
      ↓
Store metadata in MongoDB (filename, type, hospital, date)
      ↓
Health Score recalculated → Gemini AI generates new insight
      ↓
Patient sees updated vault + score in real time
```

---

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| Shadcn UI | Latest | Accessible component library |
| Lucide React | Latest | Icon system |
| React Router | v6 | Client-side routing |
| Sonner | Latest | Toast notifications |
| Ethers.js | v6 | Blockchain wallet interaction |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 LTS | Runtime |
| Express.js | 4 | REST API framework |
| MongoDB | 7 | Primary database |
| Mongoose | 8 | ODM / schema validation |
| JWT | Latest | Stateless authentication |
| bcryptjs | Latest | Password hashing |
| Multer | Latest | File upload handling |

### Decentralized Storage
| Technology | Purpose |
|---|---|
| IPFS | Decentralized content-addressed file storage |
| Pinata SDK | IPFS pinning service with reliability guarantees |

### Blockchain
| Technology | Purpose |
|---|---|
| Ethereum Sepolia Testnet | Smart contract deployment & testing |
| Solidity (`HealthVault.sol`) | On-chain consent registry & record index |
| Ethers.js | Contract read/write from Node.js backend |
| Alchemy RPC | Reliable Ethereum node provider |

### Artificial Intelligence
| Technology | Purpose |
|---|---|
| Google Gemini 2.5 Flash | Core LLM for health insights & chat |
| Custom Risk Engine | Rule-based disease risk scoring |
| Health Score Engine | Weighted composite scoring (300–900) |
| Digital Twin Engine | Lifestyle simulation & trajectory modeling |

---

## 🤖 AI Capabilities

SehatSetu's AI layer combines **Google Gemini 2.5 Flash** with a deterministic health scoring engine for transparent, explainable outputs.

### 1. Personalized Health Insights
Each patient's complete profile (vitals, conditions, medications, history) is sent as structured context to Gemini, which returns plain-language action items ranked by urgency.

### 2. Digital Twin Risk Engine
A rule-based engine computes real-time disease probabilities:
```
Diabetes Risk  = f(glucose, BMI, sleep, family_history, exercise_frequency)
Cardiac Risk   = f(BP_systolic, age, BMI, stress_level, cholesterol)
Hypertension   = f(BP_systolic, sodium_intake, stress, body_weight)
```
These structured outputs feed Gemini as context for richer clinical language.

### 3. Doctor AI Alerts 
Gemini scans all patient records for critical patterns — elevated HbA1c, medication non-compliance, overdue screenings — ranked as **critical / medium / low** in the doctor dashboard.

### 4. Natural Language Q&A
Patients ask questions in plain English with full health twin context. The assistant delivers personalized, evidence-grounded answers.

---

## ⛓ Blockchain + IPFS Integration

### Why Blockchain?

Traditional centralized storage means hospitals own your data. With SehatSetu:
- **You own your health records** — stored on IPFS, indexed on-chain with your wallet address as owner
- **Every access is auditable** — immutable event log on Ethereum that cannot be altered
- **Consent is a smart contract** — not a checkbox that can be quietly ignored

### HealthVault.sol — Smart Contract Architecture

```solidity
// Core data structures
struct HealthRecord {
    string ipfsCID;        // Content address of encrypted document on IPFS
    bytes32 fileHash;      // SHA-256 hash for integrity verification
    uint256 timestamp;     // Block timestamp of upload
    address owner;         // Patient's wallet address
    bool isActive;         // Soft delete support
}

struct ConsentGrant {
    address grantee;       // Insurer / Doctor wallet address
    uint256 expiresAt;     // Unix timestamp of auto-expiry
    string[] allowedTypes; // ["lab_report", "prescription"] — granular control
    bool isRevoked;        // Manual revocation flag
}

// Key functions
function uploadRecord(string memory cid, bytes32 hash) external;
function grantConsent(address grantee, uint256 duration, string[] memory types) external;
function revokeConsent(address grantee) external;
function getRecords(address patient) external view returns (HealthRecord[] memory);
function verifyAccess(address patient, address accessor) external view returns (bool);
```

### IPFS + Pinata Upload Flow

```
1. Backend receives file from patient via Multer
2. AES-256 encrypt using patient-derived key
3. Pin encrypted blob to IPFS via Pinata SDK → returns CID
4. CID + SHA-256 hash stored in HealthVault.sol transaction
5. MongoDB stores: { patientId, filename, type, hospital, date, ipfsCID }

Retrieval:
1. Patient requests document
2. Backend verifies JWT + checks on-chain consent via verifyAccess()
3. Fetch from IPFS using CID → decrypt → stream to client
```

### Consent as a Smart Contract

```
Patient approves insurer request
      ↓
Frontend calls HealthVault.grantConsent(insurerWallet, 90_days, ["lab_report"])
      ↓
Transaction signed with patient's MetaMask wallet
      ↓
Insurer backend calls verifyAccess(patientWallet, insurerWallet) before every request
      ↓
At 90 days → isExpired() returns true → access auto-revoked, no manual action needed
      ↓
Full audit trail permanently on Sepolia — immutable, verifiable by regulators
```

---

## 📁 Folder Structure

```
sehatsetu/
├── 📁 frontend/                    # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                 # Shadcn UI base components
│   │   │   ├── dashboard/          # Patient dashboard tabs
│   │   │   ├── doctor/             # Doctor dashboard tabs
│   │   │   ├── vault/              # Data vault UI
│   │   │   ├── twin/               # Digital twin + what-if simulator
│   │   │   ├── score/              # Health score gauge + breakdown
│   │   │   └── insights/           # AI insights + chat interface
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── PatientDashboard.tsx
│   │   │   └── DoctorDashboard.tsx
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # API client, ethers setup, utilities
│   │   ├── types/                  # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.local
│   ├── vite.config.ts
│   └── package.json
│
├── 📁 backend/                     # Node.js + Express
│   ├── src/
│   │   ├── controllers/            # Route handler logic
│   │   ├── models/                 # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── HealthRecord.js
│   │   │   ├── Vital.js
│   │   │   ├── HealthScore.js
│   │   │   └── Consent.js
│   │   ├── routes/                 # Express route definitions
│   │   ├── middleware/
│   │   │   ├── auth.js             # JWT verification middleware
│   │   │   ├── upload.js           # Multer configuration
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   ├── ipfsService.js      # Pinata SDK integration
│   │   │   ├── blockchainService.js# Ethers.js + HealthVault.sol calls
│   │   │   ├── geminiService.js    # Google Gemini API wrapper
│   │   │   ├── scoreEngine.js      # Health CIBIL score computation
│   │   │   └── twinEngine.js       # Risk models + what-if simulation
│   │   └── app.js
│   ├── .env
│   └── package.json
│
├── 📁 blockchain/                  # Solidity smart contracts
│   ├── contracts/
│   │   └── HealthVault.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── HealthVault.test.js
│   ├── hardhat.config.js
│   └── package.json
│
├── 📁 docs/
│   └── screenshots/
├── docker-compose.yml
└── README.md
```

---

## 🔧 Installation & Setup

### Prerequisites

```bash
node -v        # v20+
npm -v         # v9+
git --version
```

You will also need accounts on:
- [MongoDB Atlas](https://cloud.mongodb.com) — free tier sufficient
- [Pinata](https://app.pinata.cloud) — free tier (1 GB storage)
- [Alchemy](https://alchemy.com) — free Sepolia RPC endpoint
- [Google AI Studio](https://aistudio.google.com) — Gemini API key
- [MetaMask](https://metamask.io) — wallet funded with Sepolia ETH

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sehatsetu.git
cd sehatsetu
```

### 2. Deploy the Smart Contract

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
# Save the deployed contract address for your .env files
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

### Backend — `backend/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sehatsetu

# JWT
JWT_SECRET=your_super_secret_jwt_key_minimum_32_chars
JWT_EXPIRES_IN=7d

# IPFS / Pinata
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
PINATA_JWT=your_pinata_jwt_token

# Blockchain
ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_key
PRIVATE_KEY=your_wallet_private_key_for_contract_calls
HEALTH_VAULT_CONTRACT_ADDRESS=0xYourDeployedContractAddress

# AI
GEMINI_API_KEY=your_google_gemini_api_key

# Encryption
AES_SECRET_KEY=32_character_key_for_aes_256_file_encryption
```

### Frontend — `frontend/.env.local`

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_HEALTH_VAULT_CONTRACT=0xYourDeployedContractAddress
VITE_ALCHEMY_RPC=https://eth-sepolia.g.alchemy.com/v2/your_key
```

> ⚠️ **Never commit `.env` files.** Both files are in `.gitignore` by default.

---

## 🚀 Running the Project

### Start the Backend

```bash
cd backend
npm run dev
# API running at http://localhost:5000
# Swagger docs at http://localhost:5000/api-docs
```

### Start the Frontend

```bash
cd frontend
npm run dev
# App running at http://localhost:5173
```

### Demo Credentials

| Role | Email | Password |
|---|---|---|
| Patient | patient@demo.com | patient123 |
| Doctor | doctor@demo.com | doctor123 |

### Docker (Optional)

```bash
# From root
docker-compose up --build
# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
```

---

## 🔄 Example API Workflow

### Register & Login

```bash
# Register
POST /api/v1/auth/register
{
  "name": "Arjun Sharma",
  "email": "arjun@example.com",
  "password": "secure123",
  "role": "patient",
  "age": 34,
  "bloodGroup": "O+"
}

# Login → returns JWT
POST /api/v1/auth/login
{ "email": "arjun@example.com", "password": "secure123" }
# Response: { "token": "eyJhbGci..." }
```

### Upload Record to Vault

```bash
POST /api/v1/records/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [PDF or image]
recordType: "lab_report"
hospital: "Apollo Delhi"
date: "2025-06-12"

# Response
{
  "success": true,
  "record": {
    "id": "rec_xyz123",
    "ipfsCID": "QmXyz...",
    "txHash": "0xabc...",
    "status": "verified"
  }
}
```

### Get Digital Twin + Health Score

```bash
GET /api/v1/twin
Authorization: Bearer <token>

# Response
{
  "vitals": { "heartRate": 72, "bp": "118/78", "bmi": 23.4, "glucose": 98 },
  "risks": { "cardiac": 18, "diabetes": 34, "hypertension": 62 },
  "healthScore": {
    "total": 742,
    "breakdown": {
      "compliance": 87,
      "preventive": 74,
      "vitals": 78,
      "completeness": 100
    }
  }
}
```

### Get AI Insights

```bash
GET /api/v1/insights
Authorization: Bearer <token>

# Response
{
  "insights": [
    {
      "icon": "⚠️",
      "tag": "Action Needed",
      "priority": "medium",
      "text": "BP trending upward over 3 months. Consider reviewing Amlodipine dosage.",
      "source": "gemini-2.5-flash"
    }
  ]
}
```

### Grant Insurance Consent

```bash
POST /api/v1/consent
Authorization: Bearer <token>
{
  "grantee": "Star Health Insurance",
  "granteeWallet": "0xInsurer...",
  "dataTypes": ["lab_report", "prescription"],
  "expiresInDays": 90
}

# Response
{
  "success": true,
  "txHash": "0xdef...",
  "expiresAt": "2025-09-14T00:00:00Z"
}
```

---


## 🗺 Future Roadmap

### Q1 2026
- [ ] ABHA (Ayushman Bharat Health Account) integration
- [ ] Wearable device sync — Fitbit, Apple HealthKit, Google Fit
- [ ] Mobile app (React Native — iOS & Android)

### Q2 2026
- [ ] ML-powered risk models (XGBoost replacing rule-based engine)
- [ ] Multi-language support — Hindi, Tamil, Bengali, Telugu
- [ ] Hospital EHR integration via HL7 FHIR standard

### Q3 2026
- [ ] Insurance B2B API — insurers query Health Score directly
- [ ] Telemedicine module — video consults with in-session record sharing
- [ ] Pharmacy integration — automatic prescription routing

### Q4 2026
- [ ] Ethereum Mainnet / Polygon deployment
- [ ] DISHA compliance (Digital Information Security in Healthcare Act)
- [ ] Pan-India rollout with Ayushman Bharat scheme integration

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <b>Your Name</b><br/>
      <sub>Full Stack + Blockchain</sub><br/>
      <a href="https://github.com/yourusername">@yourusername</a>
    </td>
    <td align="center">
      <b>Teammate 2</b><br/>
      <sub>AI + Backend</sub><br/>
      <a href="#">@teammate2</a>
    </td>
    <td align="center">
      <b>Teammate 3</b><br/>
      <sub>Frontend + Design</sub><br/>
      <a href="#">@teammate3</a>
    </td>
  </tr>
</table>

*Built with ❤️ at [Hackathon Name] 2025*

---


## 🌍 Impact

<div align="center">

### *SehatSetu is not just a hackathon project. It is infrastructure.*

</div>

India loses **₹45,000 crore annually** to healthcare inefficiency, insurance fraud, and preventable diseases caught too late. Behind every statistic is a patient who carried a folder of reports to a doctor who had no context, or a family that couldn't afford insurance because they had no proof of their health history.

**SehatSetu changes three fundamental things:**

**1. Ownership shifts to the patient.**
For the first time, your medical history belongs to you — cryptographically, legally, permanently. Stored on IPFS, anchored on Ethereum, accessible only with your consent.

**2. Healthcare becomes predictive, not reactive.**
Your Digital Health Twin doesn't wait for symptoms. It models your biology, simulates futures, and tells you what to change today to avoid the ICU in five years.

**3. Trust becomes programmable.**
Consent is no longer a checkbox on a form. It is a smart contract — time-bound, granular, tamper-proof, and auditable by anyone including regulators.

> *India built UPI and changed how a billion people transact money.*
> *SehatSetu is building the UPI of health — one patient record at a time.*

---

<div align="center">

**⭐ Star this repo if SehatSetu inspired you**

*Made in India 🇮🇳 · For India · For the World*

</div>