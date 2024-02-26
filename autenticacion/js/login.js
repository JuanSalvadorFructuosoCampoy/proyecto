const form = document.querySelector("form");
const usuario = document.getElementById("user");
const password = document.getElementById("password");
const botonEnviar = document.getElementById("submit");

const errorUser = document.createElement("p");
errorUser.textContent = "El usuario no puede estar vacío";
errorUser.classList.add("error");

const errorPassword = document.createElement("p");
errorPassword.textContent = "La contraseña no puede estar vacía";
password.classList.add("error");

form.addEventListener("submit", function (event) {
    event.preventDefault();
const form = document.querySelector("form");
    event.preventDefault();

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
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonDatos
    })
    

 
});

