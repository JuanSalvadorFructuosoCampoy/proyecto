/**
 * Script para añadir un empleado
 */
const form = document.getElementsByTagName('form')[0];
document.getElementById('nombre').focus();

//Evento para enviar el formulario
form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    const mensajesError = document.querySelectorAll('.text-danger');
    mensajesError.forEach(mensaje => mensaje.remove());
    const nombre = document.getElementById('nombre').value.trim();
    const apellido1 = document.getElementById('apellido1').value.trim();
    const apellido2 = document.getElementById('apellido2').value.trim();
    const rol = document.getElementById('rol').value;
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
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        password: hashedPassword,
        rol: rol,
        activo: "0"
    }
    // Validar que no exista un empleado con el mismo nombre
    let empleadosNombres = [];
    const jsonDatos = JSON.stringify(datosInput)
    fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php`, {
        headers: {
            "api-key": sessionStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            data.empleados.forEach(empleado => {
                empleadosNombres = data.empleados.map(empleado => empleado.nombre);
            })  
            if(empleadosNombres.includes(nombre)){
                const errorMessageElement = document.createElement('p');
                errorMessageElement.textContent = "Ya existe un empleado con ese nombre";
                errorMessageElement.classList.add("text-danger")
                document.getElementById('nombre').insertAdjacentElement('afterend', errorMessageElement);
                return;
            }else{
                fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php`, {
                    method: 'POST',
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
                }
        })
    })
        


//Botón para cancelar
const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', () => {
    window.location.href = "empleados.html";
});

// Esta función se encarga de hashear la contraseña que el usuario introduce en el formulario
function hashInput(input) {
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