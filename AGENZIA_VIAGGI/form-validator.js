function attivaCampiSequenziali(selectorForm) {
  const form = document.querySelector(selectorForm);
  if (!form) return;

  // Seleziona solo i campi di input di testo/email e il bottone di submit
  const inputs = Array.from(
    form.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="number"], input[type="date"]',
    ),
  );

  const submitBtn = form.querySelector('button[type="submit"]');

  // Servono per tenere traccia delle località reali caricate via AJAX
  form._paesiValidi = form._paesiValidi || [];
  form._cittaValide = form._cittaValide || [];

  function validaForm() {
    // Trova i campi data dentro al form corrente
    const campoPartenza = form.querySelector('input[name="data_partenza"]');
    const campoRitorno = form.querySelector('input[name="data_ritorno"]');

    // Trova il campo data_prenotazione nel form corrente
    const campoPrenotazione = form.querySelector(
      'input[name="data_prenotazione"]',
    );

    if (campoPrenotazione) {
      const oggi = new Date().toISOString().split("T")[0];

      // Se l'API ha caricato le date specifiche della destinazione selezionata, usa quelle
      if (form._dataPartenzaDestinazione && form._dataRitornoDestinazione) {
        campoPrenotazione.setAttribute("min", form._dataPartenzaDestinazione);
        campoPrenotazione.setAttribute("max", form._dataRitornoDestinazione);
      } else {
        // Altrimenti usa il comportamento standard (da oggi in poi) senza limite massimo
        campoPrenotazione.setAttribute("min", oggi);
        campoPrenotazione.removeAttribute("max");
      }

      // Se la data attualmente inserita è fuori dal range consentito, la svuota
      if (campoPrenotazione.value) {
        const minVal = campoPrenotazione.getAttribute("min");
        const maxVal = campoPrenotazione.getAttribute("max");
        if (
          campoPrenotazione.value < minVal ||
          (maxVal && campoPrenotazione.value > maxVal)
        ) {
          campoPrenotazione.value = "";
        }
      }
    }

    if (campoPartenza && campoRitorno) {
      // 1. La data di partenza non può essere ieri o prima (quindi deve essere da OGGI in poi)
      const oggi = new Date().toISOString().split("T")[0];
      campoPartenza.setAttribute("min", oggi);

      // 2. Se la data di partenza è compilata, la data di ritorno deve essere almeno partenza + 1 giorno
      if (campoPartenza.value) {
        const dataPartenzaObj = new Date(campoPartenza.value);
        dataPartenzaObj.setDate(dataPartenzaObj.getDate() + 1); // Aggiunge 1 giorno
        const dataMinRitorno = dataPartenzaObj.toISOString().split("T")[0];

        campoRitorno.setAttribute("min", dataMinRitorno);
      }
    }

    let precedenteCompilato = true;

    inputs.forEach((input, index) => {
      if (index === 0) {
        // Il primo campo è sempre attivo
        input.disabled = false;
      } else {
        // I campi successivi si attivano solo se il precedente è valido e non vuoto
        const prevInput = inputs[index - 1];
        if (
          precedenteCompilato &&
          prevInput.checkValidity() &&
          prevInput.value.trim() !== ""
        ) {
          input.disabled = false;
        } else {
          input.disabled = true;
          input.value = ""; // Svuota se il precedente viene cancellato
          precedenteCompilato = false;
        }
      }
    });

    // Il bottone si attiva solo se l'ultimo campo è valido
    const ultimoInput = inputs[inputs.length - 1];
    if (
      ultimoInput &&
      !ultimoInput.disabled &&
      ultimoInput.checkValidity() &&
      ultimoInput.value.trim() !== ""
    ) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // Assegnazione degli eventi ad ogni campo del form
  inputs.forEach((input) => {
    // Gestisce la digitazione o modifica in tempo reale
    input.addEventListener("input", validaForm);

    // Gestisce la perdita di focus o la selezione definitiva delle opzioni
    input.addEventListener("change", function () {
      // --- CONTROLLO RECUPERO DATE DESTINAZIONE ---
      if (input.name === "id_destinazione" || input.id === "destinazione") {
        const idDestinazione = input.value.trim();
        if (idDestinazione !== "") {
          fetch("localita/get_date_destinazione.php?id=" + idDestinazione)
            .then((risposta) => risposta.json())
            .then((dati) => {
              form._dataPartenzaDestinazione = dati.partenza;
              form._dataRitornoDestinazione = dati.ritorno;
              validaForm();
            })
            .catch((errore) =>
              console.error("Errore nel caricamento date:", errore),
            );
        } else {
          form._dataPartenzaDestinazione = null;
          form._dataRitornoDestinazione = null;
        }
      }

      // --- CONTROLLO VALIDITÀ PAESE ---
      if (input.id === "paese" && window._ultimoRisultatoPaesi) {
        const valore = input.value.trim();
        if (valore !== "" && !window._ultimoRisultatoPaesi.includes(valore)) {
          input.value = "";
        }
      }

      // --- CONTROLLO VALIDITÀ CITTÀ ---
      if (input.id === "citta" && window._ultimoRisultatoCitta) {
        const valore = input.value.trim();
        if (valore !== "" && !window._ultimoRisultatoCitta.includes(valore)) {
          input.value = "";
        }
      }

      // Ricalcola la sequenza globale dopo i controlli di validità
      validaForm();
    });
  });

  // Esegui subito al caricamento per verificare lo stato iniziale
  validaForm();
}

