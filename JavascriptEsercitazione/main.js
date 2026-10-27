// commenti inline

/* 
commenti multi linea
qualcosa di js
*/

/** */

//-------------------TIPI DI VARIABILE-------------

//dichiarazione di una variabile

//var nome = "Pippo"; // Stringa cioè "parola/insiemi di caratteri"

//per stampare in console la variabile
//console.log(nome);


//variabile di tipo numero
//var nome = 5;
//console.log(nome);

//variabile di tipo double -> numeri con la virgola decimali e anche negativi
//var numeroNegativo = -10.99;
//console.log(numeroNegativo);

//constanti -> a differenza delle variabili non posso cambiare il valore al suo interno
//const pigreco = 3.14;


//tipo booleano  vero/falso -> true/false ->  zero e uno (0/1)
/*
var lampadinaAccesa = true;  
var lampadinaSpenta = false;
var numero = 4;

console.log(lampadinaAccesa);
console.log(lampadinaSpenta);

//console log con stringa o messaggio informativo e valore della variabile
console.log("Questa è la lampadina spenta : ", lampadinaSpenta);
console.log("Questa è la lampadina accesa : ", lampadinaAccesa);
console.log("Questo è il valore del numero : ", numero);

*/


//----------------------------OPERATORI ARITMETICI---------------------------


// + - * /  anche il resto (di una divisione) %(modulo)

//somma di due numeri
/*
var numeroSomma1 = 10;
var numeroSomma2 = 20;

//instanziare una variabile che verrà stampata in console.log che sarà la somma del valore delle due variabili
var somma = numeroSomma1 + numeroSomma2;

console.log("Questa è la somma dei due numeri : ", somma);

*/

//sottrazione di due numeri
/*
var numeroSottrazione1 = 20;
var numeroSottrazione2 = 10;

//instanziare una variabile che verrà stampata in console.log che sarà la sottrazione del valore delle due variabili
var sottrazione = numeroSottrazione1 - numeroSottrazione2;

console.log("Questa è la sottrazione dei due numeri : ", sottrazione);


//Moltiplicazione di due numeri

var numeroMoltiplicazione1 = 20;
var numeroMoltiplicazione2 = 10;

//instanziare una variabile che verrà stampata in console.log che sarà la moltiplicazione del valore delle due variabili
var moltiplicazione = numeroMoltiplicazione1 * numeroMoltiplicazione2;

console.log("Questa è la moltiplicazione dei due numeri : ", moltiplicazione);



//Moltiplicazione di due numeri  

var numeroDivisione1 = 20;
var numeroDivisione2 = 10;

//instanziare una variabile che verrà stampata in console.log che sarà la divisione del valore delle due variabili
var divisione = numeroDivisione1 / numeroDivisione2;

console.log("Questa è la divisione dei due numeri : ", divisione);


//Modulo - Resto

var numero1 = 9;
var numero2 = 2;

var modulo = numero1 % numero2;

console.log("Ecco il resto della divisione dei due numeri : ", modulo);

*/

//----------------------------COME CHIEDERE DATI ALL UTENTE TRAMITE PROMPT()-----------------

//var (versione es5) -> let (vers es8)

//chiedo qualcosa a schermo


//PROMPT();
//let nomeInserito = prompt("Inserisci un nome :");

//console.log(nomeInserito);


//CONFIRM();
//let qualcosaInserito= confirm("ACCETTI L INFORMATIVA PER LA PRIVACY ?");

//console.log(qualcosaInserito);

/*
let n = 5;
let n2 = 4;

let sommaN = n + n2;

console.log(sommaN);
*/

/*
let n1 = parseInt(prompt("Inserisci il primo numero"));

let n2 = parseInt(prompt("Inserisci il secondo numero"));

let n3 = parseFloat(prompt("Inserisci il primo numero decimale"));

let n4 = parseFloat(prompt("Inserisci il secondo numero decimale"));

let risultato = n1 + n2;
let risultato2 = n3 + n4;

console.log(risultato);
console.log(risultato2);

*/

//---------------------------Mostrare in pagina tramite ALERT()---------------------

//alert("attenzione!");

//chiedo qualcosa all utente gazie alla funct prompt(), tipizzo il intero, e salvo in let n
//let n = parseInt(prompt("Inserisci il numero : "));

