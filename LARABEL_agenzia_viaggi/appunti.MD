Scaricare composer

avanti avanti facendo cura di installarlo in C:\xampp\php\php.exe

Apri powershell, verifica con composer --version

Abilitare in config Apache Modulo di xampp il file -> php.ini

// verificare che queste estenzioni siano attivate o meno con il ;

extension=curl
extension=fileinfo
extension=mbstring
;extension=openssl
extension=pdo_mysql
extension=zip

Powershell:

php -m

composer diagnose

cd C:\xampp\htdocs

composer create-project laravel/laravel nome_progetto

cd nome_progetto

php artisan serve

-----------------------PER AGENZIA VIAGGI-------------------------------------

cd C:\xampp\htdocs\agenzia_viaggi_auth
composer install
Copy-Item .env.example .env
php artisan key:generate

php artisan migrate
php artisan db:seed
php artisan route:list

php artisan serve

http://127.0.0.1:8000/login

Ruolo Email Password
Superadmin superadmin@agenzia.test Da configurare
Admin admin@agenzia.test Da configurare
Guest guest@agenzia.test Da configurare

DEMO_SUPERADMIN_PASSWORD="SuperAdmin2026!"
DEMO_ADMIN_PASSWORD="Admin2026!"
DEMO_GUEST_PASSWORD="Guest2026!"

php artisan config:clear
php artisan db:seed

//////////////------------CONFIGURAZIONE .GITIGNORE

/vendor/
/node_modules/

.env
.env.\*
!.env.example

/public/build/
/public/hot

/storage/_.key
/storage/logs/_.log
/storage/framework/cache/data/_
/storage/framework/sessions/_
/storage/framework/views/\*

/bootstrap/cache/_.php
/database/_.sqlite

.phpunit.result.cache

/.idea/
/.vscode/

.DS_Store
Thumbs.db
