/**
 * Script que se encarga de cargar la tabla de clientes y de gestionar los eventos de los botones de la misma
 */
// Número de filas por página
const rowsPerPage = 6;

// Número de página actual
let currentPage = 1;

//Creamos la tabla
const table = document.createElement("table");
table.setAttribute("id", "tablaclientes");
document.body.append(table)
table.classList.add("table", "table-bordered", "table-hover");

const thead = document.createElement("thead");
document.getElementById("tablaclientes").appendChild(thead);

const h4vacia = document.createElement("h4");
h4vacia.classList.add("text-center", "mt-3","fw-bold");
document.body.appendChild(h4vacia);

const tr = document.createElement("tr");
const th1 = document.createElement("th");
const th2 = document.createElement("th");
const th3 = document.createElement("th");
const th4 = document.createElement("th");
const th5 = document.createElement("th");
const th6 = document.createElement("th");
const th7 = document.createElement("th");
const th8 = document.createElement("th");

th1.textContent = "ID";
th2.textContent = "ID fiscal";
th3.textContent = "Nombre";
th4.textContent = "Primer pellido";
th5.textContent = "Segundo apellido";
th6.textContent = "Teléfono";
th7.textContent = "Dirección";

th1.classList.add("p-2", "text-center", "align-middle", "fs-5")
th2.classList.add("p-2", "text-center", "align-middle", "fs-5")
th3.classList.add("p-2", "text-center", "align-middle", "fs-5")
th4.classList.add("p-2", "text-center", "align-middle", "fs-5")
th5.classList.add("p-2", "text-center", "align-middle", "fs-5")
th6.classList.add("p-2", "text-center", "align-middle", "fs-5")
th7.classList.add("p-2", "text-center", "align-middle", "fs-5")
th8.classList.add("p-2", "text-center", "align-middle", "fs-5")

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);
tr.appendChild(th6);
tr.appendChild(th7);
tr.appendChild(th8);
thead.appendChild(tr);

const tbody = document.createElement("tbody");
document.getElementById("tablaclientes").appendChild(tbody);

/**
 * Evento para cargar la tabla de clientes
 */
fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.clientes.length == 0) {
            h4vacia.textContent = "NO HAY CLIENTES EN EL REGISTRO"
        } else {
            data.clientes.forEach(element => {
                //Creamos las filas de la tabla
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");
                const td8 = document.createElement("td");

                td1.classList.add("p-2", "text-center", "fs-5")
                td2.classList.add("p-2", "text-center", "fs-5")
                td3.classList.add("p-2", "text-center", "fs-5")
                td4.classList.add("p-2", "text-center", "fs-5")
                td5.classList.add("p-2", "text-center", "fs-5")
                td6.classList.add("p-2", "text-center", "fs-5")
                td7.classList.add("p-2", "text-center", "fs-5")
                td8.classList.add("p-2", "text-center", "fs-5")

                td1.textContent = element.id;
                td2.textContent = element.id_fiscal;
                td3.textContent = element.nombre;
                td4.textContent = element.apellido1;
                td5.textContent = element.apellido2;
                td6.textContent = element.telefono;
                td7.textContent = element.direccion;

                /**
                 * Creamos los botones de la tabla: editar, borrar y ver historial
                 */
                const botonFicha = document.createElement("button");
                botonFicha.textContent = "Historial";
                botonFicha.classList.add("btn", "btn-warning", "btn-sm");
                botonFicha.setAttribute("id", `botonFicha${element.id}`);
                td8.appendChild(botonFicha);

                const botonEditar = document.createElement("button");
                botonEditar.textContent = "Editar";
                botonEditar.classList.add("btn", "btn-info", "btn-sm", "m-1");
                botonEditar.setAttribute("id", `botonEditar${element.id}`);
                td8.appendChild(botonEditar);

                const botonBorrar = document.createElement("button");
                botonBorrar.textContent = "Borrar";
                botonBorrar.classList.add("btn", "btn-danger", "btn-sm");
                botonBorrar.setAttribute("id", `botonBorrar${element.id}`);
                td8.appendChild(botonBorrar);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);
                tbody.appendChild(tr);

                /**
                 * Eventos de los botones de la tabla: editar, borrar y ver historial
                 */
                botonEditar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    window.location.href = `editar.html?id=${id}`
                })

                botonFicha.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    window.location.href = `registro.html?id=${id}`
                })

                botonBorrar.addEventListener("click", async (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    const confirmDelete = await mostrarVentanaAviso("¿Estás seguro de que quieres borrar este cliente? Se borrarán todos los registros asociados al mismo.")
                    if (confirmDelete) {
                        fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${id}`, {
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

        /**
         * Barra de búsqueda de clientes
         */
        const barraBusqueda = document.createElement("input");
        barraBusqueda.setAttribute("id", "busqueda");
        barraBusqueda.setAttribute("type", "text");
        barraBusqueda.setAttribute("placeholder", "Buscar cliente");
        barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
        document.body.insertBefore(barraBusqueda, table);
        barraBusqueda.focus();
        barraBusqueda.addEventListener("input", () => {
            let paginacion = document.querySelector(".pagination");
            const texto = barraBusqueda.value.toLowerCase();
            const filas = tbody.getElementsByTagName("tr");
        
            if (texto === '') {
                paginacion.style.display ="";
                displayPage(currentPage);
            } else {
                paginacion.style.display = "none";
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
        createPagination(data.clientes.length);
        displayPage(currentPage);
    });



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

/**
 * Botón para crear un nuevo cliente
 
 */
const botonNuevo = document.createElement("button");
botonNuevo.textContent = "Nuevo cliente";
botonNuevo.classList.add("btn", "btn-success", "btn-sm");
botonNuevo.setAttribute("id", "nuevo");
th8.append(botonNuevo);
botonNuevo.addEventListener("click", () => {
    window.location.href = "nuevo.html"
});

/**
 * Función que muestra una ventana de confirmación para borrar un cliente
 */
function mostrarVentanaAviso(mensaje) {
    return new Promise((resolve, reject) => {
        document.getElementById("ventanaAviso").innerHTML = "";
        document.getElementById("ventanaAviso").classList.remove("d-none");
        document.getElementById("ventanaAviso").classList.add("d-block");
        document.getElementById("ventanaAviso").classList.add("align-items-center", "justify-content-center", "d-flex")
        const p = document.createElement("P")

        p.classList.add("text-center", "m-2")
        p.textContent = mensaje;
        document.getElementById("ventanaAviso").append(p);
        const botonConfirmar = document.createElement("button");
        botonConfirmar.textContent = "Confirmar";
        botonConfirmar.classList.add("btn", "btn-success", "m-2");

        document.getElementById("ventanaAviso").appendChild(botonConfirmar);
        botonConfirmar.addEventListener("click", () => {
            document.getElementById("ventanaAviso").classList.remove("d-block");
            document.getElementById("ventanaAviso").classList.add("d-none");
            resolve(true);
        });

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

// Función para crear los botones de paginación
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
            let barraBusqueda = document.getElementById("busqueda");
            barraBusqueda.value = "";
            h4vacia.textContent = "";
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

