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
        const list = document.createElement("li");
        list.classList.add("row", "row-cols-md-4", "row-cols-lg-5","row-cols-xl-6");
        article.appendChild(list);
        data[url].forEach(item => {
            console.log(item);
            const tarjeta = document.createElement("div")
            tarjeta.classList.add("card","col", "mb-4","text-center","border","bg-light","rounded-3","p-1","m-1");
            list.appendChild(tarjeta);
            const titulo = document.createElement("h6");
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