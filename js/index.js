async function inicializarPagina() {
    await hacerFetch();

    const cerrarSesion = document.createElement("button");
    cerrarSesion.classList.add("btn", "button-primary");    
    cerrarSesion.textContent = "Cerrar sesión";
    document.body.appendChild(cerrarSesion);
}

async function hacerFetch() {
    const response = await fetch(`api/empleados.php?token=${sessionStorage.getItem("token")}`, {
        headers: {
            "api-key": sessionStorage.getItem("token")
        }
    });

    const data = await response.json();

    sessionStorage.setItem("rol", data.empleados[0].rol); //Guardamos el rol en el sessionStorage
    sessionStorage.setItem("nombre", data.empleados[0].nombre); //Guardamos el nombre en el sessionStorage
    const h2 = document.createElement("h2")
    h2.textContent = `¡Hola, ${sessionStorage.getItem("nombre")}!`
    document.body.appendChild(h2)

    if (sessionStorage.getItem("rol") == "admin") {
        const enlaceGestEmpl = document.createElement("A");
        enlaceGestEmpl.setAttribute("href", "apiScripts/empleados.html");
        enlaceGestEmpl.textContent = "Gestionar empleados";
        document.body.appendChild(enlaceGestEmpl);
    }
}

inicializarPagina();