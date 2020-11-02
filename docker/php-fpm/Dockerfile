FROM php:fpm-alpine

RUN apk --update --no-cache add git

RUN docker-php-ext-install pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install node and npm
RUN apk add nodejs-current
RUN apk add --update npm

WORKDIR /var/www

CMD composer install ; php-fpm

EXPOSE 9000