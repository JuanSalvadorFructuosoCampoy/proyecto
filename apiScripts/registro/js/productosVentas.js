/**
 * Script para mostrar los productos y servicios asociados a una venta
 */
const form = document.getElementsByTagName('form')[0];
// Obtén la cadena de consulta de la URL
let queryString = window.location.search;

// Crea un objeto URLSearchParams
let urlParams = new URLSearchParams(queryString);

// Obtén el id desde los parámetros de la URL
let idURL = urlParams.get('id');
let fechaURL = urlParams.get('fecha');
let empleadoURL = urlParams.get('empleado');
let clienteURL = urlParams.get('cliente');
let totalURL = urlParams.get('total');

const h2 = document.querySelector('h2');
const strong = document.createElement("strong");
strong.textContent += idURL;
h2.appendChild(strong);

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

th1.textContent = "ID";
th2.textContent = "Item";
th3.textContent = "Cliente";
th4.textContent = "Cantidad";
th5.textContent = "Precio";

th1.setAttribute("scope", "col")
th1.classList.add("p-2", "text-center")

th2.setAttribute("scope", "col")
th2.classList.add("p-2", "text-center", "align-middle")
th3.classList.add("p-2", "text-center", "align-middle")
th4.classList.add("p-2", "text-center", "align-middle")
th5.classList.add("p-2", "text-center", "align-middle")


tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);

thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaregistro").appendChild(tbody);

const h4vacia = document.createElement("h4");
h4vacia.classList.add("text-center", "mt-3","fw-bold");
document.body.appendChild(h4vacia);

