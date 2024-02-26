const form = document.querySelector("form");
const usuario = document.getElementById("user");
const password = document.getElementById("password");
const botonEnviar = document.getElementById("enviar");

usuario.focus(); // Pone el foco en el campo usuario al cargar la página
const errorUser = document.createElement("div");
errorUser.textContent = "El usuario no puede estar vacío";
errorUser.classList.add("error");

const errorPassword = document.createElement("div");
errorPassword.textContent = "La contraseña no puede estar vacía";
errorPassword.classList.add("error");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = document.querySelector("form");

    const errores = document.querySelectorAll(".error");

    for (let i = 0; i < errores.length; i++) {
        errores[i].textContent = "";
    }

    if(usuario.value == "" && password.value == "") {
        form.insertBefore(errorPassword, botonEnviar);
        form.insertBefore(errorUser, password);
        return;
    }else{
        errorUser.remove();
        errorPassword.remove();
    }

    if(usuario.value ==""){
       form.insertBefore(errorUser, password);
       return;
    }else{
        errorUser.remove();
    }
    if(password.value == ""){
        form.insertBefore(errorPassword, botonEnviar);
        return;
    }else{
        errorPassword.remove();
    }
    
    const data = {
        usuario: usuario.value,
        password: password.value
    };

    // Enviamos los datos al servidor en formato JSON
    const jsonDatos = JSON.stringify(data);
    fetch("auth.php", {
        method: "POST",// Método de envío de la petición
        headers: {
            "Content-Type": "application/json" // Formato de los datos que enviamos al servidor
        },
        body: jsonDatos// Datos que enviamos al servidor
    })
      
    .then(response => response.json())// Convertimos la respuesta a JSON
    .then(data => { 
    console.log("Datos:",data)
    if(data.result == "error"){
    const mensaje = document.createElement("div");
    mensaje.classList.add("error")
    mensaje.textContent = data.details;
    form.appendChild(mensaje);
}else{
    console.log(data.token)
}
    })
});

