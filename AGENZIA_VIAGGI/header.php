<?php
if (isset($_GET['action']) && $_GET['action'] === 'export_csv') {
  header('Content-Type: text/csv');
  header('Content-Disposition: attachment; filename="ricerca.csv"');
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
?>



<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Agenzia Viaggi</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #0081a7;">
  <div class="container-fluid">
    
    <!-- Logo + Brand -->
    <a class="navbar-brand d-flex align-items-center" href="index.php">
    <img src="logo.png" alt="Logo" style="height: 50px; width: auto;" class="me-2">
        Agenzia Viaggi
    </a>

    <!-- Bottone hamburger -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Link del menu -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="navbar-nav ms-auto">
        <a class="nav-link" href="clienti.php">Clienti</a>
        <a class="nav-link" href="destinazioni.php">Destinazioni</a>
        <a class="nav-link" href="prenotazioni.php">Prenotazioni</a>
        <a class="nav-link" href="ricerca.php">Ricerca</a>
        <a class="nav-link" href="statistiche.php">Statistiche</a>
      </div>
    </div>
  </div>
</nav>

<main class="container mt-4">
