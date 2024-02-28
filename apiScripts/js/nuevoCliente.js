const form = document.getElementsByTagName('form')[0];
const errorMessageElementTelefono = document.createElement('p');
document.getElementById('telefono').insertAdjacentElement('afterend', errorMessageElementTelefono);
const errorMessageElementIdFiscal = document.createElement('p');
document.getElementById('id_fiscal').insertAdjacentElement('afterend', errorMessageElementIdFiscal);

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
        errorMessageElementTelefono.textContent = ""
        let errorMessage = "Error en el teléfono. Solamente acepta números y espacios";
        errorMessageElementTelefono.textContent = errorMessage;
        errorMessageElementTelefono.classList.add("text-danger")
        return;
    }
    telefono = telefono.replaceAll(" ","");
    id_fiscal = id_fiscal.toUpperCase(); // Reemplazar las minúsculas por mayúsculas
    id_fiscal = id_fiscal.replaceAll(" ",""); // Eliminar espacios
    id_fiscal = id_fiscal.replaceAll("-",""); // Eliminar guiones

    if (!validateDNI(id_fiscal)) {
        let errorMessage = "Error en el ID fiscal. El formato no es válido";
        errorMessageElementIdFiscal.textContent = ""
        errorMessageElementIdFiscal.textContent = errorMessage;
        errorMessageElementIdFiscal.classList.add("text-danger")
        
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

// Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).
// Acepta NIEs (Extranjeros con X, Y o Z al principio)
function validateDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != let) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        }else{
            //alert('Dni correcto');
            return true;
        }
    }else{
        //alert('Dni erroneo, formato no válido');
        return false;
    }
}