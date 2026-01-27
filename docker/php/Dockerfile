FROM php:8.2-apache

# Системные зависимости
RUN apt-get update && apt-get install -y \
    git unzip curl zip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Apache
RUN a2enmod rewrite

# Git safe dir (важно при volume mount)
RUN git config --global --add safe.directory /var/www/html

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js 20 (для Vite)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Xdebug config
COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Entrypoint
COPY ./docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html

ENTRYPOINT ["entrypoint.sh"]

