function saluta () {
    alert("Ciao");
}
function parla () {
    alert("Parliamone");
}
function mmostraMes() {
    document.getElementById("testo").innerHTML = "Hai cliccato il bottone!";
}
function salutaUtente () {
    let nome = document.getElementById("nome").value;
    document.getElementById("nomeInserito").innerHTML =nome;
}
function sommaTraDueNumeri (a,b) {
    return a+b;
}
function somma () {
    let num1 = Number(document.getElementById("num1").value); 
    let num2 = Number(document.getElementById("num2").value);
    let risultato = sommaTraDueNumeri(num1,num2);
    document.getElementById("risultato").innerHTML = risultato;
}
function cambiaColoreTitolo() {
    titoloH1.style.color = "red";
}
function ripristinaColore() {
    titoloH1.style.color="black";
}
function nascondiTesto () {
    document.getElementById("testoNascosto").style.display="none";
    document.getElementById("btn_nascondi").style.display="none";
    document.getElementById("btn_mostra").style.display="inline-block";
}
function mostraTesto () {
    document.getElementById("testoNascosto").style.display="block";
    document.getElementById("btn_nascondi").style.display="inline-block"; 
    document.getElementById("btn_mostra").style.display="none";
}
function incrementa(){
    let numero = Number(document.getElementById("incr_decr").value);
    document.getElementById("incr_decr").value = numero+1;
}
function decrementa() {
    let numero = Number(document.getElementById("incr_decr").value);
    if (numero>0) {
    document.getElementById("incr_decr").value = numero-1;}
}
function generaNumero(){
   let numeroRandom= Math.floor(Math.random()*10)+1;
    document.getElementById("numeroGenerato").value =numeroRandom;
}
function lancioDadi() {
    return Math.floor(Math.random()*6)+1;
}

function sommaDueDadi() {
    let primo=lancioDadi();
    document.getElementById("primoDado").innerHTML=primo;
    let secondo=lancioDadi();
    document.getElementById("secondoDado").innerHTML=secondo;
    let somma=primo+secondo;
    document.getElementById("stampaSommaDadi").innerHTML=somma;
    if (primo>secondo) {
        document.getElementById("vincitore").innerHTML="Vince Primo dado";
    } else if (primo==secondo) {
        document.getElementById("vincitore").innerHTML="Pareggio";
    } else {
        document.getElementById("vincitore").innerHTML="Vince Secondo dado";
    }
}

