FROM php:8.5-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    nodejs \
    npm \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install \
    pdo_pgsql \
    pgsql \
    zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY composer.json composer.lock ./

RUN composer install \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts

COPY package*.json ./

RUN npm install

COPY . .

RUN php artisan package:discover --ansi

RUN cp .env.example .env

RUN php artisan key:generate

RUN php artisan wayfinder:generate --with-form

RUN npm run build

RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache

RUN sed -i 's/listen = 127.0.0.1:9000/listen = 9000/' \
    /usr/local/etc/php-fpm.d/www.conf

CMD ["php-fpm"]