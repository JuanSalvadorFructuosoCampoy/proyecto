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
                //Si el stock es 0, la tarjeta se pone en rojo

                if(url == "productos" && item.stock == 0){
                    tarjeta.classList.add("bg-danger")
                    tarjeta.classList.remove("bg-light")
                    //Si el stock es menor de 5, la tarjeta se pone en amarillo
                } else if (url == "productos" && item.stock < 5){
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

//Botón de seleccionar entre factura o ticket
let radios = document.getElementsByName('documento-venta');
// Añade un evento 'change' a cada botón de opción
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function () {
        // Cuando se haga clic en un botón de opción, imprime su id
        if (this.checked) {
            console.log(this.id);
            //CÓDIGO PARA MANDAR EL TIPO DE DOCUMENTO
        }
    });
}

function seleccionarItem(tarjeta) {
    if(tarjeta.classList.contains("bg-danger")){
       mostrarVentanaError("No se puede seleccionar un item sin stock");
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

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const items = tbody.querySelectorAll("tr");
        if (items.length == 0) {
            mostrarVentanaError("No se puede realizar una venta sin productos o servicios")
            return;
        }

        let inputsCantidad = tbody.querySelectorAll("td:nth-child(2) input");
        let inputsPrecio = tbody.querySelectorAll("td:nth-child(3) input");

        let valoresNoValidos = false;

        inputsCantidad.forEach(input => {
            if (input.value == "" || input.value == "0" || input.value < 0 || isNaN(input.value) || input.value == null) {
                valoresNoValidos = true;
                console.log("Valores no válidos en la cantidad")
            }
        });

        inputsPrecio.forEach(input => {
            if (input.value == "" || input.value == "0" || input.value < 0 || isNaN(input.value) || input.value == null){
                valoresNoValidos = true;
                console.log("Valores no válidos en el precio")
            }
        });

        if (valoresNoValidos) {
            mostrarVentanaError("Hay valores nulos en el precio o en la cantidad de algún producto");
            return;
        }

        const radios = document.querySelectorAll("input[name='documento-venta']");
        let selectedValue;
        radios.forEach((radio) => {
            if (radio.checked) {
                selectedValue = radio.id;
            }
        });

        if(selectedValue == "factura" && clientes.value == "0"){
        mostrarVentanaError("No se puede emitir una factura sin cliente")
        return;

        }else if(selectedValue == "ticket" && clientes.value != "0"){
            mostrarVentanaError("No se puede emitir un ticket con cliente")
            return;

        }else{

        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const day = String(fechaActual.getDate()).padStart(2, '0');
        const fechaFormateada = `${year}-${month}-${day}`;
        const tipoPago = document.querySelectorAll("input[name='pago']");
        let valorPago;
        tipoPago.forEach((radio) => {
            if (radio.checked) {
                valorPago = radio.id;
            }
        });

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
                            id_item : item.dataset.id,
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
        })
        })

})

function mostrarVentanaError(mensaje){
        document.getElementById("ventanaError").style.display = "block";
        document.getElementById("ventanaError").textContent = mensaje;
        setTimeout(() => {
            document.getElementById("ventanaError").style.display = "none";
        }, 3000);
        return
}

function calcularPrecio() {
    const precios = tbody.querySelectorAll("td:nth-child(3) input");
    let total = 0;
    precios.forEach(precio => {
        total += parseFloat(precio.value) * parseInt(precio.parentElement.previousElementSibling.querySelector("input").value);
    })
    total = total.toFixed(2); //Sólo dos cifras decimales
    document.getElementById("total").textContent = total + "€";
    document.getElementById("total").setAttribute("value", total);
}




