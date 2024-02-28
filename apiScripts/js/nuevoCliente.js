const form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    const mensajesError = document.querySelectorAll('.text-danger');
    mensajesError.forEach(mensaje => mensaje.remove());
    let nombre = document.getElementById('nombre').value.trim();
    let id_fiscal = document.getElementById('id_fiscal').value.trim();
    let apellido1 = document.getElementById('apellido1').value.trim();
    let apellido2 = document.getElementById('apellido2').value.trim();
    let telefono = document.getElementById('telefono').value.trim();
    let direccion = document.getElementById('direccion').value.trim();

    // Validar contraseña
    const telefonoRegex = /^\d{9}$|^\d{3}\s\d{2}\s\d{2}\s\d{2}$|^\d{3}\s\d{3}\s\d{3}$/;
    if (!telefonoRegex.test(telefono)) {
        const errorMessageElement = document.createElement('p');
        errorMessageElement.textContent = ""
        let errorMessage = "Error en el teléfono. Solamente acepta números y espacios";
        document.getElementById('telefono').value = "";
        document.getElementById('telefono').value = "";
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.classList.add("text-danger")
        document.getElementById('telefono').insertAdjacentElement('afterend', errorMessageElement);
        return;
    }
    telefono = telefono.replaceAll(" ","");

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
        id_fiscal: id_fiscal,
        apellido1: apellido1,
        apellido2: apellido2,
        telefono: telefono,
        direccion: direccion
    }

    const jsonDatos = JSON.stringify(datosInput)
    fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php`, {
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