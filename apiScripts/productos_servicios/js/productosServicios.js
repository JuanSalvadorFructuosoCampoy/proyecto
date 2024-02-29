const contenedor = document.querySelectorAll(".row")[0];

contenedor.addEventListener("click", (e) => {
    const tarjeta = e.target.closest(".card");//Si el elemento clickeado es un hijo de un elemento con la clase card, se selecciona
    if (tarjeta) {//Si se seleccionó una tarjeta
        window.location.href = `${tarjeta.id}/${tarjeta.id}.html`;
    }
});

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})