document.addEventListener("DOMContentLoaded", () => {
  // --- DATOS DEL EQUIPO ---
  const teamData = [
    {
      id: 1,
      name: "DR. ALBERTO ANDRADE MENDOZA",
      role: "SOCIO FUNDADOR",
      bio: "Mi compromiso es ser el enlace estratégico que protege y potencia tu negocio. Me especializo en diseñar estrategias de planeación fiscal que optimizan tu carga tributaria dentro del marco legal. Actúo como tu firme defensa e interlocutor ante las autoridades y aseguro el cumplimiento normativo en la Leyes fiscales. Mi objetivo es traducir las complejas reformas anuales en soluciones claras para tu empresa, brindándote tranquilidad y una asesoría siempre cercana.",
      email:
        "https://mail.google.com/mail/?view=cm&fs=1&to=dr.albertoandrade@mach.com",
      photoMain: "images/perfiles/GeminiAndrade.png",
      photoThumb: "images/perfiles/andrade-perfil.png",
    },
    {
      id: 2,
      name: "C.P. IRENE MENDEZ ROBLEDO",
      role: "SOCIA FUNDADORA",
      bio: "Mi prioridad es ser tu primera linea de defensa y tranquilidad operativa. Me especializo en blindar tu relacion con la autoridad, gestionando con inmediatez y eficacia cualquier requerimiento o carta de invitacion del SAT para aclarar inconsistencias antes de que se vuelvan problemas Mi expertis abarca desde la precision tecnica en tu cierre fiscal, hasta el acompañamiento total en auditorias. Me encargo de defenderte ante cualquier revision con certeza de que tu empresa esta protegida y en orden.",
      email:
        "https://mail.google.com/mail/?view=cm&fs=1&to=cp.irenemendez@mach.com",
      photoMain: "images/perfiles/GeminiIrene.png",
      photoThumb: "images/perfiles/irene-perfil.png",
    },
    {
      id: 3,
      name: "L.C. LUIS ALBERTO LUNA ALVAREZ",
      role: "SOCIO",
      bio: "Mi enfoque es brindar certeza y tranquilidad financiera a tu negocio. Me especializo en el análisis de regímenes fiscales, determinando la opción más rentable entre los existentes y supervisando proactivamente el impacto tributario de tus operaciones. Además, protejo a tu empresa mediante el estricto cumplimiento de la normativa REPSE, y diseño soluciones integrales en materia de seguridad social. Mi compromiso es simplificar lo complejo para que tú puedas dedicarte a hacer crecer tu empresa.",
      email:
        "https://mail.google.com/mail/?view=cm&fs=1&to=lc.luisluna@mach.com",
      photoMain: "images/perfiles/C.P.Luis - copia.jpg",
      photoThumb: "images/perfiles/luis-perfil.png",
    },
    {
      id: 4,
      name: "L.C. JUAN CARLOS BARRERA MENDOZA",
      role: "SOCIO",
      bio: "Transformo tu contabilidad en un escudo preventivo. Con un blindaje fiscal anticipado: ejecuto revisiones continuas, la contabilidad contra los datos del SAT, detectando y corrigiendo cualquier discrepancia antes de que se convierta en un requerimiento. Garantizo un cumplimiento patronal impecable, gestionando con precisión milimétrica tu nómina, cuotas de seguridad social e impuestos locales. Protejo tu patrimonio gestionando liquidaciones y finiquitos con estricto apego a la ley, blindándote contra cualquier demanda futura.",
      email:
        "https://mail.google.com/mail/?view=cm&fs=1&to=lc.juancbarrera@mach.com",
      photoMain: "images/perfiles/C.P.JC - copia.jpg",
      photoThumb: "images/perfiles/jc-perfil.png",
    },
    {
      id: 5,
      name: "C.P. ALEJANDRO MENDOZA ARMENTA",
      role: "SOCIO",
      bio: "Mi misión es blindar la seguridad financiera de tu empresa. Me especializo en la defensa de la materialidad, integrando expedientes sólidos como contratos, bitácoras y entregables que demuestran la realidad de tus operaciones, y en la protección exhaustiva ante el Art. 69-B del CFF. Además, optimizo tu flujo de efectivo mediante la gestión eficiente de devoluciones y compensaciones de impuestos y la aplicación estratégica de estímulos fiscales. Trabajo contigo hombro a hombro para que tu contabilidad sea sinónimo de certeza y crecimiento.",
      email:
        "https://mail.google.com/mail/?view=cm&fs=1&to=cp.alejandromendoza@mach.com",
      photoMain: "images/perfiles/GeminiAlex.png",
      photoThumb: "images/perfiles/alex-perfil.png",
    },
  ];

  let currentIndex = 0;
  let autoPlayInterval;
  const autoPlayTime = 8000;

  // Elementos DOM
  const nameEl = document.getElementById("member-name");
  const roleEl = document.getElementById("member-role");
  const bioEl = document.getElementById("member-bio");
  const emailEl = document.getElementById("member-email");
  const photoEl = document.getElementById("member-photo");
  const thumbnailsContainer = document.getElementById("thumbnails-container");
  const infoWrapper = document.getElementById("info-wrapper");

  // Función de actualización ESTABLE
  function updateView(index) {
    const member = teamData[index];

    // 1. Animación Texto
    infoWrapper.classList.remove("fade-in-text");
    void infoWrapper.offsetWidth; // Trigger Reflow
    infoWrapper.classList.add("fade-in-text");

    // 2. Cambio de Imagen (Pre-carga)
    const tempImg = new Image();
    tempImg.src = member.photoMain;

    tempImg.onload = () => {
      photoEl.style.opacity = 0.8;
      setTimeout(() => {
        photoEl.src = member.photoMain;
        photoEl.style.opacity = 1;
      }, 100);
    };

    // 3. Actualizar Textos
    nameEl.textContent = member.name;
    roleEl.textContent = member.role;
    bioEl.textContent = member.bio;

    // Validar link
    if (member.email.includes("http")) {
      emailEl.href = member.email;
    } else {
      emailEl.href = `mailto:${member.email}`;
    }

    // --- CORRECCIÓN AQUÍ ---
    // Antes: document.querySelectorAll(".nav-item")... <- Esto seleccionaba items del menú de arriba por error
    // Ahora: thumbnailsContainer.querySelectorAll(".nav-item")... <- Solo selecciona los círculos
    thumbnailsContainer.querySelectorAll(".nav-item").forEach((btn, i) => {
      if (i === index) {
        btn.classList.add("active");
        btn.classList.remove("inactive");
      } else {
        btn.classList.remove("active");
        btn.classList.add("inactive");
      }
    });

    currentIndex = index;
  }

  // Renderizar Navegación
  function renderThumbnails() {
    thumbnailsContainer.innerHTML = "";
    teamData.forEach((member, index) => {
      const div = document.createElement("div");
      // Asignar clase inicial
      div.className = `nav-item ${index === 0 ? "active" : "inactive"}`;
      div.onclick = () => manualSelect(index);
      div.title = member.name;
      div.innerHTML = `<img src="${member.photoThumb}" alt="${member.name}">`;
      thumbnailsContainer.appendChild(div);
    });
  }

  function manualSelect(index) {
    clearInterval(autoPlayInterval);
    updateView(index);
    startAutoPlay();
  }

  function startAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= teamData.length) nextIndex = 0;
      updateView(nextIndex);
    }, autoPlayTime);
  }

  renderThumbnails();
  // Al cargar, aseguramos que solo el índice 0 esté activo visualmente
  // (aunque renderThumbnails ya lo hace, updateView refuerza la lógica correcta)
  updateView(0);
  startAutoPlay();
});
