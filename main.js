console.log("main.js cargado, ramos:", ramos ? ramos.length : "NO DEFINIDO");
const STORAGE_KEY = "mallaActiva_IA";

let ramosPorSemestre = {};
let mallaContainer;
let contadorRamos;

window.addEventListener("DOMContentLoaded", () => {
  mallaContainer = document.getElementById("mallaContainer");
  contadorRamos = document.getElementById("contadorRamos");

  // Organizar ramos por semestre
  ramosPorSemestre = {};
  ramos.forEach(r => {
    if (!ramosPorSemestre[r.semestre]) ramosPorSemestre[r.semestre] = [];
    ramosPorSemestre[r.semestre].push({ ...r, activo: r.requisitos.length === 0 });
  });

  // Cargar estado guardado
  const estadoGuardado = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (estadoGuardado) {
    ramos.forEach(r => {
      if (estadoGuardado[r.id] !== undefined) r.activo = estadoGuardado[r.id];
    });
  }

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

  if (!clickRamo) {
    console.error("Ramo no encontrado con id:", id);
    return;
  }

  if (clickRamo.activo) {
    clickRamo.activo = false;
    desactivarDependientes(clickRamo.id);
  } else {
    const puedeActivarse = clickRamo.requisitos.every(req => {
      const reqRamo = ramos.find(x => x.id === req);
      return reqRamo && reqRamo.activo;
    });

    if (puedeActivarse || clickRamo.requisitos.length === 0) {
      clickRamo.activo = true;
      activarDependientes(clickRamo.id);
    } else {
      console.log("No puede activarse porque prerrequisitos no activos");
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

function activarDependientes(idActivado) {
  ramos.forEach(r => {
    if (!r.activo && r.requisitos.includes(idActivado)) {
      const puedeActivarse = r.requisitos.every(req => {
        const reqRamo = ramos.find(x => x.id === req);
        return reqRamo && reqRamo.activo;
      });
      if (puedeActivarse) {
        r.activo = true;
        activarDependientes(r.id);
      }
    }
  });
}

function reiniciarMalla() {
  ramos.forEach(r => r.activo = r.requisitos.length === 0);
  render();
}

function guardarEstado() {
  const estado = {};
  ramos.forEach(r => estado[r.id] = r.activo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}
