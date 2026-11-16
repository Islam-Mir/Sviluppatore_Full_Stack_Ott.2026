<?php
include 'db.php';

// PAGINAZIONE
$perPagina = 10;
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$offset = ($page - 1) * $perPagina;

// FILTRI
$nome_cliente = $_GET['nome_cliente'] ?? '';
$paese = $_GET['paese'] ?? '';
$citta = $_GET['citta'] ?? '';
$prezzo_max = $_GET['prezzo_max'] ?? '';
$data = $_GET['data'] ?? '';
$persone = $_GET['num_persone'] ?? '';

// COSTRUZIONE QUERY
$where = "WHERE 1=1";
$params = [];
$types = '';

if ($nome_cliente !== '') {
  $where .= " AND (c.nome LIKE ? OR c.cognome LIKE ?)";
  $params[] = "%$nome_cliente%";
  $params[] = "%$nome_cliente%";
  $types .= 'ss';
}
if ($paese !== '') {
  $where .= " AND d.paese LIKE ?";
  $params[] = "%$paese%";
  $types .= 's';
}
if ($citta !== '') {
  $where .= " AND d.citta LIKE ?";
  $params[] = "%$citta%";
  $types .= 's';
}
if ($prezzo_max !== '') {
  $where .= " AND d.prezzo <= ?";
  $params[] = floatval($prezzo_max);
  $types .= 'd';
}
if ($data !== '') {
  $where .= " AND ? BETWEEN p.data_prenotazione_inizio AND p.data_prenotazione_fine";
  $params[] = $data;
  $types .= 's';
}
if ($persone !== '') {
  $where .= " AND p.num_persone = ?";
  $params[] = intval($persone);
  $types .= 'i';
}

// EXPORT CSV
if (isset($_GET['action']) && $_GET['action'] === 'export_csv') {
  header('Content-Type: text/csv');
  header('Content-Disposition: attachment; filename="prenotazioni.csv"');

 // Sostituito p.data_prenotazione con i due nuovi campi inizio e fine
$stmt = $conn->prepare("
  SELECT p.id, c.nome, c.cognome, d.citta, d.paese, p.data_prenotazione_inizio, p.data_prenotazione_fine, p.num_persone
  FROM prenotazioni p
  JOIN clienti c ON p.id_cliente = c.id
  JOIN destinazioni d ON p.id_destinazione = d.id
  $where
");  // (Mantieni il tuo WHERE o i tuoi parametri correnti invariati dopo il JOIN)

  if ($types !== '') $stmt->bind_param($types, ...$params);
  $stmt->execute();
  $res = $stmt->get_result();
  $f = fopen('php://output','w');
  $first = true;
  while ($row = $res->fetch_assoc()) {
    if ($first) { fputcsv($f, array_keys($row)); $first = false; }
    fputcsv($f, array_values($row));
  }
  exit;
}

// CONTEGGIO TOTALE
$stmt = $conn->prepare("SELECT COUNT(*) as total
  FROM prenotazioni p
  JOIN clienti c ON p.id_cliente = c.id
  JOIN destinazioni d ON p.id_destinazione = d.id
  $where");
if ($types !== '') $stmt->bind_param($types, ...$params);
$stmt->execute();
$total = $stmt->get_result()->fetch_assoc()['total'];
$totalPages = ceil($total / $perPagina);

// RISULTATI PAGINATI
$stmt = $conn->prepare("SELECT p.id, c.nome, c.cognome, d.citta, d.paese, d.prezzo, p.data_prenotazione_inizio, p.data_prenotazione_fine,  p.num_persone 
  FROM prenotazioni p
  JOIN clienti c ON p.id_cliente = c.id
  JOIN destinazioni d ON p.id_destinazione = d.id
  $where ORDER BY p.id DESC LIMIT ? OFFSET ?");
$params[] = $perPagina;
$params[] = $offset;
$types .= 'ii';
$stmt->bind_param($types, ...$params);
$stmt->execute();
$results = $stmt->get_result();
?>

<?php include 'header.php'; ?>

<h2>Ricerca Prenotazioni</h2>

<form method="GET" class="row g-2 mb-4" id="form-ricerca-prenotazioni">
    <div class="col-md-2"><input type="text" name="nome_cliente" id="ricerca_cliente"
            value="<?= htmlspecialchars($nome_cliente) ?>" class="form-control" placeholder="Cliente"></div>
    <div class="col-md-2"><input type="text" name="paese" id="ricerca_paese" value="<?= htmlspecialchars($paese) ?>"
            class="form-control" placeholder="Paese"></div>
    <div class="col-md-2"><input type="text" name="citta" id="ricerca_citta" value="<?= htmlspecialchars($citta) ?>"
            class="form-control" placeholder="Città"></div>
    <div class="col-md-2"><input type="number" name="prezzo_max" id="ricerca_prezzo" step="1" min="1"
            value="<?= htmlspecialchars($prezzo_max) ?>" class="form-control" placeholder="Prezzo max €"></div>
    <div class="col-md-2"><input type="date" name="data" id="ricerca_data" value="<?= htmlspecialchars($data) ?>"
            class="form-control">
    </div>
    <div class="col-md-2"><input type="number" name="num_persone" id="ricerca_persone" min="1"
            value="<?= htmlspecialchars($persone) ?>" class="form-control" placeholder="N. persone"></div>
    <div class="col-12 d-flex justify-content-between mt-2">
        <button class="btn btn-primary">Cerca</button>
        <a class="btn btn-outline-success"
            href="ricerca.php?<?= http_build_query(array_merge($_GET, ['action' => 'export_csv'])) ?>">Esporta CSV</a>
    </div>
</form>

<?php if ($results && $results->num_rows > 0): ?>
<table class="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Città</th>
            <th>Paese</th>
            <th>Prezzo</th>
            <th>Data Inizio</th>
            <th>Data Fine</th>
            <th>Persone</th>
        </tr>
    </thead>
    <tbody>
        <?php while($r = $results->fetch_assoc()): ?>
        <tr>
            <td><?= $r['id'] ?></td>
            <td><?= $r['nome'] ?> <?= $r['cognome'] ?></td>
            <td><?= $r['citta'] ?></td>
            <td><?= $r['paese'] ?></td>
            <td><?= $r['prezzo'] ?> €</td>
            <td><?= $r['data_prenotazione_inizio'] ?></td>
            <td><?= $r['data_prenotazione_fine'] ?></td>
            <td><?= $r['num_persone'] ?></td>
        </tr>
        <?php endwhile; ?>
    </tbody>
</table>

<!-- PAGINAZIONE -->
<nav>
    <ul class="pagination">
        <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <li class="page-item <?= $i === $page ? 'active' : '' ?>">
            <a class="page-link" href="?<?= http_build_query(array_merge($_GET, ['page' => $i])) ?>"><?= $i ?></a>
        </li>
        <?php endfor; ?>
    </ul>
</nav>

<?php else: ?>
<p class="text-muted">Nessun risultato trovato.</p>
<?php endif; ?>

<script src="form-validator.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    // Attiva la logica di filtro incrociato sul form di ricerca
    gestisciFiltriInterconnessi('#form-ricerca-prenotazioni');
});
</script>


<?php include 'footer.php'; ?>