//Usamos ese parámetro en el fetch para obtener los datos del cliente
fetch(`${window.location.protocol}//${window.location.host}/api/productos_ventas.php?id=${idURL}`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    },
})

    .then(response => response.json())
    .then(data => {
        if (data.productos) {
            data['productos'].forEach(element => {
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                td1.textContent = element.id;

                //Si es un producto, hacemos el fetch a los productos. Si es un servicio, lo hacemos a los servicios
                if (element.id_item.charAt(0) == "P") {
                    hacerFetch(`${window.location.protocol}//${window.location.host}/api/productos.php?id=${element.id_item}`)
                        .then(data => {
                            if (data.productos[0]) {
                                td2.textContent = data.productos[0].nombre
                            } else {
                                td2.textContent = "NO DEFINIDO"
                            }
                        })
                } else {
                    hacerFetch(`${window.location.protocol}//${window.location.host}/api/servicios.php?id=${element.id_item}`)
                        .then(data => {
                            if (data.servicios[0]) {
                                td2.textContent = data.servicios[0].nombre
                            } else {
                                td2.textContent = "NO DEFINIDO"
                            }
                        })
                }

                //Si el id_cliente es 0, mostramos "NO DEFINIDO", si no, hacemos el fetch a los clientes
                if (element.id_cliente == 0) {
                    td3.textContent = "NO DEFINIDO";
                } else {
                    hacerFetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${element.id_cliente}`)
                        .then(data => {
                            if (data.clientes[0]) {
                                td3.textContent = data.clientes[0].nombre + " " + data.clientes[0].apellido1 + " " + data.clientes[0].apellido2
                            } else {
                                td3.textContent = "NO DEFINIDO"
                            }
                        })
                }

                td4.textContent = element.cantidad;
                element.precio = parseFloat(element.precio).toFixed(2);
                td5.textContent = element.precio + "€";

                td1.classList.add("p-2", "text-center", "align-middle", "fs-5");
                td2.classList.add("p-2", "text-center", "align-middle", "fs-5");
                td3.classList.add("p-2", "text-center", "align-middle", "fs-5");
                td4.classList.add("p-2", "text-center", "align-middle", "fs-5");
                td5.classList.add("p-2", "text-center", "align-middle", "fs-5");
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tbody.appendChild(tr);

            });
        } else {
            //Si no hay productos o servicios, mostramos un mensaje
            const h2 = document.createElement("h2");
            const strong = document.createElement("strong");
            strong.textContent = "NO HAY PRODUCTOS O SERVICIOS REGISTRADOS PARA ESTA VENTA"
            h2.appendChild(strong);
            h2.classList.add("text-center", "mt-5");
            document.body.appendChild(h2);
        }
    });

//Botón para volver al registro de ventas
const botonventas = document.createElement("button")
botonventas.textContent = "Ventas"
botonventas.classList.add("btn", "btn-info", "position-fixed", "bottom-0", "start-0", "m-3")
botonventas.setAttribute("id", "volver")
document.body.appendChild(botonventas)
botonventas.addEventListener("click", () => {
    window.location.href = "../registro/registro.html"
})

//Botón para volver al inicio
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

//Botón para reimprimir el documento
const botonReimprimir = document.createElement("button");
botonReimprimir.textContent = "Reimprimir documento";
botonReimprimir.classList.add("btn", "btn-success", "position-fixed", "bottom-0", "start-50", "m-3", "translate-middle-x");
botonReimprimir.setAttribute("id", `botonReimprimir`);
document.body.appendChild(botonReimprimir);

//Barra de búsqueda para filtrar los productos y servicios
const barraBusqueda = document.createElement("input");
barraBusqueda.setAttribute("id", "busqueda");
barraBusqueda.setAttribute("type", "text");
barraBusqueda.setAttribute("placeholder", "Buscar evento");
barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
document.body.insertBefore(barraBusqueda, table);

//Evento para filtrar los productos y servicios
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

//Función asíncrona para hacer el fetch a los productos y servicios
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

//Evento para imprimir el documento
botonReimprimir.addEventListener("click", async () => {
    //Si el cliente es "undefined", mostramos el ticket, si no, mostramos la factura
    if (clienteURL == "undefined") {
        fetch("../../../templates/ticket.html")
            .then(response => response.text())
            .then(ticket => {
                
                //Parseamos el texto HTML en un documento HTML
                const parser = new DOMParser();
                //Convertimos el texto HTML en un documento HTML
                const htmlDoc = parser.parseFromString(ticket, 'text/html');
                htmlDoc.querySelector("img").setAttribute("src", "../../../images/imagenFondo.png");
                let textoFecha = document.createTextNode(fechaURL);
                htmlDoc.querySelector("#fecha").insertBefore(textoFecha, htmlDoc.querySelector("#fecha").childNodes[1])

                const total = totalURL;
                htmlDoc.querySelector("#total").textContent = total;
                const htmlTbody = htmlDoc.querySelector("tbody")
                htmlDoc.querySelector("#empleado").textContent = empleadoURL;

                const trTbody = document.createElement("tr");
                htmlTbody.appendChild(trTbody);

                const tabla = document.getElementById("tablaregistro");
                const filas = tabla.getElementsByTagName("tr");
                for (let i = 1; i < filas.length; i++) {

                    const trTbody = document.createElement("tr");
                    htmlTbody.appendChild(trTbody);

                    const tdCantidad = document.createElement("td");
                    tdCantidad.classList.add("cantidad");
                    tdCantidad.textContent = filas[i].childNodes[3].textContent;
                    trTbody.appendChild(tdCantidad);

                    const tdNombre = document.createElement("td");
                    tdNombre.classList.add("producto");
                    tdNombre.textContent = filas[i].childNodes[1].textContent;
                    trTbody.appendChild(tdNombre);

                    const tdPrecio = document.createElement("td");
                    tdPrecio.classList.add("precio");
                    tdPrecio.textContent = filas[i].childNodes[4].textContent;
                    trTbody.appendChild(tdPrecio);

                }
                //Abrimos una ventana nueva con el ticket y lo imprimimos
                const ticketWindow = window.open("", "Documento de venta", "width=800px,height=800px");
                ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                ticketWindow.print();
            })
        //Si el cliente está definido, entonces debemos imprimir una factura en lugar de un ticket
    } else {
        let fetchCliente = await fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php?id=${idURL}`, {
            headers: {
                "api-key": sessionStorage.getItem("token")
            }
        })
        let datosCliente = await fetchCliente.json();
        console.log(datosCliente['ventas'][0])
        fetch("../../../templates/factura.html")
            .then(response => response.text())
            .then(factura => {
                const parser = new DOMParser();
                //Convertimos el texto HTML en un documento HTML
                const htmlDoc = parser.parseFromString(factura, 'text/html');

                htmlDoc.querySelector("img").setAttribute("src", "../../../images/imagenFondo.png");

                //Creamos los nodos de texto para los datos del cliente
                let clienteFactura = `${datosCliente['ventas'][0].nombreCliente}`;
                let textoDireccion = document.createTextNode(datosCliente['ventas'][0].direccionCliente);
                htmlDoc.querySelector("#direccionCliente").insertBefore(textoDireccion, htmlDoc.querySelector("#direccionCliente").childNodes[1])

                let textoIdFiscal = document.createTextNode(datosCliente['ventas'][0].idFiscalCliente);
                htmlDoc.querySelector("#idfiscal").insertBefore(textoIdFiscal, htmlDoc.querySelector("#idfiscal").childNodes[1])

                let textoTelefono = document.createTextNode(datosCliente['ventas'][0].telefonoCliente);
                htmlDoc.querySelector("#telefono").insertBefore(textoTelefono, htmlDoc.querySelector("#telefono").childNodes[1])


                let textoFecha = document.createTextNode(fechaURL);
                htmlDoc.querySelector("#fecha").insertBefore(textoFecha, htmlDoc.querySelector("#fecha").childNodes[1])
                htmlDoc.querySelector("#iva").textContent = datosCliente['ventas'][0].iva + "%";
                let textoCliente = document.createTextNode(clienteFactura);
                htmlDoc.querySelector("#nombreCliente").insertBefore(textoCliente, htmlDoc.querySelector("#nombreCliente").childNodes[1])
                let ivaAplicado = parseFloat(datosCliente['ventas'][0].iva) / 100 + 1;
                const tabla = document.getElementById("tablaregistro");
                const filas = tabla.getElementsByTagName("tr");
                for (let i = 1; i < filas.length; i++) {
                    const tr = document.createElement("tr");
                    htmlDoc.querySelector("tbody").appendChild(tr);

                    const tdNombre = document.createElement("td");
                    tdNombre.classList.add("desc");
                    tdNombre.textContent = filas[i].childNodes[1].textContent;
                    tr.appendChild(tdNombre);

                    const tdPrecio = document.createElement("td");
                    tdPrecio.classList.add("unit");
                    tdPrecio.textContent = (parseFloat(filas[i].childNodes[4].textContent) / ivaAplicado).toFixed(2) + "€";
                    tr.appendChild(tdPrecio);

                    const tdCantidad = document.createElement("td");
                    tdCantidad.classList.add("qty");
                    tdCantidad.textContent = filas[i].childNodes[3].textContent;
                    tr.appendChild(tdCantidad);

                    const tdPrecioSubTotal = document.createElement("td");
                    tdPrecioSubTotal.classList.add("total");
                    tdPrecioSubTotal.textContent = (parseFloat(filas[i].childNodes[4].textContent) * parseFloat(filas[i].childNodes[3].textContent) / ivaAplicado).toFixed(2) + "€";
                    tr.appendChild(tdPrecioSubTotal);
                }
                htmlDoc.querySelector("#baseImponible").textContent = (parseFloat(totalURL) / ivaAplicado).toFixed(2) + "€";
                htmlDoc.querySelector("#totalFactura").textContent = totalURL;


                const ticketWindow = window.open("", "Documento de venta", "width=800px,height=800px");
                ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                ticketWindow.document.title = "Documento de venta"; // Establecer el título de la pestaña
                ticketWindow.print();
            });
    }

});

