#!/bin/bash

cd /var/www/html

APP_DIR="/var/www/html"

set -e

# Установка зависимостей (если vendor пуст)
if [ ! -d "vendor" ]; then
  composer install
fi

# Установка Node.js зависимостей
if [ -f package.json ] && [ ! -d node_modules ]; then
  echo "📦 Установка Node.js зависимостей..."
  npm install
else
  echo "✅ Node.js зависимости уже установлены"
fi

# Права (важно для Laravel)
#chown -R www-data:www-data storage bootstrap/cache

# Создание символьной ссылки public/storage -> storage/app/public
if [ ! -L public/storage ]; then
  echo "🔗 Создаём символическую ссылку public/storage → storage/app/public"
  php artisan storage:link
else
  echo "✅ Символическая ссылка уже существует"
fi

# Запускаем Vite dev-сервер
echo "🚀 Запуск Vite dev-сервера..."
npm run dev &

# Создание нового виртуального хоста
cat <<EOF > /etc/apache2/sites-available/000-default.conf
<VirtualHost *:80>
    ServerName product_catalog.local
    ServerAdmin webmaster@localhost
    DocumentRoot ${APP_DIR}/public

    <Directory ${APP_DIR}/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/product_catalog_error.log
    CustomLog \${APACHE_LOG_DIR}/product_catalog_access.log combined
</VirtualHost>
EOF

# Запуск Apache
exec apache2-foreground
