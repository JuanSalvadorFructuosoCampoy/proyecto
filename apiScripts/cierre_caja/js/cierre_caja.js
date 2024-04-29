/**
 * Script para mostrar el cierre de caja
 */

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

th1.textContent = "Fecha";
th2.textContent = "Total en efectivo";
th3.textContent = "Total en tarjeta";
th4.textContent = "Total";

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
document.getElementById("tablaregistro").appendChild(tbody);

const h4vacia = document.createElement("h4");
h4vacia.classList.add("text-center", "mt-3","fw-bold");
document.body.appendChild(h4vacia);

/**
 * Input de tipo fecha para filtrar los registros de la tabla
 */
const fechaInput = document.createElement("input");
fechaInput.setAttribute("type", "date");
fechaInput.classList.add("form-control", "w-25", "m-auto", "mt-3");
document.body.insertBefore(fechaInput, table);
fechaInput.value = new Date().toISOString().split("T")[0];

/**
 * Fetch para obtener los registros de cierre de caja
 */
fetchCierre(`${window.location.protocol}//${window.location.host}/api/cierre_caja.php`);

//Evento que se dispara cuando se cambia la fecha en el input de tipo fecha
fechaInput.addEventListener("input", () => {
    const fechaSeleccionada = fechaInput.value;
    let anio = fechaSeleccionada.split("-")[0];
    let mes = fechaSeleccionada.split("-")[1];
    let dia = fechaSeleccionada.split("-")[2];
    fechaSeleccionadaFormateada = `${dia}-${mes}-${anio}`;
    const filas = tbody.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        let fechaRegistro = celdas[0].textContent.split(" - ")[0];
        fechaRegistro = fechaRegistro.replaceAll("/", "-")
        if (fechaRegistro !== fechaSeleccionadaFormateada) {
            filas[i].style.display = "none";
        } else {
            filas[i].style.display = "";
        }
    }

    if (fechaInput.value == "") {
        for (let i = 0; i < filas.length; i++) {
            filas[i].style.display = "";
        }
    }

    let tablaVacia = true;
    for(let i = 0; i < filas.length; i ++){
        if(filas[i].style.display != "none"){
            tablaVacia = false;
        }
    }
    if(tablaVacia){
        h4vacia.textContent = "NO HAY VENTAS REGISTRADAS";
    }else{
        h4vacia.textContent = "";
    }
});


/**
 * Botón para volver al inicio
 */
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "start-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../index.html"
})

/**
 * Función para hacer fetch
 */
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

/**
 * Función para obtener el cierre de caja
 */
