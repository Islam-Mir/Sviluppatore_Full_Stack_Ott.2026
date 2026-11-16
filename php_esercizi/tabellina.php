<?php

if (isset ( $_GET['numero'])) {

    $n=$_GET['numero'];

    for ($i=1; $i<=10; $i++) {
       

        echo "$n*$i = ".($n*$i)."<br>";
    }
}

?>

<form method="">
    Inserisci un numero: 
    <input type="number" name="numero"><br>
    <input type="submit">
</form>    