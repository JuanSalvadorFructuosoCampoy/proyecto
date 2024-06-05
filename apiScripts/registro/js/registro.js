/**
 * Script para mostrar los registros de ventas en la base de datos
 */
// Número de filas por página
const rowsPerPage = 30;

// Número de página actual
let currentPage = 1;
//Creamos la tabla
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
const th4 = document.createElement("th");
const th5 = document.createElement("th");
const th6 = document.createElement("th");
const th7 = document.createElement("th");
const th8 = document.createElement("th");

th1.textContent = "ID";
th2.textContent = "Fecha";
th3.textContent = "Empleado";
th4.textContent = "Cliente";
th5.textContent = "Tipo de pago";
th6.textContent = "Total";
th7.textContent = "IVA(%)";

th1.classList.add("p-2", "text-center", "align-middle","fs-5")
th2.classList.add("p-2", "text-center", "align-middle","fs-5")
th3.classList.add("p-2", "text-center", "align-middle","fs-5")
th4.classList.add("p-2", "text-center", "align-middle","fs-5")
th5.classList.add("p-2", "text-center", "align-middle","fs-5")
th6.classList.add("p-2", "text-center", "align-middle","fs-5")
th7.classList.add("p-2", "text-center", "align-middle","fs-5")
th8.classList.add("p-2", "text-center", "align-middle","fs-5")

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
document.getElementById("tablaregistro").appendChild(tbody);

const h4vacia = document.createElement("h4");
h4vacia.classList.add("text-center", "mt-3","fw-bold");
document.body.appendChild(h4vacia);

