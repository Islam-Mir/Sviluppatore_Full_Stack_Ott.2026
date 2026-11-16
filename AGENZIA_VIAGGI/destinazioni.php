<?php
include 'db.php';
include 'header.php';

// Aggiungi destinazione
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['aggiungi'])) {
  $stmt = $conn->prepare("INSERT INTO destinazioni (citta, paese, prezzo, data_partenza, data_ritorno, posti_disponibili) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("ssdssi", $_POST['citta'], $_POST['paese'], $_POST['prezzo'], $_POST['data_partenza'], $_POST['data_ritorno'], $_POST['posti_disponibili']);
  $stmt->execute();
  echo "<div class='alert alert-success'>Destinazione aggiunta!</div>";
}

// Elimina destinazione
if (isset($_GET['elimina'])) {
  $id = intval($_GET['elimina']);
  $conn->query("DELETE FROM destinazioni WHERE id = $id");
  echo "<div class='alert alert-danger'>Destinazione eliminata.</div>";
}

// Recupera per modifica
$modifica = null;
if (isset($_GET['modifica'])) {
  $id = intval($_GET['modifica']);
  $modifica = $conn->query("SELECT * FROM destinazioni WHERE id = $id")->fetch_assoc();
}

// Salva modifica
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['salva_modifica'])) {
  $stmt = $conn->prepare("UPDATE destinazioni SET citta=?, paese=?, prezzo=?, data_partenza=?, data_ritorno=?, posti_disponibili=? WHERE id=?");
  $stmt->bind_param("ssdssii", $_POST['citta'], $_POST['paese'], $_POST['prezzo'], $_POST['data_partenza'], $_POST['data_ritorno'], $_POST['posti_disponibili'], $_POST['id']);
  $stmt->execute();
  echo "<div class='alert alert-info'>Destinazione aggiornata!</div>";
}

// Paginazione
$perPagina = 10;
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$offset = ($page - 1) * $perPagina;
$total = $conn->query("SELECT COUNT(*) as tot FROM destinazioni")->fetch_assoc()['tot'];
$totalPages = ceil($total / $perPagina);
$results = $conn->query("SELECT * FROM destinazioni ORDER BY id DESC LIMIT $perPagina OFFSET $offset");
?>

<h2>Destinazioni</h2>

<!-- FORM INSERIMENTO / MODIFICA -->
<form method="POST" class="mb-4 row g-2" id="form-clienti">
    <?php if ($modifica): ?>
    <input type="hidden" name="id" value="<?= $modifica['id'] ?>">
    <?php endif; ?>

    <div class="col">
        <input type="text" id="paese" name="paese" class="form-control" placeholder="Cerca un paese..."
            value="<?= htmlspecialchars($modifica['paese'] ?? '') ?>" list="lista-paesi" autocomplete="off" required>
        <datalist id="lista-paesi"></datalist>
    </div>

    <div class="col">
        <input type="text" id="citta" name="citta" class="form-control" placeholder="Cerca una città..."
            value="<?= htmlspecialchars($modifica['citta'] ?? '') ?>" list="lista-citta" autocomplete="off" required>
        <datalist id="lista-citta"></datalist>
    </div>



    <div class="col"><input type="number" step="0.01" name="prezzo" class="form-control" placeholder="€ Prezzo"
            min="0.01" value="<?= $modifica['prezzo'] ?? '' ?>" required></div>
    <div class="col"><input type="date" name="data_partenza" class="form-control"
            value="<?= $modifica['data_partenza'] ?? '' ?>" required></div>
    <div class="col"><input type="date" name="data_ritorno" class="form-control"
            value="<?= $modifica['data_ritorno'] ?? '' ?>" required></div>
    <div class="col"><input type="number" name="posti_disponibili" class="form-control" placeholder="Posti" min="0"
            value="<?= isset($modifica['posti_disponibili']) ? $modifica['posti_disponibili'] : '0' ?>" required></div>
    <div class="col">
        <button type="submit" name="<?= $modifica ? 'salva_modifica' : 'aggiungi' ?>"
            class="btn btn-<?= $modifica ? 'warning' : 'success' ?>">
            <?= $modifica ? 'Salva' : 'Aggiungi' ?>
        </button>
    </div>
</form>

<!-- TABELLA -->
<table class="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Paese</th>
            <th>Città</th>

            <th>Prezzo</th>
            <th>Partenza</th>
            <th>Ritorno</th>
            <th>Posti</th>
            <th>Azioni</th>
        </tr>
    </thead>
    <tbody>
        <?php while ($r = $results->fetch_assoc()): ?>
        <tr>
            <td><?= $r['id'] ?></td>
            <td><?= $r['citta'] ?></td>
            <td><?= $r['paese'] ?></td>
            <td><?= $r['prezzo'] ?> €</td>
            <td><?= $r['data_partenza'] ?></td>
            <td><?= $r['data_ritorno'] ?></td>
            <td><?= $r['posti_disponibili'] ?></td>
            <td>
                <a href="?modifica=<?= $r['id'] ?>" class="btn btn-sm btn-warning">Modifica</a>
                <a href="?elimina=<?= $r['id'] ?>" class="btn btn-sm btn-danger"
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


<script>
document.addEventListener('DOMContentLoaded', function() {

    const campoPaese = document.getElementById('paese');
    const campoCitta = document.getElementById('citta');

    const listaPaesi = document.getElementById('lista-paesi');
    const listaCitta = document.getElementById('lista-citta');

    const percorsoAPI = 'localita/suggerimenti.php';

    async function cerca(tipo, termine, paese = '') {

        const parametri = new URLSearchParams({
            tipo: tipo,
            q: termine,
            paese: paese
        });

        const risposta = await fetch(percorsoAPI + '?' + parametri);

        if (!risposta.ok) {
            throw new Error('Errore nella richiesta');
        }

        return await risposta.json();
    }

    function mostraSuggerimenti(lista, risultati) {

        lista.innerHTML = '';

        risultati.forEach(function(nome) {

            const opzione = document.createElement('option');

            opzione.value = nome;

            lista.appendChild(opzione);
        });
    }

    campoPaese.addEventListener('input', async function() {

        const termine = campoPaese.value.trim();

        if (termine.length < 1) {
            listaPaesi.innerHTML = '';
            return;
        }

        try {
            const risultati = await cerca('paesi', termine);
            window._ultimoRisultatoCitta = risultati;

            mostraSuggerimenti(listaPaesi, risultati);

        } catch (errore) {
            console.error('Errore Paesi:', errore);
        }
    });

    campoCitta.addEventListener('input', async function() {

        const termine = campoCitta.value.trim();

        if (termine.length <= 1) {
            listaCitta.innerHTML = '';
            return;
        }

        try {
            const risultati = await cerca(
                'citta',
                termine,
                campoPaese.value.trim()
            );
            window._ultimoRisultatoCitta = risultati;


            mostraSuggerimenti(listaCitta, risultati);

        } catch (errore) {
            console.error('Errore Città:', errore);
        }
    });

    campoPaese.addEventListener('change', function() {
        campoCitta.value = '';
        listaCitta.innerHTML = '';
        campoCitta.dispatchEvent(new Event('input'));
    });

});
</script>

<?php include 'footer.php'; ?>
<script src="form-validator.js"></script>
<script>
// Avvia la funzione passandogli l'ID del form di questa pagina
document.addEventListener("DOMContentLoaded", function() {
    attivaCampiSequenziali('#form-clienti');
});
</script>