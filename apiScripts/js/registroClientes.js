const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

const h2 = document.querySelector('h2');

//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        h2.childNodes[0].textContent += data['clientes'][0].nombre.toUpperCase();
    })


const botonClientes = document.createElement("button")
botonClientes.textContent = "Clientes"
botonClientes.classList.add("btn", "btn-info", "position-fixed", "bottom-0", "start-0", "m-3")
botonClientes.setAttribute("id", "volver")
document.body.appendChild(botonClientes)
botonClientes.addEventListener("click", () => {
    window.location.href = "clientes.html"
})

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})