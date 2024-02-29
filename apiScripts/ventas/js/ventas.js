const categorias = document.querySelector("aside")
const radioProductos = document.querySelector('#productos');
const radioServicios = document.querySelector('#servicios');
const article = document.querySelector("article")
let url = "productos"
const contenedorFluid = document.querySelector(".container-fluid")

const barraBusqueda = document.createElement("input");
barraBusqueda.setAttribute("id", "busqueda");
barraBusqueda.setAttribute("type", "text");
barraBusqueda.setAttribute("placeholder", "Buscar item");
barraBusqueda.classList.add("form-control","w-50","m-auto", "mt-3");
const contenedorBusqueda = document.createElement("div");
contenedorBusqueda.classList.add("d-flex", "justify-content-center");
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
        list.classList.add("row", "row-cols-md-2", "row-cols-lg-4","row-cols-xl-5");
        contenedor.appendChild(list);
        data[url].forEach(item => {
            const tarjeta = document.createElement("div")
            tarjeta.classList.add("card","col","col-12","col-sm-12","col-md-5","col-lg-3","m-1","text-center","border","bg-light","rounded-3","p-3");
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

const botonVolver = document.createElement("button")
botonVolver.textContent = "Volver al inicio"
botonVolver.classList.add("btn", "btn-primary","position-sm-absolute","fixed-height","top-sm-50", "start-sm-0", "translate-middle-y", "position-xs-absolute", "position-fixed", "bottom-0", "start-0","top-xs-0","end-xs-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../index.html"
})