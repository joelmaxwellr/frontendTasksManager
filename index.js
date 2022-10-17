let nombre = document.getElementById("nombre")
let campoNombre = document.getElementById("campoNombre")
let correo = document.getElementById("correo")
let contraseña = document.getElementById("contraseña")
let registrar = document.getElementById("registrar")
let registrate = document.getElementById("registrate")
let iniciarSesion = document.getElementById("iniciarSesion")
let titulo = document.getElementById("titulo")
let cancelar = document.getElementById("cancelar")

campoNombre.style.display= "none"
cancelar.style.display= "none"
registrar.style.display= "none"

const endPointRegistrar = "users"
const endPointIniciarSesion = "users/login"
const endPointObtenerTasks = "tasks"


const enviarData = (nombre, correo, contraseña, endPoint, method) => {
    const userData = (endPoint == "users") ? {
        name: nombre.value,
        email: correo.value,
        password: contraseña.value
    } : (endPoint == "users/login") ? {
        email: correo.value,
        password: contraseña.value
    } : "rutas no existe!!"

    const userDataJson = JSON.stringify(userData)
    console.log(userDataJson)
    fetch("http://localhost:3000/" + endPoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json'

        },
        body: userDataJson
    }).then(Response => Response.json())
    .then(data => {
        console.log(data.token)
      //  const jsonToken = JSON.stringify(data.token)
        localStorage.setItem("token", data.token)
    })

}

const obtenerDataTasks = (endPoint, method) => {
    const storageToken = localStorage.getItem("token")
  
    console.log(storageToken)
    fetch("http://localhost:3000/" + endPoint, {
        method: method,
        headers: {
           // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + storageToken,
        },
       // body: userDataJson
    }).then(Response => Response.json())
    .then(data => console.log(data))
}

registrate.addEventListener("click", ()=>{
    
    iniciarSesion.style.display= "none"
    registrate.style.display= "none"
    campoNombre.style.display= "inline"
    registrar.style.display= "inline-block"
    cancelar.style.display= "inline-block"
    titulo.textContent = "Registrate"
})

registrar.addEventListener("click", (e) => {
    console.log("registrar")
    e.preventDefault()
    enviarData(nombre, correo, contraseña, endPointRegistrar, "Post")

    iniciarSesion.style.display= "inline-block"
    registrate.style.display= "inline-block"
    campoNombre.style.display= "none"
    registrar.style.display= "none"
    cancelar.style.display= "none"
    titulo.textContent = "Iniciar Sesión"

})

iniciarSesion.addEventListener("click", (e) => {
    e.preventDefault()
    enviarData(nombre, correo, contraseña, endPointIniciarSesion, "Post")
    obtenerDataTasks(endPointObtenerTasks, "GET")



})

cancelar.addEventListener("click", (e) => {
    e.preventDefault()
    iniciarSesion.style.display= "inline-block"
    registrate.style.display= "inline-block"
    campoNombre.style.display= "none"
    registrar.style.display= "none"
    cancelar.style.display= "none"
    titulo.textContent = "Iniciar Sesión"
    
})
