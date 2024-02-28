let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');
let nombreCliente = urlParams.get('nombre_cliente');

console.log(nombreCliente)
const h2 = document.querySelector('h2');
h2.childNodes[0].textContent += nombreCliente.toUpperCase();
//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/registro_clientes.php?id_cliente=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {


    })

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})