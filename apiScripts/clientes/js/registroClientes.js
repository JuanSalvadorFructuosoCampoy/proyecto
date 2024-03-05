const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');

const h2 = document.querySelector('h2');
let nombreCliente = "";
//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        h2.childNodes[0].textContent += data['clientes'][0].nombre.toUpperCase();
        nombreCliente = data['clientes'][0].nombre;
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
th1.classList.add("p-2", "text-center", "col-2", "align-middle","fs-5")

th2.setAttribute("scope", "col")
th2.classList.add("p-2", "text-center", "col-8", "align-middle","fs-5")
th3.classList.add("p-2", "text-center", "align-middle","fs-5")


tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);

thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaregistro").appendChild(tbody);

//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/registro_clientes.php?id_cliente=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        if (data['registros'].length == 0) {
            const h4 = document.createElement("h4");
            const strong = document.createElement("strong");
            h4.classList.add("text-center");
            strong.textContent = "SIN REGISTROS DE EVENTOS PARA ESTE CLIENTE"
            h4.appendChild(strong);
            document.body.appendChild(h4);
        } else {
            data['registros'].forEach(element => {


                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");

                //Formateamos la fecha para mostrar primero el día, luego el mes y luego el año
                const fecha = new Date(element.fecha);
                const dia = fecha.getDate().toString().padStart(2, '0');
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const anio = fecha.getFullYear().toString();
                td1.textContent = `${dia}-${mes}-${anio}`;
                td2.textContent = element.evento;

                td1.classList.add("p-2", "text-center", "align-middle","fs-5"); 
                td2.classList.add("p-2", "text-center", "align-middle","fs-5"); 
                td3.classList.add("p-2", "text-center", "align-middle","fs-5");
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tbody.appendChild(tr);

                const inputOculto = document.createElement("input")
                inputOculto.setAttribute("type", "hidden")
                inputOculto.setAttribute("id", `id${element.id}`)
                inputOculto.setAttribute("value", element.id)
                td1.appendChild(inputOculto)

                const botonEditar = document.createElement("button");
                botonEditar.textContent = "Editar";
                botonEditar.classList.add("btn", "btn-info", "btn-sm", "m-1","text-center");
                botonEditar.setAttribute("id", `botonEditar${element.id}`);
                td3.appendChild(botonEditar);

                const botonBorrar = document.createElement("button");
                botonBorrar.textContent = "Borrar";
                botonBorrar.classList.add("btn", "btn-danger", "btn-sm");
                botonBorrar.setAttribute("id", `botonBorrar${element.id}`);
                td3.appendChild(botonBorrar);

                botonEditar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.childNodes[1].value;
                    window.location.href = `editar_registro.html?id=${id}&nombre_cliente=${nombreCliente}&id_cliente=${idURL}`
                })

                botonBorrar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.childNodes[1].value;
                    const confirmDelete = confirm("¿Estás seguro de que quieres borrar este registro?");
                    if (confirmDelete) {
                        fetch(`${window.location.protocol}//${window.location.host}/api/registro_clientes.php?id=${id}`, {
                            method: 'DELETE',
                            headers: {
                                "api-key": sessionStorage.getItem("token")
                            },
                        })
                            .then(() => {
                                window.location.reload(); //Recarga la página para que se actualice la tabla
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                });
            });
        }
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

const botonNuevo = document.createElement("button");
botonNuevo.textContent = "Nuevo evento";
botonNuevo.classList.add("btn", "btn-success", "btn-sm");
botonNuevo.setAttribute("id", "nuevoRegistro");
th3.append(botonNuevo);
botonNuevo.addEventListener("click", () => {
    window.location.href = `nuevo_registro.html?id_cliente=${idURL}&nombre_cliente=${nombreCliente}`
});

const barraBusqueda = document.createElement("input");
barraBusqueda.setAttribute("id", "busqueda");
barraBusqueda.setAttribute("type", "text");
barraBusqueda.setAttribute("placeholder", "Buscar evento");
barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
document.body.insertBefore(barraBusqueda, table);

barraBusqueda.addEventListener("input",()=>{
    const texto = barraBusqueda.value.toLowerCase();
    const filas = tbody.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        let coincide = false;
        for (let j = 0; j < celdas.length && !coincide; j++) {
            const celda = celdas[j];
            if (celda.innerHTML.toLowerCase().indexOf(texto) !== -1) {//Si el texto está en la celda
                coincide = true;
            }
        }
        if (coincide) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }

})