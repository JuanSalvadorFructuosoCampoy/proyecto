// Objetivo: verificar si el usuario está autenticado antes de acceder a la página

if(sessionStorage.getItem('token') == null){
    window.location.href = 'autenticacion/login.html';
}