// Objetivo: verificar si el usuario está autenticado antes de acceder a la página

if(sessionStorage.getItem('token') == null){
    // Guarda el protocolo de la URL actual (http o https)
    var protocol = window.location.protocol;
    // Guarda el host de la URL actual (dominio y puerto)
    var host = window.location.host;
    // Redirige a la página de inicio de sesión concatenando el protocolo, el host y la ruta de la página de inicio de sesión
    window.location.href = protocol + "//" + host + "/autenticacion/login.html";
}