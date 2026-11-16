
<?php

if (isset($_GET['testo'])) {

    $originale  = strtolower($_GET['testo']); //testo originale

    $invertita = strtolower(strrev($originale));

    echo "<p>La parola inserita è : $originale</p>";
    echo "<p>La parola invertita é: $invertita</p>";

    if ($originale===$invertita) {
        echo "<p>La stringa è palidromo</p>";
    } else {
        echo "<p>La stringa NON è palidromo</p>";
    }

    

}


?>



<form method='get'>
    Inserisci una parola : 
    <input type="text" name="testo">
    <input type="submit" >

</form>    