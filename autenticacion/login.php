<?php

echo "<h1>PAGINA DE LOGIN</h1>";

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script defer src="js/login.js"></script>
    <title>Acceso</title>
</head>
<body>
    <form action="api/autenticacion/login.php" method="POST">
        <input type="text" name="usuario" id="usuario" placeholder="Usuario">
        <input type="password" name="password" id="password" placeholder="Contraseña">
        <input type="submit" value="Ingresar">
</body>
</html>