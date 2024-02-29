const categorias = document.querySelector("aside")
let radioProductos = document.querySelector('#productos');
let radioServicios = document.querySelector('#servicios');
let article = document.querySelector("article")
let url = "productos"

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
        list.classList.add("row", "row-cols-md-3", "row-cols-lg-4","row-cols-xl-5");
        contenedor.appendChild(list);
        data[url].forEach(item => {
            const tarjeta = document.createElement("div")
            tarjeta.classList.add("card","col","m-1","text-center","border","bg-light","rounded-3","p-0","pb-0");
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
botonVolver.classList.add("btn", "btn-primary", "position-fixed", "bottom-0", "end-0", "m-3")
botonVolver.setAttribute("id", "volver")
document.body.appendChild(botonVolver)
botonVolver.addEventListener("click", () => {
    window.location.href = "../../../index.html"
})