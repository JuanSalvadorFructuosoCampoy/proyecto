const contenedor = document.querySelectorAll(".row")[0];
console.log(contenedor)
async function inicializarPagina() {
    await hacerFetch();
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
    contenedor.parentNode.insertBefore(h2, contenedor);

    if (sessionStorage.getItem("rol") == "admin") {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card","m-4","p-1","bg-light");
        tarjeta.style.width = "10rem";
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
    }//href="apiScripts/empleados.html"
}

inicializarPagina();

const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
});