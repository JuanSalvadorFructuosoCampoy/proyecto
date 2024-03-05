/**
 * Verifica si el usuario es admin para poder acceder al recurso solicitado. Si no es así, lo devuelve al index.
 */
if(sessionStorage.getItem("rol")!= "admin"){
    window.location.href = "/index.html";
}

