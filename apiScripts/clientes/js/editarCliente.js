/**
 * Script para editar un cliente
 */
const form = document.getElementsByTagName('form')[0];
const errorMessageElementTelefono = document.createElement('p');
document.getElementById('telefono').insertAdjacentElement('afterend', errorMessageElementTelefono);
const errorMessageElementIdFiscal = document.createElement('p');
document.getElementById('id_fiscal').insertAdjacentElement('afterend', errorMessageElementIdFiscal);
document.getElementById('id_fiscal').focus();
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

//Usamos ese parámetro en el fetch para obtener los datos del cliente
/**
 * Obtén los datos del cliente
 */
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
    /**
     * Evento para enviar el formulario
     */
form.addEventListener('submit', (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
    e.preventDefault();

    let nombre = document.getElementById('nombre').value.trim();
    let id_fiscal = document.getElementById('id_fiscal').value.trim();
    let apellido1 = document.getElementById('apellido1').value.trim();
    let apellido2 = document.getElementById('apellido2').value.trim();
    let telefono = document.getElementById('telefono').value.trim();
    let direccion = document.getElementById('direccion').value.trim();

    /**
     * Validación del teléfono
     */
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

    /**
     * Validación del ID fiscal
     */
    if (!validateDNI(id_fiscal)) {
        let errorMessage = "Error en el ID fiscal. El formato no es válido";
        errorMessageElementIdFiscal.textContent = ""
        errorMessageElementIdFiscal.textContent = errorMessage;
        errorMessageElementIdFiscal.classList.add("text-danger")
        
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

    //Enviamos los datos a la API
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


// Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).
// Acepta NIEs (Extranjeros con X, Y o Z al principio)
/**
 * Función para validar el DNI o NIE de un cliente
 */
function validateDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if(expresion_regular_dni.test(dni) == true){
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
/**
 * Botón para volver al inicio
 */
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})