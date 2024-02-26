<?php
if(!isset($_SESSION['token'])){
    header('Location: autenticacion/login.php');
    exit;
}else{
?>
<h1>INICIO DE LA APP</h1>
<?php
}
?>