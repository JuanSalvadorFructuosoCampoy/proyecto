fetch(`api/empleados.php?token=${sessionStorage.getItem("token")}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
.then(response => response.json())
.then(data => {
    sessionStorage.setItem("rol", data.empleados[0].rol);
    if(data.empleados[0].rol == "admin"){
        const enlaceGestEmpl = document.createElement("A");
        enlaceGestEmpl.setAttribute("href", "apiScripts/empleados.html");
        enlaceGestEmpl.textContent = "Gestionar empleados";
        document.body.appendChild(enlaceGestEmpl);
    }
})