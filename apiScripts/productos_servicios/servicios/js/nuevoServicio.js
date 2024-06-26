/**
 * Script para añadir un servicio a la base de datos
 */
const form = document.getElementsByTagName('form')[0];
document.getElementById('nombre').focus();
//Evento para enviar el formulario
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();
    let nombre = document.getElementById('nombre').value.trim();
    let precio = document.getElementById('precio').value.trim();
    
    const datosInput = {
        nombre: nombre,
        precio: precio,
    }

    const jsonDatos = JSON.stringify(datosInput)
    //Enviamos los datos a la base de datos para que se añada el servicio
    fetch(`${window.location.protocol}//${window.location.host}/api/servicios.php`, {
        method: 'POST',
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