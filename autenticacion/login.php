<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script defer src="js/borrarLocalStorage.js"></script>
    <script defer src="js/login.js"></script>
    <title>Acceso</title>
</head>
<body>
    <h1>LOGIN</h1>
    <form action="auth.php" method="POST">
        <input type="text" name="user" id="user" placeholder="Usuario"><br>
        <input type="password" name="password" id="password" placeholder="Contraseña"><br>
        <input type="submit" id="enviar" value="Ingresar">
    </form>
</body>
</html>