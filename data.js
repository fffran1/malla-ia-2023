const ramos = [
  { id: 1, nombre: "Química General I", semestre: 1, ambito: "am-intermedio", requisitos: [] },
  { id: 2, nombre: "Técnicas de Laboratorio Químico", semestre: 1, ambito: "am-intermedio", requisitos: [] },
  { id: 3, nombre: "Mecánica", semestre: 1, ambito: "am-intermedio", requisitos: [] },
  { id: 4, nombre: "Introducción al Cálculo", semestre: 1, ambito: "am-intermedio", requisitos: [] },
  { id: 5, nombre: "Introducción a la Ingeniería en Alimentos I", semestre: 1, ambito: "am-industria", requisitos: [] },
  { id: 6, nombre: "Cursos de Formación General", semestre: 1, ambito: "am-intermedio", requisitos: [] },
  { id: 7, nombre: "Inglés I", semestre: 1, ambito: "am-ingles", requisitos: [] },

  { id: 8, nombre: "Química General II", semestre: 2, ambito: "am-intermedio", requisitos: [1] },
  { id: 9, nombre: "Laboratorio de Química General", semestre: 2, ambito: "am-intermedio", requisitos: [1, 2] },
  { id: 10, nombre: "Electromagnetismo", semestre: 2, ambito: "am-intermedio", requisitos: [3, 4] },
  { id: 11, nombre: "Cálculo diferencial e integral", semestre: 2, ambito: "am-intermedio", requisitos: [4] },
  { id: 12, nombre: "Biología General", semestre: 2, ambito: "am-intermedio", requisitos: [] },
  { id: 13, nombre: "Introducción a la Ingeniería en Alimentos II", semestre: 2, ambito: "am-industria", requisitos: [5] },
  { id: 14, nombre: "Inglés II", semestre: 2, ambito: "am-ingles", requisitos: [7] },

  { id: 15, nombre: "Química Orgánica I", semestre: 3, ambito: "am-intermedio", requisitos: [8] },
  { id: 16, nombre: "Química Analítica", semestre: 3, ambito: "am-intermedio", requisitos: [8, 9] },
  { id: 17, nombre: "Laboratorio I de Química Orgánica", semestre: 3, ambito: "am-intermedio", requisitos: [8, 9] },
  { id: 18, nombre: "Estadística y Análisis de Datos", semestre: 3, ambito: "am-intermedio", requisitos: [11] },
  { id: 19, nombre: "Cálculo Avanzado", semestre: 3, ambito: "am-intermedio", requisitos: [11] },
  { id: 20, nombre: "Comunicación Escrita para IA", semestre: 3, ambito: "am-intermedio", requisitos: [13] },
  { id: 21, nombre: "Inglés III", semestre: 3, ambito: "am-ingles", requisitos: [14] },

  { id: 22, nombre: "Química Orgánica II", semestre: 4, ambito: "am-intermedio", requisitos: [15] },
  { id: 23, nombre: "Laboratorio de análisis químico", semestre: 4, ambito: "am-intermedio", requisitos: [16, 9, 18] },
  { id: 24, nombre: "Química Analítica II", semestre: 4, ambito: "am-intermedio", requisitos: [16] },
  { id: 25, nombre: "Fisicoquímica I", semestre: 4, ambito: "am-intermedio", requisitos: [3, 11, 15] },
  { id: 26, nombre: "Álgebra Lineal y Análisis Numérico", semestre: 4, ambito: "am-intermedio", requisitos: [19] },
  { id: 27, nombre: "Computación", semestre: 4, ambito: "am-intermedio", requisitos: [18] },
  { id: 28, nombre: "Inglés IV", semestre: 4, ambito: "am-ingles", requisitos: [21] },

  { id: 29, nombre: "Laboratorio de Análisis Instrumental", semestre: 5, ambito: "am-intermedio", requisitos: [23, 24] },
  { id: 30, nombre: "Materias Primas Vegetales y Animales", semestre: 5, ambito: "am-industria", requisitos: [12, 22] },
  { id: 31, nombre: "Fisicoquímica Orientada a los Alimentos", semestre: 5, ambito: "am-industria", requisitos: [10, 25] },
  { id: 32, nombre: "Dibujo en Ingeniería", semestre: 5, ambito: "am-industria", requisitos: [19, 27] },
  { id: 33, nombre: "Comunicación en Ciencia y Tecnología de los Alimentos", semestre: 5, ambito: "am-industria", requisitos: [20, 28] },
  { id: 34, nombre: "Ecuaciones Diferenciales", semestre: 5, ambito: "am-intermedio", requisitos: [26] },
  { id: 35, nombre: "Módulo Gestión I (Gestión Administrativa y Económica)", semestre: 5, ambito: "am-gestion", requisitos: [18] },

  { id: 36, nombre: "Bioquímica General", semestre: 6, ambito: "am-intermedio", requisitos: [25, 30] },
  { id: 37, nombre: "Química y Análisis de los Alimentos", semestre: 6, ambito: "am-intermedio", requisitos: [29] },
  { id: 38, nombre: "Operaciones Unitarias I", semestre: 6, ambito: "am-industria", requisitos: [29, 31, 34] },
  { id: 39, nombre: "Propiedades Físicas de los Alimentos", semestre: 6, ambito: "am-industria", requisitos: [27, 33] },
  { id: 40, nombre: "Módulo Gestión II (Gestión Contable y Costos)", semestre: 6, ambito: "am-gestion", requisitos: [35] },
  { id: 41, nombre: "Práctica I / Unidad de Investigación", semestre: 6, ambito: "am-industria", requisitos: [33] },

  { id: 42, nombre: "Bioquímica de los Alimentos", semestre: 7, ambito: "am-intermedio", requisitos: [36] },
  { id: 43, nombre: "Nutrición", semestre: 7, ambito: "am-intermedio", requisitos: [37] },
  { id: 44, nombre: "Operaciones Unitarias II", semestre: 7, ambito: "am-industria", requisitos: [38] },
  { id: 45, nombre: "Envases y Embalajes", semestre: 7, ambito: "am-industria", requisitos: [31, 39] },
  { id: 46, nombre: "Gestión Financiera", semestre: 7, ambito: "am-gestion", requisitos: [40] },
  { id: 47, nombre: "Legislación Alimentaria", semestre: 7, ambito: "am-industria", requisitos: [37] },
  { id: 48, nombre: "Seguridad Industrial", semestre: 7, ambito: "am-industria", requisitos: [38] },
  
  { id: 49, nombre: "Microbiología e Inocuidad de los Alimentos", semestre: 8, ambito: "am-intermedio", requisitos: [42] },
  { id: 50, nombre: "Higiene y Sanidad Industrial", semestre: 8, ambito: "am-industria", requisitos: [42] },
  { id: 51, nombre: "Procesos de Conservación por Bajas Temperaturas", semestre: 8, ambito: "am-industria", requisitos: [44] },
  { id: 52, nombre: "Procesos de Conservación por Altas Temperaturas", semestre: 8, ambito: "am-industria", requisitos: [44] },
  { id: 53, nombre: "Diseño de Plantas", semestre: 8, ambito: "am-industria", requisitos: [32, 44] },
  { id: 54, nombre: "Diseño de Experimentos", semestre: 8, ambito: "am-industria", requisitos: [27, 44] },
  { id: 55, nombre: "Práctica II", semestre: 8, ambito: "am-industria", requisitos: [41, 48] },
  
  { id: 56, nombre: "Evaluación Sensorial", semestre: 9, ambito: "am-intermedio", requisitos: [18, 51, 52] },
  { id: 57, nombre: "Ingeniería de Procesos de Conservación de Alimentos", semestre: 9, ambito: "am-industria", requisitos: [49, 51, 52] },
  { id: 58, nombre: "Ingeniería de Procesos en Grasas y Aceites", semestre: 9, ambito: "am-industria", requisitos: [51, 52] },
  { id: 59, nombre: "Ingeniería de Procesos de Procesos en cereales", semestre: 9, ambito: "am-industria", requisitos: [51, 52] },
  { id: 60, nombre: "Ingeniería de Procesos en Cárnicos", semestre: 9, ambito: "am-gestion", requisitos: [51, 52] },
  { id: 61, nombre: "Evaluación de Proyectos", semestre: 9, ambito: "am-industria", requisitos: [46, 53] },
  { id: 62, nombre: "Electivo Especializado", semestre: 9, ambito: "am-intermedio", requisitos: [] },
  
  { id: 63, nombre: "Ingeniería de Procesos de Lácteos", semestre: 10, ambito: "am-industria", requisitos: [51, 52] },
  { id: 64, nombre: "Ingeniería de Procesos de Productos del Mar", semestre: 10, ambito: "am-industria", requisitos: [51, 52] },
  { id: 65, nombre: "Ingeniería de Procesos en Fermentaciones", semestre: 10, ambito: "am-industria", requisitos: [49, 50] },
  { id: 66, nombre: "Gestión de Calidad", semestre: 10, ambito: "am-industria", requisitos: [50] },
  { id: 67, nombre: "Electivos Especializados", semestre: 10, ambito: "am-intermedio", requisitos: [49, 50, 51, 52, 53, 54, 55] },

  { id: 68, nombre: "Práctica Profesional", semestre: 11, ambito: "am-industria", requisitos: [63, 64, 65, 66, 67] },
  { id: 69, nombre: "Actividad Final de Titulación", semestre: 11, ambito: "am-industria", requisitos: [63, 64, 65, 66, 67] }
];

console.log("Total de ramos cargados:", ramos.length);
console.log("Primer ramo:", ramos[0]);
