/**
 * Script para editar un servicio existente en la base de datos
 */
const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

document.getElementById('precio').focus();

//Usamos ese parámetro en el fetch para obtener los datos del empleado
fetch(`${window.location.protocol}//${window.location.host}/api/servicios.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        document.getElementById('nombre').value = data['servicios'][0].nombre;
        if (data['servicios'][0].precio == "No definido") {
            document.getElementById('precio').value = 0;
        } else {
            document.getElementById('precio').value = data['servicios'][0].precio;
        }
    })

//Evento para enviar el formulario
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;

    const datosInput = {
        nombre: nombre,
        precio: precio
    }

    const jsonDatos = JSON.stringify(datosInput)
    //Enviamos los datos a la base de datos para que se actualicen los datos del servicio
    fetch(`${window.location.protocol}//${window.location.host}/api/servicios.php?id=${idURL}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "api-key": sessionStorage.getItem("token")
        },
        body: jsonDatos
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = "servicios.html";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

//Botón para cancelar
const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', () => {
    window.location.href = "servicios.html";
});

//Botón para volver al inicio
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../../index.html"
})

