#!/bin/bash

printf "run docker ...\n"
docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html laravelsail/php82-composer:latest composer install --ignore-platform-reqs

printf "generate .env file ...\n"
cp .env.example .env

printf "remove any previous images ...\n"
./vendor/bin/sail down --rmi all -v

printf "build application ...\n"
./vendor/bin/sail up -d

printf "checking files permissions ...\n"
chmod 775 -R ./

printf "generate application key ...\n"
./vendor/bin/sail artisan key:generate

