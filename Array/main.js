/*

let unAuto = {};

let tanteAuto = [
    {},
    {},
    {}

];

let auto = {

    ruote : 4,
    colore : "rosso",
    alimentazione : "diesel",

    accellera(){
    console.log("BrumBrum")    
    }

}

let listaPersone = [

        {   
        nome : "Diego",
        cognome : "Aneli",
        eta : 44,
        peso : 85.5,
        altezza : 1.87
        },

        {   
        nome : "SAKD",
        cognome : "SDAA CS",
        eta : 44,
        peso : 85.5,
        altezza : 1.87
        },

]

let persona = {
    nome : "Mario",
    cognome : "rossi",
    eta : 45
}

console.log(auto);
console.log(listaPersone);



persona.professione = "cuoco";

console.log(persona);

persona.professione ="Develo";
persona.eta=38;
console.log(persona);

delete persona.cognome;
console.log(persona);


let chiavi = Object.keys(persona);
console.log("Array con tutte le chiavi della persona: "+chiavi);

let valori = Object.values(persona);
console.log("I valori della persona: " + valori);

let chiaviValori = Object.entries(persona);

console.log(chiaviValori);

const originale = { a:1, b:1, c:3 };
const clone = {};

for(let i in originale) {
    clone [i] = originale [i]
}
console.log("Clone: ",clone);
console.log("Originale:" , originale);

const cane = {

nome: "Tito",
razza: "Bastardino",

abbaia: function () {
    console.log("Bau bau!");
},

mangia: function(){
    console.log("Gnam gnam!");
}

}



cane.mangia();
cane.abbaia();
console.log(cane);


//-------------------------------FOR EACH -----------

let listaP = [
        {   
        nome : "Diego",
        cognome : "Aneli",
        eta : 44,
        voto : 59,
        peso : 85.5,
        altezza : 1.87
        },
        {   
        nome : "Abba",
        cognome : "asdsac CS",
        eta : 44,
        voto : 51,
        peso : 85.5,
        altezza : 1.87
        },
        {   
        nome : "Mamma",
        cognome : "SDadads",
        eta : 44,
        voto : 95,
        peso : 85.5,
        altezza : 1.87
        }
]
listaP.forEach(function(persona){
    console.log("persona :", persona.nome, persona.peso);
});

let somma=0;
listaP.forEach(function(persona){
    somma+= persona.voto;
});
console.log(somma);

let media = somma / listaP.length;

console.log(media);



//Metodo map()

const  num=[2,5,7,8,10];

const numeriRaddoppiati = num.map((num) => {

    return num*2;

}); 

console.log(numeriRaddoppiati);
//console.log(typeof numeriRaddoppiati);
console.log(num);
console.log(Array.isArray(numeriRaddoppiati));

//Nomi in MAIUSCOLO
const nomi = ["massimiliano", "palladino", "franceschini"];

const nomiMaiuscolo = nomi.map((nomi) => {
 return nomi.toUpperCase();
});

//Nomi in MINUSCOLO
 const nomiMinuscolo = nomi.map((nomi) => {
  return  nomi.toLowerCase();
 });


console.log(nomiMaiuscolo);
console.log(Array.isArray(nomiMaiuscolo));

console.log(nomiMinuscolo);
console.log(Array.isArray(nomiMinuscolo));

const saluto = nomi.map((nomi) => {
 return "ciao "+nomi;
});
console.log(saluto);

//Metodo filter()

const numeri = [34,56,7,100,34,83];

const maggioreDiCiquanta = numeri.filter((numeri) => {
    return numeri>50;
});

console.log(maggioreDiCiquanta);
console.log(Array.isArray(maggioreDiCiquanta));

const stringhe = ["diego", "paperino", "qui", "quo","pluto","paperone"];

const paroleLunghe = stringhe.filter((p) => {
  return  p.length >= 5;
});

console.log(paroleLunghe);

//Metodo some()

const eta = [87,5,7,17,12,69,100,34];

const minorenni = eta.some((anni) => {
    return anni <18;
});
console.log(minorenni);

const minorenni_18 = eta.filter((anni) => {
    return anni<18;
});
console.log(minorenni_18); 



//Metdo every()

const carrello = [
    {nome : "pane:", prezzo: 5.5, quantita: 4 },
    {nome : "latte:", prezzo: 1.5, quantita: 3 },
    {nome : "pasta:", prezzo: 0.99, quantita: 3 }
]


const totalecarrello = carrello.reduce((accumulatore, prodotto) => {
    
    const subtotale = prodotto.prezzo * prodotto.quantita;

    return  accumulatore + subtotale;

},0);

console.log(totalecarrello.toFixed(2));

//abbiamo un array di prodotti informatici voglio selezionare i prodotti 
// con prezzo inferiore a 100 euro
//successivamente voglio estrarne il nome

const listaArticoli = [
    { nome: "Monitor",      prezzo: 299.99,     quantita: 5  },
    { nome: "Tastiera",     prezzo: 25,         quantita: 5  },
    { nome: "Mouse",        prezzo: 19.50,      quantita: 5  },
    { nome: "SAP",          prezzo: 999.50,     quantita: 5  },
    { nome: "Auricolari",   prezzo: 299.99,     quantita: 5  },
];

const prodottiEconimici = listaArticoli 
.filter((p) => {
    return p.prezzo < 100;
})

.map ((p) => {
    return p.nome;

});
console.log(prodottiEconimici);


//Dato un array di studenti estrai gli studenti promossi aventi la sufficienza
//mostra in console i nomi

const listaStudenti = [
    {   nome:   "Matteo Serrani",       classe:   "5AIS", voto: 8},
    {   nome:   "Giuseppe Esposito",    classe:   "5AIS", voto: 7},
    {   nome:   "Cristian Balsano",     classe:   "5AIS", voto: 6},
    {   nome:   "Simone Sorrentino",    classe:   "5AIS", voto: 5}
];

const studentiPromossi = listaStudenti
    .filter( (s) => {
        return s.voto >6;
    })
    .map ((s) => {
        return s.nome;
    });

console.log(studentiPromossi);

*/

////////////////////////////////  Esercizio combinato 
//Abbiamo una lista di prodotti, con prezzo e disponibilità, 
//voglio solamente i prodotti disponibili 
//e la somma dei prezzi degli oggetti disponibili

const prodotti = [
    {nome: "Farina", prezzo: 1.50, disponibilita: true},
    {nome: "Zucchero", prezzo: 1.50, disponibilita: false},
    {nome: "Olio", prezzo: 1.50, disponibilita: true},
];

const prodottiDisponibili = prodotti
    .filter((pd) => {
        return pd.disponibilita===true;
    })

    .reduce((accumulatore, p) => {
        
        return accumulatore + p.prezzo;
    },0)
  
    
      
    ;
    console.log(prodottiDisponibili);

    /*
    const totalecarrello = carrello.reduce((accumulatore, prodotto) => {
    
    const subtotale = prodotto.prezzo * prodotto.quantita;

    return  accumulatore + subtotale;

},0);

console.log(totalecarrello.toFixed(2)); */