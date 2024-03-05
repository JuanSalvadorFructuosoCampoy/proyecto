/**
 * Script para añadir un nuevo producto a la base de datos
 */
const form = document.getElementsByTagName('form')[0];
document.getElementById('nombre').focus();
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();
    let nombre = document.getElementById('nombre').value.trim();
    let precio = document.getElementById('precio').value.trim();
    let stock = document.getElementById('stock').value.trim();

    const datosInput = {
        nombre: nombre,
        precio: precio,
        stock: stock
    }

    //Enviamos los datos a la API para que se añada el producto a la base de datos
    const jsonDatos = JSON.stringify(datosInput)
    fetch(`${window.location.protocol}//${window.location.host}/api/productos.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "api-key": sessionStorage.getItem("token")
        },
        body: jsonDatos
    })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            window.location.href = "productos.html";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

//Botón para cancelar el formulario
const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', () => {
    window.location.href = "productos.html";
});

//Esta función se encarga de hashear la contraseña que el usuario introduce en el formulario
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../../index.html"
})