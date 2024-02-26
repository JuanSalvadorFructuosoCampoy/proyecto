<?php
if(!isset($_SESSION['token'])){
    header('autenticacion/login.php');
}
?>
<h1>INICIO DE LA APP</h1>