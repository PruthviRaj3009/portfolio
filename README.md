# Portfolio Website

![Django](https://img.shields.io/badge/backend-Django%205%2B-092E20)
![React](https://img.shields.io/badge/frontend-React%2018-blue)
![Vite](https://img.shields.io/badge/bundler-Vite%206.3.5-yellow)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)
![Deployments](https://img.shields.io/badge/deploy-Vercel%2FRender-lightgrey)

## Overview

A modern developer portfolio with a React + Vite frontend and a Django REST backend. This project showcases profile details, projects, skills, experience, education, certificates, accolades, and contact functionality through a structured API-driven approach.

---

## Project Purpose

This repository is built to present a professional portfolio website and support easy content management through a Django backend. It is designed for:

- recruiters evaluating technical skills
- hiring managers reviewing project work
- developers exploring architecture and integration
- open-source contributors inspecting a real portfolio stack

---

## Core Features

- Dynamic portfolio content from Django REST API
- Animated hero section with typing effect and particle background
- Project carousel with GitHub and live-demo links
- Skill categorization by language, framework, database, and tool
- Experience, education, certificates, and accolades sections
- Contact form integration with EmailJS
- Backend contact storage and email handling
- Django admin for content management
- Docker-based local development setup
- Render backend deployment with Vercel frontend support

---

## Technology Stack

### Frontend

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Motion animation
- Lucide icons
- EmailJS

### Backend

- Django 5+
- Django REST Framework
- django-cors-headers
- django-axes
- Gunicorn
- python-decouple
- dj-database-url
- Pillow
- psycopg2-binary
- Whitenoise

### Infrastructure

- Docker
- NGINX
- Render (backend)
- Vercel (frontend)
- Supabase PostgreSQL

---

## System Architecture

```mermaid
graph TD
  A[Frontend (Vercel)] -->|HTTPS JSON API| B[Backend (Render)]
  B -->|PostgreSQL connection| C[Supabase PostgreSQL]
  A -->|EmailJS client| D[Email service]
  B -->|Django admin| E[Admin interface]
```

---

## Folder Structure

```
.
├── docker-compose.yml
├── render.yaml
├── portfolio-backend
│   ├── Dockerfile
│   ├── LICENSE
│   ├── README.md
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   ├── .env.production
│   ├── media/
│   │   ├── profile/
│   │   └── resume/
│   ├── portfolio/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── migrations/
│   ├── portfolio_project/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── static/
│   └── staticfiles/
└── portfolio-frontend
    ├── .dockerignore
    ├── .env
    ├── .env.production
    ├── ATTRIBUTIONS.md
    ├── BACKEND_INTEGRATION_GUIDE.md
    ├── Dockerfile
    ├── DOCKER_GUIDE.md
    ├── HOW_TO_RUN.txt
    ├── index.html
    ├── nginx.conf
    ├── package.json
    ├── pnpm-workspace.yaml
    ├── postcss.config.mjs
    ├── README.md
    ├── src/
    │   ├── app/
    │   │   ├── App.tsx
    │   │   └── components/
    │   │       ├── About.tsx
    │   │       ├── Accolades.tsx
    │   │       ├── Certificates.tsx
    │   │       ├── Contact.tsx
    │   │       ├── Education.tsx
    │   │       ├── Experience.tsx
    │   │       ├── Footer.tsx
    │   │       ├── Hero.tsx
    │   │       ├── Navbar.tsx
    │   │       ├── Projects.tsx
    │   │       ├── Skills.tsx
    │   │       └── ui/
    │   ├── hooks/
    │   │   └── usePortfolioData.ts
    │   ├── lib/
    │   │   └── api.ts
    │   ├── services/
    │   │   └── portfolio.ts
    │   ├── styles/
    │   └── types/
    │       └── index.ts
    ├── Dockerfile
    ├── vite.config.ts
    └── dist/
```

---

## Backend Models & API Endpoints

### Important backend models

- `Profile`: page owner information, contact links, resume and social URLs
- `Project`: title, descriptions, tech stack, deployment links, featured flag
- `Skill`: categorized skills by language/framework/database/tool
- `Education`: academic records
- `Experience`: work entries with nested `ExperiencePoint`
- `Certificate`: certification meta and URLs
- `Accolade`: awards and recognition items
- `HeroTypingText`: animated hero text phrases
- `MessageDisplay`: availability notice text
- `Slogan`: hero slogan
- `ContactMessage`: form submissions stored in the database

### API endpoints

| Endpoint                | Method | Purpose                |
| ----------------------- | ------ | ---------------------- |
| `/api/health/`          | GET    | Health check           |
| `/api/profile/`         | GET    | Profile data           |
| `/api/projects/`        | GET    | List of projects       |
| `/api/skills/`          | GET    | Skill list             |
| `/api/education/`       | GET    | Education records      |
| `/api/experience/`      | GET    | Experience records     |
| `/api/certificates/`    | GET    | Certificates           |
| `/api/accolades/`       | GET    | Accolades              |
| `/api/contact/`         | POST   | Submit contact message |
| `/api/hero-texts/`      | GET    | Animated hero texts    |
| `/api/message-display/` | GET    | Availability banner    |
| `/api/slogans/`         | GET    | Hero slogan            |

---

## Frontend Pages and Components

### Main layout

- `src/app/App.tsx` — assembles all portfolio sections into a single page

### Core components

- `Navbar.tsx` — sticky navigation, mobile menu, smooth scrolling
- `Hero.tsx` — animated landing section with typing effect and canvas particles
- `About.tsx` — profile summary and hero text
- `Skills.tsx` — skill cards and categories
- `Projects.tsx` — project carousel with actions
- `Experience.tsx` — work experience with nested points
- `Education.tsx` — education section
- `Certificates.tsx` — certificates list
- `Accolades.tsx` — awards display
- `Contact.tsx` — contact form with EmailJS integration
- `Footer.tsx` — footer and social links

### State & data flow

- `src/hooks/usePortfolioData.ts` — reusable data fetching hooks
- `src/services/portfolio.ts` — API service wrapper for portfolio endpoints
- `src/lib/api.ts` — centralized fetch client with JSON handling
- `src/types/index.ts` — shared TypeScript interfaces

---

## Environment Variables

### Backend

- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`
- `DATABASE_URL`
- `DB_SSLMODE`
- `EMAIL_HOST_USER`

### Frontend

- `VITE_API_BASE_URL`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

> Actual secret values are not included in this README.

---

## Local Development

### Docker Compose

```bash
docker compose up --build
```

### Backend locally

```bash
cd portfolio-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend locally

```bash
cd portfolio-frontend
npm install
npm run dev
```

---

## Deployment

### Frontend

- Hosted on **Vercel**
- Builds with `npm run build`
- Uses `VITE_API_BASE_URL` to target the Render backend

### Backend

- Hosted on **Render**
- Uses `render.yaml` for service definition
- Backend Dockerfile runs migrations, collects static files, and starts `gunicorn`

### Database

- Hosted on **Supabase PostgreSQL**
- Connected through `DATABASE_URL`
- Uses `dj-database-url` and SSL verification

### Communication flow

- Frontend → Backend via REST API calls
- Backend → PostgreSQL for data storage
- Contact form uses EmailJS for client-side email delivery
- Backend content is managed through Django admin

---

## Screenshots

> Update these placeholders with real screenshots after adding images.

- ![Homepage](./screenshots/homepage.png)
- ![Projects](./screenshots/projects.png)
- ![Contact](./screenshots/contact.png)

---

## Future Improvements

- Add frontend integration for backend contact endpoint
- Add protected admin/editor UI for content updates
- Add automated tests for backend and frontend
- Add light/dark theme toggle
- Improve accessibility and performance metrics
- Add analytics and deployment monitoring

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a PR with a clear description
4. Keep API and UI changes separated when possible
5. Update documentation for new features

---

## License

See `portfolio-backend/LICENSE` for license details.
