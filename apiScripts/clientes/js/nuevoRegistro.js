let queryString = window.location.search;
const form = document.querySelector("form");
// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id_cliente');
let nombreCliente = urlParams.get('nombre_cliente');

const h2 = document.querySelector('h2');
h2.childNodes[0].textContent += nombreCliente.toUpperCase();
//Usamos ese parámetro en el fetch para obtener los datos del cliente
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    let registro = document.getElementById('registro').value.trim();
    registro = registro.replaceAll('"',"`");
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const day = String(fechaActual.getDate()).padStart(2, '0');
    const fechaFormateada = `${year}-${month}-${day}`;


    const datosInput = {
        id_cliente: idURL,
        fecha: fechaFormateada,
        evento: registro,
    }

    const jsonDatos = JSON.stringify(datosInput)

    fetch(`${window.location.protocol}//${window.location.host}/api/registro_clientes.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "api-key": sessionStorage.getItem("token")
        },
        body: jsonDatos
    })
        .then(response => response.json())
        .then(data => {

            window.location.href = `registro.html?id=${idURL}`;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', () => {
    window.location.href = `registro.html?id=${idURL}`;
});