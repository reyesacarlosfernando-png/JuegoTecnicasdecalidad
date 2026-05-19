import React, { useState, useEffect } from "react";

// 📋 INTERFACES DE TYPESCRIPT
interface Question {
  id: string; // ID único para gestionar mejor la edición/eliminación
  tipo: string;
  pregunta: string;
  respuesta: string;
}

interface ComponentProps {
  children: React.ReactNode;
}

interface ButtonProps extends ComponentProps {
  onClick: () => void;
  color?: string;
}

// CARD COMPONENT
const Card: React.FC<ComponentProps> = ({ children }) => (
  <div
    style={{
      borderRadius: "15px",
      padding: "20px",
      marginTop: "15px",
      background: "#16213e",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
    }}
  >
    {children}
  </div>
);

// BUTTON COMPONENT
const Button: React.FC<ButtonProps> = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    style={{
      margin: "4px",
      padding: "10px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      background: color || "#e94560",
      color: "white",
      border: "none",
      fontWeight: "bold",
    }}
  >
    {children}
  </button>
);

// BANCO DE PREGUNTAS INICIAL (POR DEFECTO)
const initialQuestions: Question[] = [
  {
    id: "1",
    tipo: "Nombre",
    pregunta:
      "¿Cuál es el nombre completo del organismo internacional independiente que desarrolla normas voluntarias basadas en el consenso global para asegurar la calidad, seguridad y eficiencia de productos y servicios?",
    respuesta:
      "ISO - Organización Internacional de Normalización (International Organization for Standardization).",
  },
  {
    id: "2",
    tipo: "Certificado",
    pregunta:
      "Respecto a las Técnicas de Aseguramiento de la Calidad, ¿qué tipo de certificados se emiten basados en las normas ISO y cuál es la principal norma?",
    respuesta:
      "Certificaciones de Sistemas de Gestión, donde la norma principal es la ISO 9001.",
  },
  {
    id: "3",
    tipo: "Sector",
    pregunta:
      "¿En qué sectores de la economía se especializa o se pueden aplicar las normas ISO?",
    respuesta:
      "Es multisectorial (manufactura, tecnología, servicios, salud, educación, alimentación y gobierno).",
  },
  {
    id: "4",
    tipo: "Proceso",
    pregunta:
      "¿Cuáles son los tres primeros pasos fundamentales que debe dar una organización internamente si desea lograr un título o certificación por parte de un organismo acreditado por la ISO?",
    respuesta:
      "1. Diagnóstico inicial; 2. Diseño e implementación del SGC; 3. Auditorías internas y revisión por la dirección.",
  },
  {
    id: "5",
    tipo: "Proceso",
    pregunta:
      "Una vez que la empresa implementó el sistema de calidad basado en ISO, ¿cuáles son los pasos finales obligatorios para recibir oficialmente el título de certificación?",
    respuesta:
      "Auditoría de Certificación externa (Fase 1 y 2), corrección de hallazgos y emisión del certificado.",
  },
  {
    id: "6",
    tipo: "Nombre",
    pregunta:
      "¿Cuál es el nombre completo del organismo privado sin ánimo de lucro que actúa como el Ente Nacional de Normalización en Colombia?",
    respuesta:
      "ICONTEC - Instituto Colombiano de Normas Técnicas y Certificación.",
  },
  {
    id: "7",
    tipo: "Certificado",
    pregunta:
      "¿Qué tipo de certificados emite ICONTEC para respaldar que el sistema de gestión de una empresa o un producto específico cumple con los estándares de calidad?",
    respuesta:
      "Certificados de Sistemas de Gestión y el Sello de Calidad ICONTEC para Productos.",
  },
  {
    id: "8",
    tipo: "Sector",
    pregunta:
      "Aunque cubre toda la industria, ¿en qué sectores clave o específicos del contexto nacional destaca su especialización en aseguramiento de la calidad ICONTEC?",
    respuesta:
      "Manufactura e Industria, Servicios, Educación y el Sector Público.",
  },
  {
    id: "9",
    tipo: "Proceso",
    pregunta:
      "Para iniciar el proceso y lograr un título de certificación ICONTEC, ¿cuáles son los pasos previos enfocados en la postulación de la empresa?",
    respuesta:
      "1. Radicación de solicitud de cotización; 2. Aceptación de propuesta comercial; 3. Planificación del equipo auditor.",
  },
  {
    id: "10",
    tipo: "Proceso",
    pregunta:
      "¿Cuáles son los pasos de evaluación que ejecuta ICONTEC en las instalaciones de la empresa para otorgar formalmente el título de certificación?",
    respuesta:
      "Auditoría de Otorgamiento (in situ), informe de auditoría, cierre de no conformidades y aprobación del Comité.",
  },
  {
    id: "11",
    tipo: "Nombre",
    pregunta:
      "¿Cuál es el nombre completo del ente encargado de coordinar y vigilar a los laboratorios y empresas que evalúan la calidad en el país, siendo la máxima autoridad de acreditación?",
    respuesta: "ONAC - Organismo Nacional de Acreditación de Colombia.",
  },
  {
    id: "12",
    tipo: "Certificado",
    pregunta:
      "A diferencia de las empresas normales, ¿qué tipo de título o certificado emite ONAC a quienes evalúan la conformidad?",
    respuesta:
      "Certificados de Acreditación (comprobando la competencia técnica de los evaluadores).",
  },
  {
    id: "13",
    tipo: "Sector",
    pregunta:
      "¿En qué sectores o tipos de organizaciones se especializa de forma exclusiva ONAC?",
    respuesta:
      "Organismos de Evaluación de la Conformidad (Laboratorios de ensayo/calibración y organismos de certificación/inspección).",
  },
  {
    id: "14",
    tipo: "Proceso",
    pregunta:
      "¿Cuáles son los pasos iniciales que debe realizar un laboratorio u organismo evaluador si busca lograr la acreditación ONAC?",
    respuesta:
      "1. Implementar normas técnicas (ISO 17025/17021); 2. Presentar solicitud formal; 3. Superar revisión documental.",
  },
  {
    id: "15",
    tipo: "Proceso",
    pregunta:
      "¿Cuáles son los pasos de campo y cierre para conseguir que ONAC emita el título de acreditación?",
    respuesta:
      "Evaluación in situ (testificación), gestión de no conformidades y decisión final del Comité de Acreditación.",
  },
  {
    id: "16",
    tipo: "Nombre",
    pregunta:
      "¿Cuál es el nombre completo del ente regulador estatal encargado de vigilar y asegurar la calidad y sanidad de los productos de consumo masivo biológico en el país?",
    respuesta:
      "INVIMA - Instituto Nacional de Vigilancia de Medicamentos y Alimentos.",
  },
  {
    id: "17",
    tipo: "Certificado",
    pregunta:
      "Respecto a las técnicas de aseguramiento, ¿qué tipos de certificados obligatorios emite INVIMA para permitir la comercialización y producción segura?",
    respuesta:
      "Registro Sanitario, Notificación Sanitaria, y Certificados de Buenas Prácticas de Manufactura (BPM).",
  },
  {
    id: "18",
    tipo: "Sector",
    pregunta:
      "¿En qué sectores específicos del mercado ejerce su control regulador estricto de aseguramiento de la calidad INVIMA?",
    respuesta:
      "Alimentos y Bebidas, Medicamentos, Dispositivos Médicos, Cosméticos y productos de aseo doméstico.",
  },
  {
    id: "19",
    tipo: "Proceso",
    pregunta:
      "¿Cuáles son los pasos legales y regulatorios iniciales para lograr el título de un registro sanitario INVIMA?",
    respuesta:
      "1. Clasificación del riesgo del producto; 2. Pago de tarifa legal; 3. Radicación de documentación técnica y análisis.",
  },
  {
    id: "20",
    tipo: "Proceso",
    pregunta:
      "En sectores de alta complejidad, ¿cuáles son los pasos de verificación física para lograr el certificado de Buenas Prácticas (BPM) de INVIMA?",
    respuesta:
      "Visita de Inspección Técnica a la planta, verificación higiénico-sanitaria, concepto Favorable y emisión de resolución.",
  },
  {
    id: "21",
    tipo: "Nombre",
    pregunta:
      "¿Cuál es el nombre completo de la agencia del gobierno extranjero que actúa como el ente regulador de calidad más influyente a nivel internacional para exportar productos de consumo humano y médico?",
    respuesta:
      "FDA - Administración de Alimentos y Medicamentos (Food and Drug Administration de los EE. UU.).",
  },
  {
    id: "22",
    tipo: "Certificado",
    pregunta:
      "Qué tipo de certificado o estatus emite o concede FDA para validar que una empresa extranjera cumple con sus estrictos estándares de aseguramiento de la calidad?",
    respuesta:
      "Registro de Instalaciones de Alimentos/Medicamentos y Aprobación de Productos (Clearance/Approval).",
  },
  {
    id: "23",
    tipo: "Sector",
    pregunta: "¿En qué sectores industriales globales se especializa el FDA?",
    respuesta:
      "Alimentos, Medicamentos (humanos/veterinarios), Dispositivos Médicos, Productos Biológicos, Tabaco y Cosméticos.",
  },
  {
    id: "24",
    tipo: "Proceso",
    pregunta:
      "Si una empresa local desea exportar y necesita el título de registro del FDA, ¿cuáles son los pasos iniciales obligatorios?",
    respuesta:
      "1. Designar un agente ; 2. Crear cuenta en su portal electrónico; 3. Diligenciar datos de la planta de manufactura.",
  },
  {
    id: "25",
    tipo: "Proceso",
    pregunta:
      "¿Cuáles son los pasos de control permanentes para mantener activo el título otorgado por el FDA y evitar sanciones?",
    respuesta:
      "Renovación bienal del registro, cumplimiento de etiquetado y aceptar inspecciones aleatorias presenciales en la planta.",
  },
  {
    id: "26",
    tipo: "Nombre",
    pregunta:
      "¿Cuál es el nombre completo del ente internacional regulador fundado por la FAO y la OMS que establece los estándares globales de calidad e inocuidad para proteger la salud de los consumidores?",
    respuesta: "Comisión del Codex Alimentarius (Código Alimentario).",
  },
  {
    id: "27",
    tipo: "Certificado",
    pregunta:
      "Dado que la Comisión del Codex Alimentarius es puramente armonizador y de referencia, ¿qué tipo de documentos técnicos emite que sirven de base para los certificados de calidad globales?",
    respuesta:
      "Normas Internacionales, Códigos de Prácticas, Directrices y Límites Máximos de Residuos.",
  },
  {
    id: "28",
    tipo: "Sector",
    pregunta:
      "¿En qué sector específico de la economía mundial se especializa la Comisión del Codex Alimentarius?",
    respuesta:
      "Sector Agroalimentario y de Alimentos en toda la cadena de suministro.",
  },
  {
    id: "29",
    tipo: "Proceso",
    pregunta:
      "Aunque las empresas no se certifican 'con el Codex' directamente sino a través de leyes locales, ¿cuáles son los pasos técnicos que debe dar una empresa para asegurar que sus títulos de calidad cumplen con la Comisión del Codex Alimentarius?",
    respuesta:
      "1. Estudiar la norma específica del Codex; 2. Adoptar el sistema HACCP; 3. Validar las técnicas de muestreo.",
  },
  {
    id: "30",
    tipo: "Proceso",
    pregunta:
      "¿Cuál es el paso institucional definitivo que convierte las directrices de la Comisión del Codex Alimentarius en un título o norma técnica obligatoria y auditable dentro de un país?",
    respuesta:
      "La armonización o transposición legal, donde el gobierno nacional adopta el texto del Codex y lo convierte en ley técnica.",
  },
];

