function originale(){

    box.style.width = "100px";
    box.style.height = "100px";
    box.style.backgroundColor = "red";
    posizione = 0;
    box.style.left = posizione + "px";    
}


function ingrandisci(){

    box.style.width = "150px";
    box.style.height = "150px";
}


function riduci(){

    box.style.width = "50px";
    box.style.height = "50px";
}


function cambiaColore(){

    box.style.backgroundColor = "blue";
}


//spostamenti

//stato iniziale
let posizione = 0;

function spostaDestra(){

    posizione += 20;
    box.style.left = posizione + "px";
}

function spostaSinistra(){

    posizione -= 20;
    box.style.left = posizione + "px";

}



function saluta(){

    alert("ciao!");

}

//funzione che fa lo scale di 1.5 e con una scritta all interno centrata
//ruota di 180°

function scalaRuota(){

    box.style.transform = "rotate(180deg) scale(1.5)";
    box.style.transition = "transform 3s ease";
}