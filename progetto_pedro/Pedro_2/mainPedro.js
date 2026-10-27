//elenco degli id da recuperare
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const immagine = document.getElementById('immagine');
const musica = document.getElementById('musica');
const spinner = document.getElementById('spinner');


stopBtn.disabled = true;
startBtn.disabled = false;

//start dello spinner + musica
startBtn.addEventListener('click', () => {
    
    //mostrare lo spinner
    spinner.classList.remove('d-none');
    //disabilitare il bottone di start dopo che è stato premuto
    if (musica.currentTime===0) {
        startBtn.disabled = true;
        stopBtn.disabled=false;
    } else {
        stopBtn.disabled=true;
    }
    
    setTimeout( () => {
        //mostrare lo spinner
        spinner.classList.add('d-none');
        //avviare la rotazione dell immagine
        immagine.classList.add('rotation');
        //avviare la musica
        musica.play();
        //tolgo lo spinner
        spinner.classList.add('d-none');
    }, 2000);
})




stopBtn.addEventListener('click', () => {
    
    if (stopBtn.disabled===false) {
        startBtn.disabled=false;
        stopBtn.disabled=true;
    } else {
        startBtn.disabled=true;
        stopBtn.disabled=false;
    }
    //disabilitare il bottone di start dopo che è stato premuto
    
    //avviare la rotazione dell immagine
    immagine.classList.remove('rotation');
    //stoppare la musica
    musica.pause();
    musica.currentTime = 0;
    //abilitare il btn di stop
    
   
})


/* startBtn.innerHTML = '<span id="spinner" role="status" class="spinner-border spinner-border-sm text-dark d-none"></span>Playing'
startBtn.innerHTML = '<span id="spinner" role="status" class="spinner-border spinner-border-sm text-dark d-none"></span>Start' */