<?php

require_once __DIR__ . '/helpers/auth.php';

requireLogin();

$user = currentUser();

include 'header.php';
?>

<main class="mainDashboard">
    <section class="bg_personal min-vh-100 py-5">
       <a href="logout.php" class="btn btn-outline-warning">
        <i class="fas fa-sign-out-alt"></i> Logout
       </a>
    </section>               
</main>

<?php include 'footer.php' ?>