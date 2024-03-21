/**
 * Script para mostrar los servicios en la base de datos
 */
// Número de filas por página
const rowsPerPage = 10;

// Número de página actual
let currentPage = 1;
//Creamos la tabla
const table = document.createElement("table");
table.setAttribute("id", "tablaservicios");
document.body.append(table)
table.classList.add("table", "table-bordered", "table-hover");
const thead = document.createElement("thead");
document.getElementById("tablaservicios").appendChild(thead);
const tr = document.createElement("tr");
const th1 = document.createElement("th");
const th2 = document.createElement("th");
const th3 = document.createElement("th");
const th4 = document.createElement("th");

th1.textContent = "ID";
th2.textContent = "Nombre servicio";
th3.textContent = "Precio";
th1.classList.add("p-2", "text-center", "align-middle", "fs-5")
th2.classList.add("p-2", "text-center", "align-middle", "fs-5")
th3.classList.add("p-2", "text-center", "align-middle", "fs-5")
th4.classList.add("p-2", "text-center", "align-middle", "fs-5")
tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);

thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaservicios").appendChild(tbody);

const h4vacia = document.createElement("h4");
h4vacia.classList.add("text-center", "mt-3","fw-bold");
document.body.appendChild(h4vacia);

//Obtenemos los servicios de la base de datos
fetch(`${window.location.protocol}//${window.location.host}/api/servicios.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.servicios.length == 0) {

            const h4 = document.createElement("h4");
            const strong = document.createElement("strong");
            h4.classList.add("text-center");
            strong.textContent = "NO HAY SERVICIOS EN EL REGISTRO"
            h4.appendChild(strong);
            document.body.appendChild(h4);
        } else {
            data.servicios.forEach(element => {

                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");

                td1.classList.add("p-2", "text-center", "fs-5")
                td2.classList.add("p-2", "text-center", "fs-5")
                td3.classList.add("p-2", "text-center", "fs-5")
                td4.classList.add("p-2", "text-center", "fs-5")
                //Si el precio es 0, mostramos "No definido", si no, mostramos el precio con el símbolo del euro
                let precioServicio
                if (element.precio == 0) {
                    precioServicio = "No definido";
                } else {
                    precioServicio = element.precio + "€"
                }

                td1.textContent = element.id;
                td2.textContent = element.nombre;
                td3.textContent = precioServicio;

                //Creamos el botón de editar
                const botonEditar = document.createElement("button");
                botonEditar.textContent = "Editar";
                botonEditar.classList.add("btn", "btn-info", "btn-sm", "m-1");
                botonEditar.setAttribute("id", `botonEditar${element.id}`);
                td4.appendChild(botonEditar);

                //Creamos el botón de borrar
                const botonBorrar = document.createElement("button");
                botonBorrar.textContent = "Borrar";
                botonBorrar.classList.add("btn", "btn-danger", "btn-sm");
                botonBorrar.setAttribute("id", `botonBorrar${element.id}`);
                td4.appendChild(botonBorrar);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tbody.appendChild(tr);

                //Evento para editar el servicio
                botonEditar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    window.location.href = `editar.html?id=${id}`
                })

                //Evento para borrar el servicio
                botonBorrar.addEventListener("click", async (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    const confirmDelete = await mostrarventanaAviso("¿Estás seguro de que quieres borrar este servicio?");
                    if (confirmDelete) {
                        fetch(`${window.location.protocol}//${window.location.host}/api/servicios.php?id=${id}`, {
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
            })
        }

        //Creamos la barra de búsqueda para filtrar los servicios
        const barraBusqueda = document.createElement("input");
        barraBusqueda.setAttribute("id", "busqueda");
        barraBusqueda.setAttribute("type", "text");
        barraBusqueda.setAttribute("placeholder", "Buscar servicio");
        barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
        document.body.insertBefore(barraBusqueda, table);
        barraBusqueda.focus();

        //Evento para filtrar los servicios
        barraBusqueda.addEventListener("input", () => {
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
            
            let tablaVacia = true;
            for(let i = 0; i < filas.length; i ++){
                if(filas[i].style.display != "none"){
                    tablaVacia = false;
                }
            }
            if(tablaVacia){
                h4vacia.textContent = "SIN COINCIDENCIAS";
            }else{
                h4vacia.textContent = "";
            }

        })
    // Crear paginación después de cargar los datos
    createPagination(data.servicios.length);
    displayPage(currentPage);
    });

//Botón para volver al inicio
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../../index.html"
})

//Botón para volver a la página de productos y servicios
const botonProdYServ = document.createElement("button")
botonProdYServ.textContent = "Productos y Servicios"
botonProdYServ.classList.add("btn", "btn-info", "position-fixed", "bottom-0", "start-50", "m-3","translate-middle")
botonProdYServ.setAttribute("id", "volver")
document.body.appendChild(botonProdYServ)
botonProdYServ.addEventListener("click", () => {
    window.location.href = "../productos_servicios.html"
})

//Botón para añadir un nuevo servicio
const botonNuevo = document.createElement("button");
botonNuevo.textContent = "Nuevo servicio";
botonNuevo.classList.add("btn", "btn-success", "btn-sm");
botonNuevo.setAttribute("id", "nuevo");
th4.append(botonNuevo);
botonNuevo.addEventListener("click", () => {
    window.location.href = "nuevo.html"
});

//Función para mostrar una ventana
function mostrarventanaAviso(mensaje) {
    return new Promise((resolve, reject) => {
        document.getElementById("ventanaAviso").innerHTML = "";
        document.getElementById("ventanaAviso").classList.remove("d-none");
        document.getElementById("ventanaAviso").classList.add("d-block");
        document.getElementById("ventanaAviso").classList.add("align-items-center", "justify-content-center", "d-flex")
        const p = document.createElement("P")
        p.classList.add("text-center", "m-2")
        p.textContent = mensaje;
        document.getElementById("ventanaAviso").append(p);

        //Botón para confirmar de la ventana
        const botonConfirmar = document.createElement("button");
        botonConfirmar.textContent = "Confirmar";
        botonConfirmar.classList.add("btn", "btn-success", "m-2");
        document.getElementById("ventanaAviso").appendChild(botonConfirmar);
        botonConfirmar.addEventListener("click", () => {
            document.getElementById("ventanaAviso").classList.remove("d-block");
            console.log("Evento de botón confirmar");
            document.getElementById("ventanaAviso").classList.add("d-none");
            resolve(true);
        });

        //Botón para cancelar de la ventana
        const botonCancelar = document.createElement("button");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.classList.add("btn", "btn-danger", "m-2");
        document.getElementById("ventanaAviso").appendChild(botonCancelar);
        botonCancelar.addEventListener("click", () => {
            document.getElementById("ventanaAviso").classList.remove("d-block");
            document.getElementById("ventanaAviso").classList.add("d-none");
            resolve(false);
        });
    });
}

function createPagination(totalRows) {
    const numPages = Math.ceil(totalRows / rowsPerPage);
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");
    for (let i = 1; i <= numPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button","btn", "btn-outline-dark","btn-group", "d-flex", "justify-content-center", "mt-3");
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            currentPage = i;
            displayPage(i);
            const currentButton = document.querySelector(".pagination-button.active");
            currentButton.classList.remove("active");
            button.classList.add("active");
        });
        pagination.appendChild(button);
    }
    document.body.appendChild(pagination);
}

// Función para mostrar la página actual
function displayPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const rows = tbody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        if (i < start || i >= end) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
        }
    }
}