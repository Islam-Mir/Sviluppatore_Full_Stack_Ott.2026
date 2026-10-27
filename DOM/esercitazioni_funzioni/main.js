function cambioColore() {
    cambiaColore.style.color="red";
}
function coloreOriginale() {
    cambiaColore.style.color="black";
}
let contatore=0;
function aumenta() {
    contatore++;
   document.getElementById("numero").textContent=contatore;
}
document.getElementById("incrementa").addEventListener("click", aumenta);

function decrementa() {
    contatore--;
    document.getElementById("numero").textContent=contatore;
    if (contatore<0) {
        contatore=0;
    }
}
document.getElementById("decrementa").addEventListener("click", decrementa);


function lancioDadi(){
   return Math.floor(Math.random()*6)+1;
}

function primoDado() {
    let primo = lancioDadi();
    document.getElementById("primoNumero").innerHTML=primo;
}

function secondoDado() {
    let secondo = lancioDadi();
    document.getElementById("secondoNumero").innerHTML=secondo;
}

function sommaDadi() {
   let primo=Number(document.getElementById("primoNumero").textContent);
   let secondo=Number(document.getElementById("secondoNumero").textContent);
    document.getElementById("mostraSommaDadi").textContent=primo+secondo;
}

function vincitore(){
    let primo=Number(document.getElementById("primoNumero").textContent);
    let secondo=Number(document.getElementById("secondoNumero").textContent);
    if (primo>secondo) {
        document.getElementById("vincitore").textContent="PRIMO";
    } else if (primo==secondo) {
        document.getElementById("vincitore").textContent="PAREGGIO";
    } else {
        document.getElementById("vincitore").textContent="SECONDO";
    }
}