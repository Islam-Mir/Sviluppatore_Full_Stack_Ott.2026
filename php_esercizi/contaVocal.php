<?php

if(isset ($_GET['frase'])) {
    $frase = strtolower($_GET['frase']);

    $vocali = ['a','e','i','o','u'];
    $conta=0;

    for ($i = 0; $i < strlen($frase); $i++) {
        if (in_array ($frase[$i], $vocali)) {
            $conta++ ;
        }
    }

    echo "<p>La frase contiene $conta vocali</p>";
}

?>

<form method='get'>

Inserisci una frase: 
<input type="text" name="frase">
<br>
<input type="submit">

</form>