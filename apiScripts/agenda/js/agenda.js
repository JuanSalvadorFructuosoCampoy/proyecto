const table = document.createElement("table");
table.setAttribute("id", "tablaagenda");
document.body.append(table)
table.classList.add("table", "table-bordered", "table-hover");
const thead = document.createElement("thead");
document.getElementById("tablaagenda").appendChild(thead);
const tr = document.createElement("tr");
const th1 = document.createElement("th");
const th2 = document.createElement("th");
const th3 = document.createElement("th");
const th4 = document.createElement("th");
const th5 = document.createElement("th");
const th6 = document.createElement("th");
const th7 = document.createElement("th");

th1.textContent = "Fecha";
th2.textContent = "Hora";
th3.textContent = "Cita";


th1.classList.add("p-2", "text-center")
th2.classList.add("p-2", "text-center")
th3.classList.add("p-2", "text-center", "w-50")
th4.classList.add("p-2", "text-center")

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);


thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaagenda").appendChild(tbody);



//Botón para volver al inicio
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

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

    const filas = tbody.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        let fechaRegistro = celdas[1].textContent.split(" - ")[0];
        fechaRegistro = fechaRegistro.replaceAll("/", "-")

        if (fechaRegistro !== fechaSeleccionadaFormateada) {
            filas[i].style.display = "none";
        } else {
            filas[i].style.display = "";
        }
    }

    if (fechaSeleccionada == "") {
        for (let i = 0; i < filas.length; i++) {
            filas[i].style.display = "";
        }
    }
});

//Barra de búsqueda
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

//Botón para añadir una nueva cita a la agenda
const botonNuevo = document.createElement("button");
botonNuevo.textContent = "Añadir cita";
botonNuevo.classList.add("btn", "btn-success",);
botonNuevo.setAttribute("id", "nuevo");
th4.append(botonNuevo);
botonNuevo.addEventListener("click", () => {
    window.location.href = "nuevo.html"
});