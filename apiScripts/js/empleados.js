const table = document.createElement("table");
table.setAttribute("id","tablaempleados");
document.body.append(table)
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
tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);
document.getElementById("tablaempleados").appendChild(tr);

fetch(`${window.location.protocol}//${window.location.host}/api/empleados.php`, {
    headers: {
        "api-key": sessionStorage.getItem("token")
    }
})
.then(response => response.json())
.then(data => {
    data.empleados.forEach(element => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        td1.textContent = element.id;
        td2.textContent = element.nombre;
        td3.textContent = element.apellidos;
        if(element.rol == "admin"){
            td4.textContent = "Administrador";
        }else{
            td4.textContent = "Empleado";
        }
        td5.textContent = element.activo;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        document.getElementById("tablaempleados").appendChild(tr);
    });
    console.log(data.empleados)
    })