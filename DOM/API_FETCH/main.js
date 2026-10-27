//dare un nome parlante all funzione

//funzioni
function saluta(){

    //questo è cio' che fa la funzione, ovvero stampare in console.log la stringa
    console.log("ciao ecco la mia funzione");

}

//per utilizzare una function devo richiamarla
saluta();




//FUNCTION CON PARAMETRI O ARGOMENTI

function nomeFunzione(parametri){

    //istruzioni da eseguire
    return qualcosa; // domanda da farvi sempre: cosa ritorna questa funzione? scrivere sempre return!

}



//funzione con parametri con nome utente

function salutaUtente(nome){

    console.log("ciao " + nome + "! Benvenuto nella Home!");
}

//invocare la funzione con parametro hardcoded

salutaUtente("Diego");
salutaUtente("Alice");
salutaUtente("Giorgio");
salutaUtente("Gennaro");

salutaUtente(15);
salutaUtente("diegoaneli@gmail.com");




//funzione di somma
function somma(x,y){

    return x + y ;
    
}

//devo salvare il risultato della somma in una variabile
let risultato = somma(20,20);

//per poi stampare il valore
console.log(risultato);



//funzione che calcola la potenza di un numero

function potenza(x){

    return x **2;
}

let pot = potenza(3);

console.log("Ecco la potenza del numero : " , pot);



//creo una funzione che se richiamata fa sempre la stessa verifica dell età
/*

let etaUt = prompt("Inserisci l età : ");

let etaUtente = Number(etaUt);

function verificaEta(x){

    if(x >= 18){

        return "Sei maggiorenne";
    }else{

        return "Sei minorenne!";
    }
}


//richiamare la funzione (invocare)
let messaggio = verificaEta(etaUtente);

console.log(messaggio);
alert(messaggio);


*/


//esercizio

//creare una funzione che calcola il prezzo di un prodotto
// - in base alla percentuale di sconto inserita dall utente
//Chiedi all utente il prezzo del prodotto e la % di sconto

// i prezzi sono decimali -> parsefloat()
// - al risultato applicate risultato.toFixed(2)
/*
let prezzo = parseFloat(prompt("Prezzo : "));
let sconto = parseFloat(prompt("sconto : "));

function calcolaPrezzo(x, y){
    //formula calcolo sconto
    let valoresconto = (x * y) / 100;
    let prezzofinale = x - valoresconto;
    return prezzofinale.toFixed(2); 
}


//richiamo al funzione e salvo in variabile che andrà stampata
let risultatoConSconto = calcolaPrezzo(prezzo,sconto);

console.log("Questo è il prezzo finale ", risultatoConSconto, "Euro");

*/



//Esercizio Voti Classe

//---------------------Calcolo della media dei voti di una classe-----------------

//- l utente inserisce i voti di 5 studenti
//- una funzione calcola la media
//- viene mostrato se la classe è promossa o bocciata ( media >= 6 )


//svolgimento

//base di dati che verrà riempita con i voti inseriti dall utente
let voti = [];

//per 5 volte chiedo un numero e per 5 volte lo pusho dentro all array
for (let i = 0; i < 5; i++){

    let voto = parseInt(prompt("Inserisci il voto dello studente ("+ (i+1) + " di 5) : "));

    voti.push(voto);//pusho ogni voto (x5) dentro all array voti

}

//funzione che calcola la media della classe

//media = totale voti / il numero dei voti

function calcolaMedia(voti){

    //stato iniziale
    let somma = 0;

    for (let i = 0; i < voti.length; i++){

        somma = somma + voti[i];
    
    }

    let media = somma / voti.length;
    return media;

}

let mediaClasse = calcolaMedia(voti);

console.log("La media della classe è di : ", mediaClasse.toFixed(2)); //es.: 30.50

// stampare se classe è promossa o meno

if (mediaClasse >= 6 ){

    console.log("Classe promossa");
}else {

    console.log("Classe bocciata.");
}