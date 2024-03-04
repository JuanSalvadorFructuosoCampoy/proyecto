const categorias = document.querySelector("aside")
const radioProductos = document.querySelector('#productos');
const radioServicios = document.querySelector('#servicios');
const article = document.querySelector("article")
const tbody = document.querySelector("tbody")
let url = "productos"
const contenedorFluid = document.querySelector(".container-fluid")

//Barra de búsqueda
const barraBusqueda = document.createElement("input");
barraBusqueda.setAttribute("id", "busqueda");
barraBusqueda.setAttribute("type", "text");
barraBusqueda.setAttribute("placeholder", "Buscar item");
barraBusqueda.classList.add("form-control", "w-50");
const contenedorBusqueda = document.createElement("div");
contenedorBusqueda.classList.add("d-flex", "justify-content-start", "m-1");
contenedorBusqueda.appendChild(barraBusqueda);
document.body.insertBefore(contenedorBusqueda, contenedorFluid);
barraBusqueda.focus();
barraBusqueda.addEventListener("input", () => {
    const texto = barraBusqueda.value.toLowerCase();
    const tarjetas = document.querySelectorAll(".card");
    tarjetas.forEach(tarjeta => {
        const celdas = tarjeta.getElementsByTagName("div");
        let coincide = false; //Si coincide es true, se muestra la tarjeta
        for (let j = 0; j < celdas.length && !coincide; j++) { //Recorre las celdas de la tarjeta
            const celda = celdas[j]; //Cada celda
            if (celda.innerHTML.toLowerCase().indexOf(texto) !== -1) {//Si el texto está en la celda, coincide es true
                coincide = true;
                console.log(celda.innerHTML.toLowerCase())
            }
        }
        if (coincide) {
            tarjeta.classList.remove("d-none")
        } else {
            tarjeta.classList.add("d-none")
        }
    });
});

if (sessionStorage.getItem("tipo")) {//Si hay algo en el sessionStorage, se lo asigna a la variable url
    hacerFetch(sessionStorage.getItem("tipo"))
    if (sessionStorage.getItem("tipo") == "productos") {//Si el tipo es productos, se selecciona el radio de productos
        radioProductos.checked = true
    } else if (sessionStorage.getItem("tipo") == "servicios") {//Si el tipo es servicios, se selecciona el radio de servicios
        radioServicios.checked = true
    }
} else {
    hacerFetch(url)
}

//Cambia el tipo de item que se muestra: productos o servicios
document.querySelector("aside").addEventListener("change", () => {
    if (radioProductos.checked) {
        sessionStorage.setItem("tipo", "productos")
        radioProductos.checked = true

    } else if (radioServicios.checked) {
        sessionStorage.setItem("tipo", "servicios")
        radioServicios.checked = true
    }

    hacerFetch(sessionStorage.getItem("tipo"))
})

