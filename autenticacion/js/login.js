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

const errorPassword = document.createElement("div");
errorPassword.textContent = "La contraseña no puede estar vacía";
errorPassword.classList.add("error");

// Agregar un evento de escucha al formulario cuando se envía
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Eliminar los mensajes de error existentes
    const errores = document.querySelectorAll(".error");
    for (let i = 0; i < errores.length; i++) {
        errores[i].textContent = "";
    }

    // Validar que el campo de usuario y contraseña no estén vacíos
    if(usuario.value == "" && password.value == "") {
        form.insertBefore(errorPassword, botonEnviar);
        form.insertBefore(errorUser, password);
        return;
    } else {
        errorUser.remove();
        errorPassword.remove();
    }

    if(usuario.value ==""){
       form.insertBefore(errorUser, password);
       return;
    } else {
        errorUser.remove();
    }

    if(password.value == ""){
        form.insertBefore(errorPassword, botonEnviar);
        return;
    } else {
        errorPassword.remove();
    }
    
    // Crear un objeto con los datos de usuario y contraseña
    const data = {
        usuario: usuario.value,
        password: password.value
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
        console.log("Datos:",data)
        if(data.result == "error"){
            // Mostrar mensaje de error si la autenticación falla
            const mensaje = document.createElement("div");
            mensaje.classList.add("error")
            mensaje.textContent = data.details;
            form.appendChild(mensaje);
        } else {
            // Almacenar el token en el almacenamiento local y redirigir a la página principal
            console.log(data.token);
            localStorage.setItem('token', data.token);
            window.location.href = "../../index.php";
        }
    });
});

