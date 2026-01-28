# ---------- FRONTEND BUILD ----------
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package*.json ./
# Очистите кэш и установите зависимости
RUN npm cache clean --force && npm ci

COPY . .

# Убедитесь, что все конфиги на месте
RUN ls -la && ls -la vite.config.* && ls -la tailwind.config.* && ls -la postcss.config.*

RUN npm run build


# ---------- BACKEND ----------
FROM php:8.2-apache

# System deps
RUN apt-get update && apt-get install -y \
    git unzip curl zip \
    libpq-dev \
    netcat-openbsd \
    && docker-php-ext-install pdo pdo_pgsql \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# PHP config
COPY docker/prod/php.ini /usr/local/etc/php/php.ini

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Backend code
COPY . .

RUN mkdir -p storage/logs \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# Frontend artifacts
COPY --from=frontend /app/public/build ./public/build

# Apache vhost
COPY docker/prod/vhost.conf /etc/apache2/sites-available/000-default.conf

# Entrypoint
COPY docker/prod/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
