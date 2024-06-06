/**
 * Script que muestra la agenda de citas
 */

//Construcción de la tabla
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
const h4vacia = document.createElement("h4");
h4vacia.classList.add("text-center", "mt-3","fw-bold");
document.body.appendChild(h4vacia);
/**
 * Input de tipo fecha para seleccionar la fecha de la que se quieren ver las citas
 */
const fechaInput = document.createElement("input");
fechaInput.setAttribute("type", "date");
fechaInput.setAttribute("id", "fechaInput");
fechaInput.classList.add("form-control", "w-25", "m-auto", "mt-3");
fechaInput.value = new Date().toISOString().split("T")[0];

document.body.insertBefore(fechaInput, table);

let fechaEnElInput = document.getElementById("fechaInput").value;


hacerFetch(`${window.location.protocol}//${window.location.host}/api/agenda.php`)



/**
 * Botón para volver al inicio
 */
const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})


/**
 * Evento que se dispara cuando se cambia la fecha en el input de tipo fecha
 */
fechaInput.addEventListener("input", () => {
    const barraBusqueda = document.getElementById("busqueda");
    barraBusqueda.value = "";
    h4vacia.textContent = "";
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
    if (fechaSeleccionada == "") {
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
        h4vacia.textContent = "NO HAY CITAS PARA ESTA FECHA";
    }else{
        h4vacia.textContent = "";
    }
});

/**
 * Evento que se dispara cuando se pulsa una tecla en el input de tipo texto
 */
const barraBusqueda = document.createElement("input");
barraBusqueda.setAttribute("id", "busqueda");
barraBusqueda.setAttribute("type", "text");
barraBusqueda.setAttribute("placeholder", "Buscar cita");
barraBusqueda.classList.add("form-control", "w-50", "m-auto", "mt-3");
document.body.insertBefore(barraBusqueda, table);
barraBusqueda.focus();
barraBusqueda.addEventListener("input", () => {
    h4vacia.textContent = "";
    fechaInput.value = "";
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
        h4vacia.textContent = "NO HAY CITAS";
    }else{
        h4vacia.textContent = "";
    }

})

/**
 * Botón para añadir una nueva cita a la agenda
 */
const botonNuevo = document.createElement("button");
botonNuevo.textContent = "Añadir cita";
botonNuevo.classList.add("btn", "btn-success",);
botonNuevo.setAttribute("id", "nuevo");
th4.append(botonNuevo);
botonNuevo.addEventListener("click", () => {
    window.location.href = "nuevo.html"
});


/**
 * Función que muestra una ventana de confirmación
 */
function mostrarVentanaAviso(mensaje){
    return new Promise((resolve, reject) => {
        document.getElementById("ventanaAviso").innerHTML = "";
        document.getElementById("ventanaAviso").classList.remove("d-none");
        document.getElementById("ventanaAviso").classList.add("d-block");
        document.getElementById("ventanaAviso").classList.add("align-items-center", "justify-content-center","d-flex")
        const p = document.createElement("P")
        p.classList.add("text-center", "m-2")
        p.textContent = mensaje;
        document.getElementById("ventanaAviso").append(p);
        const botonConfirmar = document.createElement("button");
        botonConfirmar.textContent = "Confirmar";
        botonConfirmar.classList.add("btn", "btn-success", "m-2");

        document.getElementById("ventanaAviso").appendChild(botonConfirmar);
        botonConfirmar.addEventListener("click", () => {
            document.getElementById("ventanaAviso").classList.remove("d-block");

            document.getElementById("ventanaAviso").classList.add("d-none");
            resolve(true);
        });

        const botonCancelar = document.createElement("button");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.classList.add("btn", "btn-danger", "m-2");
        document.getElementById("ventanaAviso").appendChild(botonCancelar);
        botonCancelar.addEventListener("click", () => {
            document.getElementById("ventanaAviso").classList.remove("d-block");
            document.getElementById("ventanaAviso").classList.add("d-none");
            resolve(false);
        });
    });
}

/**
 * Función que hace un fetch a la API para obtener los registros de la tabla 
 */
function hacerFetch(url){
    fetch(url, {
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
    
                td1.textContent = registro.fecha.split("-").reverse().join("-");
    
                let horaFormateada = registro.hora.slice(0, 5);
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
    
                const fechaRegistro = registro.fecha;

                if (fechaRegistro != fechaEnElInput) {
                    tr.style.display = "none";
                }else{
                    tr.style.display = "";
                }

                botonBorrar.addEventListener("click", async (e) => {
                    const id = e.target.parentNode.parentNode.dataset.id;
                    const confirmDelete = await mostrarVentanaAviso("¿Estás seguro de que quieres borrar esta cita?");
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
                    const id = e.target.parentNode.parentNode.dataset.id;
                    window.location.href = `editar.html?id=${id}`
                })
    
            });
            let tablaVacia = true;
            let filas = tbody.getElementsByTagName("tr");
            for(let i = 0; i < filas.length; i ++){
                if(filas[i].style.display != "none"){
                    tablaVacia = false;
                }
            }
            if(tablaVacia){
                h4vacia.textContent = "NO HAY CITAS PARA ESTA FECHA";
            }else{
                h4vacia.textContent = "";
            }
        })
}