function gestisciFiltriInterconnessi(selectorForm) {
  const form = document.querySelector(selectorForm);
  if (!form) return;

  // Recuperiamo tutti i campi del form di ricerca tramite i loro ID
  const campoCliente = form.querySelector("#ricerca_cliente");
  const campoPaese = form.querySelector("#ricerca_paese");
  const campoCitta = form.querySelector("#ricerca_citta");
  const campoPrezzo = form.querySelector("#ricerca_prezzo");
  const campoData = form.querySelector("#ricerca_data");
  const campoPersone = form.querySelector("#ricerca_persone");

  // Recuperiamo i datalist per mostrare i suggerimenti salvati nel database
  const dlPaesi = form.querySelector("#lista-ricerca-paesi");
  const dlCitta = form.querySelector("#lista-ricerca-citta");

  async function aggiornaFiltriDinamici() {
    // Blocco di sicurezza immediato: impedisce la digitazione di numeri negativi
    if (campoPrezzo && parseFloat(campoPrezzo.value) < 0)
      campoPrezzo.value = "";
    if (campoPersone && parseInt(campoPersone.value) < 0)
      campoPersone.value = "";

    // Raccogliamo in tempo reale i valori scritti dall'utente
    const parametri = new URLSearchParams({
      nome_cliente: campoCliente ? campoCliente.value.trim() : "",
      paese: campoPaese ? campoPaese.value.trim() : "",
      citta: campoCitta ? campoCitta.value.trim() : "",
      prezzo_max: campoPrezzo ? campoPrezzo.value.trim() : "",
      data: campoData ? campoData.value : "",
      num_persone: campoPersone ? campoPersone.value.trim() : "",
    });

    try {
      // Interroghiamo l'API inviando lo stato attuale del form
      const risposta = await fetch("localita/filtri_ricerca.php?" + parametri);
      if (!risposta.ok) return;

      const dati = await respuesta.json(); // Riceviamo es: { paesi: [...], citta: [...], max_persone: X }

      // 1. Aggiorna i suggerimenti del Paese
      if (dlPaesi && dati.paesi) {
        dlPaesi.innerHTML = "";
        dati.paesi.forEach((p) => {
          const opzione = document.createElement("option");
          opzione.value = p;
          dlPaesi.appendChild(opzione);
        });
      }

      // 2. Aggiorna i suggerimenti della Città
      if (dlCitta && dati.citta) {
        dlCitta.innerHTML = "";
        dati.citta.forEach((c) => {
          const opzione = document.createElement("option");
          opzione.value = c;
          dlCitta.appendChild(opzione);
        });
      }

      // 3. Modifica dinamicamente il placeholder del numero di persone in base ai record superstiti
      if (campoPersone && dati.max_persone > 0) {
        campoPersone.placeholder = "N. persone (Max " + dati.max_persone + ")";
      } else if (campoPersone) {
        campoPersone.placeholder = "N. persone";
      }
    } catch (errore) {
      console.error("Errore durante l'allineamento dei filtri:", errore);
    }
  }

  // Colleghiamo l'evento a tutti i campi: appena l'utente scrive o cambia qualcosa, l'intera form si adegua
  const tuttiICampi = [
    campoCliente,
    campoPaese,
    campoCitta,
    campoPrezzo,
    campoData,
    campoPersone,
  ];
  tuttiICampi.forEach((input) => {
    if (input) {
      input.addEventListener("input", aggiornaFiltriDinamici);
      input.addEventListener("change", aggiornaFiltriDinamici);
    }
  });

  // Eseguiamo un primo controllo al caricamento (es. se la pagina mantiene filtri attivi in GET)
  aggiornaFiltriDinamici();
}
