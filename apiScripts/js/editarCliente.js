const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        document.getElementById('nombre').value = data['clientes'][0].nombre;
        document.getElementById('id_fiscal').value = data['clientes'][0].id_fiscal;
        document.getElementById('apellido1').value = data['clientes'][0].apellido1;
        document.getElementById('apellido2').value = data['clientes'][0].apellido2;
        document.getElementById('telefono').value = data['clientes'][0].telefono;
        document.getElementById('direccion').value = data['clientes'][0].direccion;

    })
form.addEventListener('submit', (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    let nombre = document.getElementById('nombre').value.trim();
    let id_fiscal = document.getElementById('id_fiscal').value.trim();
    let apellido1 = document.getElementById('apellido1').value.trim();
    let apellido2 = document.getElementById('apellido2').value.trim();
    let telefono = document.getElementById('telefono').value.trim();
    let direccion = document.getElementById('direccion').value.trim();

    const telefonoRegex = /^\d{9}$|^\d{3}\s\d{2}\s\d{2}\s\d{2}$|^\d{3}\s\d{3}\s\d{3}$/;
    if (!telefonoRegex.test(telefono)) {
        const errorMessageElement = document.createElement('p');
        errorMessageElement.textContent = ""
        let errorMessage = "Error en el teléfono. Solamente acepta números y espacios";
        document.getElementById('telefono').value = "";
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.classList.add("text-danger")
        document.getElementById('telefono').insertAdjacentElement('afterend', errorMessageElement);
        return;
    }
    telefono = telefono.replaceAll(" ","");
    id_fiscal = id_fiscal.toUpperCase(); // Reemplazar las minúsculas por mayúsculas
    id_fiscal = id_fiscal.replaceAll(" ",""); // Eliminar espacios
    id_fiscal = id_fiscal.replaceAll("-",""); // Eliminar guiones
    if (!validarDNI(id_fiscal)) {
        const errorMessageElement = document.createElement('p');
        errorMessageElement.textContent = ""
        let errorMessage = "Error en el ID fiscal. El formato debe ser válido.";
        document.getElementById('id_fiscal').value = "";
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.classList.add("text-danger")
        document.getElementById('id_fiscal').insertAdjacentElement('afterend', errorMessageElement);
        return;
    }

    const datosInput = {
        nombre: nombre,
        id_fiscal: id_fiscal.toUpperCase(), // Reemplazar las minúsculas por mayúsculas
        apellido1: apellido1,
        apellido2: apellido2,
        telefono: telefono,
        direccion: direccion
    }

    const jsonDatos = JSON.stringify(datosInput)
    fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${idURL}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "api-key": sessionStorage.getItem("token")
        },
        body: jsonDatos
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = "clientes.html";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    const cancelar = document.getElementById('cancelar');
    cancelar.addEventListener('click', () => {
        window.location.href = "clientes.html";
    });

    function validarDNI(dni) {
        const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        if (!dniRegex.test(dni)) {
            return false;
        }
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const letraDNI = dni.charAt(dni.length - 1).toUpperCase();
            const numerosDNI = parseInt(dni.substring(0, dni.length - 1));

            const letraCalculada = letras.charAt(numerosDNI % 23);

            return letraDNI == letraCalculada;
        }