//Función para hacer fetch en la página de ventas
function hacerFetch(url) {
    article.innerHTML = ""
    fetch(`${window.location.protocol}//${window.location.host}/api/${url}.php`, {
        headers: {
            "api-key": sessionStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            const contenedor = document.createElement('div');
            article.appendChild(contenedor);
            const list = document.createElement("li");
            list.classList.add("row", "row-cols-md-2", "row-cols-lg-6", "row-cols-xl-6");
            contenedor.appendChild(list);
            data[url].forEach(item => {
                const tarjeta = document.createElement("div")
                tarjeta.classList.add("card", "col", "col-12", "col-sm-2", "col-md-5", "col-lg-6", "m-1", "text-center", "border", "bg-light", "rounded-3", "p-3", "d-flex", "align-items-center");
                tarjeta.setAttribute("id", item.id);

                //Guardamos el stock del producto en el dataset de la tarjeta
                if (url == "productos") {

                    tarjeta.dataset.stock = item.stock;
                }

                //Si el stock es 0, la tarjeta se pone en rojo
                if (url == "productos" && item.stock <= 0) {
                    tarjeta.classList.add("bg-danger")
                    tarjeta.classList.remove("bg-light")
                    //Si el stock es menor de 5, la tarjeta se pone en amarillo
                } else if (url == "productos" && item.stock < 5) {
                    tarjeta.classList.add("bg-warning")
                    tarjeta.classList.remove("bg-light")
                }

                list.appendChild(tarjeta);
                const titulo = document.createElement("div");
                const strong = document.createElement("strong");
                strong.textContent = item.nombre;
                titulo.appendChild(strong);
                const precio = document.createElement("div")
                precio.textContent = item.precio + "€";
                tarjeta.append(titulo, precio);

                //Evento para seleccionar el item
                tarjeta.addEventListener("click", () => {
                    seleccionarItem(tarjeta);
                })
            });
        })
}

//Desplegable de empleados
const empleados = document.getElementById("empleados")
fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        data.empleados.forEach(element => {

            const option = document.createElement("option")
            option.textContent = element.nombre
            option.value = element.id
            if (option.value == sessionStorage.getItem("id")) {
                option.selected = true
            }
            empleados.appendChild(option)
        })
    });


