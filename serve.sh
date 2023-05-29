#!/bin/bash

printf "install frontend dependencies ...\n"
./vendor/bin/sail npm install

printf "building frontend and serving ...\n"
./vendor/bin/sail npm run dev
