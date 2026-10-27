
const immagine = document.getElementById('immaginePedro');


function fermaImmagine() {
   immagine.style.animationPlayState='paused';
}

function ripresaAnimazione() {
    immagine.style.animationPlayState='running';
}

const audioPedro=document.getElementById('canzonePedro');


function btn_start() {
    
    audioPedro.play();
    ripresaAnimazione();
}

function btn_pause() {
    
    if (audioPedro.paused) {
        audioPedro.play();
        ripresaAnimazione();
    } else {
    audioPedro.pause();
    fermaImmagine();
    }
}

function btn_stop() {  
    audioPedro.currentTime=0;
    audioPedro.pause();
    fermaImmagine(); 
    
}
