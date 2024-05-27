/**
 * Script para cambiar la contraseña de un empleado
 */
const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

const h2 = document.querySelector('h2');
document.getElementById('password').focus();

//Usamos ese parámetro en el fetch para obtener los datos del empleado
fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        h2.childNodes[0].textContent += data['empleados'][0].nombre.toUpperCase();

    })

//Evento para enviar el formulario
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    const mensajesError = document.querySelectorAll('.text-danger');
    mensajesError.forEach(mensaje => mensaje.remove());
    const password = document.getElementById('password').value.trim();
    const password2 = document.getElementById('password2').value.trim();

    // Validar contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        const errorMessageElement = document.createElement('p');
        errorMessageElement.textContent = ""
        let errorMessage = "Error en la contraseña.";

        if (!/(?=.*[a-z])/.test(password)) {
            errorMessage += " No contiene una minúscula.";
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errorMessage += " No contiene una mayúscula.";
        }
        if (!/(?=.*\d)/.test(password)) {
            errorMessage += " No contiene un número.";
        }
        if (password.length < 8) {
            errorMessage += " La contraseña debe tener al menos 8 caracteres.";
        }
        document.getElementById('password').value = "";
        document.getElementById('password2').value = "";
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.classList.add("text-danger")
        document.getElementById('password2').insertAdjacentElement('afterend', errorMessageElement);
        return;
    }
    // Validar que las contraseñas coincidan
    if (password !== password2) {
        let errorMessage = "Las contraseñas no coinciden";
        const errorMessageElement = document.createElement('p');
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.classList.add("text-danger")
        document.getElementById('password2').insertAdjacentElement('afterend', errorMessageElement);
        document.getElementById('password').value = "";
        document.getElementById('password2').value = "";
        return;
    }

    //Hasheamos la contraseña
    const hashedPassword = await hashInput(password);

    const datosInput = {
        password: hashedPassword,
    }

    //Enviamos los datos a la API para que se actualice la contraseña del empleado en la base de datos
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

//Botón para cancelar
const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', () => {
    window.location.href = "empleados.html";
});

//Esta función se encarga de hashear la contraseña que el usuario introduce en el formulario
async function hashInput(input) {
    // Calcular el hash de la contraseña
    let hash = CryptoJS.SHA256(input);
    // Convertir el hash a una cadena hexadecimal
    let hashHex = hash.toString(CryptoJS.enc.Hex);
    return hashHex;
}

//Botón para volver al inicio
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})
