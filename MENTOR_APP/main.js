const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {

  // CLICK apre e chiude
  panel.addEventListener('click', (e) => {
    
    if(e.target.closest('a, button')) return;

    const wasActive = panel.classList.contains('active');

    removeActiveClasses();

    if(!wasActive){
      panel.classList.add('active');
    }
    
  });

});

function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active');
  });
}