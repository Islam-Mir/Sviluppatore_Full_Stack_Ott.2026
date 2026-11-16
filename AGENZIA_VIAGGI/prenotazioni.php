<?php
include 'db.php';
include 'header.php';

// Inserimento
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['aggiungi'])) {
    // Aggiunto il quinto punto interrogativo (?) nella query e la "s" nel bind_param
  $stmt = $conn->prepare("INSERT INTO prenotazioni (id_cliente, id_destinazione, data_prenotazione_inizio, data_prenotazione_fine, num_persone) VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param("iisss", $_POST['id_cliente'], $_POST['id_destinazione'], $_POST['data_prenotazione_inizio'], $_POST['data_prenotazione_fine'], $_POST['num_persone']);
$stmt->execute();
  echo "<div class='alert alert-success'>Prenotazione aggiunta!</div>";
}

// Eliminazione
if (isset($_GET['elimina'])) {
  $id = intval($_GET['elimina']);
  $conn->query("DELETE FROM prenotazioni WHERE id = $id");
  echo "<div class='alert alert-danger'>Prenotazione eliminata.</div>";
}

// Dropdown
$clienti = $conn->query("SELECT id, nome, cognome FROM clienti");
$destinazioni = $conn->query("SELECT id, citta, paese FROM destinazioni");

// Paginazione
$perPagina = 10;
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$offset = ($page - 1) * $perPagina;

$total = $conn->query("SELECT COUNT(*) as tot FROM prenotazioni")->fetch_assoc()['tot'];
$totalPages = ceil($total / $perPagina);

$stmt = $conn->prepare("
  SELECT p.id, c.nome, c.cognome, d.citta, d.paese, p.data_prenotazione_inizio, p.data_prenotazione_fine, p.num_persone
  FROM prenotazioni p
  JOIN clienti c ON p.id_cliente = c.id
  JOIN destinazioni d ON p.id_destinazione = d.id
  ORDER BY p.id DESC LIMIT ? OFFSET ?
");
$stmt->bind_param("ii", $perPagina, $offset);
$stmt->execute();
$result = $stmt->get_result();
?>

<h2>Prenotazioni</h2>

<!-- FORM INSERIMENTO -->
<form method="POST" class="mb-4 row g-2 align-items-end" id="form-clienti">

    <div class="col-md-2">
        <select name="id_cliente" class="form-select" required>
            <option value="">Seleziona cliente</option>
            <?php while($c = $clienti->fetch_assoc()): ?>
            <option value="<?= $c['id'] ?>"><?= $c['nome'] ?> <?= $c['cognome'] ?></option>
            <?php endwhile; ?>
        </select>
    </div>
    <div class="col-md-2">
        <select name="id_destinazione" class="form-select" required>
            <option value="">Seleziona destinazione</option>
            <?php while($d = $destinazioni->fetch_assoc()): ?>
            <option value="<?= $d['id'] ?>"><?= $d['citta'] ?> (<?= $d['paese'] ?>)</option>
            <?php endwhile; ?>
        </select>
    </div>
    <div class="col-md-2">
        <input type="date" name="data_prenotazione_inizio" class="form-control" required>
    </div>
    <div class="col-md-2">
        <input type="date" name="data_prenotazione_fine" class="form-control" required>
    </div>
    <div class="col-md-2 position-relative">
        <input type="number" name="num_persone" class="form-control" placeholder="N. persone" min="1" required>
        <!-- Contenitore aggiunto per l'errore se i posti finiscono -->
        <div id="errore-posti" class="text-danger small fw-bold mt-1" style="display: none;">Posti esauriti!</div>
    </div>

    <div class="col-md-2">
        <button name="aggiungi" class="btn btn-success w-100">Aggiungi</button>
    </div>
</form>

<!-- ELENCO -->
<table class="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Destinazione</th>
            <th>Data Inizio</th>
            <th>Data Fine</th>
            <th>Persone</th>
            <th>Azioni</th>
        </tr>
    </thead>
    <tbody>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= $row['nome'] ?> <?= $row['cognome'] ?></td>
            <td><?= $row['citta'] ?> (<?= $row['paese'] ?>)</td>
            <td><?= $row['data_prenotazione_inizio'] ?></td>
            <td><?= $row['data_prenotazione_fine'] ?></td>
            <td><?= $row['num_persone'] ?></td>
            <td>
                <a href="?elimina=<?= $row['id'] ?>" class="btn btn-sm btn-danger"
                    onclick="return confirm('Sei sicuro?')">Elimina</a>
            </td>
        </tr>
        <?php endwhile; ?>
    </tbody>
</table>

<!-- PAGINAZIONE -->
<nav>
    <ul class="pagination">
        <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <li class="page-item <?= $i === $page ? 'active' : '' ?>">
            <a class="page-link" href="?page=<?= $i ?>"><?= $i ?></a>
        </li>
        <?php endfor; ?>
    </ul>
</nav>

<?php include 'footer.php'; ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const campoDestinazione = document.querySelector('select[name="id_destinazione"]') || document
        .getElementById('destinazione');
    const campoInizio = document.querySelector('input[name="data_prenotazione_inizio"]');
    const campoFine = document.querySelector('input[name="data_prenotazione_fine"]');
    const campoPersone = document.querySelector('input[name="num_persone"]');
    const divErrore = document.getElementById('errore-posti');

    if (campoDestinazione && campoInizio && campoFine) {

        // 1. GESTIONE CAMBIO DESTINAZIONE (Scarica le date dal database)
        campoDestinazione.addEventListener('change', async function() {
            const idDestinazione = campoDestinazione.value;
            if (!idDestinazione) return;

            try {
                const risposta = await fetch('localita/get_date_destinazione.php?id=' +
                    idDestinazione);
                if (risposta.ok) {
                    const dati = await risposta.json();
                    // --- BLOCCO AGGIUNTO PER GESTIONE PERSONE E POSTI ---
                    if (campoPersone && divErrore) {
                        if (dati.posti_liberi <= 0) {
                            campoPersone.value = '';
                            campoPersone.setAttribute('max', '0');
                            campoPersone.disabled = true;
                            divErrore.style.display = 'block';
                            campoPersone.placeholder = "Posti esauriti";
                        } else {
                            campoPersone.disabled = false;
                            campoPersone.setAttribute('max', dati.posti_liberi);
                            campoPersone.placeholder = "Max " + dati.posti_liberi + " posti";
                            if (parseInt(campoPersone.value) > dati.posti_liberi) {
                                campoPersone.value = '';
                            }
                            divErrore.style.display = 'none';
                        }
                    }
                    // -----------------------------------------------------


                    // Imposta i limiti assoluti del viaggio sul calendario di INIZIO
                    campoInizio.setAttribute('min', dati.partenza);
                    campoInizio.setAttribute('max', dati.ritorno);
                    if (campoInizio.value && (campoInizio.value < dati.partenza || campoInizio
                            .value > dati.ritorno)) {
                        campoInizio.value = '';
                    }

                    // Imposta inizialmente i limiti sul calendario di FINE
                    campoFine.setAttribute('min', dati.partenza);
                    campoFine.setAttribute('max', dati.ritorno);
                    if (campoFine.value && (campoFine.value < dati.partenza || campoFine.value >
                            dati.ritorno)) {
                        campoFine.value = '';
                    }

                    // Se la data di inizio è già popolata, adegua subito la data di fine
                    if (campoInizio.value) {
                        campoFine.setAttribute('min', campoInizio.value);
                    }

                    // Comunica le modifiche al file form-validator.js
                    campoInizio.dispatchEvent(new Event('input'));
                    campoFine.dispatchEvent(new Event('input'));
                }
            } catch (errore) {
                console.error('Errore nel recupero delle date destinazione:', errore);
            }
        });

        // 2. GESTIONE CAMBIO DATA INIZIO (Vincola la data di fine)
        campoInizio.addEventListener('input', function() {
            if (campoInizio.value) {
                // La data di fine non può essere precedente alla data di inizio selezionata
                campoFine.setAttribute('min', campoInizio.value);

                // Se la data di fine inserita precedeva la nuova data di inizio, la svuota
                if (campoFine.value && campoFine.value < campoInizio.value) {
                    campoFine.value = '';
                    campoFine.dispatchEvent(new Event('input'));
                }
            }
        });
    }
});
</script>