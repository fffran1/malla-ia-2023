const STORAGE_KEY = "mallaActiva_IA";
const ramosPorSemestre = {};

// Organizar ramos por semestre
ramos.forEach(r => {
  if (!ramosPorSemestre[r.semestre]) ramosPorSemestre[r.semestre] = [];
  ramosPorSemestre[r.semestre].push({ ...r, activo: r.requisitos.length === 0 });
});

const mallaContainer = document.getElementById("mallaContainer");
const contadorRamos = document.getElementById("contadorRamos");

// Cargar estado desde localStorage si existe
const estadoGuardado = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (estadoGuardado) {
  ramos.forEach(r => {
    if (estadoGuardado[r.id] !== undefined) r.activo = estadoGuardado[r.id];
  });
}

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
      ramosDiv.className = `ramos ${r.ambito} ${r.activo ? 'activo' : ''}`;
      ramosDiv.textContent = r.nombre;
      ramosDiv.dataset.id = r.id;

      if (r.activo) totalActivos++;

      // Tooltip de prerrequisitos
      if (r.requisitos.length > 0) {
        const nombresReq = r.requisitos.map(id => {
          const reqRamos = ramos.find(x => x.id === id);
          return reqRamos ? reqRamos.nombre : `ID ${id}`;
        }).join(", ");
        ramosDiv.title = `Prerrequisitos: ${nombresReq}`;
      }

      ramosDiv.addEventListener("click", () => toggleRamos(r.id));
      semDiv.appendChild(ramosDiv);
    });

    mallaContainer.appendChild(semDiv);
  });

  contadorRamos.textContent = `Ramos activos: ${totalActivos}`;
  guardarEstado();
}

function toggleRamos(id) {
  const clickRamo = ramos.find(r => r.id === id);

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
  render();
}

function guardarEstado() {
  const estado = {};
  ramos.forEach(r => estado[r.id] = r.activo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}

window.addEventListener("DOMContentLoaded", () => {
  render();
});