//mando a schermo un Alert funct con il valore della variabile n concatenandolo con + 
//alert("Il numero inserito è: " + n);



//---------------------------------------esercizio--------------------------

//chiedo all utente 3 numeri 2 interi e un decimale e faccio la somma e mando il risultato 
//della somma a pagina 


//3 prompt x i 3 num e salvare in variabile
//somma 
//alert della somma
/*

let n1 = parseInt(prompt("inserisci il primo numero : "));
let n2 = parseInt(prompt("inserisci il secondo numero : "));
let n3 = parseFloat(prompt("inserisci il terzo numero : "));

let somma = n1 + n2 + n3;

//mando a schermo
alert("La somma dei numeri è : " + somma);
*/

//--------------------------------OPERATORI DI CONFRONTO------------------


// = UGUALE
// != DIVERSO
// === STRETTAMENTE UGUALE
// > MAGGIORE
// >= MAGGIORE UGUALE
// < MINORE
// <= MINORE UGUALE
// !== STRETTAMENTE DIVERSO



//--------------------------------OPERATORI LOGICI--------------------------------------



// && "AND" logico confronto "entrmabi/e"
// || "OR"  logico confronto "OPPURE"
// !  "NOT" logic confronto "NEGAZIONE / NON ESISTE"



//---------------------------------CONDIZIONI/COSTRUTTI-------------------------------------



//-----------IF ELSE---------------------

// !parola -> non esiste
/*
if(condizione){

    //se è vera entro qui dentro

}else{

    //entro qui dentro
}


if (!bici){

    //vado a piedi
}else {

    //vado in bici
}


*/

/*

let password1 = prompt("Inserisci la prima password");

let password2 = prompt("Inserisci la seconda password");



if (password1 === password2){

    alert("ok sei dentro");

}else {

    alert("stai fuori");

}
*/

//semaforo
/*
let semaforo = prompt("Che colore è il semaforo? Verde o Rosso?");

let semaforoMinuscolo = semaforo.toLowerCase();

if (semaforoMinuscolo === "rosso" ){

    console.log("Devi fermarti!");

}else if (semaforoMinuscolo === "verde"){

    console.log("passa...");

}else {

    console.log("fai quello che credi");

}
*/




//--------------------------------OPERATORI LOGICI--------------------------------------



// && "AND" logico confronto "entrambi/e"
// || "OR"  logico confronto "OPPURE"
// !  "NOT" logic confronto "NEGAZIONE / NON ESISTE"

/*

//chiedo tramite prompt l età all utente e la converto in numero Intero
let eta = parseInt(prompt("Inserisci la tua età : "));

//voglio consentire l accesso al cinema solo tra i 18 e i 65 anni

if (eta >= 18 && eta <= 65){

    alert("accesso consentito");

}else{

    alert("accesso negato");
}

*/


//chiedo all utente il giorno della settimana e il programma dovrà dirmi se è weekend oppure no.

/*

let giorno = prompt("Che giorno è?").toLowerCase();

if (giorno === "sabato" || giorno === "domenica"){

    alert("è weekend");

}else if(giorno !== "sabato" || giorno !== ("domenica")){

    alert("non è un giorno");
    
}else{

    alert("è feriale e non si beve");
}



//chiedo all utente se è estate o no

let mese = prompt("Inserisci il mese : ").toLowerCase();

if (mese === "giugno" || mese === "luglio" || mese === "agosto"){

    alert("è estate");

}else{

    alert("non è estate");
}

*/




//---------------------------------ARRAY-------------------------------------------

//un insieme di dati strutturati con posizione e valore

//questo è un array vuoto
let colori = [];

//posizione   0        1       2       3
let nomi = ["diego", "luca", "mario", "giorgio"];
let numeri = [7, 8, 9, 3, 4, 5, 3, 7, 10];
let arrayMisto = ["diego", 2, 38,"giorgio", 42];

//valore delle posizioni è il nome stesso

//stampo tutto l array di nomi
console.log(nomi);

//stampo tutto l array di numeri
console.log(numeri);

//stampo qualcosa dell array misto
console.log(arrayMisto[3]);

//stampare solamente diego
console.log(nomi[0]);
//stampare solemante mario
console.log(nomi[2]);


//-----------------modificare un dato nell array-------

let arrayColori = ["giallo", "verde", "rosso"];

