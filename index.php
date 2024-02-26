<?php
if(!isset($_SESSION['token'])){
    //header('autenticacion/login.php');
    echo "<h1>SIN AUTENTICAR</h1>";
}else{
?>
<h1>INICIO DE LA APP</h1>
<?php
}
?>