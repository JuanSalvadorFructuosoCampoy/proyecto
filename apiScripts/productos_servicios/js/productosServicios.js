/**
 * Este script se encarga de cargar los productos y servicios de la base de datos y mostrarlos en la página.
 */
const contenedor = document.querySelectorAll(".row")[0];
//Obtenemos los productos y servicios de la base de datos
contenedor.addEventListener("click", (e) => {
    const tarjeta = e.target.closest(".card");//Si el elemento clickeado es un hijo de un elemento con la clase card, se selecciona
    if (tarjeta) {//Si se seleccionó una tarjeta
        window.location.href = `${tarjeta.id}/${tarjeta.id}.html`;
    }
});

//Obtenemos los productos y servicios de la base de datos
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "start-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})