console.log("main-v2.js cargado, ramos:", ramos ? ramos.length : "NO DEFINIDO");
const STORAGE_KEY = "mallaActiva_IA";

let ramosPorSemestre = {};
let mallaContainer;
let contadorRamos;

window.addEventListener("DOMContentLoaded", () => {
  mallaContainer = document.getElementById("mallaContainer");
  contadorRamos = document.getElementById("contadorRamos");

  const estadoGuardado = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

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
      const puedeActivarseAhora = r.requisitos.every(id => {
        const req = ramos.find(x => x.id === id);
        return req && req.activo;
      });

      const rDiv = document.createElement("div");
      rDiv.className = `ramos ${r.ambito} ${r.activo ? "activo" : ""}`;
      rDiv.textContent = r.nombre;
      rDiv.dataset.id = r.id;

      if (r.activo) totalActivos++;

      // ✅ Mostrar tooltip si el ramo está bloqueado y tiene requisitos
      if (!r.activo && r.requisitos.length > 0) {
        const nombresReq = r.requisitos.map(id => {
          const req = ramos.find(x => x.id === id);
          return req ? req.nombre : `ID ${id}`;
        }).join(", ");
        rDiv.title = `Necesita aprobar: ${nombresReq}`;
      }

      // Control de clic solo si se puede activar
      if (r.activo || puedeActivarseAhora) {
        rDiv.style.cursor = "pointer";
        rDiv.addEventListener("click", () => toggleRamos(r.id));
      } else {
        rDiv.style.cursor = "not-allowed";
      }

      semDiv.appendChild(rDiv);
    });

    mallaContainer.appendChild(semDiv);
  });

  contadorRamos.textContent = `Ramos activos: ${totalActivos}`;
  guardarEstado();
}

function toggleRamos(id) {
  const ramo = ramos.find(r => r.id === id);
  if (!ramo) return;

  if (ramo.activo) {
    ramo.activo = false;
    desactivarDependientes(ramo.id);
  } else {
    const puedeActivarse = ramo.requisitos.every(idReq => {
      const req = ramos.find(x => x.id === idReq);
      return req && req.activo;
    });
    if (puedeActivarse || ramo.requisitos.length === 0) {
      ramo.activo = true;
    }
  }

  // Revisión de desbloqueos en cascada
  ramos.forEach(r => {
    if (!r.activo && r.requisitos.length > 0) {
      const puede = r.requisitos.every(id => {
        const req = ramos.find(x => x.id === id);
        return req && req.activo;
      });
      if (puede) r.activo = true;
    }
  });

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
  ramos.forEach(r => {
    r.activo = r.requisitos.length === 0;
  });
  guardarEstado();
  render();
}

function guardarEstado() {
  const estado = {};
  ramos.forEach(r => {
    estado[r.id] = r.activo;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}
