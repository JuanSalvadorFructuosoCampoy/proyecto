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

th1.classList.add("p-2", "text-center")
th2.classList.add("p-2", "text-center")
th3.classList.add("p-2", "text-center")
th4.classList.add("p-2", "text-center")


tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);




thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaregistro").appendChild(tbody);

fetch(`${window.location.protocol}//${window.location.host}/api/cierre_caja.php`, {
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



                td1.classList.add("p-2", "text-center", "align-middle","fs-5");
                td3.classList.add("p-2", "text-center", "align-middle","fs-5")
                td4.classList.add("p-2", "text-center", "align-middle","fs-5")
                td2.classList.add("p-2", "text-center", "align-middle","fs-5")
                td5.classList.add("p-2", "text-center", "align-middle","fs-5")
                

                td1.textContent = element.fecha;

                const fecha = new Date(element.fecha);
                const dia = fecha.getDate().toString().padStart(2, '0');
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const anio = fecha.getFullYear().toString();
                td1.textContent = `${dia}/${mes}/${anio}`;

                td2.textContent = `${parseFloat(element.efectivo).toFixed(2)}€`;
                td3.textContent = `${parseFloat(element.tarjeta).toFixed(2)}€`;


                const total = (parseFloat(element.efectivo) + parseFloat(element.tarjeta)).toFixed(2);
                td4.textContent = `${total}€`;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tbody.appendChild(tr);

                const botonImprimir = document.createElement("button");
                botonImprimir.textContent = "Imprimir";
                botonImprimir.classList.add("btn", "btn-success", "m-1");
                botonImprimir.setAttribute("id", "imprimir");
                td5.appendChild(botonImprimir);

                botonImprimir.addEventListener("click", async (e) => {
                    let anio = e.target.parentElement.parentElement.children[0].textContent.split("/")[2];
                    let mes = e.target.parentElement.parentElement.children[0].textContent.split("/")[1];
                    let dia = e.target.parentElement.parentElement.children[0].textContent.split("/")[0];
                    let fecha = `${anio}-${mes}-${dia}`;
                 let fetchDia =   await fetch(`${window.location.protocol}//${window.location.host}/api/cierre_caja.php?fecha=${fecha}`, {
                        headers: {
                            "api-key": sessionStorage.getItem("token")
                        }
                })
                let cierreCaja = await fetchDia.json();
                console.log(cierreCaja.ventas[0].fecha)
                console.log(cierreCaja.ventas[0].efectivo)
                console.log(cierreCaja.ventas[0].tarjeta)
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
                htmlDoc.querySelector("#totalEfectivo").textContent = `${parseFloat(cierreCaja.ventas[0].efectivo).toFixed(2)}€`;
                htmlDoc.querySelector("#totalTarjeta").textContent = `${parseFloat(cierreCaja.ventas[0].tarjeta).toFixed(2)}€`;
                htmlDoc.querySelector("#total").textContent = `${(parseFloat(cierreCaja.ventas[0].efectivo) + parseFloat(cierreCaja.ventas[0].tarjeta)).toFixed(2)}€`;
                const ticketWindow = window.open("", "Documento de venta","width=800px,height=800px");
                ticketWindow.document.write(htmlDoc.documentElement.outerHTML);
                ticketWindow.print();
                })

                })//Fin del evento click del botón imprimir

            })//Fin del forEach de los totales diarios
        }//Fin del else de la tabla

        //Input de tipo texto para filtrar por texto los registros de la tabla
        const barraBusqueda = document.createElement("input");
        barraBusqueda.setAttribute("id", "busqueda");
        barraBusqueda.setAttribute("type", "text");
        barraBusqueda.setAttribute("placeholder", "Buscar registro");
        barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
        document.body.insertBefore(barraBusqueda, table);
        barraBusqueda.focus();
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

    });


    //Input de tipo fecha para filtrar por fecha los registros de la tabla
    const fechaInput = document.createElement("input");
    fechaInput.setAttribute("type", "date");
    fechaInput.classList.add("form-control", "w-25", "m-auto", "mt-3");
    document.body.insertBefore(fechaInput, table);

    fechaInput.addEventListener("input", () => {
        const fechaSeleccionada = fechaInput.value;
        let anio = fechaSeleccionada.split("-")[0];
        let mes = fechaSeleccionada.split("-")[1];
        let dia = fechaSeleccionada.split("-")[2];
        fechaSeleccionadaFormateada = `${dia}-${mes}-${anio}`;
        console.log("fechaSeleccionadaFormateada",fechaSeleccionadaFormateada)
        const filas = tbody.getElementsByTagName("tr");
        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName("td");
            let fechaRegistro = celdas[0].textContent.split(" - ")[0];
            fechaRegistro = fechaRegistro.replaceAll("/", "-")
            console.log("fechaRegistro",fechaRegistro)
            if (fechaRegistro !== fechaSeleccionadaFormateada) {
                filas[i].style.display = "none";
            } else {
                filas[i].style.display = "";
            }
        }
        if(fechaSeleccionada == ""){
            for (let i = 0; i < filas.length; i++) {
                filas[i].style.display = "";
            }
        }
    });

    

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../index.html"
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



