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
const clientes = document.getElementById("clientes")
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
            option.textContent = element.nombre
            option.value = element.id

            clientes.appendChild(option)
        })
    });

//Botón de volver
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver"
botonVolver.classList.add("btn", "btn-primary", "position-sm-absolute", "fixed-height", "top-sm-50", "start-sm-0", "position-xs-absolute", "position-fixed", "top-xs-0", "end-xs-0", "m-3", "top-xs-0", "end-xs-0", "m-3", "bottom-0")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../index.html"
})

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
}


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
}

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
        const fechaFormateada = `${year}-${month}-${day}`;

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
                    vaciarTabla();
                }
            })
    }

    //Recogemos el id de la última venta para poder insertar los items de la venta en la tabla productos_ventas
    fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php`, {
        headers: {
            "api-key": sessionStorage.getItem("token"),
        },
    })
        .then(response => response.json())
        .then(data => {
            idVentaNueva = data.ventas[data.ventas.length - 1].id
            items.forEach(item => {
                let itemVenta = {
                    id: data.ventas[data.ventas.length - 1].id,
                    id_item: item.dataset.id,
                    cantidad: item.childNodes[1].childNodes[0].value,
                    precio: item.childNodes[2].childNodes[0].value * item.childNodes[1].childNodes[0].value,
                    id_cliente: clientes.value != "0" ? cliente : null
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
                            }
                        })
                    })
            })

        })
        .then(() => {
            hacerFetch(sessionStorage.getItem("tipo") ? sessionStorage.getItem("tipo") : "productos");
    
})
    
})




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
}

function mostrarVentanaError(mensaje) {
    document.getElementById("ventanaError").style.display = "block";
    document.getElementById("ventanaError").textContent = mensaje;
    setTimeout(() => {
        document.getElementById("ventanaError").style.display = "none";
    }, 3000);
    return
}

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
        });

        const botonConfirmar = document.createElement("button");
        botonConfirmar.textContent = "Confirmar";
        botonConfirmar.classList.add("btn", "btn-success", "m-2");

        botonConfirmar.setAttribute("disabled", "true");

        document.getElementById("ventanaCambio").appendChild(botonConfirmar);
        botonConfirmar.addEventListener("click", () => {
            document.getElementById("ventanaCambio").classList.remove("d-block");
            document.getElementById("ventanaCambio").classList.add("d-none");

            resolve(true);
        });

        const botonCancelar = document.createElement("button");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.classList.add("btn", "btn-danger", "m-2");
        document.getElementById("ventanaCambio").appendChild(botonCancelar);

        botonCancelar.addEventListener("click", () => {
            document.getElementById("ventanaCambio").classList.remove("d-block");
            document.getElementById("ventanaCambio").classList.add("d-none");
            resolve(false);

        });
    });
}


