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

th1.textContent = "ID";
th2.textContent = "Fecha";
th3.textContent = "Empleado";
th4.textContent = "Cliente";
th5.textContent = "Tipo de pago";
th6.textContent = "Total";

th1.classList.add("p-2", "text-center")
th2.classList.add("p-2", "text-center")
th3.classList.add("p-2", "text-center")
th4.classList.add("p-2", "text-center")
th5.classList.add("p-2", "text-center")
th6.classList.add("p-2", "text-center")
th7.classList.add("p-2", "text-center")

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);
tr.appendChild(th6);
tr.appendChild(th7);

thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaregistro").appendChild(tbody);

fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.ventas.length == 0) {
            const h4 = document.createElement("h4");
            const strong = document.createElement("strong");
            h4.classList.add("text-center");
            strong.textContent = "NO HAY VENTAS REGISTRADAS"
            h4.appendChild(strong);
            document.body.appendChild(h4);
        } else {

            data.ventas.forEach(element => {

                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");


                td1.classList.add("p-2", "text-center")
                td2.classList.add("p-2", "text-center")
                td3.classList.add("p-2", "text-center")
                td4.classList.add("p-2", "text-center")
                td5.classList.add("p-2", "text-center")
                td6.classList.add("p-2", "text-center")
                td7.classList.add("p-2", "text-center")

                td1.textContent = element.id;

                const fecha = new Date(element.fecha);
                const dia = fecha.getDate().toString().padStart(2, '0');
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const anio = fecha.getFullYear().toString();
                const hora = fecha.getHours().toString().padStart(2, '0');
                const minutos = fecha.getMinutes().toString().padStart(2, '0');
                td2.textContent = `${dia}/${mes}/${anio} - ${hora}:${minutos}`;
                
                hacerFetch(`${window.location.protocol}//${window.location.host}/api/empleados.php?id=${element.empleado}`)
                .then(data => {
                    if(data.empleados[0]){
                    td3.textContent = data.empleados[0].nombre
                    }else{
                        td3.textContent = "NO DEFINIDO"
                    }
                })

                hacerFetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${element.cliente}`)
                    .then(data => {
                        if (data.clientes.length > 0) {
                            td4.textContent = data.clientes[0].nombre + " " + data.clientes[0].apellido1;
                        } else {
                            td4.textContent = "NO DEFINIDO";
                        }
                    });
                
                td5.textContent = element.tipo;

                td6.textContent = element.total + "€";
                
                const botonFicha = document.createElement("button");
                botonFicha.textContent = "Detalle";
                botonFicha.classList.add("btn", "btn-warning","btn-sm");
                botonFicha.setAttribute("id", `botonFicha${element.id}`);
                td7.appendChild(botonFicha);

                const botonReimprimir = document.createElement("button");
                botonReimprimir.textContent = "Reimprimir";
                botonReimprimir.classList.add("btn", "btn-success","btn-sm","m-1");
                botonReimprimir.setAttribute("id", `botonReimprimir${element.id}`);
                td7.appendChild(botonReimprimir);

                const botonBorrar = document.createElement("button");
                botonBorrar.textContent = "Borrar";
                botonBorrar.classList.add("btn", "btn-danger","btn-sm");
                botonBorrar.setAttribute("id", `botonBorrar${element.id}`);
                td7.appendChild(botonBorrar);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tbody.appendChild(tr);

                botonFicha.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    window.location.href = `productos_ventas.html?id=${id}`
                })

                botonBorrar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    const confirmDelete = confirm("¿Estás seguro de que quieres borrar esta venta? Se borrarán todos los registros asociados a la misma.");
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

                botonReimprimir.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php?id=${id}`, {
                        headers: {
                            "api-key": sessionStorage.getItem("token")
                        }
                    })
                    .then(response => response.json())
                    .then(datosVenta => {
                        console.log(datosVenta['ventas'][0].cliente);
                        if(datosVenta['ventas'][0].cliente){
                            fetch("../../../templates/ticket.html")
                .then(response => response.text())
                .then(dataHTML => {
                    // console.log(dataHTML)
                    // const parser = new DOMParser();
                    // //Convertimos el texto HTML en un documento HTML
                    // const htmlDoc = parser.parseFromString(data, 'text/html');
                    // htmlDoc.querySelector("img").setAttribute("src", "../../../images/imagenFondo.png");
                    // const fechaDocumento = data.fecha;
                    // const year = fechaDocumento.getFullYear();
                    // const month = String(fechaDocumento.getMonth() + 1).padStart(2, '0');
                    // const day = String(fechaDocumento.getDate()).padStart(2, '0');
                    // const hour = String(fechaDocumento.getHours()).padStart(2, '0');
                    // const minutes = String(fechaDocumento.getMinutes()).padStart(2, '0');
                    // const fechaFormateada = `${day}/${month}/${year} - ${hour}:${minutes}`;
                    // htmlDoc.querySelector("#fecha").textContent = fechaFormateada;
                    // htmlDoc.querySelector("#empleado").textContent = empleados.options[empleados.selectedIndex].textContent;
                    // const tbody = document.querySelector("tbody");
                    // const items = tbody.querySelectorAll("tr");
                    
                    //     fetch(`${window.location.protocol}//${window.location.host}/api/ventas.php?id=${id}`)
                    
                    // items.forEach(item => {
                    //     const tr = document.createElement("tr");
                    //     htmlDoc.querySelector("tbody").appendChild(tr);

                    //     const tdCantidad = document.createElement("td");
                    //     tdCantidad.classList.add("cantidad");
                    //     tdCantidad.textContent = item.childNodes[1].childNodes[0].value;
                    //     tr.appendChild(tdCantidad);

                    //     const tdNombre = document.createElement("td");
                    //     tdNombre.classList.add("producto");
                    //     tdNombre.textContent = item.childNodes[0].textContent;
                    //     tr.appendChild(tdNombre);

                    //     const tdPrecio = document.createElement("td");
                    //     tdPrecio.classList.add("precio");
                    //     tdPrecio.textContent = item.childNodes[2].childNodes[0].value * item.childNodes[1].childNodes[0].value + "€";
                    //     tr.appendChild(tdPrecio);
                    // });

                    // const total = document.getElementById("total").textContent;
                    // htmlDoc.querySelector("#total").textContent = total;

                    // const ticketWindow = window.open("", "Documento de venta");
                    // ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                    // ticketWindow.document.title = "Documento de venta"; // Establecer el título de la pestaña
                    // ticketWindow.print();
                    // window.location.reload();

                });//Fin del fetch del ticket
                        }else{
                            fetch
                        }
                    })//Fin del fetch de la venta a reimprimir
                });//Fin del evento de reimprimir
            })//Fin del forEach de las ventas
        }//Fin del else de la tabla

        const barraBusqueda = document.createElement("input");
        barraBusqueda.setAttribute("id", "busqueda");
        barraBusqueda.setAttribute("type", "text");
        barraBusqueda.setAttribute("placeholder", "Buscar registro");
        barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
        document.body.insertBefore(barraBusqueda, table);
        barraBusqueda.focus();
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

    });

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})


async function hacerFetch(url){
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