//Desplegable de clientes
function desplegableClientes(idNuevoCliente) {
    const clientes = document.getElementById("clientes")
    clientes.innerHTML = ""
    fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php`, {
        headers: {
            "api-key": sessionStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            const sinClientes = document.createElement("option")
            sinClientes.textContent = "NO DEFINIDO"
            sinClientes.value = "0"
            clientes.appendChild(sinClientes)
            sinClientes.selected = true

            data.clientes.forEach(element => {

                const option = document.createElement("option")
                option.textContent = element.nombre + " " + element.apellido1 + " " + element.apellido2
                option.value = element.id
                option.dataset.telefono = element.telefono
                option.dataset.direccion = element.direccion
                option.dataset.idfiscal = element.id_fiscal

                if (option.value == idNuevoCliente) {
                    option.selected = true
                    sinClientes.selected = false
                }
                clientes.appendChild(option)
            })
        });
}
desplegableClientes()

//Botón de volver
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver"
botonVolver.classList.add("btn", "btn-primary", "position-sm-absolute", "fixed-height", "top-sm-50", "start-sm-0", "position-xs-absolute", "position-fixed", "top-xs-0", "end-xs-0", "m-3", "top-xs-0", "end-xs-0", "m-3", "bottom-0")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../index.html"
})


//Función que selecciona un item
function seleccionarItem(tarjeta) {
    if (tarjeta.classList.contains("bg-danger")) {
        mostrarVentanaError("NO SE PUEDE SELECCIONAR UN ITEM SIN STOCK");
        return;
    }

    //Si el id de la tarjeta coincide con el de una fila, encontrado es true
    const encontrado = Array.from(tbody.getElementsByTagName("tr")).find(tr => tr.dataset.id == tarjeta.id);
    if (encontrado) {
        const cantidadElemento = encontrado.querySelector("td:nth-child(2) input");
        cantidadElemento.value = parseInt(cantidadElemento.value) + 1;
        calcularPrecio();
    } else {

        const tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.dataset.id = tarjeta.id;
        const tdNombre = document.createElement("td");
        tdNombre.classList.add("white")
        tdNombre.textContent = tarjeta.childNodes[0].textContent;
        tr.appendChild(tdNombre);



        const tdCantidad = document.createElement("td");
        const cantidad = document.createElement("input");
        cantidad.setAttribute("type", "number");
        cantidad.setAttribute("max", tarjeta.dataset.stock) //El máximo de la cantidad es el stock del producto
        cantidad.setAttribute("min", "0");
        cantidad.classList.add("cantidad")
        cantidad.value = 1;
        tr.appendChild(tdCantidad)
        tdCantidad.appendChild(cantidad);
        tdCantidad.addEventListener("input", () => {
            if (cantidad.value < 0) {
                cantidad.value = 0;
            }
            calcularPrecio();
        })

        tdCantidad.addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
            }
            calcularPrecio();
        })

        const tdPrecio = document.createElement("td");
        const precio = document.createElement("input");
        tdPrecio.classList.add("justify-content-center");
        precio.classList.add("precio")
        precio.setAttribute("type", "number");
        precio.setAttribute("min", "0");
        precio.setAttribute("step", "0.01");
        precio.value = parseFloat(tarjeta.childNodes[1].textContent)
        tdPrecio.appendChild(precio);
        tdPrecio.appendChild(document.createTextNode("€"));
        tr.appendChild(tdPrecio);
        tdPrecio.addEventListener("input", () => {
            if (precio.value < 0) {
                precio.value = 0;
            }
            calcularPrecio();
        })


        tdPrecio.addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
            }
            calcularPrecio();
        })


        const tdEliminar = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "X";
        tdEliminar.classList.add("d-flex", "align-items-center", "justify-content-center");
        botonEliminar.classList.add("btn", "btn-danger");
        tdEliminar.appendChild(botonEliminar);
        tr.appendChild(tdEliminar);

        botonEliminar.addEventListener("click", () => {
            tr.remove();
            calcularPrecio();
        })

        calcularPrecio();
    }
}//Fin seleccionarItem


document.querySelector("input").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
    }
})

document.getElementById("cancelarVenta").addEventListener("click", (e) => {
    e.preventDefault();
    vaciarTabla();
})

function vaciarTabla() {
    tbody.innerHTML = "";
    calcularPrecio();
}//Fin vaciarTabla

const form = document.querySelector("form");

//Evento para enviar el formulario de la venta
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const items = tbody.querySelectorAll("tr");
    //Si no hay items, se muestra un mensaje de error
    if (items.length == 0) {
        mostrarVentanaError("NO SE PUEDE HACER UNA VENTA SIN PRODUCTOS O SERVICIOS")
        return;
    }

    let inputsCantidad = tbody.querySelectorAll("td:nth-child(2) input");
    let inputsPrecio = tbody.querySelectorAll("td:nth-child(3) input");

    let valoresNoValidos = false;

    //Comprobamos que los valores de cantidad y precio sean válidos
    inputsCantidad.forEach(input => {
        if (input.value == "" || input.value == "0" || input.value < 0 || isNaN(input.value) || input.value == null) {
            valoresNoValidos = true;
        }
    });

    inputsPrecio.forEach(input => {
        if (input.value == "" || input.value == "0" || input.value < 0 || isNaN(input.value) || input.value == null) {
            valoresNoValidos = true;
        }
    });

    //Si hay valores no válidos, se muestra un mensaje de error
    if (valoresNoValidos) {
        mostrarVentanaError("HAY VALORES ERRÓNEOS EN LA CANTIDAD O PRECIO DE ALGÚN PRODUCTO O SERVICIO");
        return;
    }

    const radios = document.querySelectorAll("input[name='documento-venta']");
    let selectedValue;
    radios.forEach((radio) => {
        if (radio.checked) {
            selectedValue = radio.id;
        }
    });

    //Si se intenta hacer una factura sin cliente o un ticket con cliente, se muestra un mensaje de error
    if (selectedValue == "factura" && clientes.value == "0") {
        mostrarVentanaError("NO SE PUEDE EMITIR UNA FACTURA SIN CLIENTE")
        return;

        //Si se intenta hacer un ticket con cliente, se muestra un mensaje de error
    } else if (selectedValue == "ticket" && clientes.value != "0") {
        mostrarVentanaError("NO SE PUEDE EMITIR UN TICKET CON CLIENTE")
        return;

    } else {

        //Si todo es correcto, se inserta la venta en la base de datos
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const day = String(fechaActual.getDate()).padStart(2, '0');
        const hour = String(fechaActual.getHours()).padStart(2, '0');
        const minutes = String(fechaActual.getMinutes()).padStart(2, '0');
        const fechaFormateada = `${year}-${month}-${day} ${hour}:${minutes}`;

        //Recogemos el tipo de pago: efectivo o tarjeta
        const tipoPago = document.querySelectorAll("input[name='pago']");//Recogemos el tipo de pago
        let valorPago;

        tipoPago.forEach((radio) => {
            if (radio.checked) {
                valorPago = radio.id;
            }
        });

        if (valorPago == "efectivo") {
            const confirmarVenta = await mostrarVentanaCambio("PAGADO EN EFECTIVO");
            if (!confirmarVenta) {
                return;
            }
        }

        const venta = {
            fecha: fechaFormateada,
            total: parseFloat(document.getElementById("total").getAttribute("value")),
            empleado: empleados.value,
            tipo: valorPago,
        }

        if (clientes.value != "0") {
            venta.cliente = clientes.value;
        }
        //Si se ha seleccionado un ticket, se muestra el ticket en una ventana nueva
        if (selectedValue == "ticket") {
            fetch("../../../templates/ticket.html")
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    //Convertimos el texto HTML en un documento HTML
                    const htmlDoc = parser.parseFromString(data, 'text/html');
                    htmlDoc.querySelector("img").setAttribute("src", "../../../images/imagenFondo.png");

                    const fechaActual = new Date();
                    const year = fechaActual.getFullYear();
                    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
                    const day = String(fechaActual.getDate()).padStart(2, '0');
                    const hour = String(fechaActual.getHours()).padStart(2, '0');
                    const minutes = String(fechaActual.getMinutes()).padStart(2, '0');
                    const fechaFormateada = `${day}/${month}/${year} - ${hour}:${minutes}`;
                    htmlDoc.querySelector("#fecha").textContent = fechaFormateada;
                    htmlDoc.querySelector("#empleado").textContent = empleados.options[empleados.selectedIndex].textContent;
                    const tbody = document.querySelector("tbody");
                    const items = tbody.querySelectorAll("tr");
                    items.forEach(item => {
                        const tr = document.createElement("tr");
                        htmlDoc.querySelector("tbody").appendChild(tr);

                        const tdCantidad = document.createElement("td");
                        tdCantidad.classList.add("cantidad");
                        tdCantidad.textContent = item.childNodes[1].childNodes[0].value;
                        tr.appendChild(tdCantidad);

                        const tdNombre = document.createElement("td");
                        tdNombre.classList.add("producto");
                        tdNombre.textContent = item.childNodes[0].textContent;
                        tr.appendChild(tdNombre);

                        const tdPrecio = document.createElement("td");
                        tdPrecio.classList.add("precio");
                        tdPrecio.textContent = item.childNodes[2].childNodes[0].value * item.childNodes[1].childNodes[0].value + "€";
                        tr.appendChild(tdPrecio);
                    });

                    const total = document.getElementById("total").textContent;
                    htmlDoc.querySelector("#total").textContent = total;

                    const ticketWindow = window.open("", "Documento de venta","width=800px,height=800px");
                    ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                    ticketWindow.document.title = "Documento de venta"; // Establecer el título de la pestaña
                    ticketWindow.print();
                    window.location.reload();

                });
        } else {
            fetch("../../../templates/factura.html")
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    //Convertimos el texto HTML en un documento HTML
                    const htmlDoc = parser.parseFromString(data, 'text/html');
                    htmlDoc.querySelector("img").setAttribute("src", "../../../images/imagenFondo.png");
                    let clienteFactura = document.querySelector("#clientes").options[document.querySelector("#clientes").selectedIndex];
                    let textoDireccion = document.createTextNode(clienteFactura.dataset.direccion);
                    htmlDoc.querySelector("#direccionCliente").insertBefore(textoDireccion, htmlDoc.querySelector("#direccionCliente").childNodes[1])

                    let textoIdFiscal = document.createTextNode(clienteFactura.dataset.idfiscal);
                    htmlDoc.querySelector("#idfiscal").insertBefore(textoIdFiscal, htmlDoc.querySelector("#idfiscal").childNodes[1])

                    let textoTelefono = document.createTextNode(clienteFactura.dataset.telefono);
                    htmlDoc.querySelector("#telefono").insertBefore(textoTelefono, htmlDoc.querySelector("#telefono").childNodes[1])


                    const fechaActual = new Date();
                    const year = fechaActual.getFullYear();
                    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
                    const day = String(fechaActual.getDate()).padStart(2, '0');
                    const hour = String(fechaActual.getHours()).padStart(2, '0');
                    const minutes = String(fechaActual.getMinutes()).padStart(2, '0');
                    const fechaFormateada = `${day}/${month}/${year} - ${hour}:${minutes}`;
                    let textoFecha = document.createTextNode(fechaFormateada);
                    htmlDoc.querySelector("#fecha").insertBefore(textoFecha, htmlDoc.querySelector("#fecha").childNodes[1])

                    let textoCliente = document.createTextNode(clientes.options[clientes.selectedIndex].textContent);
                    htmlDoc.querySelector("#nombreCliente").insertBefore(textoCliente, htmlDoc.querySelector("#nombreCliente").childNodes[1])

                    const tbody = document.querySelector("tbody");
                    const items = tbody.querySelectorAll("tr");
                    items.forEach(item => {
                        const tr = document.createElement("tr");
                        htmlDoc.querySelector("tbody").appendChild(tr);

                        const tdNombre = document.createElement("td");
                        tdNombre.classList.add("desc");
                        tdNombre.textContent = item.childNodes[0].textContent;
                        tr.appendChild(tdNombre);

                        const tdPrecio = document.createElement("td");
                        tdPrecio.classList.add("unit");
                        tdPrecio.textContent = (item.childNodes[2].childNodes[0].value / 1.21).toFixed(2) + "€";
                        tr.appendChild(tdPrecio);

                        const tdCantidad = document.createElement("td");
                        tdCantidad.classList.add("qty");
                        tdCantidad.textContent = item.childNodes[1].childNodes[0].value;
                        tr.appendChild(tdCantidad);

                        const tdPrecioSubTotal = document.createElement("td");
                        tdPrecioSubTotal.classList.add("total");
                        tdPrecioSubTotal.textContent = (item.childNodes[2].childNodes[0].value * item.childNodes[1].childNodes[0].value / 1.21).toFixed(2) + "€";
                        tr.appendChild(tdPrecioSubTotal);

                    });

                    const total = document.getElementById("total").textContent;
                    htmlDoc.querySelector("#baseImponible").textContent = (parseFloat(total) / 1.21).toFixed(2) + "€";
                    htmlDoc.querySelector("#totalFactura").textContent = total;


                    const ticketWindow = window.open("", "Documento de venta","width=800px,height=800px");
                    ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                    ticketWindow.document.title = "Documento de venta"; // Establecer el título de la pestaña
                    ticketWindow.print();
                    window.location.reload();

                });
        }//Final impresion tickets y facturas   

        //Insertamos en la tabla ventas de la base de datos los datos de la venta: fecha, cliente (si lo hay), empleado, total de la venta y si ha sido en efectivo o con
        fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php`, {
            method: "POST",
            headers: {
                "api-key": sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(venta)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    //Recogemos el id de la última venta para poder insertar los items de la venta en la tabla productos_ventas
                    fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php`, {
                        headers: {
                            "api-key": sessionStorage.getItem("token"),
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            idVentaNueva = data.ventas[data.ventas.length - 1].id
                            console.log('idVentaNueva',idVentaNueva)
                            items.forEach(item => {
                                let itemVenta = {
                                    id: data.ventas[data.ventas.length - 1].id,
                                    id_item: item.dataset.id,
                                    cantidad: item.childNodes[1].childNodes[0].value,
                                    precio: item.childNodes[2].childNodes[0].value * item.childNodes[1].childNodes[0].value,
                                    id_cliente: clientes.value != "0" ? clientes.value : null
                                }

                                //Insertamos en la tabla productos_ventas de la base de datos los datos de la venta: id de la venta, id del item, cantidad, precio y si hay cliente, el id del cliente
                                fetch(`${window.location.protocol}//${window.location.host}/api/productos_ventas.php`, {
                                    method: "POST",
                                    headers: {
                                        "api-key": sessionStorage.getItem("token"),
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(itemVenta)
                                })

                                //Actualizamos el stock de los productos
                                fetch(`${window.location.protocol}//${window.location.host}/api/productos.php`, {
                                    headers: {
                                        "api-key": sessionStorage.getItem("token")
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        data.productos.forEach(producto => {
                                            if (producto.id == item.dataset.id) {
                                                fetch(`${window.location.protocol}//${window.location.host}/api/productos.php`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "api-key": sessionStorage.getItem("token"),
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({
                                                        id: item.dataset.id,
                                                        stock: producto.stock - item.childNodes[1].childNodes[0].value
                                                    })
                                                })
                                                    .then(() => {
                                                        hacerFetch(sessionStorage.getItem("tipo") ? sessionStorage.getItem("tipo") : "productos");

                                                    })

                                            }//Fin if producto.id

                                        })//Fin forEach productos

                                    })//Fin fetch productos

                            })//Fin forEach items

                        })//Fin fetch ventas para recoger el id de la última venta
                    vaciarTabla();
                }//Fin else de if data.error
            })//Fin fetch ventas para insertar la venta en la base de datos
    }//Fin else de if selectedValue
})//Fin evento submit del formulario

