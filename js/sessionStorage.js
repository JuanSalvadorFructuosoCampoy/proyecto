/**
 * Script para verificar la existencia de un token en el sessionStorage y, por lo tanto, verificar si el usuario está autenticado antes de acceder a la página
 */

// Función para hacer el fetch al servidor y verificar si el usuario está autenticado
function hacerFetch() {
    fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php?token=${sessionStorage.getItem("token")}`, {
        headers: {
            "api-key": sessionStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data => {
    sessionStorage.setItem("activo", data.empleados[0].activo); //Guardamos el estado de activo en el sessionStorage
        if(sessionStorage.getItem('activo')== 0){
            // Guarda el protocolo de la URL actual (http o https)
    var protocol = window.location.protocol;
    // Guarda el host de la URL actual (dominio y puerto)
    var host = window.location.host;
    // Redirige a la página de inicio de sesión concatenando el protocolo, el host y la ruta de la página de inicio de sesión
    window.location.href = protocol + "//" + host + "/autenticacion/login.html";
        
        }
})
}
hacerFetch();

// Si el token no existe o el usuario está inactivo, redirige a la página de inicio de sesión
if(sessionStorage.getItem('token') == null){
    // Guarda el protocolo de la URL actual (http o https)
    var protocol = window.location.protocol;
    // Guarda el host de la URL actual (dominio y puerto)
    var host = window.location.host;
    // Redirige a la página de inicio de sesión concatenando el protocolo, el host y la ruta de la página de inicio de sesión
    window.location.href = protocol + "//" + host + "/autenticacion/login.html";
}