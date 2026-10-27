function lancioDadi() {
  return   Math.floor(Math.random()*6)+1;
}

function sfidaGiocatori () {
    //Lancio dei dadi giocatore 1
    const dado1G1 = lancioDadi();
    console.log(dado1G1);
    const dado2G1 = lancioDadi();
    console.log(dado2G1);
    
    //Lancio dei dadi giocatore 2
    const dado1G2 = lancioDadi();
    console.log(dado1G2);
    const dado2G2 = lancioDadi();
    console.log(dado2G2);

    const totaleG1 = dado1G1+dado1G2;
    console.log(totaleG1);
    const totaleG2 = dado2G1+dado2G2;
    console.log(totaleG2);


    let vincitore="";
    if (totaleG1 > totaleG2) {
        vincitore="Giocatore 1";
    } else if (totaleG1<totaleG2) {
        vincitore="Giocatore 2";
    } else {
        vincitore="Pareggio";
    }

    document.getElementById("risultatoDadi").textContent = "Giocatore 1: " + dado1G1 + " " +dado1G2 +"  totale G1: "
    + totaleG1 + " --- "+"Giocatore 2: " + dado2G1 + " " + dado2G2 +"  totale G2: " + totaleG2 +" --- "+"   Il vincitore è: "+ vincitore;

}