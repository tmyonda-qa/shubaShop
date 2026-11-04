#!/bin/bash
php artisan config:clear
php artisan migrate --force
php artisan db:seed --class=AdminSeeder --force
php artisan db:seed --class=CategorySeeder --force
php artisan storage:link || true
apache2-foreground