//Función para calcular el precio de la venta
function calcularPrecio() {
    const precios = tbody.querySelectorAll("td:nth-child(3) input");
    let total = 0;
    precios.forEach(precio => {
        total += parseFloat(precio.value) * parseInt(precio.parentElement.previousElementSibling.querySelector("input").value);
    })
    total = total.toFixed(2); //Sólo dos cifras decimales
    if (total == "NaN") {
        total = 0;
    }
    document.getElementById("total").textContent = total + "€";
    document.getElementById("total").setAttribute("value", total);
}//Fin calcularPrecio

//Función que nos muestra la ventana de error
function mostrarVentanaError(mensaje) {
    document.getElementById("ventanaError").style.display = "block";
    document.getElementById("ventanaError").textContent = mensaje;
    setTimeout(() => {
        document.getElementById("ventanaError").style.display = "none";
    }, 3000);
    return
}//Fin mostrarVentanaError


//Función que nos muestra la ventana de cambio de pago en efectivo
function mostrarVentanaCambio(mensaje) {
    return new Promise((resolve, reject) => {

        document.getElementById("ventanaCambio").innerHTML = "";
        document.getElementById("ventanaCambio").classList.remove("d-none");
        document.getElementById("ventanaCambio").classList.add("align-items-center", "justify-content-center", "d-flex")
        const p = document.createElement("P")
        p.classList.add("text-center", "m-2")
        p.textContent = mensaje;
        document.getElementById("ventanaCambio").append(p);
        const inputDineroIntroducido = document.createElement("input");
        inputDineroIntroducido.setAttribute("type", "number");
        inputDineroIntroducido.setAttribute("placeholder", "Pagado");
        inputDineroIntroducido.classList.add("form-control");
        inputDineroIntroducido.style.width = "6em";

        document.getElementById("ventanaCambio").appendChild(inputDineroIntroducido);
        inputDineroIntroducido.focus();

        const cambio = document.createElement("p");
        cambio.setAttribute("id", "cambio");
        cambio.textContent = "CAMBIO";
        cambio.classList.add("text-center", "m-2");
        document.getElementById("ventanaCambio").appendChild(cambio);

        const inputCambio = document.createElement("input")
        inputCambio.setAttribute("disabled", "true");
        inputCambio.style.width = "6em";
        inputCambio.setAttribute("aria-describedby", "inputGroup-sizing-lg")
        inputCambio.classList.add("form-control", "w-50");
        document.getElementById("ventanaCambio").appendChild(inputCambio);


        inputDineroIntroducido.addEventListener("input", () => {
            const total = parseFloat(document.getElementById("total").getAttribute("value"));
            const dineroIntroducido = parseFloat(inputDineroIntroducido.value);
            inputDineroIntroducido.setAttribute("aria-describedby", "inputGroup-sizing-lg")
            const cambio = dineroIntroducido - total;
            inputCambio.value = cambio.toFixed(2) + "€";
            if (cambio >= 0) {
                botonConfirmar.removeAttribute("disabled");
            } else {
                botonConfirmar.setAttribute("disabled", "true");
            }
            if (cambio == null || cambio == "NaN" || inputCambio.value == "NaN€") {
                inputCambio.value = "";
            }
        });//Fin inputDineroIntroducido

        const botonConfirmar = document.createElement("button");
        botonConfirmar.textContent = "Confirmar";
        botonConfirmar.classList.add("btn", "btn-success", "m-2");

        botonConfirmar.setAttribute("disabled", "true");

        document.getElementById("ventanaCambio").appendChild(botonConfirmar);
        botonConfirmar.addEventListener("click", () => {
            document.getElementById("ventanaCambio").classList.remove("d-block");
            document.getElementById("ventanaCambio").classList.add("d-none");

            resolve(true);
        });//Fin botonConfirmar

        const botonCancelar = document.createElement("button");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.classList.add("btn", "btn-danger", "m-2");
        document.getElementById("ventanaCambio").appendChild(botonCancelar);

        botonCancelar.addEventListener("click", () => {
            document.getElementById("ventanaCambio").classList.remove("d-block");
            document.getElementById("ventanaCambio").classList.add("d-none");
            resolve(false);

        });//Fin botonCancelar
    });//Fin promise
}//Fin mostrarVentanaCambio


