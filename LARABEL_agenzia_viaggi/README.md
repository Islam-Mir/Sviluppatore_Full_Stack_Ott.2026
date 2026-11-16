# Agenzia Viaggi — Laravel + MySQL + Bootstrap

Progetto CRUD didattico con **clienti**, **destinazioni** e **prenotazioni**. Include relazioni Eloquent, foreign key, migration, seeder, validazione e verifica disponibilità.

## Requisiti

- Windows + XAMPP (MySQL avviato)
- PHP 8.2+ con estensioni `pdo_mysql`, `mbstring`, `openssl`, `fileinfo` e preferibilmente `zip`
- Composer 2.x
- Connessione Internet al primo `composer install` (Bootstrap è caricato via CDN)

## Installazione passo per passo

1. Estrai lo ZIP in `C:\xampp\htdocs\agenzia_viaggi_laravel`.
2. Apri il terminale in quella cartella (VS Code: **Terminale > Nuovo terminale**).
3. Installa le dipendenze Laravel (la cartella `vendor` non è inclusa):

   ```powershell
   composer install
   ```

4. Crea il file `.env` e genera la chiave:

   ```powershell
   Copy-Item .env.example .env
   php artisan key:generate
   ```

5. Avvia MySQL in XAMPP. Da phpMyAdmin esegui:

   ```sql
   CREATE DATABASE IF NOT EXISTS laravel_test_agenzia_viaggi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

6. Controlla `.env`: `DB_DATABASE=agenzia_viaggi`, `DB_USERNAME=root`, `DB_PASSWORD=` (vuoto solo se il MySQL locale non ha password).
7. Crea le tabelle e i dati di prova:

   ```powershell
   php artisan migrate
   php artisan db:seed
   ```

8. Avvia il server:

   ```powershell
   php artisan serve
   ```

9. Visita http://127.0.0.1:8000

> **Attenzione**: se esiste già un database `agenzia_viaggi` con le tabelle dell'esercizio SQL, usa un database **nuovo e vuoto** (ad esempio `agenzia_viaggi_laravel`) e aggiorna `DB_DATABASE` nel file `.env`. Non eseguire `migrate:fresh` su dati che vuoi conservare: elimina le tabelle.

## Architettura

- `routes/web.php`: URL e metodi HTTP (rotte resource)
- `app/Models`: oggetti Eloquent e relazioni (`hasMany`, `belongsTo`)
- `app/Http/Controllers`: logica CRUD, validazione e gestione dei posti
- `database/migrations`: definizione delle tabelle e delle foreign key
- `database/seeders`: dati dimostrativi
- `resources/views`: pagine Blade con Bootstrap

## Esercizi per la classe

1. Individua le foreign key nella migration delle prenotazioni.
2. Spiega perché `Prenotazione::with(['cliente','destinazione'])` evita query ripetute.
3. Prova a prenotare più posti della capienza: cosa accade?
4. Prova a eliminare un cliente che ha prenotazioni: perché è bloccato?
5. Aggiungi un filtro per città nella lista delle destinazioni.

## Note

- È un esempio didattico **senza autenticazione**: non pubblicarlo online senza login, autorizzazioni e ulteriori misure di sicurezza.
- Le date di esempio sono nel 2027.
- La colonna `posti_disponibili` mantiene il nome del vecchio esercizio, ma in questa app rappresenta la **capienza totale**. I posti effettivamente liberi sono calcolati dalle prenotazioni.
- Lo ZIP contiene il **codice completo dell'app**, ma non le librerie di terze parti `vendor` (da installare con Composer), né il file `.env` con credenziali locali.

## Autenticazione e ruoli (versione 2)

- `superadmin`: tutte le operazioni e gestione degli utenti.
- `admin`: CRUD clienti, destinazioni e prenotazioni, senza gestione utenti.
- `guest`: login e sola lettura delle destinazioni. Non è un visitatore anonimo.

La registrazione pubblica è disabilitata. Il superadmin crea gli utenti dall'interfaccia.

**Prima di eseguire il seeder**, imposta nel `.env` tre password diverse e robuste (minimo 10 caratteri):

```ini
DEMO_SUPERADMIN_PASSWORD=una-password-personale-lunga
DEMO_ADMIN_PASSWORD=una-seconda-password-lunga
DEMO_GUEST_PASSWORD=una-terza-password-lunga
```

Questi sono segnaposto: sostituiscili prima di avviare il seeder. Non condividere il `.env`.

Esegui `php artisan migrate` e `php artisan db:seed` (su un DB vuoto).

Account demo: `superadmin@agenzia.test`, `admin@agenzia.test`, `guest@agenzia.test`. Le password sono quelle scelte nel `.env`.

Il login è su `/login`. Il logout usa POST con CSRF. I permessi sono applicati nelle rotte con middleware e non dipendono dalla visibilità dei pulsanti.

Se aggiorni un database già esistente, usa `php artisan migrate` e NON ripetere il seeder dei dati di esempio (che creerebbe clienti e prenotazioni duplicati). Per creare gli utenti su un DB esistente puoi eseguire `php artisan db:seed --class=DemoUsersSeeder` dopo aver impostato le password.
