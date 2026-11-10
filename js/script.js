const formulario = document.getElementById("formulario");
const inputTarea = document.getElementById("inputTarea");
const listaTareas = document.getElementById("listaTareas");
const mensajeVacio = document.getElementById("mensajeVacio");
const botonesFiltro = document.querySelectorAll(".filtro");

let tareas = [];
let filtroActual = "todas";

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const texto = inputTarea.value.trim();

    if (texto === "") return;

    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea);
    inputTarea.value = "";

    mostrarTareas();
});

function mostrarTareas() {
    listaTareas.innerHTML = "";

    let tareasFiltradas = tareas;

    if (filtroActual === "pendientes") {
        tareasFiltradas = tareas.filter(t => !t.completada);
    } else if (filtroActual === "completadas") {
        tareasFiltradas = tareas.filter(t => t.completada);
    }

    if (tareasFiltradas.length === 0) {
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";
    }

    tareasFiltradas.forEach(function (tarea) {
        const li = document.createElement("li");
        li.className = "tarea";
        if (tarea.completada) {
            li.classList.add("completada");
        }

        const span = document.createElement("span");
        span.textContent = tarea.texto;

        span.addEventListener("click", function () {
            tarea.completada = !tarea.completada;
            mostrarTareas();
        });

        const botonCompletar = document.createElement("button");
        botonCompletar.textContent = tarea.completada ? "Desmarcar tarea" : "Completar tarea";
        botonCompletar.className = "btn-completar";
        botonCompletar.addEventListener("click", function () {
            tarea.completada = !tarea.completada;
            mostrarTareas();
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar tarea";
        botonEliminar.addEventListener("click", function () {
            tareas = tareas.filter(t => t.id !== tarea.id);
            mostrarTareas();
        });

        li.appendChild(span);
        li.appendChild(botonCompletar);
        li.appendChild(botonEliminar);

        listaTareas.appendChild(li);
    });
}

botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
        botonesFiltro.forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");

        filtroActual = boton.dataset.filtro;

        mostrarTareas();
    });
});

mostrarTareas();