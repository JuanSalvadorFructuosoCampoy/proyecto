fetch("auth.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonDatos
})