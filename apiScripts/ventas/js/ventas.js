const categorias = document.querySelector("aside")
let radioProductos = document.querySelector('#productos');
let radioServicios = document.querySelector('#servicios');
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
        console.log('Productos está seleccionado');
        sessionStorage.setItem("tipo", "productos")
        radioProductos.checked = true
        
    } else if (radioServicios.checked) {
        console.log('Servicios está seleccionado');
        sessionStorage.setItem("tipo", "servicios")
        radioServicios.checked = true
    }
    hacerFetch(sessionStorage.getItem("tipo"))
})

function hacerFetch(url){
fetch(`${window.location.protocol}//${window.location.host}/api/${url}.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
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