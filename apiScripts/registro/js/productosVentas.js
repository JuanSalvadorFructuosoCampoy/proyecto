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
th2.classList.add("p-2", "text-center")
th3.classList.add("p-2", "text-center")
th4.classList.add("p-2", "text-center")
th5.classList.add("p-2", "text-center")


tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);

thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaregistro").appendChild(tbody);

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
                td5.textContent = element.precio + "€";

                td1.classList.add("p-2", "text-center", "align-middle");
                td2.classList.add("p-2", "text-center", "align-middle");
                td3.classList.add("p-2", "text-center", "align-middle");
                td4.classList.add("p-2", "text-center", "align-middle");
                td5.classList.add("p-2", "text-center", "align-middle");
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tbody.appendChild(tr);

            });
        } else {
            const h2 = document.createElement("h2");
            const strong = document.createElement("strong");
            strong.textContent = "NO HAY PRODUCTOS O SERVICIOS REGISTRADOS PARA ESTA VENTA"
            h2.appendChild(strong);
            h2.classList.add("text-center", "mt-5");
            document.body.appendChild(h2);
        }
    });


const botonventas = document.createElement("button")
botonventas.textContent = "Ventas"
botonventas.classList.add("btn", "btn-info", "position-fixed", "bottom-0", "start-0", "m-3")
botonventas.setAttribute("id", "volver")
document.body.appendChild(botonventas)
botonventas.addEventListener("click", () => {
    window.location.href = "../registro/registro.html"
})

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

const botonReimprimir = document.createElement("button");
botonReimprimir.textContent = "Reimprimir documento";
botonReimprimir.classList.add("btn", "btn-success", "position-fixed", "bottom-0", "start-50", "m-3", "translate-middle-x");
botonReimprimir.setAttribute("id", `botonReimprimir`);
document.body.appendChild(botonReimprimir);


const barraBusqueda = document.createElement("input");
barraBusqueda.setAttribute("id", "busqueda");
barraBusqueda.setAttribute("type", "text");
barraBusqueda.setAttribute("placeholder", "Buscar evento");
barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
document.body.insertBefore(barraBusqueda, table);

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

})

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

botonReimprimir.addEventListener("click", async () => {

    if (clienteURL == "NO DEFINIDO") {
        fetch("../../../templates/ticket.html")
            .then(response => response.text())
            .then(ticket => {
                //Parseamos el texto HTML en un documento HTML
                const parser = new DOMParser();
                //Convertimos el texto HTML en un documento HTML
                const htmlDoc = parser.parseFromString(ticket, 'text/html');
                let textoFecha = document.createTextNode(fechaURL);
                htmlDoc.querySelector("img").setAttribute("src", "../../../images/imagenFondo.png");
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
                console.log(htmlDoc.documentElement.outerHTML)
                const ticketWindow = window.open("", "Documento de venta","width=300, height=200");
                ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                ticketWindow.print();
                ticketWindow.document.close();
            })
    } else {
        let fetchCliente = await fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${clienteURL}`, {
            headers: {
                "api-key": sessionStorage.getItem("token")
            }
        })
        let datosCliente = await fetchCliente.json();
        console.log(datosCliente.clientes[0])
        fetch("../../../templates/factura.html")
            .then(response => response.text())
            .then(factura => {
                const parser = new DOMParser();
                //Convertimos el texto HTML en un documento HTML
                const htmlDoc = parser.parseFromString(factura, 'text/html');

                htmlDoc.querySelector("img").setAttribute("src", "../../../images/imagenFondo.png");
                
                     let clienteFactura = `${datosCliente.clientes[0].nombre} ${datosCliente.clientes[0].apellido1} ${datosCliente.clientes[0].apellido2}`;
                     console.log(clienteFactura)
                     let textoDireccion = document.createTextNode(datosCliente.clientes[0].direccion);
                     htmlDoc.querySelector("#direccionCliente").insertBefore(textoDireccion, htmlDoc.querySelector("#direccionCliente").childNodes[1])

                     let textoIdFiscal = document.createTextNode(datosCliente.clientes[0].id_fiscal);
                     htmlDoc.querySelector("#idfiscal").insertBefore(textoIdFiscal, htmlDoc.querySelector("#idfiscal").childNodes[1])

                     let textoTelefono = document.createTextNode(datosCliente.clientes[0].telefono);
                     htmlDoc.querySelector("#telefono").insertBefore(textoTelefono, htmlDoc.querySelector("#telefono").childNodes[1])


                let textoFecha = document.createTextNode(fechaURL);
                htmlDoc.querySelector("#fecha").insertBefore(textoFecha, htmlDoc.querySelector("#fecha").childNodes[1])

                 let textoCliente = document.createTextNode(clienteFactura);
                 htmlDoc.querySelector("#nombreCliente").insertBefore(textoCliente, htmlDoc.querySelector("#nombreCliente").childNodes[1])

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
                    tdPrecio.textContent = (parseFloat(filas[i].childNodes[4].textContent) / 1.21).toFixed(2) + "€";
                    tr.appendChild(tdPrecio);

                    const tdCantidad = document.createElement("td");
                    tdCantidad.classList.add("qty");
                    tdCantidad.textContent = filas[i].childNodes[3].textContent;
                    tr.appendChild(tdCantidad);

                    const tdPrecioSubTotal = document.createElement("td");
                    tdPrecioSubTotal.classList.add("total");
                    tdPrecioSubTotal.textContent = (parseFloat(filas[i].childNodes[4].textContent) * parseFloat(filas[i].childNodes[3].textContent) / 1.21).toFixed(2) + "€";
                    tr.appendChild(tdPrecioSubTotal);
                }
                htmlDoc.querySelector("#baseImponible").textContent = (parseFloat(totalURL) / 1.21).toFixed(2) + "€";
                htmlDoc.querySelector("#totalFactura").textContent = totalURL;


                const ticketWindow = window.open("", "Documento de venta", "");
                ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                ticketWindow.document.title = "Documento de venta"; // Establecer el título de la pestaña
                ticketWindow.print();
                });
    }

});

