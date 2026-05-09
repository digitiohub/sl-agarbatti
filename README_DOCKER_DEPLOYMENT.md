# SL Agarbatti Docker Deployment Guide (VPS)

This is the recommended production deployment path for this project because `Dockerfile` and `docker-compose-slagarbatti.yml` already exist.

## 1) Prerequisites

- Ubuntu 22.04 LTS VPS
- Domain pointing to VPS public IP
- Ports open: `22`, `80`, `443`
- Docker + Docker Compose plugin installed

Install Docker:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin nginx certbot python3-certbot-nginx
sudo systemctl enable docker
sudo systemctl start docker
```

## 2) Clone Project

```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone <your-repo-url> sl-agarbatti
sudo chown -R $USER:$USER /var/www/sl-agarbatti
cd /var/www/sl-agarbatti
```

## 3) Important Production Config Note

Current `sl/settings.py` has hardcoded `SECRET_KEY`, `DEBUG=True`, and DB credentials.  
Before production go-live, update settings to use environment variables and set:

- `DEBUG=False`
- secure `SECRET_KEY`
- production `ALLOWED_HOSTS`
- production DB credentials

## 4) Start App with Docker Compose

```bash
cd /var/www/sl-agarbatti
docker compose -f docker-compose-slagarbatti.yml up -d --build
```

Check status:

```bash
docker compose -f docker-compose-slagarbatti.yml ps
docker logs -f slagarbatti-web
```

The app container listens on port `8006`.

## 5) Run Django Management Commands in Container

```bash
docker compose -f docker-compose-slagarbatti.yml exec slagarbatti-web python manage.py migrate
docker compose -f docker-compose-slagarbatti.yml exec slagarbatti-web python manage.py collectstatic --noinput
docker compose -f docker-compose-slagarbatti.yml exec slagarbatti-web python manage.py createsuperuser
```

## 6) Configure Nginx Reverse Proxy

Create config:

```bash
sudo nano /etc/nginx/sites-available/slagarbatti
```

Use:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8006;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/slagarbatti /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 7) Enable HTTPS (Let’s Encrypt)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot renew --dry-run
```

## 8) Deploy Updates

```bash
cd /var/www/sl-agarbatti
git pull origin main
docker compose -f docker-compose-slagarbatti.yml up -d --build
```

## 9) Operations

View running containers:

```bash
docker ps
```

Restart app:

```bash
docker compose -f docker-compose-slagarbatti.yml restart
```

Stop app:

```bash
docker compose -f docker-compose-slagarbatti.yml down
```

## 10) Recommended Improvements

- Add a dedicated PostgreSQL container/service (or managed DB) and remove hardcoded DB settings.
- Add persistent named volumes for `media` and `staticfiles`.
- Add a healthcheck in Docker Compose.
- Add CI/CD pipeline for automated deploy.