console.log(arrayColori);

arrayColori[0] = "viola";

console.log(arrayColori);

//come aggiungere un elemento alla fine
arrayColori.push(50);

console.log(arrayColori);

//come aggiungere elemento all inizio

arrayColori.unshift("pippo");

console.log(arrayColori);


//come eliminare l ultimo elemento

arrayColori.pop();
console.log("Ho rimosso l ultimo elemento", arrayColori);

//come eliminare il primo elemento

arrayColori.shift();
console.log("Ho rimosso il primo elemento", arrayColori);


//come trovare posizione di un elemento conoscendo l elemento da cercare
let auto = ["bmw", "audi", "subaru", "panigale"];

let posizione = auto.indexOf("subaru");

console.log(posizione);



//come verificare se un elemento è presente nell array
let ricercaAuto = auto.includes("toyota");
//il metodo includes() restituisce un valore booleano(true o false)
console.log(ricercaAuto);


//unire due array
let a = ["uno", "due"];
let b = ["tre", "quattro"];

let arrayUnito = a.concat(b);
let arrayUnitoReverse = b.concat(a);

console.log(arrayUnito);
console.log(arrayUnitoReverse);

//trasformare un array in stringa

let animali = ["gatto", "cane","procione"];

let frase = animali.join(" - ");

console.log(frase);
console.log(animali);


//conversione di un dato da Numero a Stringa

let num = 8; //numero
let num2 = num.toString(); // converto numero che diventa una stringa

//let datoInNumero = Number(num); 
//console.log(typeof datoInNumero);

console.log(typeof num2);
console.log(typeof num);






//-------------------------------------------CICLI FOR / WHILE--------------------------------------------------



let gatti = ["ugo", "poldo","ziggy"];

for(let i = 0; i < gatti.length; i++ ){
    
    console.log(gatti[i]);
}


let variabile = true;

while(!variabile){

    console.log(variabile);
}



// Iterazione o ripetizione per N volte per la length dell array


let esempio = 0; //dichiarazione e inizializzazione di una variabile


//inizializzazione  let i;

//dichiarazione  let i = 0;

//utilizzo  i >= qualcosa

/*
//inizializzazione -> condizione -> incremento(o decremento)
for(let i = 0; i <= 10; i++ ){

    console.log(i);
}

*/




//-------------------------------esercizio
/*
//array dei numeri inserti
let arrayNum = [];
let risultati = [];

let votiSufficienti = [];
let votiNonSufficienti = [];

for (let i = 0; i < 6; i++){

    //salvo il numero insierito in variabile num
    let num = parseInt(prompt("Inserisci un numero ("+ (i+1) + " di 6) : "));

    arrayNum.push(num);

    //controllo se pari o dispari
    if (num % 2 === 0){

        risultati.push("Pari");
    }else{

        risultati.push("Dispari");
    }


    if (num >= 6 && num <= 10 ){

        votiSufficienti.push(num);

    }else if(num <= 0 && num <= 10){

        votiNonSufficienti.push(num);

    }else if(num > 10){

        console.log("valore non corretto")
    }

}

console.log("Numeri Inseriti : ", arrayNum.join(", "));
console.log("Risultati : ", risultati.join(", "));

console.log("Voti non suff",votiNonSufficienti);
console.log("Voti suff",votiSufficienti);

*/
//svolgimento in parole : prendo ciò che scrive l utente, dal prompt, controllo che sia un numero,
//lo salvo in una variabile (num) , pusho questa variabile dentro all array dichiarato vuoto sopra al ciclo for
//l array verrà popolato ogni volta che verrà inserito un valore nel prompt(in questo caso 6 numeri)
//non vedroò nel codice i numeri aggiungersi nell array ,
//ma potro' stamparlo e leggere i valori inseriti in console.log





//chiedi all utente 10 numeri 
//se il numero inserito è maggiore di 34 stampa ciao
//e stampa tutti i numeri inseriti


//input dell utente tipizzato/salvato/confrontato/stampato

//dichiaro un array vuoto che verrà riempito con i numeri inseriti dal utente
let numeriTotali = [];


for (let i = 0; i < 3; i++){


    let numeroInserito = parseInt(prompt("Inserisci un numero"));

    numeriTotali.push(numeroInserito);

}

console.log(numeriTotali);

