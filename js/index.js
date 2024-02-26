fetch("api/empleados.php", {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
.then(response => response.json())
.then(data => {
    if(data.empleados[0].rol == "admin"){
        const enlaceGestEmpl = document.createElement("A");
        enlaceGestEmpl.setAttribute("href", "apiScripts/empleados.html");
        enlaceGestEmpl.textContent = "Gestionar empleados";
        document.body.appendChild(enlaceGestEmpl);
    }
})