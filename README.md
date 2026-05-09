# SL Agarbatti Backend

Django 4.2 + Django Oscar backend powering the SL Agarbatti website and admin dashboard.

## Tech Stack

- Python 3.11
- Django 4.2.14
- Django Oscar 3.2.4
- PostgreSQL
- Gunicorn
- Optional: Docker / Docker Compose

## Project Structure

- `manage.py` - Django management entry point
- `sl/settings.py` - Main Django settings
- `apps/` - Custom app modules (`dashboard`, `storefront`)
- `templates/` - Django templates
- `static/` - Source static assets
- `media/` - Uploaded media files
- `Dockerfile` - Docker image build instructions
- `docker-compose-slagarbatti.yml` - Local Docker Compose setup

## Prerequisites

Install these first:

- Python 3.11.x
- PostgreSQL 14+ (or compatible)
- pip
- virtualenv (recommended)
- Node.js + npm (only needed if you want to manage `lightbox2` dependency)

## Local Run (Recommended: Python Virtual Environment)

### 1) Clone and enter project

```bash
git clone <your-repo-url>
cd sl-agarbatti
```

### 2) Create and activate virtual environment

Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3) Install Python dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4) Configure database

Important: this project currently has database credentials hardcoded in `sl/settings.py` under `DATABASES`.  
For local development, update that block to point to your local PostgreSQL instance.

Example local values:

- `ENGINE`: `django.db.backends.postgresql`
- `NAME`: `slagarbatti_db`
- `USER`: `postgres`
- `PASSWORD`: `<your_password>`
- `HOST`: `127.0.0.1`
- `PORT`: `5432`

### 5) Apply migrations

```bash
python manage.py migrate
```

### 6) Create admin user

```bash
python manage.py createsuperuser
```

### 7) Collect static files

```bash
python manage.py collectstatic --noinput
```

### 8) Run development server

```bash
python manage.py runserver
```

Open:

- App: `http://127.0.0.1:8000`
- Admin: `http://127.0.0.1:8000/admin/`

## Local Run with Docker Compose

### 1) Ensure Docker Desktop / Docker Engine is running

### 2) (Optional) review `.env`

The compose file loads `.env`, but current Django DB config is hardcoded in settings.  
If you plan to fully use `.env` driven config, update `sl/settings.py` accordingly.

### 3) Build and start container

```bash
docker compose -f docker-compose-slagarbatti.yml up --build
```

Service will run on:

- `http://127.0.0.1:8006`

### 4) Stop container

```bash
docker compose -f docker-compose-slagarbatti.yml down
```

## Useful Commands

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
python manage.py shell
```

## Troubleshooting

- `psycopg2` install errors: ensure PostgreSQL dev libraries are installed.
- Static files not loading: run `collectstatic` and verify `STATIC_ROOT`/`STATIC_URL`.
- DB connection failed: verify host/user/password/port and PostgreSQL is reachable.
- Port conflict: use another port with `python manage.py runserver 0.0.0.0:8010`.

## Deployment Guide

For full production deployment steps on a VPS, see:

- [README_VPS_DEPLOYMENT.md](README_VPS_DEPLOYMENT.md)
