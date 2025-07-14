console.log("main.js cargado, ramos:", ramos ? ramos.length : "NO DEFINIDO");
const STORAGE_KEY = "mallaActiva_IA";

let ramosPorSemestre = {};
let mallaContainer;
let contadorRamos;

window.addEventListener("DOMContentLoaded", () => {
  mallaContainer = document.getElementById("mallaContainer");
  contadorRamos = document.getElementById("contadorRamos");

  // Cargar estado guardado
  const estadoGuardado = JSON.parse(localStorage.getItem(STORAGE_KEY));

  // Organizar ramos por semestre
  ramosPorSemestre = {};
  ramos.forEach(r => {
    if (!ramosPorSemestre[r.semestre]) ramosPorSemestre[r.semestre] = [];

    if (estadoGuardado && estadoGuardado[r.id] !== undefined) {
      r.activo = estadoGuardado[r.id];
    } else {
      r.activo = r.requisitos.length === 0;
    }

    ramosPorSemestre[r.semestre].push(r);
  });

  render();
});

function render() {
  mallaContainer.innerHTML = "";
  let totalActivos = 0;

  Object.keys(ramosPorSemestre).forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = `Sem ${sem}`;
    semDiv.appendChild(titulo);

    ramosPorSemestre[sem].forEach(r => {
      const ramosDiv = document.createElement("div");
      ramosDiv.className = `ramos ${r.ambito} ${r.activo ? "activo" : ""}`;
      ramosDiv.textContent = r.nombre;
      ramosDiv.dataset.id = r.id;

      if (r.activo) totalActivos++;

      if (r.requisitos.length > 0) {
        const nombresReq = r.requisitos.map(id => {
          const reqRamo = ramos.find(x => x.id === id);
          return reqRamo ? reqRamo.nombre : `ID ${id}`;
        }).join(", ");
        ramosDiv.title = `Prerrequisitos: ${nombresReq}`;
      }

      ramosDiv.addEventListener("click", () => {
        console.log("Click en ramo:", r.id, r.nombre);
        toggleRamos(r.id);
      });

      semDiv.appendChild(ramosDiv);
    });

    mallaContainer.appendChild(semDiv);
  });

  contadorRamos.textContent = `Ramos activos: ${totalActivos}`;
  guardarEstado();
}

function toggleRamos(id) {
  console.log("Se hizo click en ramo con id:", id);
  const clickRamo = ramos.find(r => r.id === id);
  if (!clickRamo) return;

  if (clickRamo.activo) {
    clickRamo.activo = false;
    desactivarDependientes(clickRamo.id);
  } else {
    const puedeActivarse = clickRamo.requisitos.every(reqId => {
      const req = ramos.find(r => r.id === reqId);
      return req && req.activo;
    });

    if (puedeActivarse) {
      clickRamo.activo = true;
    } else {
      console.log("No se puede activar. Faltan prerrequisitos.");
    }
  }

  render();
}

function desactivarDependientes(idDesactivado) {
  ramos.forEach(r => {
    if (r.requisitos.includes(idDesactivado) && r.activo) {
      r.activo = false;
      desactivarDependientes(r.id);
    }
  });
}

function reiniciarMalla() {
  ramos.forEach(r => r.activo = r.requisitos.length === 0);
  guardarEstado();
  render();
}

function guardarEstado() {
  const estado = {};
  ramos.forEach(r => estado[r.id] = r.activo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}
