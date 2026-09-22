# MenCare Health Hub 🩺

### Men's Urological & Reproductive Health Education & Healthcare Information Platform

> **Learn. Understand. Take Care of Your Health.**

MenCare Health Hub is a privacy-focused web platform designed to make reliable information about men's urological and reproductive health easier to access.

The platform focuses on **health education, symptom awareness, and healthcare navigation rather than medical diagnosis**.

Users can learn about common health conditions, understand their causes and symptoms, explore prevention and risk-reduction information, understand when professional medical care may be appropriate, and find healthcare facilities that provide relevant services.

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Problem Statement](#-problem-statement)
* [Proposed Solution](#-proposed-solution)
* [Main Features](#-main-features)
* [Health Categories](#-health-categories)
* [User Flow](#-user-flow)
* [Technology Stack](#-technology-stack)
* [Privacy & Security](#-privacy--security)
* [Medical Disclaimer](#-medical-disclaimer)
* [Health Content Research](#-health-content-research)
* [Color System](#-color-system)
* [Project Scope](#-project-scope)
* [Out of Scope](#-out-of-scope)
* [Project Structure](#-project-structure)
* [Development Roadmap](#-development-roadmap)
* [Project Status](#-project-status)
* [MVP Philosophy](#-mvp-philosophy)
* [License](#-license)

---

# 📌 About the Project

MenCare Health Hub is a web-based health education and healthcare information platform designed to make reliable information about men's urological and reproductive health easier to access.

The platform focuses on **education and health awareness rather than medical diagnosis**.

Users can:

* Learn about common men's health conditions
* Understand causes and symptoms
* Explore risk factors
* Learn about prevention and risk reduction
* Understand general diagnosis processes
* Read general treatment information
* Learn about possible complications
* Understand when professional medical care may be appropriate
* Explore common health myths and facts
* Find healthcare facilities and relevant services

The platform is designed around a simple principle:

> **Learn → Understand → Know When to Seek Help → Find Healthcare**

---

# 🎯 Problem Statement

Men's urological and reproductive health issues can be affected by:

* Stigma
* Embarrassment
* Low health literacy
* Misinformation
* Lack of easily accessible health information
* Uncertainty about where to seek professional care

People may experience symptoms such as:

* Painful urination
* Frequent urination
* Difficulty urinating
* Weak urine stream
* Genital discomfort
* Unusual discharge
* Blood in urine
* Other urinary or reproductive symptoms

However, people may delay seeking professional healthcare because of embarrassment, lack of information, or uncertainty about what to do next.

MenCare Health Hub aims to provide a **simple, private and educational starting point** for understanding these health topics and finding appropriate healthcare services.

---

# 💡 Proposed Solution

MenCare Health Hub provides an education-first platform containing structured health information and healthcare navigation features.

## 📚 Health Education

Users can learn about common urological and reproductive health conditions through structured educational content.

Information includes:

* Definitions
* Causes
* Symptoms
* Risk factors
* Prevention
* General diagnosis information
* Treatment overview
* Possible complications
* When to seek medical help
* Myths and facts
* Quick health facts
* References

---

## 🩺 Symptoms & Health Awareness

Instead of diagnosing users or calculating medical risk scores, the platform allows users to explore common symptoms and understand that a single symptom can have multiple possible causes.

Example:

> **"Are you experiencing similar symptoms?"**

Users can explore information about symptoms such as:

* Painful urination
* Frequent urination
* Weak urine stream
* Genital discomfort
* Penile discharge
* Blood in urine

The system directs users toward relevant educational information and, where appropriate, professional healthcare services.

---

## 🏥 Healthcare Services

Users can search for healthcare facilities based on:

* Location
* Services
* Facility type

Examples include:

* Urology services
* STI testing
* General medical care
* Sexual and reproductive health services
* Emergency care

Healthcare facility information should be periodically verified because services, contact information and operating hours can change.

---

# ⭐ Main Features

## 1. Home Page

The homepage provides an overview of the platform and quick access to:

* Health Topics
* Symptoms & Health Awareness
* Healthcare Services
* Health Facts
* Search

It also introduces the MenCare brand and provides clear pathways for users to learn or find healthcare.

---

## 2. Health Topics

Users can browse health information by category.

### Prostate Health

* Benign Prostatic Hyperplasia (BPH)
* Prostatitis

### Urinary Health

* Urinary Tract Infection (UTI)
* Urethritis

### Sexual Health / STIs

* Chlamydia
* Gonorrhea
* Genital Herpes

---

## 3. Condition Details

Each condition follows a standardized educational structure:

```text
Definition
    ↓
Overview
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
```

This structure keeps health information consistent across the platform.

---

## 4. Symptoms & Health Awareness

This section helps users understand common symptoms without attempting to diagnose them.

Example symptoms include:

* Painful urination
* Frequent urination
* Urgent need to urinate
* Difficulty starting urination
* Weak urine stream
* Blood in urine
* Genital discomfort
* Penile discharge

The platform explains that symptoms may have multiple causes and encourages appropriate professional healthcare when necessary.

---

## 5. Search

Users can search educational content using keywords.

Examples:

```text
BPH
UTI
Gonorrhea
Painful urination
Prostate
```

Search results link users to relevant health topics and educational content.

---

## 6. Health Facts

Health Facts provides short educational information that can be displayed as simple content sections or cards.

Example:

> **Did You Know?**
>
> Some sexually transmitted infections may cause few or no noticeable symptoms.

Health facts should always be based on reliable medical sources.

---

## 7. Myth vs Fact

The Myth vs Fact feature is designed to address misinformation and reduce stigma.

Example:

### MYTH

> BPH is prostate cancer.

### FACT

> BPH is a non-cancerous enlargement of the prostate.

All health claims should be checked against reliable sources before publication.

---

## 8. Healthcare Services

Users can search for healthcare facilities that offer relevant services.

Facility information may include:

* Facility name
* Location
* Address
* Contact information
* Services
* Opening hours
* Map/directions
* Emergency services

Facility information should be periodically verified because healthcare services and operating hours can change.

---

## 9. Admin Dashboard

The public does not need an account.

Administrators can log in to manage system content.

### Admin Functions

* Add conditions
* Edit conditions
* Delete conditions
* Manage categories
* Add healthcare facilities
* Edit healthcare facilities
* Delete healthcare facilities
* Manage health facts
* Manage myth/fact content

---

# 🗂️ Health Categories

| Category                 | Conditions                           |
| ------------------------ | ------------------------------------ |
| **Prostate Health**      | BPH, Prostatitis                     |
| **Urinary Health**       | UTI, Urethritis                      |
| **Sexual Health / STIs** | Chlamydia, Gonorrhea, Genital Herpes |

---

# 🔄 User Flow

```text
                         HOME
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
           LEARN                      SYMPTOMS
             │                           │
             ▼                           ▼
      HEALTH TOPICS                 UNDERSTAND
             │                       SYMPTOMS
             ▼                           │
     CONDITION DETAILS                   │
             │                           │
             └─────────────┬─────────────┘
                           ▼
                  NEED PROFESSIONAL
                        HELP?
                           │
                           ▼
                HEALTHCARE SERVICES
                           │
                           ▼
                    CLINIC / HOSPITAL
```

### Core Concept

> **Learn → Understand → Know When to Seek Help → Find Healthcare**

---

# 🏗️ Technology Stack

## Frontend

* React
* Vite
* HTML
* CSS
* JavaScript

## Backend

* Python
* FastAPI
* REST API

## Database

* Supabase
* PostgreSQL

## Authentication & Authorization

* Admin authentication
* JWT
* Supabase Row Level Security (RLS)

## Deployment

The application can be deployed using services such as:

* Vercel — Frontend
* Suitable cloud hosting — Backend
* Supabase — Database

---

# 🎨 Color System

MenCare Health Hub uses a **warm editorial healthcare visual identity** rather than the traditional navy-blue healthcare aesthetic.

The design direction is:

> **Editorial + Healthcare + Human + Modern + Calm**

The color system is designed to communicate:

* Trust
* Calm
* Professionalism
* Care
* Privacy
* Accessibility

## Primary Palette

| Role         | Color        | HEX       |
| ------------ | ------------ | --------- |
| Primary      | Forest Green | `#183C35` |
| Primary Dark | Deep Forest  | `#102C27` |
| Secondary    | Sage         | `#718C7E` |
| Accent       | Terracotta   | `#C56A4A` |
| Background   | Warm Ivory   | `#F6F3ED` |
| Surface      | Soft Cream   | `#FFFCF7` |
| Main Text    | Charcoal     | `#202522` |
| Muted Text   | Warm Gray    | `#6D716C` |
| Border       | Warm Border  | `#DCD8CE` |
| White        | White        | `#FFFFFF` |

---

## Category Colors

### Prostate Health

```text
Primary:       #183C35
Light Surface: #E8F0EC
```

### Urinary Health

```text
Primary:       #718C7E
Light Surface: #E9EFEC
```

### STI / Sexual Health

```text
Primary:       #C56A4A
Light Surface: #F5E7E0
```

---

## Functional Colors

| Purpose     | HEX       |
| ----------- | --------- |
| Information | `#527A73` |
| Success     | `#4F7A5A` |
| Warning     | `#B98232` |
| Urgent      | `#B94A48` |

Functional colors are used only when their meaning is required and are not part of the main decorative palette.

---

## Color Distribution

The approximate visual distribution is:

```text
Warm Ivory       55%
Soft Cream       20%
Forest Green     12%
Sage              6%
Charcoal          4%
Terracotta        2%
Functional        1%
```

Terracotta should remain a relatively small accent so that it retains its visual importance.

---

## Gradient Policy

Gradients are **not a core part of the MenCare visual identity**.

The interface should rely primarily on:

* Solid colors
* Typography
* Whitespace
* Photography
* Illustrations
* Borders
* Visual hierarchy

If a gradient is required, only subtle brand-based gradients should be used.

Approved example:

```css
linear-gradient(
    135deg,
    #102C27 0%,
    #183C35 100%
);
```

Avoid excessive:

* Blue-to-purple gradients
* Purple-to-pink gradients
* Neon gradients
* Cyan-to-blue gradients
* Multi-color gradients

---

## CSS Design Tokens

```css
:root {
    --mc-primary: #183C35;
    --mc-primary-dark: #102C27;

    --mc-secondary: #718C7E;
    --mc-accent: #C56A4A;

    --mc-background: #F6F3ED;
    --mc-surface: #FFFCF7;

    --mc-text: #202522;
    --mc-text-muted: #6D716C;

    --mc-border: #DCD8CE;
    --mc-white: #FFFFFF;

    --mc-prostate: #183C35;
    --mc-prostate-light: #E8F0EC;

    --mc-urinary: #718C7E;
    --mc-urinary-light: #E9EFEC;

    --mc-sti: #C56A4A;
    --mc-sti-light: #F5E7E0;

    --mc-info: #527A73;
    --mc-success: #4F7A5A;
    --mc-warning: #B98232;
    --mc-urgent: #B94A48;
}
```

---

# 🔐 Privacy & Security

Privacy is an important part of MenCare Health Hub.

The public educational sections should not require users to create accounts or provide unnecessary personal information.

The MVP follows a **minimal-data approach**.

The platform should NOT require:

* Full name
* National ID
* Personal profile
* Unnecessary personal information

## Security Considerations

* HTTPS
* Input validation
* Admin authentication
* Password hashing
* JWT authentication
* Supabase Row Level Security
* Secure environment variables
* Rate limiting for appropriate API endpoints
* Appropriate access control for admin functions

---

# ⚠️ Medical Disclaimer

MenCare Health Hub is an educational and healthcare-information platform.

It does **not**:

* Diagnose diseases
* Prescribe medication
* Replace a healthcare professional
* Provide personalized medical treatment
* Provide emergency medical treatment
* Provide online medical consultations
* Calculate clinical risk scores
* Make medical decisions for users

Information presented on the platform is intended for general educational purposes.

Users experiencing concerning, persistent, worsening, or emergency symptoms should seek appropriate professional medical care.

---

# 📖 Health Content Research

The health content should be based primarily on reliable medical and public-health sources.

Priority sources include:

* World Health Organization (WHO)
* Centers for Disease Control and Prevention (CDC)
* National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK/NIH)
* MedlinePlus
* NHS
* Peer-reviewed medical literature where appropriate

Every major health topic should have traceable references.

Health content should be:

* Evidence-based
* Easy to understand
* Respectful
* Non-judgmental
* Regularly reviewed
* Clearly referenced

---

# 📚 MVP Health Topics

| Area                 | Topics                                                                        |
| -------------------- | ----------------------------------------------------------------------------- |
| Prostate Health      | BPH, Prostatitis                                                              |
| Urinary Health       | UTI, Urethritis                                                               |
| Sexual Health / STIs | Chlamydia, Gonorrhea, Genital Herpes                                          |
| Symptoms             | Painful urination, frequent urination, weak stream, discharge, blood in urine |
| Prevention           | Urinary, sexual and prostate health                                           |
| Health Education     | Health Facts, Myth vs Fact                                                    |
| Healthcare           | Urology, STI testing, general care, emergency services                        |

---

# 🎓 Project Scope

MenCare Health Hub is designed as a manageable **third-year software development project**.

The project demonstrates:

* Requirements analysis
* UI/UX design
* Database design
* REST API development
* CRUD operations
* Authentication
* Authorization
* Search and filtering
* Database relationships
* Responsive web development
* Data security
* Content management
* System testing
* Deployment
* Technical documentation

---

# 🚫 Out of Scope

The MVP intentionally excludes:

* Medical diagnosis
* AI diagnosis
* Symptom scoring
* Clinical risk prediction
* Digital prescriptions
* Telemedicine
* Live doctor chat
* Complex medical decision engines
* Comprehensive hospital management
* Personalized medical treatment recommendations

Keeping these features outside the MVP makes the system more realistic and manageable for a third-year academic project.

---

# 📁 Project Structure

The project documentation will be stored in the `docs/` directory.

```text
MenCare-Health-Hub/
│
├── README.md
├── LICENSE.md
├── .gitignore
│
├── docs/
│   ├── Project_Proposal.md
│   ├── User_Requirements.md
│   ├── System_Requirements.md
│   ├── System_Blueprint.md
│   └── Health_Content_Research.md
│
├── frontend/
│
├── backend/
│
├── database/
│
└── assets/
    ├── images/
    ├── icons/
    └── screenshots/
```

---

# 🚀 Development Roadmap

## Phase 1 — Planning

* Requirements gathering
* System blueprint
* Database design
* UI/UX design
* Health content research
* Color and visual identity definition

## Phase 2 — Backend

* FastAPI setup
* Database connection
* Database models
* CRUD APIs
* Search APIs
* Admin authentication
* Security

## Phase 3 — Frontend

* React/Vite setup
* Design system
* Navigation
* Home page
* Health Topics
* Condition Details
* Symptoms & Health Awareness
* Search
* Healthcare Services
* Health Facts
* Myth vs Fact
* About
* Privacy

## Phase 4 — Integration

* Connect React to FastAPI
* Connect FastAPI to Supabase
* Implement admin dashboard
* Implement search/filtering
* Connect healthcare facilities

## Phase 5 — Testing

* Frontend testing
* API testing
* Database testing
* Authentication testing
* Responsive testing
* Security testing
* Usability testing

## Phase 6 — Deployment

* Deploy frontend
* Deploy backend
* Configure Supabase
* Configure environment variables
* Final testing
* Documentation

---

# 👨‍💻 Project Status

**Status:** 🚧 Planning / Development

**Project Type:** Full-Stack Web Application

**Target:** Third-Year BBIT Academic Project

---

# 📌 MVP Philosophy

MenCare Health Hub is intentionally designed around a simple principle:

> **"Don't try to diagnose the user. Help the user understand the topic and know where to find professional help."**

The MVP focuses on:

* Reliable health education
* Simple symptom awareness
* Healthcare-service navigation
* Privacy
* Evidence-based content
* A manageable technical scope

The system is intended to demonstrate practical full-stack development skills while addressing a real health-information and healthcare-navigation problem.

---

# 📄 Documentation

Additional project documentation will include:

* Project Proposal
* User Requirements
* System Requirements
* System Blueprint
* Health Content Research
* UI/UX Design Documentation
* Database Documentation
* API Documentation
* Testing Documentation

---

# 📜 License

MenCare Health Hub is released under the **MIT License**.

See [`LICENSE.md`](LICENSE.md) for the complete license terms.

---

## MenCare Health Hub

> **Learn. Understand. Take Care of Your Health.**
