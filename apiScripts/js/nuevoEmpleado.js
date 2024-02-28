const form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    const mensajesError = document.querySelectorAll('.text-danger');
    mensajesError.forEach(mensaje => mensaje.remove());
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
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

    const hashedPassword = await hashInput(password);
    
    const datosInput = {
        nombre: nombre,
        apellidos: apellidos,
        password: hashedPassword,
        rol: rol,
        activo: "0"
    }

    const jsonDatos = JSON.stringify(datosInput)
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
            console.log('Éxito:', data);
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

//Esta función se encarga de hashear la contraseña que el usuario introduce en el formulario
async function hashInput(input) {
    const msgUint8 = new TextEncoder().encode(input);                                  
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);                
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}

