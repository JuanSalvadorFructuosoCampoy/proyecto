const table = document.createElement("table");
table.setAttribute("id", "tablaproductos");
document.body.append(table)
table.classList.add("table", "table-bordered", "table-hover");
const thead = document.createElement("thead");
document.getElementById("tablaproductos").appendChild(thead);
const tr = document.createElement("tr");
const th1 = document.createElement("th");
const th2 = document.createElement("th");
const th3 = document.createElement("th");
const th4 = document.createElement("th");
const th5 = document.createElement("th");

th1.textContent = "ID";
th2.textContent = "Nombre producto";
th3.textContent = "Precio";
th4.textContent = "Stock";

th1.classList.add("p-2", "text-center", "align-middle","fs-5")
th2.classList.add("p-2", "text-center", "align-middle","fs-5")
th3.classList.add("p-2", "text-center", "align-middle","fs-5")
th4.classList.add("p-2", "text-center", "align-middle","fs-5")
th5.classList.add("p-2", "text-center", "align-middle","fs-5")
tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);

thead.appendChild(tr);
const tbody = document.createElement("tbody");
document.getElementById("tablaproductos").appendChild(tbody);

fetch(`${window.location.protocol}//${window.location.host}/api/productos.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.productos.length == 0) {

            const h4 = document.createElement("h4");
            const strong = document.createElement("strong");
            h4.classList.add("text-center");
            strong.textContent = "NO HAY PRODUCTOS EN EL REGISTRO"
            h4.appendChild(strong);
            document.body.appendChild(h4);
        } else {
            data.productos.forEach(element => {

                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");

                td1.classList.add("p-2", "text-center","fs-5")
                td2.classList.add("p-2", "text-center","fs-5")
                td3.classList.add("p-2", "text-center","fs-5")
                td4.classList.add("p-2", "text-center","fs-5")
                td5.classList.add("p-2", "text-center","fs-5")
                let precioProducto 
                if(element.precio == 0){
                    precioProducto = "No definido";
                }else{
                    precioProducto = element.precio+"€"
                }

                td1.textContent = element.id;
                td2.textContent = element.nombre;
                td3.textContent = precioProducto;
                td4.textContent = element.stock;

                const botonEditar = document.createElement("button");
                botonEditar.textContent = "Editar";
                botonEditar.classList.add("btn", "btn-info","btn-sm","m-1");
                botonEditar.setAttribute("id", `botonEditar${element.id}`);
                td5.appendChild(botonEditar);

                const botonBorrar = document.createElement("button");
                botonBorrar.textContent = "Borrar";
                botonBorrar.classList.add("btn", "btn-danger","btn-sm");
                botonBorrar.setAttribute("id", `botonBorrar${element.id}`);
                td5.appendChild(botonBorrar);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tbody.appendChild(tr);

                botonEditar.addEventListener("click", (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    window.location.href = `editar.html?id=${id}`
                })

                botonBorrar.addEventListener("click", async (e) => {
                    const id = e.target.parentNode.parentNode.firstChild.textContent;
                    const confirmDelete = await mostrarVentanaError("¿Estás seguro de que quieres borrar este producto?");
                    if (confirmDelete) {
                        fetch(`${window.location.protocol}//${window.location.host}/api/productos.php?id=${id}`, {
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

        const barraBusqueda = document.createElement("input");
        barraBusqueda.setAttribute("id", "busqueda");
        barraBusqueda.setAttribute("type", "text");
        barraBusqueda.setAttribute("placeholder", "Buscar producto");
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
    window.location.href = "../../../../index.html"
})

const botonProdYServ = document.createElement("button")
botonProdYServ.textContent = "Productos y servicios"
botonProdYServ.classList.add("btn", "btn-info", "position-fixed", "bottom-0", "start-0", "m-3")
botonProdYServ.setAttribute("id", "volver")
document.body.appendChild(botonProdYServ)
botonProdYServ.addEventListener("click", () => {
    window.location.href = "../productos_servicios.html"
})

const botonNuevo = document.createElement("button");
botonNuevo.textContent = "Nuevo producto";
botonNuevo.classList.add("btn", "btn-success","btn-sm");
botonNuevo.setAttribute("id", "nuevo");
th5.append(botonNuevo);
botonNuevo.addEventListener("click", () => {
    window.location.href = "nuevo.html"
});

function mostrarVentanaError(mensaje){
    return new Promise((resolve, reject) => {
        document.getElementById("ventanaError").innerHTML = "";
        document.getElementById("ventanaError").classList.remove("d-none");
        document.getElementById("ventanaError").classList.add("d-block");
        document.getElementById("ventanaError").classList.add("align-items-center", "justify-content-center","d-flex")
        const p = document.createElement("P")
        p.classList.add("text-center", "m-2")
        p.textContent = mensaje;
        document.getElementById("ventanaError").append(p);
        const botonConfirmar = document.createElement("button");
        botonConfirmar.textContent = "Confirmar";
        botonConfirmar.classList.add("btn", "btn-success", "m-2");

        document.getElementById("ventanaError").appendChild(botonConfirmar);
        botonConfirmar.addEventListener("click", () => {
            document.getElementById("ventanaError").classList.remove("d-block");
            console.log("Evento de botón confirmar");
            document.getElementById("ventanaError").classList.add("d-none");
            resolve(true);
        });

        const botonCancelar = document.createElement("button");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.classList.add("btn", "btn-danger", "m-2");
        document.getElementById("ventanaError").appendChild(botonCancelar);
        botonCancelar.addEventListener("click", () => {
            document.getElementById("ventanaError").classList.remove("d-block");
            document.getElementById("ventanaError").classList.add("d-none");
            resolve(false);
        });
    });
}