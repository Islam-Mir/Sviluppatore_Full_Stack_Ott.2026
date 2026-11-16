<?php

if(isset($_GET['num1'], $_GET['num2'], $_GET['num3'])) {
    $n1 = $_GET['num1'];
    $n2 = $_GET['num2'];
    $n3 = $_GET['num3'];

    $somma=$n1+$n2+$n3;
    $media=$somma/3;


echo "<p>La somma dei numeri è: $somma</p>";
echo "<p>La media dei numeri è: $media</p>";
}
?>

<form method="">
Inserisci primo numero: <input type="number" name="num1"><br>
Inserisci secondo numero: <input type="number" name="num2"><br>
Inserisci terzo numero: <input type="number" name="num3"><br>
<input type="submit"> 
</form>