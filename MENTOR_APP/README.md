Tecnologie scelte nel progetto

- php, xampp e phpmyadmin con mysql 
- css personale : "style.css", Font Google, Icone Fontawesome, Bootstrap impagination 
- js, per gestire grafici atraverso Chart.js e funzioni od eventi in pagina lato frontend  
- git, codice committato su repo 
- npm, librerie richieste : bootstrap, chart.js
- Verrà utilizzato mysqli e PDO Api native di Php.
- utilizzare Fullcalendar per calendario 

PER PUSHARE IL SEED DEL DB SU PHPMYADMIN
/Applications/XAMPP/xamppfiles/bin/mysql -u root -p < sql/schema.sql


Il cliente chiede di avere un applicazione formata da una Landing page di presentazione, 
dove gli utenti, se registrati e loggati nella landing, 
potranno prenotare sessioni di mentoring one-to-one di varia durata su una base di disponibilità,
oppure acquistare software(prodotto) a pagamento. 
Si dovrà simulare l acquisto di una sessione 1to1 o di un software tramite un provider di pagamento(libreria) 
    -> Stripe(free) :  

La funzionalià di autententicazione per le entità di 
Cliente(colui che acquista) e Administratore(Developer che vende le sessioni e i prodotti(software))
sarà gestito sul database mysql.



- LANDING PAGE:

    Struttura del frontend : 
        - Pagina principale : "index.php" 
        - Elementi presenti nella navbar : 
        
                "Home", -> index.php
                "Prenotazioni sessioni",  -> prenotazioni.php 
                "Acquisto Software", -> buyproject.php
                "Register", -> register.php
                "Login" -> login.php

    
    Stile pagine :

        - Pagina principale : "index.php" 
          
          - la landing mostrerà 5 sezioni dove parleranno del Developer: 
          1) Hero section
          2) sezione divisa in due parti (immagine e p)descrittiva della sua esperienza, 
          3) 3 card per i pacchetti che offre per le 3 varianti di sessioni(1 ora, 3 ore, 8 ore) 
             ognuna di queste avranno un bottone "prenota"
          4) cosa risolve questo servizio (motivazionale)
          5) una sezione dove si parla delle repo o software in vendita(prodotto)
     

        - Prenotazione sessioni : "prenotazioni.php" 

          questa pagina mostrerà un calendario(bootstrap) per prenotare le sessioni one to one
          il cliente potrà scegliere una card per il tipo di sessione scelta e procedere poi con il pagamento fake(Stripe)

        
        - Acquisto Software (prodotti): "buyproject.php" 

          questa pagina mostrerà delle card da vendere che saranno i prodotti(file pdf)
          il cliente potrà scegliere una card per il tipo di prodotto scelto e procedere poi con il pagamento fake(Stripe)


        - Registrazione Utente : "register.php"

          in questa pagina dovrà esserci un form di registrazione con mail e password

        - Accesso Utente: "login.php"

          in questa pagina l utente registrato potrà fare il login 
            -> reindirizzerà alla dashboard interna personale del cliente registratoe loggato  









- DASHBOARD DI GESTIONE

    per sessioni one-to-one
    per vendere prodotti



