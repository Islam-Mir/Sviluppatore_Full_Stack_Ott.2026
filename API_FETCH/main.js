//ENDPOINT (FONTE DI DATI) 

const endpoint = 'https://api.sampleapis.com/coffee/hot';


function fetchUsers(){

    fetch(endpoint)

        .then(response => {

            /*
            if(!response.ok){

                throw new Error(`Errore HTTP : ${response.status}`);
            }
            */

            return response.json();
        })

        .then(data => {

            renderUsers(data);

        })
}


function renderUsers(data){


    //SVUOTO INIZIALMENTE LA LISTA, CHE VERRà POPOLATA CON IL FOREACH
    userList.innerHTML = "";


    //lo slice determina quanti elementi voglio mostare 
    //se l api non ci da la possibilità di settare il limit in entrata del numero di obj
    data.slice(0, 6).forEach(user =>{

        
        // Creo la colonna Bootstrap
        const col = document.createElement('div');
        col.className = 'col-6 col-md-6 col-lg-4';

        // Creo la card 
        const card = document.createElement('div');
        card.className = 'card shadow-sm';

        // Creo il body della card
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        // Creo il titolo della card
        const userTitle = document.createElement('h3');
        userTitle.className = 'card-title text-center';
        userTitle.textContent = user.title;

        // Creo il paragrafo con l email
        const userDescription = document.createElement('p');
        userDescription.className = 'card-text';
        userDescription.textContent = user.description;

        // Creo la card 
        const userCard = document.createElement('div');
        userCard.className = 'card';
        
        // Creo l image
        const img = document.createElement('img');
        img.src = user.image;
        img.className ='card-img-top mx-auto mb-4';
        img.style.width = '200px';
        img.style.height = '200px';
        img.style.objectFit = 'cover';
        

        //Inserisco i dati nel body della card
        cardBody.appendChild(userTitle);
        cardBody.appendChild(userDescription);
        cardBody.appendChild(userCard);

        //Inserisco cardbody dentro alla card
        card.appendChild(cardBody);
        card.appendChild(img);

        //Inserisco card dentro a col
        col.appendChild(card);

        //inserisco col dentro a userlist
        userList.appendChild(col);

    })
}




//richiamo funzione per essere esguita
fetchUsers();


