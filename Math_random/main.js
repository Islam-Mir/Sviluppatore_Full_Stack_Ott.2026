//Array di immagini


const immagini = [

    "src/img1.jpg",
    "src/img2.jpg",
    "src/img3.jpg",
    "src/img4.jpg",
    "src/img5.jpg",
    "src/img6.jpg",
    "src/img7.jpg",
    "src/img8.jpg",
    "src/img9.jpg",
    "src/img10.jpg"

];

function cambiaImmagine(){

    //genero un indice casuale tra 0 e 9
    const random = Math.floor(Math.random() * immagini.length);
    //console.log(random);
    //prendo l immagine casuale dell array
    const immagineRandom = immagini[random];
    //console.log(immagineRandom);
    document.getElementById("immagine").src = immagineRandom;

}; 

