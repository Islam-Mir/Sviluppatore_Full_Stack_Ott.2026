<?php

    //chiedo un username e una password all utente
    //se entrambi sono corretti, stampo una frase "accesso consentito"
    //se non corrispondono "credenziali errate"

    if(isset($_GET['username'], $_GET['password'])){

        $user = $_GET['username'];
        $pwd = $_GET['password'];

        //hardcoded user e credenziali
        $user_valido = "admin";
        $pwd_valida = "123qweasdzxc";

        if($user === $user_valido && $pwd === $pwd_valida){

            header("location: dashboard.php");

        }else{

            header("location: exit.php");
        }

    }

?>

<form method='get'>

    UserName : <input type="text" name='username'>
    Password : <input type="password" name='password'>
    <input type="submit">

</form>