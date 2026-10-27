const endpoint='http://localhost:3000/todos';

const btnAggiunti = document.getElementById('add-task');
const listaAggiornata = document.getElementById('task-list');


btnAggiunti.addEventListener('click', () => {
    
    const nuovoTask=document.createElement('li');
   
    listaAggiornata.appendChild(nuovoTask);


} )