/**
 * Script para la página principal del sistema
 */
const contenedor = document.querySelectorAll(".row")[0];
async function inicializarPagina() {
    await hacerFetch();
}

// Función para hacer el fetch al servidor
async function hacerFetch() {
    const response = await fetch(`api/empleados.php?token=${sessionStorage.getItem("token")}`, {
        headers: {
            "api-key": sessionStorage.getItem("token")
        }
    });

    const data = await response.json();
    sessionStorage.setItem("rol", data.empleados[0].rol); //Guardamos el rol en el sessionStorage
    sessionStorage.setItem("nombre", data.empleados[0].nombre); //Guardamos el nombre en el sessionStorage
    sessionStorage.setItem("id", data.empleados[0].id); //Guardamos el id en el sessionStorage
    sessionStorage.setItem("activo", data.empleados[0].activo); //Guardamos el estado de activo en el sessionStorage
    const h2 = document.createElement("h2")
    const strong = document.createElement("strong")
    strong.textContent = `¡Hola, ${sessionStorage.getItem("nombre")}!`
    h2.appendChild(strong);
    contenedor.parentNode.insertBefore(h2, contenedor);
    // Si el usuario es un empleado, se ocultan las tarjetas de empleados
    if (sessionStorage.getItem("rol") == "admin") {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card","m-4","p-1","bg-light");
        tarjeta.style.width = "10rem";
        tarjeta.setAttribute("id", "empleados");
        contenedor.appendChild(tarjeta);
        const imagen = document.createElement("img");
        imagen.classList.add("card-img-top");
        imagen.setAttribute("src", "../images/empleados.png");
        imagen.setAttribute("alt", "Empleados");
        tarjeta.appendChild(imagen);
        const tarjetaCuerpo = document.createElement("div");
        tarjetaCuerpo.classList.add("card-body");
        tarjeta.appendChild(tarjetaCuerpo);
        const titulo = document.createElement("h5");
        titulo.classList.add("card-title","text-center");
        titulo.textContent = 'Empleados';
        tarjetaCuerpo.appendChild(titulo);
    }
}
//Función para inicializar la página
inicializarPagina();

// Evento para cerrar sesión
const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "../autenticacion/login.html";
});

// Evento para redirigir a la página de empleados
contenedor.addEventListener("click", (e) => {
    const tarjeta = e.target.closest(".card");//Si el elemento clickeado es un hijo de un elemento con la clase card, se selecciona
    if (tarjeta) {//Si se seleccionó una tarjeta
        window.location.href = `apiScripts/${tarjeta.id}/${tarjeta.id}.html`;
    }
});