#!/bin/bash

printf "run docker ...\n"
docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html laravelsail/php82-composer:latest composer install --ignore-platform-reqs

printf "generate .env file ...\n"
cp .env.example .env

printf "remove any previous images ...\n"
./vendor/bin/sail down --rmi all -v

printf "build application ...\n"
./vendor/bin/sail up

printf "generate application key ...\n"
./vendor/bin/sail artisan key:generate

printf "run migrations ...\n"
./vendor/bin/sail artisan migrate:fresh

printf "seeding database ...\n"
./vendor/bin/sail artisan db:seed

printf "checking files permissions ...\n"
chmod 775 -R ./

printf "install frontend dependencies ...\n"
./vendor/bin/sail npm install

printf "building frontend ...\n"
./vendor/bin/sail npm run dev
