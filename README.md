# MENCARE-HEALTH-HUB
A privacy-focused men's urological and reproductive health education and healthcare information platform.

#MenCare Health Hub 🩺

Men's Urological & Reproductive Health Education & Healthcare Information Platform

«Learn. Understand. Take Care of Your Health.»

---

📌 About the Project

MenCare Health Hub is a web-based health education and healthcare information platform designed to make reliable information about men's urological and reproductive health easier to access.

The platform focuses on education and health awareness rather than medical diagnosis.

Users can learn about common conditions, understand their causes and symptoms, discover prevention strategies, understand when professional medical care may be appropriate, and find healthcare facilities that provide relevant services.

---

🎯 Problem Statement

Men's urological and reproductive health issues are often affected by stigma, embarrassment, low health literacy, and misinformation.

Many people may experience symptoms such as:

- Painful urination
- Frequent urination
- Difficulty urinating
- Weak urine stream
- Genital discomfort
- Unusual discharge
- Other urinary or reproductive symptoms

However, people may delay seeking professional healthcare because of embarrassment, lack of information, or uncertainty about where to get help.

MenCare Health Hub aims to provide a simple, private and educational starting point for understanding these health topics.

---

💡 Proposed Solution

MenCare Health Hub provides:

📚 Health Education

Users can learn about common urological and reproductive health conditions through structured educational content.

Information includes:

- Definitions
- Causes
- Symptoms
- Risk factors
- Prevention
- General diagnosis information
- Treatment overview
- Possible complications
- When to seek medical help
- Myths and facts
- Quick health facts

🩺 Symptoms & Health Awareness

Instead of diagnosing users or calculating medical risk scores, the platform allows users to explore common symptoms and understand that a single symptom can have multiple possible causes.

For example:

«"Are you experiencing similar symptoms?"»

The user can explore information about symptoms such as painful urination, frequent urination, weak urine stream or genital discomfort.

The platform then directs users toward relevant educational information and, where appropriate, professional healthcare services.

🏥 Healthcare Services

Users can search for healthcare facilities based on:

- Location
- Service
- Facility type

Examples include:

- Urology services
- STI testing
- General medical care
- Sexual and reproductive health services
- Emergency care

---

⭐ Main Features

1. Home Page

Provides an overview of the platform and quick access to:

- Health Topics
- Symptoms & Health Check
- Healthcare Services
- Health Facts
- Search

---

2. Health Topics

Users can browse health information by category.

Prostate Health

- Benign Prostatic Hyperplasia (BPH)
- Prostatitis

Urinary Health

- Urinary Tract Infection (UTI)
- Urethritis

Sexual Health / STIs

- Chlamydia
- Gonorrhea
- Genital Herpes

---

3. Condition Details

Each condition follows a standardized educational structure:

Definition
    ↓
Causes
    ↓
Symptoms
    ↓
Risk Factors
    ↓
Prevention
    ↓
Diagnosis
    ↓
Treatment Overview
    ↓
Complications
    ↓
When to Seek Medical Help
    ↓
Myths & Facts
    ↓
References

---

4. Symptoms & Health Check

This section helps users understand common symptoms without attempting to diagnose them.

Example symptoms include:

- Painful urination
- Frequent urination
- Urgent need to urinate
- Difficulty starting urination
- Weak urine stream
- Blood in urine
- Genital discomfort
- Penile discharge

The system explains that symptoms may have multiple causes and encourages appropriate professional healthcare when necessary.

---

5. Search

Users can search educational content using keywords.

Examples:

BPH
UTI
Gonorrhea
Painful urination
Prostate

Search results link users to relevant health topics.

---

6. Health Facts

Short educational cards containing important men's health information.

Example:

«Did You Know?»

«Some sexually transmitted infections may cause few or no noticeable symptoms.»

---

7. Myth vs Fact

An educational feature designed to address misinformation and reduce stigma.

Example:

MYTH

«BPH is prostate cancer.»

FACT

«BPH is a non-cancerous enlargement of the prostate.»

---

8. Healthcare Services

Users can search for healthcare facilities that offer relevant services.

Facility information may include:

- Facility name
- Location
- Address
- Contact information
- Services
- Opening hours
- Map/directions
- Emergency services

Facility information should be periodically verified because healthcare services and operating hours can change.

---

9. Admin Dashboard

The public does not need an account.

Administrators can log in to manage system content.

Admin functions

- Add conditions
- Edit conditions
- Delete conditions
- Manage categories
- Add healthcare facilities
- Edit healthcare facilities
- Delete healthcare facilities
- Manage health facts
- Manage myth/fact content

---

🗂️ System Structure

MenCare Health Hub
│
├── Home
│
├── Health Topics
│   ├── Prostate Health
│   │   ├── BPH
│   │   └── Prostatitis
│   │
│   ├── Urinary Health
│   │   ├── UTI
│   │   └── Urethritis
│   │
│   └── Sexual Health / STIs
│       ├── Chlamydia
│       ├── Gonorrhea
│       └── Genital Herpes
│
├── Search
│
├── Symptoms & Health Check
│
├── Healthcare Services
│   └── Facility Details
│
├── Health Facts
│
├── Myth vs Fact
│
├── About
│
├── Privacy
│
└── Admin
    ├── Login
    └── Dashboard
        ├── Conditions
        ├── Categories
        ├── Facilities
        └── Health Facts

