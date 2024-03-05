/**
 * Script para editar un registro de cliente en la base de datos
 */
let queryString = window.location.search;
const form = document.querySelector("form");
// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');
let idCliente = urlParams.get('id_cliente');
let nombreCliente = urlParams.get('nombre_cliente');
const h2 = document.querySelector('h2');
h2.childNodes[0].textContent += nombreCliente.toUpperCase();
document.getElementById('registro').focus();
//Usamos ese parámetro en el fetch para obtener los datos del registro del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/registro_clientes.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})
    .then(response => response.json())
    .then(data => {
        document.getElementById('registro').value = data['registros'][0].evento;
    })
/**
 * Evento para enviar el formulario
 */
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();
    let registro = document.getElementById('registro').value.trim();
    registro = registro.replaceAll('"', "`");

    const datosInput = {
        evento: registro,
    }

    const jsonDatos = JSON.stringify(datosInput)
    //Enviamos los datos a la API
    fetch(`${window.location.protocol}//${window.location.host}/api/registro_clientes.php?id=${idURL}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "api-key": sessionStorage.getItem("token")
        },
        body: jsonDatos
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = `registro.html?id=${idCliente}`;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

/**
 * Botón para volver al inicio
 */
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

/**
 * Botón para cancelar la edición del registro
 */
const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', () => {
    window.location.href = `registro.html?id=${idCliente}`;
});