//Obtenemos los registros de ventas de la base de datos
fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        //Si no hay ventas en la base de datos, mostramos un mensaje
        if (data.ventas.length == 0) {
            h4vacia.textContent = "NO HAY VENTAS REGISTRADAS"
        } else {
            data.ventas.reverse(); //Invertimos el array para que las ventas más recientes aparezcan primero
            data.ventas.forEach(element => {

                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");
                const td8 = document.createElement("td");

                td1.classList.add("p-2", "text-center","fs-5")
                td2.classList.add("p-2", "text-center","fs-5")
                td3.classList.add("p-2", "text-center","fs-5")
                td4.classList.add("p-2", "text-center","fs-5")
                td5.classList.add("p-2", "text-center","fs-5")
                td6.classList.add("p-2", "text-center","fs-5")
                td7.classList.add("p-2", "text-center","fs-5")
                td8.classList.add("p-2", "text-center","fs-5")

                td1.textContent = element.id;

                //Formateamos la fecha actual para que se muestre en el formato dd/mm/yyyy - hh:mm
                const fecha = new Date(element.fecha);
                const dia = fecha.getDate().toString().padStart(2, '0');
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const anio = fecha.getFullYear().toString();
                const hora = fecha.getHours().toString().padStart(2, '0');
                const minutos = fecha.getMinutes().toString().padStart(2, '0');
                td2.textContent = `${dia}/${mes}/${anio} - ${hora}:${minutos}`;

                //Obtenemos el nombre del empleado y del cliente asociados a la venta
                if(element.nombreEmpleado != null){
                    td3.textContent = element.nombreEmpleado;
                } else {
                    td3.textContent = "NO DEFINIDO";
                }

                //Obtenemos el nombre del cliente asociado a la venta
                hacerFetch(`${window.location.protocol}//${window.location.host}/api/ventas.php?id=${element.id}`)
                    .then(data => {
                        //Si el cliente no está definido, mostramos "NO DEFINIDO"
                        if (data.ventas[0].nombreCliente != null) {
                            td4.textContent = data.ventas[0].nombreCliente;
                            td4.dataset.id = data.ventas[0].nombreCliente;
                        } else {
                            td4.textContent = "NO DEFINIDO";

                        }
                    });

                td5.textContent = element.tipo;
                    element.total = parseFloat(element.total).toFixed(2);
                td6.textContent = element.total + "€";
                td7.textContent = element.iva + "%";

                //Creamos el botón de ficha
                const botonFicha = document.createElement("button");
                botonFicha.textContent = "Detalle";
                botonFicha.classList.add("btn", "btn-warning", "btn-sm","m-1");
                botonFicha.setAttribute("id", `botonFicha${element.id}`);
                td8.appendChild(botonFicha);

                //Creamos el botón de borrar
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

                //Event listener para los botones de ficha y borrar
                botonFicha.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    const fecha = e.target.parentNode.parentNode.childNodes[1].textContent;
                    const empleado = e.target.parentNode.parentNode.childNodes[2].textContent;
                    const cliente = e.target.parentNode.parentNode.childNodes[3].dataset.id;
                    const total = e.target.parentNode.parentNode.childNodes[5].textContent;
                    window.location.href = `productos_ventas.html?id=${id}&fecha=${fecha}&empleado=${empleado}&cliente=${cliente}&total=${total}`
                })

                //Evento para borrar la venta
                botonBorrar.addEventListener("click", async (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    const confirmDelete = await mostrarventanaAviso("¿Estás seguro de que quieres borrar esta venta? Se borrarán todos los registros asociados a la misma.");
                    if (confirmDelete) {
                        fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php?id=${id}`, {
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


            })//Fin del forEach de las ventas
        }//Fin del else de la tabla

        //Input de tipo texto para filtrar los registros de la tabla
        const barraBusqueda = document.createElement("input");
        barraBusqueda.setAttribute("id", "busqueda");
        barraBusqueda.setAttribute("type", "text");
        barraBusqueda.setAttribute("placeholder", "Buscar registro");
        barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
        document.body.insertBefore(barraBusqueda, table);
        barraBusqueda.focus();
        barraBusqueda.addEventListener("input", () => {
            let paginacion = document.querySelector(".pagination");
            fechaInput.value = "";
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
    createPagination(data.ventas.length);
    displayPage(currentPage);
    });

    //Input de tipo fecha para filtrar por fecha los registros de la tabla
    const fechaInput = document.createElement("input");
    fechaInput.setAttribute("type", "date");
    fechaInput.classList.add("form-control", "w-25", "m-auto", "mt-3");
    document.body.insertBefore(fechaInput, table);

    fechaInput.addEventListener("input", () => {
        let paginacion = document.querySelector(".pagination");
        const barraBusqueda = document.getElementById("busqueda");
        barraBusqueda.value = "";
        //Formateamos la fecha seleccionada para que coincida con el formato de la tabla
        const fechaSeleccionada = fechaInput.value;
        let anio = fechaSeleccionada.split("-")[0];
        let mes = fechaSeleccionada.split("-")[1];
        let dia = fechaSeleccionada.split("-")[2];
        fechaSeleccionadaFormateada = `${dia}-${mes}-${anio}`;
        if(fechaInput.value != ""){
            paginacion.style.display = "none";
        }
        const filas = tbody.getElementsByTagName("tr");
        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName("td");
            let fechaRegistro = celdas[1].textContent.split(" - ")[0];
            fechaRegistro = fechaRegistro.replaceAll("/", "-").trim(); // Añade .trim() aquí

            if (fechaRegistro !== fechaSeleccionadaFormateada) {
                filas[i].style.display = "none";
            } else {
                filas[i].style.display = "";
            }
        }

        //Si no hay fecha seleccionada, mostramos todos los registros
        if(fechaSeleccionada == ""){
            for (let i = 0; i < filas.length; i++) {
                displayPage(currentPage);
                paginacion.style.display = "";
            }
        }

        let tablaVacia = true;
        for(let i = 0; i < filas.length; i ++){
            if(filas[i].style.display != "none"){
                tablaVacia = false;
            }
        }
        if(tablaVacia){
            h4vacia.textContent = "NO HAY VENTAS REGISTRADAS PARA ESTA FECHA";
        }else{
            h4vacia.textContent = "";
        }
    });

    
//Botón para volver al inicio
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

//Función asíncrona para hacer fetch a la API
async function hacerFetch(url) {
    try {
        const response = await fetch(url, {
            headers: {
                "api-key": sessionStorage.getItem("token")
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

//Función asíncrona para hacer fetch a un item dando el id como parámetro
async function fetchItem(url, id) {

    let item = await fetch(`${window.location.protocol}//${window.location.host}/api/${url}.php?id=${id}`, {
        headers: {
            "api-key": sessionStorage.getItem("token"),
        }
    });
    let itemData = await item.json();
    return itemData;

}

/**
 * Función para mostrar una ventana de confirmación
 */
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
