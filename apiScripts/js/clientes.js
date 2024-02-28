const table = document.createElement("table");
table.setAttribute("id", "tablaclientes");
document.body.append(table)
table.classList.add("table", "table-bordered", "table-hover");
const thead = document.createElement("thead");
document.getElementById("tablaclientes").appendChild(thead);
const tr = document.createElement("tr");
const th1 = document.createElement("th");
const th2 = document.createElement("th");
const th3 = document.createElement("th");
const th4 = document.createElement("th");
const th5 = document.createElement("th");
const th6 = document.createElement("th");
th1.textContent = "ID";
th2.textContent = "Nombre";
th3.textContent = "Primer pellido";
th4.textContent = "Segundo apellido";
th5.textContent = "Teléfono";
th6.textContent = "Dirección";
th1.classList.add("p-4", "text-center")
th2.classList.add("p-4", "text-center")
th3.classList.add("p-4", "text-center")
th4.classList.add("p-4", "text-center")
th5.classList.add("p-4", "text-center")
th6.classList.add("p-4", "text-center")
tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);
tr.appendChild(th6);
thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaclientes").appendChild(tbody);

fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.clientes.length == 0) {
            const h4 = document.createElement("h4");
            const strong = document.createElement("strong");
            h4.classList.add("text-center");
            strong.textContent = "NO HAY CLIENTES EN EL REGISTRO"
            h4.appendChild(strong);
            document.body.appendChild(h4);
        } else {
            data.clientes.forEach(element => {

                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");

                td1.classList.add("p-4", "text-center")
                td2.classList.add("p-4", "text-center")
                td3.classList.add("p-4", "text-center")
                td4.classList.add("p-4", "text-center")
                td5.classList.add("p-4", "text-center")
                td6.classList.add("p-4", "text-center")
                td7.classList.add("p-4", "text-center")

                td1.textContent = element.id;
                td2.textContent = element.nombre;
                td3.textContent = element.apellido1;
                td4.textContent = element.apellido2;
                td5.textContent = element.telefono;
                td6.textContent = element.direccion;
                
                const botonBorrar = document.createElement("button");
                botonBorrar.textContent = "Borrar";
                botonBorrar.classList.add("btn", "btn-danger");
                botonBorrar.setAttribute("id", `botonBorrar${element.id}`);
                td7.appendChild(botonBorrar);

                const botonEditar = document.createElement("button");
                botonEditar.textContent = "Editar";
                botonEditar.classList.add("btn", "btn-info");
                botonEditar.setAttribute("id", `botonEditar${element.id}`);
                td7.appendChild(botonEditar);

                const botonFicha = document.createElement("button");
                botonFicha.textContent = "Historial";
                botonFicha.classList.add("btn", "btn-warning");
                botonFicha.setAttribute("id", `botonFicha${element.id}`);
                td7.appendChild(botonFicha);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tbody.appendChild(tr);

                botonEditar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    window.location.href = `editar.html?id=${id}`
                })

                botonFicha.addEventListener("click", (e) => {

                   //Acceso a la ficha del cliente
                })

                botonBorrar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    const confirmDelete = confirm("¿Estás seguro de que quieres borrar este cliente?");
                    if (confirmDelete) {
                        fetch(`${window.location.protocol}//${window.location.host}/api/clientes.php?id=${id}`, {
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
botonNuevo.textContent = "Nuevo cliente";
botonNuevo.classList.add("btn", "btn-success", "position-fixed", "bottom-20", "start-0", "m-3");
botonNuevo.setAttribute("id", "nuevo");
document.body.insertBefore(botonNuevo, botonVolver);
botonNuevo.addEventListener("click", () => {
    window.location.href = "nuevo.html"
});


