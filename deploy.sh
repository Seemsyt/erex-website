#!/bin/bash
# ============================================================
# EREX Website — EC2 Deployment Script
# Domain: erex.nx.kg
# Stack: Nginx + Node.js (static build) + Certbot SSL
# OS: Ubuntu 22.04 / 24.04
# ============================================================

set -euo pipefail

DOMAIN="erex.nx.kg"
APP_DIR="/var/www/erex-website"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
NGINX_LINK="/etc/nginx/sites-enabled/$DOMAIN"
EMAIL="${CERTBOT_EMAIL:-admin@$DOMAIN}"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  EREX Website — EC2 Deployment${NC}"
echo -e "${CYAN}  Domain: ${YELLOW}$DOMAIN${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════${NC}"
echo ""

# ──────────────────────────────────────────────────────────────
# 1. System updates & dependencies
# ──────────────────────────────────────────────────────────────
echo -e "${GREEN}[1/7]${NC} Updating system packages..."
sudo apt update -y && sudo apt upgrade -y

echo -e "${GREEN}[2/7]${NC} Installing Nginx, Certbot, Node.js..."
# Install Nginx
sudo apt install -y nginx

# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Install Node.js 20 LTS (via NodeSource)
if ! command -v node &> /dev/null || [[ "$(node -v)" != v20* && "$(node -v)" != v22* ]]; then
  echo "Installing Node.js 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
else
  echo "Node.js $(node -v) already installed, skipping..."
fi

echo "  Node.js: $(node -v)"
echo "  npm:     $(npm -v)"
echo "  Nginx:   $(nginx -v 2>&1)"

# ──────────────────────────────────────────────────────────────
# 2. Build the website
# ──────────────────────────────────────────────────────────────
echo -e "${GREEN}[3/7]${NC} Building the website..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

npm install --production=false
npm run build

# ──────────────────────────────────────────────────────────────
# 3. Deploy built files to /var/www
# ──────────────────────────────────────────────────────────────
echo -e "${GREEN}[4/7]${NC} Deploying to $APP_DIR..."
sudo mkdir -p "$APP_DIR"
sudo rm -rf "$APP_DIR"/*
sudo cp -r dist/* "$APP_DIR"/
sudo chown -R www-data:www-data "$APP_DIR"
sudo chmod -R 755 "$APP_DIR"

# ──────────────────────────────────────────────────────────────
# 4. Configure Nginx
# ──────────────────────────────────────────────────────────────
echo -e "${GREEN}[5/7]${NC} Configuring Nginx..."

sudo tee "$NGINX_CONF" > /dev/null << 'NGINX_EOF'
server {
    listen 80;
    listen [::]:80;
    server_name erex.nx.kg www.erex.nx.kg;

    root /var/www/erex-website;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/json
        application/xml
        image/svg+xml
        font/woff2;

    # Cache static assets aggressively (Vite hashes filenames)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache other static files
    location ~* \.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # SPA fallback — serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX_EOF

# Enable the site
sudo ln -sf "$NGINX_CONF" "$NGINX_LINK"

# Remove default site if it exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

echo -e "${GREEN}[6/7]${NC} Nginx configured and running!"

# ──────────────────────────────────────────────────────────────
# 5. SSL via Certbot (Let's Encrypt)
# ──────────────────────────────────────────────────────────────
echo -e "${GREEN}[7/7]${NC} Setting up SSL with Certbot..."
echo -e "${YELLOW}  Note: Your domain ($DOMAIN) must already point to this server's IP.${NC}"
echo ""

read -rp "Domain DNS is pointed to this server? Proceed with SSL? [y/N] " ssl_confirm
if [[ "$ssl_confirm" =~ ^[Yy]$ ]]; then
  sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "$EMAIL" --redirect
  echo -e "${GREEN}✓ SSL certificate installed!${NC}"

  # Set up auto-renewal cron
  echo "Testing certbot auto-renewal..."
  sudo certbot renew --dry-run
  echo -e "${GREEN}✓ Auto-renewal configured!${NC}"
else
  echo -e "${YELLOW}Skipping SSL for now. Run this later:${NC}"
  echo "  sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --redirect"
fi

# ──────────────────────────────────────────────────────────────
# Done!
# ──────────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${CYAN}HTTP:${NC}  http://$DOMAIN"
echo -e "  ${CYAN}HTTPS:${NC} https://$DOMAIN (if SSL was configured)"
echo ""
echo -e "  ${YELLOW}Quick commands:${NC}"
echo -e "    sudo nginx -t                   # Test Nginx config"
echo -e "    sudo systemctl reload nginx      # Reload Nginx"
echo -e "    sudo certbot renew               # Renew SSL"
echo -e "    sudo tail -f /var/log/nginx/error.log  # View logs"
echo ""
