// Limpiar el almacenamiento local
sessionStorage.clear();
// Seleccionar elementos del DOM
// Selecciona el formulario
const form = document.querySelector("form");
// Selecciona el campo de usuario
const usuario = document.getElementById("user");
// Selecciona el campo de contraseña
const password = document.getElementById("password");
// Selecciona el botón de enviar
const botonEnviar = document.getElementById("enviar");
// Poner el foco en el campo de usuario al cargar la página
usuario.focus();
// Crear elementos de error para el campo de usuario y contraseña
const errorUser = document.createElement("div");
errorUser.textContent = "El usuario no puede estar vacío";
errorUser.classList.add("error");
errorUser.classList.add("text-danger")

const errorPassword = document.createElement("div");
errorPassword.textContent = "La contraseña no puede estar vacía";
errorPassword.classList.add("error");
errorPassword.classList.add("text-danger")

const errorAmbos = document.createElement("div");
errorAmbos.textContent = "El usuario y la contraseña no pueden estar vacíos";
errorAmbos.classList.add("error");
errorAmbos.classList.add("text-danger")

// Agregar un evento de escucha al formulario cuando se envía
form.addEventListener("submit", function (event) {
    event.preventDefault();
    vaciarMensajes();
    validar();
    // Crear un objeto con los datos de usuario y contraseña
    const data = {
        usuario: usuario.value.trim(),
        password: password.value.trim(),
    };



    // Enviar los datos al servidor en formato JSON
    const jsonDatos = JSON.stringify(data);
    fetch("auth.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonDatos
    })
    .then(response => response.json())
    .then(data => { 
        if(data.result == "error" && data.details != "Los campos nombre y contraseña son obligatorios"){
            // Mostrar mensaje de error si la autenticación falla
            console.log("Detalles del error:",data.details)
            const mensaje = document.createElement("div");
            mensaje.classList.add("error");
            mensaje.classList.add("text-danger")
            mensaje.textContent = data.details;
            form.appendChild(mensaje);
            vaciarInputs();
            
        } else if(data.result != "error"){
            // Almacenar el token en el almacenamiento local y redirigir a la página principal
            sessionStorage.setItem('token', data.token);
            window.location.href = "../../index.html";
        }
    });
});

function vaciarInputs(){
    usuario.value = "";
    password.value = "";
}

function validar(){
    if(usuario.value == "" && password.value == ""){
        form.appendChild(errorAmbos);
        return false;
    } else if(usuario.value == ""){
        form.appendChild(errorUser);
        return false;
    } else if(password.value == ""){
        form.appendChild(errorPassword);
        return false;
    } else {
        return true;
    }
}

function vaciarMensajes(){
    const errores = document.querySelectorAll(".error");
    errores.forEach(error => error.remove());
}



