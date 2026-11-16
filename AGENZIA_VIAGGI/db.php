<?php
$host = 'localhost';
$user = 'root';
$pass = ''; 
$db = 'agenzia_viaggi';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
?>
