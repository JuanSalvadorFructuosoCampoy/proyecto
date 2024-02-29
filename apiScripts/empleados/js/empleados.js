const table = document.createElement("table");
table.setAttribute("id", "tablaempleados");
document.body.append(table)
table.classList.add("table", "table-bordered", "table-hover");
const thead = document.createElement("thead");
document.getElementById("tablaempleados").appendChild(thead);
var switchActivo
const tr = document.createElement("tr");
const th1 = document.createElement("th");
const th2 = document.createElement("th");
const th3 = document.createElement("th");
const th4 = document.createElement("th");
const th5 = document.createElement("th");
const th6 = document.createElement("th");
const th7 = document.createElement("th");

th1.textContent = "ID";
th2.textContent = "Nombre";
th3.textContent = "Primer apellido";
th4.textContent = "Segundo apellido";
th5.textContent = "Rol";
th6.textContent = "Activo";

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
document.getElementById("tablaempleados").appendChild(tbody);

fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.empleados.length == 0) {
            const h4 = document.createElement("h4");
            const strong = document.createElement("strong");
            h4.classList.add("text-center");
            strong.textContent = "NO HAY EMPLEADOS EN EL REGISTRO"
            h4.appendChild(strong);
            document.body.appendChild(h4);
        } else {
            data.empleados.forEach(element => {

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
                td2.textContent = element.nombre;
                td3.textContent = element.apellido1;
                td4.textContent = element.apellido2;
                if (element.rol == "admin") {
                    td5.textContent = "Administrador";
                } else {
                    td5.textContent = "Empleado";
                }
                const divCheck = document.createElement("div");
                divCheck.classList.add("form-switch");
                td6.appendChild(divCheck);
                const checkboxActivo = document.createElement("input");
                checkboxActivo.setAttribute("type", "checkbox");
                checkboxActivo.setAttribute("id", `checkbox${element.id}`);
                checkboxActivo.classList.add("form-check-input")
                checkboxActivo.checked = element.activo == 1; // Si el empleado está activo, el checkbox estará marcado. Compara si el valor de activo es 1 y devolverá true o false
                divCheck.appendChild(checkboxActivo);


                const botonEditar = document.createElement("button");
                botonEditar.textContent = "Editar";
                botonEditar.classList.add("btn", "btn-info","btn-sm");
                botonEditar.setAttribute("id", `botonEditar${element.id}`);
                td7.appendChild(botonEditar);

                const botonPassword = document.createElement("button");
                botonPassword.textContent = "Cambiar contraseña";
                botonPassword.classList.add("btn", "btn-warning","btn-sm","m-1");
                botonPassword.setAttribute("id", `botonPassword${element.id}`);
                td7.appendChild(botonPassword);
                
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
                if (divCheck.parentNode.parentNode.firstChild.textContent == sessionStorage.getItem("id")) {//Si el id del empleado es igual al id del usuario logueado, se deshabilita el checkbox
                    checkboxActivo.disabled = true;
                    botonBorrar.disabled = true;
                }

                botonEditar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    window.location.href = `editar.html?id=${id}`
                })

                botonPassword.addEventListener("click", (e) => {

                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    window.location.href = `password.html?id=${id}`
                })

                botonBorrar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    const confirmDelete = confirm("¿Estás seguro de que quieres borrar este empleado?");
                    if (confirmDelete) {
                        fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php?id=${id}`, {
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
            })
        }
        document.addEventListener("change", (e) => {
            if (e.target.matches(".form-switch input")) {
                let empleadoActivo;
                const id = e.target.parentNode.parentNode.parentNode.firstChild.textContent;
                if (e.target.checked) {
                    empleadoActivo = 1;
                } else {
                    empleadoActivo = 0;
                }
                fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php?id=${id}`, {
                    method: "PATCH",
                    headers: {
                        "api-key": sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        activo: empleadoActivo
                    })
                });
            }
        });
    });

const barraBusqueda = document.createElement("input");
barraBusqueda.setAttribute("id", "busqueda");
barraBusqueda.setAttribute("type", "text");
barraBusqueda.setAttribute("placeholder", "Buscar empleado");
barraBusqueda.classList.add("form-control", "w-25", "m-auto", "mt-3");
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

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

const botonNuevo = document.createElement("button");
botonNuevo.textContent = "Nuevo empleado";
botonNuevo.classList.add("btn", "btn-success","btn-sm");
botonNuevo.setAttribute("id", "nuevo");
th7.append(botonNuevo);
botonNuevo.addEventListener("click", () => {
    window.location.href = "nuevo.html"
});