---

🔄 User Flow

                    HOME
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
       LEARN                  SYMPTOMS
          │                       │
          ▼                       ▼
  HEALTH TOPICS             UNDERSTAND
          │                  SYMPTOMS
          ▼                       │
 CONDITION DETAILS               │
          │                       │
          └───────────┬───────────┘
                      ▼
             NEED PROFESSIONAL
                    HELP?
                      │
                      ▼
           HEALTHCARE SERVICES
                      │
                      ▼
              CLINIC / HOSPITAL

Core Concept

«Learn → Understand → Know When to Seek Help → Find Healthcare»

---

🏗️ Technology Stack

Frontend

- React
- Vite
- HTML
- CSS
- JavaScript

Backend

- Python
- FastAPI
- REST API

Database

- Supabase
- PostgreSQL

Authentication

- Admin authentication
- JWT
- Supabase Row Level Security (RLS)

Deployment

The application can be deployed using services such as:

- Vercel — Frontend
- Suitable cloud hosting — Backend
- Supabase — Database

---

🔐 Privacy & Security

Privacy is an important part of MenCare Health Hub.

The public educational sections should not require users to create accounts or provide unnecessary personal information.

The MVP follows a minimal-data approach.

The platform should NOT require:

- Full name
- National ID
- Personal profile
- Unnecessary personal information

Security considerations

- HTTPS
- Input validation
- Admin authentication
- Password hashing
- JWT authentication
- Supabase Row Level Security
- Secure environment variables
- Rate limiting for appropriate API endpoints

---

⚠️ Medical Disclaimer

MenCare Health Hub is an educational and healthcare-information platform.

It does not:

- Diagnose diseases
- Prescribe medication
- Replace a healthcare professional
- Provide personalized medical treatment
- Provide emergency medical treatment
- Provide online medical consultations

Information presented on the platform is intended for general educational purposes.

Users experiencing concerning, persistent, worsening, or emergency symptoms should seek appropriate professional medical care.

---

📖 Health Content Research

The health content should be based primarily on reliable medical and public-health sources.

Priority sources include:

- World Health Organization (WHO)
- Centers for Disease Control and Prevention (CDC)
- National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK/NIH)
- MedlinePlus
- NHS
- Peer-reviewed medical literature where appropriate

Every major health topic should have traceable references.

---

📚 MVP Health Topics

Category| Topics
Prostate Health| BPH, Prostatitis
Urinary Health| UTI, Urethritis
Sexual Health / STIs| Chlamydia, Gonorrhea, Genital Herpes
Symptoms| Painful urination, frequent urination, weak stream, discharge, blood in urine
Prevention| Urinary, sexual and prostate health
Health Education| Health Facts, Myth vs Fact
Healthcare| Urology, STI testing, general care, emergency services

---

🎓  Project Scope

MenCare Health Hub is designed as a manageable third-year software development project.

The project demonstrates:

- Requirements analysis
- UI/UX design
- Database design
- REST API development
- CRUD operations
- Authentication
- Authorization
- Search and filtering
- Database relationships
- Responsive web development
- Data security
- Content management
- System testing
- Deployment

---

🚫 Out of Scope

The MVP intentionally excludes:

- Medical diagnosis
- AI diagnosis
- Symptom scoring
- Clinical risk prediction
- Digital prescriptions
- Telemedicine
- Live doctor chat
- Complex medical decision engines
- Comprehensive hospital management

Keeping these features outside the MVP makes the system more realistic and manageable for a third-year academic project.

---

📁 Project Documentation

Project documentation will be stored in the "docs/" directory.

docs/
│
├── Project_Proposal.md
├── User_Requirements.md
├── System_Requirements.md
├── System_Blueprint.md
└── Health_Content_Research.md

---

🚀 Development Roadmap

Phase 1 — Planning

- Requirements gathering
- System blueprint
- Database design
- UI/UX design
- Health content research

Phase 2 — Backend

- FastAPI setup
- Database connection
- Database models
- CRUD APIs
- Search APIs
- Admin authentication
- Security

Phase 3 — Frontend

- React/Vite setup
- Navigation
- Home page
- Health Topics
- Condition Details
- Symptoms
- Search
- Healthcare Services
- Health Facts
- Myth vs Fact
- About & Privacy

Phase 4 — Integration

- Connect React to FastAPI
- Connect FastAPI to Supabase
- Implement admin dashboard
- Implement search/filtering
- Connect healthcare facilities

Phase 5 — Testing

- Frontend testing
- API testing
- Database testing
- Authentication testing
- Responsive testing
- Security testing
- Usability testing

Phase 6 — Deployment

- Deploy frontend
- Deploy backend
- Configure Supabase
- Configure environment variables
- Final testing
- Documentation

---

👨‍💻 Project Status

Status: 🚧 Planning / Development

Project Type:Full-Stack Web Application

Target: 

---

📌 MVP Philosophy

MenCare Health Hub is intentionally designed around a simple principle:

«Don't try to diagnose the user. Help the user understand the topic and know where to find professional help.»

The MVP focuses on delivering reliable health education, simple symptom awareness, and healthcare-service navigation while maintaining privacy and keeping the system technically achievable.

---

LICENSE 

Health information and references used within the application remain the property of their respective organizations and authors.
