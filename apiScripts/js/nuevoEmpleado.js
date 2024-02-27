const form = document.getElementsByTagName('form')[0];
console.log(form)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Entra en el evento")
    // const nombre = document.getElementById('nombre').value;
    // const apellidos = document.getElementById('apellidos').value;
    // const rol = document.getElementById('rol').value;
    // const password = hashInput(document.getElementById('password').value)
    // console.log(nombre, apellidos, rol)
    // fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "api-key": sessionStorage.getItem("token")
    //     },
    //     body: JSON.stringify({
    //         nombre: nombre,
    //         apellidos: apellidos,
    //         password: password,
    //         rol: rol,
    //         activo: 1
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Éxito:', data);
    //         window.location.href = "empleados.html";
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
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

