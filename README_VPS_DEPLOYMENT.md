# SL Agarbatti VPS Deployment Guide

This guide deploys the Django app on a Linux VPS using:

- Python virtualenv
- Gunicorn (app server)
- Nginx (reverse proxy)
- systemd (service management)
- PostgreSQL (local or managed)
- Certbot (HTTPS)

## 1) Server Requirements

- Ubuntu 22.04 LTS (recommended)
- Domain pointed to VPS public IP
- Sudo user
- Open ports: `22`, `80`, `443`

## 2) Initial Server Setup

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git python3 python3-venv python3-pip nginx postgresql postgresql-contrib libpq-dev build-essential
```

Optional firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 3) Clone Project

```bash
cd /var/www
sudo git clone <your-repo-url> sl-agarbatti
sudo chown -R $USER:$USER /var/www/sl-agarbatti
cd /var/www/sl-agarbatti
```

## 4) Create Virtual Environment and Install Dependencies

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## 5) Configure Django for Production

Current `sl/settings.py` contains hardcoded values (`SECRET_KEY`, `DEBUG=True`, and DB credentials).  
Before production, update settings:

- Set `DEBUG = False`
- Replace secret key with a strong private key
- Set production `ALLOWED_HOSTS` (domain + server IP)
- Move DB/email credentials to environment variables
- Keep `CSRF_TRUSTED_ORIGINS` aligned with domain

Minimum production-safe checklist:

- `DEBUG=False`
- real `SECRET_KEY`
- `ALLOWED_HOSTS=['yourdomain.com','www.yourdomain.com']`
- secure DB credentials

## 6) Database Setup

If PostgreSQL is on same VPS:

```bash
sudo -u postgres psql
```

Run in PostgreSQL shell:

```sql
CREATE DATABASE slagarbatti_db;
CREATE USER slagarbatti_user WITH PASSWORD 'change_this_password';
GRANT ALL PRIVILEGES ON DATABASE slagarbatti_db TO slagarbatti_user;
\q
```

Update Django DB settings to use these values.

## 7) Run Migrations and Collect Static

```bash
source /var/www/sl-agarbatti/.venv/bin/activate
cd /var/www/sl-agarbatti
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

## 8) Test Gunicorn Manually

```bash
cd /var/www/sl-agarbatti
source .venv/bin/activate
gunicorn --bind 0.0.0.0:8006 sl.wsgi:application
```

Open `http://SERVER_IP:8006` to verify app starts, then stop (`Ctrl+C`).

## 9) Create systemd Service

Create file:

```bash
sudo nano /etc/systemd/system/slagarbatti.service
```

Paste:

```ini
[Unit]
Description=SL Agarbatti Gunicorn Service
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/sl-agarbatti
Environment="PATH=/var/www/sl-agarbatti/.venv/bin"
ExecStart=/var/www/sl-agarbatti/.venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8006 sl.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

Set permissions and start:

```bash
sudo chown -R www-data:www-data /var/www/sl-agarbatti
sudo systemctl daemon-reload
sudo systemctl enable slagarbatti
sudo systemctl start slagarbatti
sudo systemctl status slagarbatti
```

## 10) Configure Nginx Reverse Proxy

Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/slagarbatti
```

Use this template:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /static/ {
        alias /var/www/sl-agarbatti/staticfiles/;
    }

    location /media/ {
        alias /var/www/sl-agarbatti/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8006;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and validate:

```bash
sudo ln -s /etc/nginx/sites-available/slagarbatti /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 11) Enable HTTPS with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Test auto-renew:

```bash
sudo certbot renew --dry-run
```

## 12) Operational Commands

Restart app:

```bash
sudo systemctl restart slagarbatti
```

View app logs:

```bash
sudo journalctl -u slagarbatti -f
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

## 13) Deploy Updates

```bash
cd /var/www/sl-agarbatti
git pull origin main
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart slagarbatti
```

## 14) Recommended Hardening

- Disable root SSH login
- Use SSH keys only
- Rotate all hardcoded secrets and DB passwords
- Add automated DB backups
- Monitor service health and logs
- Keep OS packages updated
