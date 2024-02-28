const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

const h2 = document.querySelector('h2');

//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        console.log(data['clientes'])
        h2.childNodes[0].textContent += data['clientes'][0].nombre.toUpperCase();
    })

    const table = document.createElement("table");
    table.setAttribute("id", "tablaregistro");
    document.body.append(table)
    table.classList.add("table", "table-bordered", "table-hover");
    const thead = document.createElement("thead");
    document.getElementById("tablaregistro").appendChild(thead);
    const tr = document.createElement("tr");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const th3 = document.createElement("th");

    th1.textContent = "Fecha";
    th2.textContent = "Evento";

    th1.setAttribute("scope", "col")
    th1.classList.add("p-4", "text-center","col-2")

    th2.setAttribute("scope", "col")
    th2.classList.add("p-4", "text-center","col-8")
    th3.classList.add("p-4", "text-center")
    
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    
    thead.appendChild(tr);
    const tbody = document.createElement("tbody");
    document.getElementById("tablaregistro").appendChild(tbody);



//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/registro_clientes.php?id_cliente=${idURL}`,{
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

.then(response => response.json())
.then(data => {
console.log(data)
});


const botonClientes = document.createElement("button")
botonClientes.textContent = "Clientes"
botonClientes.classList.add("btn", "btn-info", "position-fixed", "bottom-0", "start-0", "m-3")
botonClientes.setAttribute("id", "volver")
document.body.appendChild(botonClientes)
botonClientes.addEventListener("click", () => {
    window.location.href = "clientes.html"
})

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})