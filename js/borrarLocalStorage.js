window.addEventListener('beforeunload', function(event) {
    // Borra todo el almacenamiento local
    localStorage.removeItem('token');
});