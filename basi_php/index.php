<?php

//commento inline

/*
 * 
 * commenti
 * su 
 * piu 
 * linee
 * 
 * 
 */
//dichiarazione di una variabile
$nome = "Luca";  // string 

$eta = 35; // int

$eta = 40; // il valore della variabile viene ridefinita perchè sta "sotto"

//echo "ciao $nome , hai $eta anni";

//var_dump($eta);
//var_dump($nome);

?>


<?php 

//dichiarazione di una costante

//define("tassa_stato", 500);

//define("inps", 300);

//echo tassa_stato;

//echo inps;

$array = ['pippo', 'pluto'];

//echo $array[0];
//echo $array[1];


//string -> "parola"
//int -> numero intero
//float -> numero decimale
//bool -> booleano true false
//arr[] -> array

//il console.log() di Js è il var_dump($variabile)

//var_dump($array);



?>

<?php  

    //if else

    $numero = 5;

    if($numero > 0){

        //echo "positivo";
    }else{

        echo "negativo";
    }


?>


<?php

    //costrutto switch/case/break/default 
    //è uguale al costrutto if-else 
    //viene utilizzato per evitare troppi if else

    $cottura = "areato";

    switch($cottura){

        case "statico":

            //echo "hai scelto statico";
            break;

        case "grill":
            //echo "hai scelto grill";
            break;

        case "ventilato":
            //echo "hai scelto ventilato";
            break;

        default :
            //echo "nussuna cottura selezionata";

    }
?>

<?php  


    for($i = 0; $i < 10; $i++){

            //echo "Questo è il numero dell array:  $i <br>";

    }
    

?>


<?php

    //echo "<h3>Nomi : </h3>";

    $nomi = ['diego', 'luca', 'andrea'];

    foreach($nomi as $nome){

        echo "$nome <br>";

    }

?>


<?php

    //dichiarazione di funzione
    function saluta($x){

        return "ciao $x";

    }

    
    echo saluta("diego"); 
    echo saluta("luca");



?>

<?php

    function somma($x, $y){

        return $x + $y;

    }

    echo somma(10, 20);
    
?>