const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

//Usamos ese parámetro en el fetch para obtener los datos del empleado
fetch(`${window.location.protocol}//${window.location.host}/api/productos.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        document.getElementById('nombre').value = data['productos'][0].nombre;
        if(data['productos'][0].precio == "No definido"){
            document.getElementById('precio').value = 0;
        }else{
            document.getElementById('precio').value = data['productos'][0].precio;
        }
        document.getElementById('stock').value = data['productos'][0].stock;
    })
    document.getElementById('nombre').focus();
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    
    const datosInput = {
        nombre: nombre,
        precio: precio,
        stock: stock
    }

    const jsonDatos = JSON.stringify(datosInput)
    fetch(`${window.location.protocol}//${window.location.host}/api/productos.php?id=${idURL}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "api-key": sessionStorage.getItem("token")
        },
        body: jsonDatos
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = "productos.html";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', () => {
    window.location.href = "productos.html";
});

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../../index.html"
})