//Nuevo cliente con ventana emergente
const nuevoCliente = document.getElementById("nuevoCliente");
nuevoCliente.addEventListener("click", (e) => {
    e.preventDefault();
    const ventanaNuevoCliente = document.getElementById("ventanaNuevoCliente");
    ventanaNuevoCliente.classList.remove("d-none");
    ventanaNuevoCliente.classList.add("p-1");

    //Script de nuevoCliente
    const formularioNuevoCliente = document.getElementsByTagName('form')[1];
    const errorMessageElementTelefono = document.createElement('p');
    formularioNuevoCliente.querySelector('#telefono').insertAdjacentElement('afterend', errorMessageElementTelefono);
    const errorMessageElementIdFiscal = document.createElement('p');
    formularioNuevoCliente.querySelector('#id_fiscal').insertAdjacentElement('afterend', errorMessageElementIdFiscal);
    formularioNuevoCliente.querySelector('#id_fiscal').focus();
    const enviarNuevoCliente = document.getElementById('enviarNuevoCliente');
    enviarNuevoCliente.addEventListener('click', async (e) => { //Función asíncrona que espera a que se resuelva la promesa de la función hashInput
        e.preventDefault();

        const mensajesError = formularioNuevoCliente.querySelectorAll('.text-danger');
        mensajesError.forEach(mensaje => mensaje.remove());
        let nombre = formularioNuevoCliente.querySelector('#nombre').value.trim();
        let id_fiscal = formularioNuevoCliente.querySelector('#id_fiscal').value.trim();
        let apellido1 = formularioNuevoCliente.querySelector('#apellido1').value.trim();
        let apellido2 = formularioNuevoCliente.querySelector('#apellido2').value.trim();
        let telefono = formularioNuevoCliente.querySelector('#telefono').value.trim();
        let direccion = formularioNuevoCliente.querySelector('#direccion').value.trim();

        // Validar contraseña
        const telefonoRegex = /^\d{9}$|^\d{3}\s\d{2}\s\d{2}\s\d{2}$|^\d{3}\s\d{3}\s\d{3}$/;
        if (!telefonoRegex.test(telefono)) {
            errorMessageElementTelefono.textContent = ""
            let errorMessage = "Error en el teléfono. Solamente acepta números y espacios";
            errorMessageElementTelefono.textContent = errorMessage;
            errorMessageElementTelefono.classList.add("text-danger")
            return;
        }
        telefono = telefono.replaceAll(" ", "");
        id_fiscal = id_fiscal.toUpperCase(); // Reemplazar las minúsculas por mayúsculas
        id_fiscal = id_fiscal.replaceAll(" ", ""); // Eliminar espacios
        id_fiscal = id_fiscal.replaceAll("-", ""); // Eliminar guiones

        if (!validateDNI(id_fiscal)) {
            let errorMessage = "Error en el ID fiscal. El formato no es válido";
            errorMessageElementIdFiscal.textContent = ""
            errorMessageElementIdFiscal.textContent = errorMessage;
            errorMessageElementIdFiscal.classList.add("text-danger")

            return;
        }

        const datosInput = {
            nombre: nombre,
            id_fiscal: id_fiscal,
            apellido1: apellido1,
            apellido2: apellido2,
            telefono: telefono,
            direccion: direccion
        }

        const jsonDatos = JSON.stringify(datosInput)
        fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "api-key": sessionStorage.getItem("token")
            },
            body: jsonDatos
        })
            .then(response => response.json())
            .then(data => {
                console.log('Éxito:', data);
                const ventanaNuevoCliente = document.getElementById("ventanaNuevoCliente");
                ventanaNuevoCliente.classList.add("d-none");
                formularioNuevoCliente.querySelector('#nombre').value = ""
                formularioNuevoCliente.querySelector('#id_fiscal').value = ""
                formularioNuevoCliente.querySelector('#apellido1').value = ""
                formularioNuevoCliente.querySelector('#apellido2').value = ""
                formularioNuevoCliente.querySelector('#telefono').value = ""
                formularioNuevoCliente.querySelector('#direccion').value = ""
                desplegableClientes(data.insert_id)
            })
            .catch((error) => {
                console.error('Error:', error);
            });//Fin fetch
    });//Fin enviarNuevoCliente

    const cancelarNuevoCliente = document.getElementById('cancelarNuevoCliente');
    cancelarNuevoCliente.addEventListener('click', () => {
        const ventanaNuevoCliente = document.getElementById("ventanaNuevoCliente");
        ventanaNuevoCliente.classList.add("d-none");
        formularioNuevoCliente.querySelector('#nombre').value = ""
        formularioNuevoCliente.querySelector('#id_fiscal').value = ""
        formularioNuevoCliente.querySelector('#apellido1').value = ""
        formularioNuevoCliente.querySelector('#apellido2').value = ""
        formularioNuevoCliente.querySelector('#telefono').value = ""
        formularioNuevoCliente.querySelector('#direccion').value = ""
    });

    // Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).
    // Acepta NIEs (Extranjeros con X, Y o Z al principio)
    function validateDNI(dni) {
        var numero, let, letra;
        var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

        dni = dni.toUpperCase();

        if (expresion_regular_dni.test(dni) === true) {
            numero = dni.substr(0, dni.length - 1);
            numero = numero.replace('X', 0);
            numero = numero.replace('Y', 1);
            numero = numero.replace('Z', 2);
            let = dni.substr(dni.length - 1, 1);
            numero = numero % 23;
            letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letra = letra.substring(numero, numero + 1);
            if (letra != let) {
                //alert('Dni erroneo, la letra del NIF no se corresponde');
                return false;
            } else {
                //alert('Dni correcto');
                return true;
            }
        } else {
            //alert('Dni erroneo, formato no válido');
            return false;
        }
    }

})//Fin nuevoCliente