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
th1.textContent = "ID";
th2.textContent = "Nombre";
th3.textContent = "Apellido";
th4.textContent = "Rol";
th5.textContent = "Activo";
th1.classList.add("p-4", "text-center")
th2.classList.add("p-4", "text-center")
th3.classList.add("p-4", "text-center")
th4.classList.add("p-4", "text-center")
th5.classList.add("p-4", "text-center")
tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);
thead.appendChild(tr);

fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.empleados.length == 0) {
            const h4 = document.createElement("h4");
            h4.textContent = "No hay empleados";
            document.body.appendChild(h4);
        } else {
            data.empleados.forEach(element => {
                const tbody = document.createElement("tbody");
                document.getElementById("tablaempleados").appendChild(tbody);
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                td1.textContent = element.id;
                td1.classList.add("p-4", "text-center")
                td2.classList.add("p-4", "text-center")
                td3.classList.add("p-4", "text-center")
                td4.classList.add("p-4", "text-center")
                td5.classList.add("p-4", "text-center")
                td6.classList.add("p-4", "text-center")
                td2.textContent = element.nombre;
                td3.textContent = element.apellidos;
                if (element.rol == "admin") {
                    td4.textContent = "Administrador";
                } else {
                    td4.textContent = "Empleado";
                }
                const divCheck = document.createElement("div");
                divCheck.classList.add("form-switch");
                td5.appendChild(divCheck);
                const checkboxActivo = document.createElement("input");
                checkboxActivo.setAttribute("type", "checkbox");
                checkboxActivo.setAttribute("id", `checkbox${element.id}`);
                checkboxActivo.classList.add("form-check-input")
                checkboxActivo.checked = element.activo == 1; // Si el empleado está activo, el checkbox estará marcado. Compara si el valor de activo es 1 y devolverá true o false
                divCheck.appendChild(checkboxActivo);

                const botonBorrar = document.createElement("button");
                botonBorrar.textContent = "Borrar empleado";
                botonBorrar.classList.add("btn", "btn-danger");
                botonBorrar.setAttribute("id", `boton${element.id}`);
                td6.appendChild(botonBorrar);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);

                tbody.appendChild(tr);
                console.log(divCheck.parentNode.parentNode.firstChild.textContent);
                if(divCheck.parentNode.parentNode.firstChild.textContent == sessionStorage.getItem("id")){//Si el id del empleado es igual al id del usuario logueado, se deshabilita el checkbox
                    checkboxActivo.disabled = true;
                    botonBorrar.disabled = true;
                }


            })

        }
        switchActivo = document.querySelector(".form-switch input");
        switchActivo.addEventListener("change", (e) => {
            let empleadoActivo
            console.log(e.target.checked)
            const id = e.target.parentNode.parentNode.parentNode.firstChild.textContent
            if (e.target.checked == true) {
                empleadoActivo = 1;
            } else {
                empleadoActivo = 0
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
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
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

const botonNuevo = document.createElement("button");
botonNuevo.textContent = "Nuevo empleado";
botonNuevo.classList.add("btn", "btn-success", "position-fixed", "bottom-20", "start-0", "m-3");
botonNuevo.setAttribute("id", "nuevo");
document.body.insertBefore(botonNuevo, botonVolver);
botonNuevo.addEventListener("click", () => {
    window.location.href = "nuevo.html"
});



