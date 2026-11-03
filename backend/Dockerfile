FROM php:8.4-apache

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpq-dev libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql zip gd \
    && a2enmod rewrite

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN echo "upload_max_filesize=50M\npost_max_size=50M" > /usr/local/etc/php/conf.d/uploads.ini

WORKDIR /var/www/html
COPY . .
RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && chown -R www-data:www-data storage bootstrap/cache

COPY docker-start.sh /docker-start.sh
RUN chmod +x /docker-start.sh

EXPOSE 80
CMD ["/docker-start.sh"]