function fetchCierre(url) {
    fetch(url, {
        headers: {
            "api-key": sessionStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.ventas.length == 0) {
                h4vacia.textContent = "NO HAY VENTAS REGISTRADAS";
            } else {
                data.ventas.reverse();
                data.ventas.forEach(element => {

                    //Creamos las filas de la tabla
                    const tr = document.createElement("tr");
                    const td1 = document.createElement("td");
                    const td2 = document.createElement("td");
                    const td3 = document.createElement("td");
                    const td4 = document.createElement("td");
                    const td5 = document.createElement("td");

                    td1.classList.add("p-2", "text-center", "align-middle", "fs-5");
                    td3.classList.add("p-2", "text-center", "align-middle", "fs-5")
                    td4.classList.add("p-2", "text-center", "align-middle", "fs-5")
                    td2.classList.add("p-2", "text-center", "align-middle", "fs-5")
                    td5.classList.add("p-2", "text-center", "align-middle", "fs-5")

                    td1.textContent = element.fecha;

                    //Formateamos la fecha
                    const fecha = new Date(element.fecha);
                    const dia = fecha.getDate().toString().padStart(2, '0');
                    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                    const anio = fecha.getFullYear().toString();
                    td1.textContent = `${dia}/${mes}/${anio}`;
                    td2.textContent = `${parseFloat(element.efectivo).toFixed(2)}€`;
                    if (td2.textContent == "NaN€") {
                        td2.textContent = "0€"
                    }
                    td3.textContent = `${parseFloat(element.tarjeta).toFixed(2)}€`;
                    if (td3.textContent == "NaN€") {
                        td3.textContent = "0€"
                    }

                    const fechaRegistro = element.fecha;
                    console.log("fechaRegistro", fechaRegistro)
                    console.log("fechaEnElInput", fechaInput.value)
                    if (fechaRegistro != fechaInput.value) {
                    tr.style.display = "none";
                    }else{
                    tr.style.display = "";
                    }

                    const total = (parseFloat(td2.textContent) + parseFloat(td3.textContent)).toFixed(2);
                    td4.textContent = `${total}€`;
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tbody.appendChild(tr);

                    const filas = tbody.getElementsByTagName("tr");
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

                    /**
                     * Botón para imprimir el cierre de caja
                     */
                    const botonImprimir = document.createElement("button");
                    botonImprimir.textContent = "Imprimir";
                    botonImprimir.classList.add("btn", "btn-success", "m-1");
                    botonImprimir.setAttribute("id", "imprimir");
                    td5.appendChild(botonImprimir);

                    /**
                     * Evento para imprimir el cierre de caja
                     */
                    botonImprimir.addEventListener("click", async (e) => {
                        let anio = e.target.parentElement.parentElement.children[0].textContent.split("/")[2];
                        let mes = e.target.parentElement.parentElement.children[0].textContent.split("/")[1];
                        let dia = e.target.parentElement.parentElement.children[0].textContent.split("/")[0];
                        let fecha = `${anio}-${mes}-${dia}`;
                        let fetchDia = await fetch(`${window.location.protocol}//${window.location.host}/api/cierre_caja.php?fecha=${fecha}`, {
                            headers: {
                                "api-key": sessionStorage.getItem("token")
                            }
                        })

                        //Obtenemos el cierre de caja del día seleccionado
                        let cierreCaja = await fetchDia.json();

                        fetch(`${window.location.protocol}//${window.location.host}/templates/cierre_caja.html`)
                            .then(response => response.text())
                            .then(ticket => {
                                //Parseamos el texto HTML en un documento HTML
                                const parser = new DOMParser();
                                //Convertimos el texto HTML en un documento HTML
                                const htmlDoc = parser.parseFromString(ticket, 'text/html');
                                let anioNuevo = cierreCaja.ventas[0].fecha.split("-")[0];
                                let mesNuevo = cierreCaja.ventas[0].fecha.split("-")[1];
                                let diaNuevo = cierreCaja.ventas[0].fecha.split("-")[2];
                                let fechaNueva = `${diaNuevo}/${mesNuevo}/${anioNuevo}`;
                                let textoFecha = document.createTextNode(fechaNueva);
                                htmlDoc.querySelector("#fecha").insertBefore(textoFecha, htmlDoc.querySelector("#fecha").childNodes[1])
                                if (cierreCaja.ventas[0].efectivo == null) {
                                    //Si no hay ventas en efectivo, mostramos 0€
                                    htmlDoc.querySelector("#totalEfectivo").textContent = "0€"
                                } else {
                                    //Si hay ventas en efectivo, mostramos el total
                                    htmlDoc.querySelector("#totalEfectivo").textContent = `${parseFloat(cierreCaja.ventas[0].efectivo).toFixed(2)}€`;
                                }
                                //Si no hay ventas en tarjeta, mostramos 0€
                                if (cierreCaja.ventas[0].tarjeta == null) {
                                    htmlDoc.querySelector("#totalTarjeta").textContent = "0€"
                                } else {
                                    htmlDoc.querySelector("#totalTarjeta").textContent = `${parseFloat(cierreCaja.ventas[0].tarjeta).toFixed(2)}€`;
                                }
                                //Sumamos el total en efectivo y el total en tarjeta
                                htmlDoc.querySelector("#total").textContent = `${(parseFloat(htmlDoc.querySelector("#totalEfectivo").textContent) + parseFloat(htmlDoc.querySelector("#totalTarjeta").textContent)).toFixed(2)}€`;
                                const ticketWindow = window.open("", "Documento de venta", "width=800px,height=800px");
                                ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                                ticketWindow.print();
                            })

                    })//Fin del evento click del botón imprimir

                })//Fin del forEach de los totales diarios
            }//Fin del else de la tabla

        });//Fin del fetch de los totales diarios
}