export default function App() {
  // 🗂 CONTROL DE PESTAÑAS ("juego" | "gestion")
  const [pestanaActual, setPestanaActual] = useState<"juego" | "gestion">(
    "juego"
  );

  // 💾 ESTADO GLOBAL DE PREGUNTAS (LocalStorage)
  const [bancoPreguntas, setBancoPreguntas] = useState<Question[]>(() => {
    const guardadas = localStorage.getItem("banco_preguntas_calidad");
    return guardadas ? JSON.parse(guardadas) : initialQuestions;
  });

  useEffect(() => {
    localStorage.setItem(
      "banco_preguntas_calidad",
      JSON.stringify(bancoPreguntas)
    );
  }, [bancoPreguntas]);

  // 🎛 ESTADOS DEL FORMULARIO DE GESTIÓN
  const [idEditando, setIdEditando] = useState<string | null>(null);
  const [inputTipo, setInputTipo] = useState("");
  const [inputPregunta, setInputPregunta] = useState("");
  const [inputRespuesta, setInputRespuesta] = useState("");

  // 🎮 ESTADOS DEL JUEGO
  const [numJugadores, setNumJugadores] = useState<number>(3);
  const [jugadorActual, setJugadorActual] = useState<number>(1);
  const [puntajes, setPuntajes] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
  });
  const [nombres, setNombres] = useState<Record<number, string>>({
    1: "Jugador 1",
    2: "Jugador 2",
    3: "Jugador 3",
  });
  const [preguntaActual, setPreguntaActual] = useState<Question | null>(null);
  const [preguntasUsadas, setPreguntasUsadas] = useState<string[]>([]);
  const [mostrarRespuesta, setMostrarRespuesta] = useState<boolean>(false);
  const [tiempo, setTiempo] = useState<number>(10);
  const [juegoFinalizado, setJuegoFinalizado] = useState<boolean>(false);

  const progreso =
    bancoPreguntas.length > 0
      ? (preguntasUsadas.length / bancoPreguntas.length) * 100
      : 0;

  const inicializarJugadores = (cantidad: number) => {
    let p: Record<number, number> = {};
    let n: Record<number, string> = {};
    for (let i = 1; i <= cantidad; i++) {
      p[i] = 0;
      n[i] = `Jugador ${i}`;
    }
    setPuntajes(p);
    setNombres(n);
    setJugadorActual(1);
    setPreguntasUsadas([]);
  };

  // ⏱ TEMPORIZADOR CORREGIDO CON TODAS SUS DEPENDENCIAS SINCRO-DOM
  useEffect(() => {
    if (!preguntaActual || pestanaActual !== "juego") return;
    if (tiempo === 0) {
      siguienteTurno();
      return;
    }
    const t = setTimeout(() => setTiempo(tiempo - 1), 1000);
    return () => clearTimeout(t);
  }, [tiempo, preguntaActual, jugadorActual, numJugadores, pestanaActual]);

  // 🎯 GENERAR PREGUNTA DEL JUEGO
  const nuevaPregunta = () => {
    if (bancoPreguntas.length === 0) {
      alert(
        "⚠️ No hay preguntas en el banco. Ve a la pestaña de gestión para añadir."
      );
      return;
    }

    let usados = preguntasUsadas;
    if (usados.length === bancoPreguntas.length) {
      alert(
        "✅ Se completaron todas las preguntas del banco. Reiniciando historial..."
      );
      usados = [];
      setPreguntasUsadas([]);
    }

    const disponibles = bancoPreguntas.filter((q) => !usados.includes(q.id));
    const randomIndex = Math.floor(Math.random() * disponibles.length);
    const seleccionada = disponibles[randomIndex];

    setPreguntasUsadas([...usados, seleccionada.id]);
    setPreguntaActual(seleccionada);
    setMostrarRespuesta(false);
    setTiempo(60);
  };

  const responderCorrecto = () => {
    setPuntajes({
      ...puntajes,
      [jugadorActual]: (puntajes[jugadorActual] || 0) + 2,
    });
    siguienteTurno();
  };

  const siguienteTurno = () => {
    const sig = jugadorActual === numJugadores ? 1 : jugadorActual + 1;
    setJugadorActual(sig);
    setPreguntaActual(null);
    setMostrarRespuesta(false);
  };

  // 🛠 LÓGICA DE GESTIÓN (AGREGAR / EDITAR / ELIMINAR)
  const guardarPregunta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTipo || !inputPregunta || !inputRespuesta) {
      alert("Por favor rellena todos los campos.");
      return;
    }

    if (idEditando) {
      setBancoPreguntas(
        bancoPreguntas.map((q) =>
          q.id === idEditando
            ? {
                ...q,
                tipo: inputTipo,
                pregunta: inputPregunta,
                respuesta: inputRespuesta,
              }
            : q
        )
      );
      setIdEditando(null);
    } else {
      const nuevaQ: Question = {
        id: Date.now().toString(),
        tipo: inputTipo,
        pregunta: inputPregunta,
        respuesta: inputRespuesta,
      };
      setBancoPreguntas([...bancoPreguntas, nuevaQ]);
    }

    setInputTipo("");
    setInputPregunta("");
    setInputRespuesta("");
  };

  const iniciarEdicion = (q: Question) => {
    setIdEditando(q.id);
    setInputTipo(q.tipo);
    setInputPregunta(q.pregunta);
    setInputRespuesta(q.respuesta);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarPregunta = (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta pregunta?")) {
      setBancoPreguntas(bancoPreguntas.filter((q) => q.id !== id));
      if (preguntaActual?.id === id) setPreguntaActual(null);
      setPreguntasUsadas(preguntasUsadas.filter((uid) => uid !== id));
    }
  };

  const ranking = Object.entries(puntajes).sort((a, b) => b[1] - a[1]);

  return (
    <div
      style={{
        padding: 20,
        background: "#1a1a2e",
        color: "white",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* 🚀 ENCABEZADO Y NAVEGACIÓN POR PESTAÑAS */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          borderBottom: "2px solid #16213e",
          paddingBottom: "10px",
        }}
      >
        <h1>🎮 Aseguramiento de la Calidad</h1>
        <div>
          <button
            onClick={() => setPestanaActual("juego")}
            style={{
              padding: "12px 20px",
              margin: "5px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              background: pestanaActual === "juego" ? "#e94560" : "#16213e",
              color: "white",
            }}
          >
            🕹️ Pestaña de Juego
          </button>
          <button
            onClick={() => setPestanaActual("gestion")}
            style={{
              padding: "12px 20px",
              margin: "5px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              background: pestanaActual === "gestion" ? "#00c3ff" : "#16213e",
              color: "white",
            }}
          >
            ⚙️ Gestionar Preguntas ({bancoPreguntas.length})
          </button>
        </div>
      </div>

      {/* ================= PESTAÑA 1: EL JUEGO ================= */}
      {pestanaActual === "juego" && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ background: "#333", borderRadius: 10 }}>
            <div
              style={{
                width: `${progreso}%`,
                background: "linear-gradient(90deg,#00ffcc,#00c3ff)",
                height: "12px",
                borderRadius: 10,
                transition: "width 0.5s",
              }}
            />
          </div>
          <p style={{ marginTop: 5 }}>
            📊 {preguntasUsadas.length} de {bancoPreguntas.length} preguntas
            respondidas en esta ronda
          </p>

          {!juegoFinalizado && (
            <>
              <h2>👥 Configurar Jugadores</h2>
              <select
                value={numJugadores}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setNumJugadores(val);
                  inicializarJugadores(val);
                }}
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  background: "#16213e",
                  color: "#fff",
                  border: "1px solid #333",
                }}
              >
                {[2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Jugadores
                  </option>
                ))}
              </select>

              {/* PANEL DE CONFIGURACIÓN DE NOMBRES CON LLAVES ESTABLES */}
              <div style={{ marginTop: "10px" }}>
                {Object.keys(nombres).map((key) => {
                  const num = Number(key);
                  return (
                    <input
                      key={num}
                      value={nombres[num] || ""}
                      onChange={(e) =>
                        setNombres({ ...nombres, [num]: e.target.value })
                      }
                      style={{
                        margin: 5,
                        padding: 8,
                        borderRadius: "5px",
                        border: "1px solid #333",
                        background: "#fff",
                        color: "#000",
                      }}
                    />
                  );
                })}
              </div>

              {/* COMPONENTE DE TURNO TOTALMENTE REACTIVO */}
              <h2 style={{ color: "#00ffcc", marginTop: "20px" }}>
                Turno de: {nombres[jugadorActual]}
              </h2>

              {!preguntaActual && (
                <Button onClick={nuevaPregunta}>🎯 Lanzar Pregunta</Button>
              )}

              {preguntaActual && (
                <Card>
                  <h3 style={{ color: "#00c3ff" }}>
                    Categoría: {preguntaActual.tipo}
                  </h3>
                  <p style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>
                    {preguntaActual.pregunta}
                  </p>
                  <h2 style={{ color: "#f39c12" }}>⏱ {tiempo}s</h2>

                  {!mostrarRespuesta && (
                    <Button onClick={() => setMostrarRespuesta(true)}>
                      Ver Respuesta Sugerida
                    </Button>
                  )}
                  {mostrarRespuesta && (
                    <p
                      style={{
                        color: "lightgreen",
                        fontWeight: "bold",
                        margin: "15px 0",
                      }}
                    >
                      {preguntaActual.respuesta}
                    </p>
                  )}

                  <div style={{ marginTop: "15px" }}>
                    <Button onClick={responderCorrecto} color="#28a745">
                      ✅ Correcto (+2 pts)
                    </Button>
                    <Button onClick={siguienteTurno} color="#dc3545">
                      ❌ Incorrecto (Pasa Turno)
                    </Button>
                  </div>
                </Card>
              )}

              <div style={{ marginTop: "30px" }}>
                <Button
                  onClick={() => setJuegoFinalizado(true)}
                  color="#ffc107"
                >
                  🏁 Finalizar y Ver Podio
                </Button>
              </div>
            </>
          )}

          {juegoFinalizado && (
            <>
              <h2>🏆 Tabla de Posiciones Finales</h2>
              {ranking.map(([idStr, p], i) => (
                <Card key={idStr}>
                  <h3>
                    #{i + 1} - {nombres[Number(idStr)]}
                  </h3>
                  <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    {p} puntos
                  </p>
                </Card>
              ))}
              <Button onClick={() => setJuegoFinalizado(false)}>
                🔄 Continuar Jugando
              </Button>
              <Button
                onClick={() => inicializarJugadores(numJugadores)}
                color="#dc3545"
              >
                🧹 Resetear Puntajes
              </Button>
            </>
          )}
        </div>
      )}

      {/* ================= PESTAÑA 2: GESTIÓN DE PREGUNTAS ================= */}
      {pestanaActual === "gestion" && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {idEditando ? "✏️ Editar Pregunta" : "➕ Agregar Nueva Pregunta"}
          </h2>

          <form
            onSubmit={guardarPregunta}
            style={{
              background: "#16213e",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Clasificación / Tipo (Ej: Nombre, Proceso, Sector):
              </label>
              <input
                value={inputTipo}
                onChange={(e) => setInputTipo(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "none",
                }}
                placeholder="Ej: Proceso"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Pregunta:
              </label>
              <textarea
                value={inputPregunta}
                onChange={(e) => setInputPregunta(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "none",
                  height: "60px",
                  fontFamily: "sans-serif",
                }}
                placeholder="Escribe el enunciado de la pregunta..."
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Respuesta Correcta:
              </label>
              <textarea
                value={inputRespuesta}
                onChange={(e) => setInputRespuesta(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "none",
                  height: "60px",
                  fontFamily: "sans-serif",
                }}
                placeholder="Escribe la respuesta esperada..."
              />
            </div>
            <Button onClick={() => {}} color="#00ffcc">
              <span style={{ color: "#000" }}>
                {idEditando ? "💾 Guardar Cambios" : "➕ Añadir al Banco"}
              </span>
            </Button>
            {idEditando && (
              <Button
                onClick={() => {
                  setIdEditando(null);
                  setInputTipo("");
                  setInputPregunta("");
                  setInputRespuesta("");
                }}
                color="#666"
              >
                Cancelar
              </Button>
            )}
          </form>

          <h2>
            📋 Lista Total de Preguntas Disponibles ({bancoPreguntas.length})
          </h2>
          {bancoPreguntas.length === 0 ? (
            <p style={{ color: "#aaa" }}>
              No hay preguntas registradas. ¡Crea una arriba!
            </p>
          ) : (
            bancoPreguntas.map((q, index) => (
              <div
                key={q.id}
                style={{
                  background: "#0f172a",
                  padding: "15px",
                  borderRadius: "10px",
                  margin: "10px 0",
                  borderLeft: "5px solid #00c3ff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      background: "#1e293b",
                      padding: "4px 8px",
                      borderRadius: "5px",
                      fontSize: "0.85rem",
                      color: "#00ffcc",
                    }}
                  >
                    #{index + 1} - {q.tipo}
                  </span>
                  <div>
                    <button
                      onClick={() => iniciarEdicion(q)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#f39c12",
                        cursor: "pointer",
                        marginRight: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => eliminarPregunta(q.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#dc3545",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      ❌ Eliminar
                    </button>
                  </div>
                </div>
                <p style={{ margin: "10px 0 5px 0", fontWeight: "500" }}>
                  {q.pregunta}
                </p>
                <p style={{ margin: 0, color: "#a7f3d0", fontSize: "0.95rem" }}>
                  👉 <strong>R:</strong> {q.respuesta}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
