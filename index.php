<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script defer src="js/borrarLocalStorage.js"></script>
    <script defer src="js/index.js"></script>
    <title>Inicio</title>
</head>
<body>
<script>
    if(localStorage.getItem('token') === null){
    window.location.href = 'autenticacion/login.php';
}
</script>
<h1>INICIO DE LA APP</h1>
</body>
</html>

