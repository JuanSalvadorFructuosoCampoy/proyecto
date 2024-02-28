const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

//Usamos ese parámetro en el fetch para obtener los datos del empleado
fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        console.log(data['empleados'][0])
        document.getElementById('nombre').value = data['empleados'][0].nombre;
        document.getElementById('apellidos').value = data['empleados'][0].apellidos;
        document.getElementById('rol').value = data['empleados'][0].rol;
        if(document.getElementsByTagName('option').value == data['empleados'][0].rol){
            document.getElementsByTagName('option').selected = true;
        }

    })
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const rol = document.getElementById('rol').value;

    
    const datosInput = {
        nombre: nombre,
        apellidos: apellidos,
        rol: rol,
        activo: "1"
    }

    const jsonDatos = JSON.stringify(datosInput)
    fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php?id=${idURL}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "api-key": sessionStorage.getItem("token")
        },
        body: jsonDatos
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = "empleados.html";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', () => {
    window.location.href = "empleados.html";
});

