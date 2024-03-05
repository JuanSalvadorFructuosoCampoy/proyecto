/**
 * Script para editar una cita
 */
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora');
const cita = document.getElementById('cita');

let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/agenda.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})
    .then(response => response.json())
    .then(data => {
        fecha.value = data['agendas'][0].fecha;
        hora.value = data['agendas'][0].hora.slice(0, 5);
        cita.value = data['agendas'][0].cita;
    });

//Enfocar el campo de fecha al cargar la página
fecha.focus()

//Creamos el formulario
const form = document.querySelector('form');
const fechaActual = new Date();
const year = fechaActual.getFullYear();
const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
const day = String(fechaActual.getDate()).padStart(2, '0');
const fechaFormateada = `${year}-${month}-${day}`;

//No se pueden editar citas antes que la fecha actual
fecha.setAttribute('min', fechaFormateada);

/**
 * Evento para enviar el formulario
 */
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fechaValue = fecha.value;
    const horaValue = hora.value;
    const citaValue = cita.value;

    fetch(`${window.location.protocol}//${window.location.host}/api/agenda.php?id=${idURL}`, {
        method: 'PUT',
        headers: {
            "api-key": sessionStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fecha: fechaValue,
            hora: horaValue,
            cita: citaValue
        })
    })
        .then(() => {
            window.location.href = "agenda.html";
        })
        .catch((error) => {
            console.error(error);
        });


});

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../index.html"
})

const botonCancelar = document.getElementById('cancelar');
botonCancelar.addEventListener('click', () => {
    window.location.href = "agenda.html";
});

