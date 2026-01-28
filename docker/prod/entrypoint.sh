#!/bin/sh
set -e

echo "⏳ Ожидание PostgreSQL..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo "✅ PostgreSQL доступен"

# PHP dependencies
if [ ! -d vendor ]; then
  echo "📦 Установка PHP зависимостей"
  composer install
fi

# Laravel key
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --force
fi

# Storage
if [ ! -L public/storage ]; then
  php artisan storage:link
fi

echo "🔐 Выставление прав на storage и cache"

mkdir -p storage/logs \
         storage/framework/cache \
         storage/framework/sessions \
         storage/framework/views \
         bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache


# 🚫 Запрещаем Vite dev-mode в production
if [ -f public/hot ]; then
  echo "🧹 Удаляем public/hot (Vite dev-mode)"
  rm -f public/hot
fi

# Проверка Vite build
if [ ! -f public/build/manifest.json ]; then
  echo "❌ Vite build not found"
  exit 1
fi

# Migrations
echo "🗄️ Миграции"
php artisan migrate --force

# Seeders
SEED_MARKER=storage/.seeded

if [ ! -f "$SEED_MARKER" ]; then
  php artisan db:seed --force
  touch "$SEED_MARKER"
fi

# Cache
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:clear

echo "🚀 Apache"
exec apache2-foreground
