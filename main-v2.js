console.log("main-v2.js cargado, ramos:", ramos ? ramos.length : "NO DEFINIDO");
const STORAGE_KEY = "mallaActiva_IA";

let ramosPorSemestre = {};
let mallaContainer;
let contadorRamos;

window.addEventListener("DOMContentLoaded", () => {
  mallaContainer = document.getElementById("mallaContainer");
  contadorRamos = document.getElementById("contadorRamos");

  const estadoGuardado = (() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Error leyendo estado guardado:", e);
      return {};
    }
  })();

  ramosPorSemestre = {};
  ramos.forEach(r => {
    if (!ramosPorSemestre[r.semestre]) ramosPorSemestre[r.semestre] = [];

    if (estadoGuardado[r.id] !== undefined) {
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
      const desbloqueado = !r.activo && puedeActivarse(r);

      const rDiv = document.createElement("div");
      rDiv.className = `ramos ${r.ambito} ${r.activo ? "activo" : ""} ${desbloqueado ? "desbloqueado" : ""}`;
      rDiv.textContent = r.nombre;
      rDiv.dataset.id = r.id;

      if (r.activo) totalActivos++;

      // Tooltip siempre si tiene requisitos
      if (r.requisitos.length > 0) {
        const nombresReq = r.requisitos.map(id => {
          const reqRamo = ramos.find(x => x.id === id);
          return reqRamo ? reqRamo.nombre : `ID ${id}`;
        }).join(", ");
        rDiv.title = `Necesita aprobar: ${nombresReq}`;
      } else {
        rDiv.title = "";
      }

      // Cursor y click solo si activo o desbloqueado
      if (r.activo || desbloqueado) {
        rDiv.style.cursor = "pointer";
        rDiv.addEventListener("click", () => {
          toggleRamos(r.id);
        });
      } else {
        rDiv.style.cursor = "default"; // no usar not-allowed para que tooltip funcione bien
      }

      semDiv.appendChild(rDiv);
    });

    mallaContainer.appendChild(semDiv);
  });

  contadorRamos.textContent = `Ramos activos: ${totalActivos}`;
  guardarEstado();
}

function puedeActivarse(ramo) {
  return ramo.requisitos.every(idReq => {
    const r = ramos.find(x => x.id === idReq);
    return r && r.activo;
  });
}

function toggleRamos(id) {
  const ramo = ramos.find(r => r.id === id);
  if (!ramo) return;

  if (ramo.activo) {
    ramo.activo = false;
    desactivarDependientes(ramo.id);
  } else {
    if (puedeActivarse(ramo)) {
      ramo.activo = true;
    } else {
      return;
    }
  }

  render();
}

function desactivarDependientes(id) {
  ramos.forEach(r => {
    if (r.requisitos.includes(id) && r.activo) {
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

