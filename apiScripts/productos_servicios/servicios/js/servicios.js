const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../../index.html"
})

const botonProdYServ = document.createElement("button")
botonProdYServ.textContent = "Productos y Servicios"
botonProdYServ.classList.add("btn", "btn-info", "position-fixed", "bottom-0", "start-0", "m-3")
botonProdYServ.setAttribute("id", "volver")
document.body.appendChild(botonProdYServ)
botonProdYServ.addEventListener("click", () => {
    window.location.href = "../productos_servicios.html"
})