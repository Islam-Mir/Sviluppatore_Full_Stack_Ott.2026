//dare un nome parlante all funzione



//funzioni anonime
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
function sommaxy(x,y){

    return x + y ;
    
}

//devo salvare il risultato della somma in una variabile
let risultato = sommaxy(20,20);

//per poi stampare il valore
console.log(risultato);



//funzione che calcola la potenza di un numero

function potenza(x){

    return x **2;
}

let pot = potenza(3);

console.log("Ecco la potenza del numero : " , pot);



//creo una funzione che se richiamata fa sempre la stessa verifica dell età


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



function calcoloPrezzo (prezzo, sconto) {

   return (prezzo*(100-sconto))/100;
}

let prz=parseFloat(prompt("Inserisci il prezzo"));
console.log(prz);
let sc=parseFloat(prompt("Inserisci lo sconto"));
console.log(sc);

let risult=calcoloPrezzo(prz,sc);
console.log(risult);
alert("Prezzo scontato è: "+risult);


let prezzo=parseFloat(prompt("prezzo: "));
let sconto=parseFloat(prompt("scontoo: "));

function calcolaPrezzo(x,y) {
    let valoreSconto=(x*y)/100;
    let prezzoFinale=x-valoreSconto;
    return prezzoFinale.toFixed(2);
}

let risltatoScontato = calcolaPrezzo(prezzo, sconto);
console.log(risltatoScontato);



let somma2=0;

let studentyArray=[];

for(let i=0; i<5; i++) {

      let voti = parseFloat(prompt("Inserisci il voto ("+ (i+1) + " di 5) : "));

    studentyArray.push(voti);
    somma2=somma2+studentyArray[i];

    if (somma2/studentyArray.length >=6 ) {
        console.log("Promossoi");
    } else {
        console.log("Bocciati");
    }
}
console.log("Voto medio é: "+somma2/studentyArray.length);




let voti=[];


for (let i=0; i<5; i++) { 

let voto = parseFloat(prompt("Inserisci il voto ("+ (i+1) + " di 5) : "));

voti.push(voto);

}

function calcoloMedia(voti) {
    let somma1=0;
    for (let i=0; i<voti.length; i++) {
        somma1=somma1+voti[i];
        }
        let media1=somma1/voti.length;
        return media1;
}


let mediaClasse=calcoloMedia(voti);
  
    if (mediaClasse>=6 ) {
        console.log("Promossoi");
    } else {
        console.log("Bocciati");
    }




// • Esercizio 1: Calcolo dell'IVA

function calcoloPercentuale (x,y) {
    return (x-(x/y)*y).toFixed(2);
}

function prezzoLordo(x,y){
    
    return (x + (x * y) / 100).toFixed(2);

}


let prezzoNetto=parseFloat(prompt("Inserisci il prezzo netto: "));
let iva=parseFloat(prompt("Inserisci iva 4 o 10 o 22."));

let prezzoLordoCalcola=(prezzoLordo(prezzoNetto,iva));
console.log(prezzoLordoCalcola);
 


