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


th1.textContent = "Fecha";
th2.textContent = "Hora";
th3.textContent = "Cita";


th1.classList.add("p-2", "text-center", "align-middle","fs-5")
th2.classList.add("p-2", "text-center", "align-middle","fs-5")
th3.classList.add("p-2", "text-center", "w-50", "align-middle","fs-5")
th4.classList.add("p-2", "text-center", "align-middle","fs-5")

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);


thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaagenda").appendChild(tbody);

//Petición GET para obtener los registros de la tabla
fetch(`${window.location.protocol}//${window.location.host}/api/agenda.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => { 
        data['agendas'].forEach(registro => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");

            td1.classList.add("p-2", "text-center","fs-5")
            td2.classList.add("p-2", "text-center","fs-5")
            td3.classList.add("p-2", "text-center","fs-5")
            td4.classList.add("p-2", "text-center","fs-5")

            let horaFormateada = registro.hora.slice(0, 5);
            td1.textContent = registro.fecha;
            td2.textContent = horaFormateada;
            td3.textContent = registro.cita;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.dataset.id = registro.id
            const botonEditar = document.createElement("button");
            botonEditar.textContent = "Editar";
            botonEditar.classList.add("btn", "btn-info","btn-sm","me-1");
            botonEditar.setAttribute("id", `botonEditar${registro.id}`);
            td4.appendChild(botonEditar);

            const botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.classList.add("btn", "btn-danger","btn-sm");
            botonBorrar.setAttribute("id", `botonBorrar${registro.id}`);
            td4.appendChild(botonBorrar);

            tbody.appendChild(tr);

            botonBorrar.addEventListener("click", async (e) => {
                const id = e.target.parentNode.parentNode.dataset.id;
                const confirmDelete = await mostrarVentanaConfirmar("¿Estás seguro de que quieres borrar esta cita?");
                if (confirmDelete) {
                    fetch(`${window.location.protocol}//${window.location.host}/api/agenda.php?id=${id}`, {
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

            botonEditar.addEventListener("click", (e) => {
                const id = e.target.parentNode.parentNode.firstChild.textContent;
                window.location.href = `editar.html?id=${id}`
            })

        });
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

function mostrarVentanaConfirmar(mensaje){
    return new Promise((resolve, reject) => {
        document.getElementById("ventanaConfirmar").innerHTML = "";
        document.getElementById("ventanaConfirmar").classList.remove("d-none");
        document.getElementById("ventanaConfirmar").classList.add("d-block");
        document.getElementById("ventanaConfirmar").classList.add("align-items-center", "justify-content-center","d-flex")
        const p = document.createElement("P")
        p.classList.add("text-center", "m-2")
        p.textContent = mensaje;
        document.getElementById("ventanaConfirmar").append(p);
        const botonConfirmar = document.createElement("button");
        botonConfirmar.textContent = "Confirmar";
        botonConfirmar.classList.add("btn", "btn-success", "m-2");

        document.getElementById("ventanaConfirmar").appendChild(botonConfirmar);
        botonConfirmar.addEventListener("click", () => {
            document.getElementById("ventanaConfirmar").classList.remove("d-block");

            document.getElementById("ventanaConfirmar").classList.add("d-none");
            resolve(true);
        });

        const botonCancelar = document.createElement("button");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.classList.add("btn", "btn-danger", "m-2");
        document.getElementById("ventanaConfirmar").appendChild(botonCancelar);
        botonCancelar.addEventListener("click", () => {
            document.getElementById("ventanaConfirmar").classList.remove("d-block");
            document.getElementById("ventanaConfirmar").classList.add("d-none");
            resolve(false);
        });
    });
}

