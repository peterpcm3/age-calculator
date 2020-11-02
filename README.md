# Age-calculator
Calculate personal ages by showing number of hours

## Install instructions

### Build and start docker containers

- docker-compose up --build -d
- docker exec -it php-fpm bin/console doctrine:migrations:migrate

### Install node packages and bundle react app
- docker exec -it php-fpm npm install
- docker exec -it php-fpm npm run watch:dev

### Access to main route
http://{baseurl}/age-calculator/
