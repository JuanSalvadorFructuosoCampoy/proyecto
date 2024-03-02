const categorias = document.querySelector("aside")
const radioProductos = document.querySelector('#productos');
const radioServicios = document.querySelector('#servicios');
const article = document.querySelector("article")
let url = "productos"
const contenedorFluid = document.querySelector(".container-fluid")

//Barra de búsqueda
const barraBusqueda = document.createElement("input");
barraBusqueda.setAttribute("id", "busqueda");
barraBusqueda.setAttribute("type", "text");
barraBusqueda.setAttribute("placeholder", "Buscar item");
barraBusqueda.classList.add("form-control","w-50");
const contenedorBusqueda = document.createElement("div");
contenedorBusqueda.classList.add("d-flex", "justify-content-start","m-1");
contenedorBusqueda.appendChild(barraBusqueda);
document.body.insertBefore(contenedorBusqueda, contenedorFluid);
barraBusqueda.focus();
barraBusqueda.addEventListener("input", () => {
    const texto = barraBusqueda.value.toLowerCase();
    const tarjetas = document.querySelectorAll(".card");
    tarjetas.forEach(tarjeta => {
        const celdas = tarjeta.getElementsByTagName("div");
        let coincide = false;
        for (let j = 0; j < celdas.length && !coincide; j++) {
            const celda = celdas[j];
            if (celda.innerHTML.toLowerCase().indexOf(texto) !== -1) {
                coincide = true;
            }
        }
        if (coincide) {
            tarjeta.style.display = "";
        } else {
            tarjeta.style.display = "none";
        }
    });
});

if(sessionStorage.getItem("tipo")){//Si hay algo en el sessionStorage, se lo asigna a la variable url
hacerFetch(sessionStorage.getItem("tipo"))
    if(sessionStorage.getItem("tipo") == "productos"){//Si el tipo es productos, se selecciona el radio de productos
        radioProductos.checked = true
    }else if(sessionStorage.getItem("tipo") == "servicios"){//Si el tipo es servicios, se selecciona el radio de servicios
        radioServicios.checked = true
    }
}else{
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

function hacerFetch(url){
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
        list.classList.add("row", "row-cols-md-2", "row-cols-lg-5","row-cols-xl-5");
        contenedor.appendChild(list);
        data[url].forEach(item => {
            const tarjeta = document.createElement("div")
            tarjeta.classList.add("card","col","col-12","col-sm-2","col-md-5","col-lg-5","m-1","text-center","border","bg-light","rounded-3","p-3");
            tarjeta.setAttribute("id", item.id);
            list.appendChild(tarjeta);
            const titulo = document.createElement("div");
            const strong = document.createElement("strong");
            strong.textContent = item.nombre;
            titulo.appendChild(strong);
            const precio = document.createElement("div")
            precio.textContent = item.precio+"€";
            tarjeta.append(titulo, precio);
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
                if(option.value == sessionStorage.getItem("id")){
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
botonVolver.classList.add("btn", "btn-primary","position-sm-absolute","fixed-height","top-sm-50", "start-sm-0", "position-xs-absolute", "position-fixed", "top-xs-0", "end-xs-0", "m-3","top-xs-0","end-xs-0", "m-3","bottom-0")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../index.html"
})

document.querySelector("[name='documento-venta']").addEventListener("change", () => {
    console.log("hola");
});