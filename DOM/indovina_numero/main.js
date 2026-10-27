function randomNumero() {
    return Math.floor(Math.random() *3) +1;
}
/* 
function salvataggioNumeroGenerato() {
    let numeroGenerato=randomNumero();
    document.getElementById("numeroSalvato").innerHTML=numeroGenerato;
}

function confrontoNumero() {
    let numeroUtente =document.getElementById("numero_indovinato").innerHTML;
    let numeroGenerato =document.getElementById("numeroSalvato").innerHTML;
    if (numeroUtente==numeroGenerato) {
                document.getElementById("messaggio").innerText="Indovinato";
            } else {
                document.getElementById("messaggio").innerText="Riprova";
            }

    do (numeroUtente!=numeroGenerato) {
        for (let i=0; i<5; i++) {
            if (numeroUtente!=numeroGenerato) {
                
            } else {
                document.getElementById("messaggio").innerText="Indovinato";
            }
        }
    }
}

//eserizio indovina numero

let numeroCasuale=randomNumero();
console.log(numeroCasuale);

let input=prompt("Inserisci un numero");

let numberUtente = Number(input);
console.log(numberUtente);

if (numeroCasuale === numberUtente) {
    console.log("Indovinato");
} else {
    console.log("Riprova");
}

 */

//esercizio lancio moneta


let lancio=Math.floor(Math.random()*2);
//console.log(lancio);
if (lancio===0) {
    alert("TESTA");
} else {
    alert("CROCE");
}