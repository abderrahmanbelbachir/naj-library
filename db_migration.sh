#!/bin/bash

printf "run migrations ...\n"
./vendor/bin/sail artisan migrate:fresh

printf "seeding database ...\n"
./vendor/bin/sail artisan db:seed

