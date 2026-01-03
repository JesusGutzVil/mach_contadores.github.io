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
      name: "C.P. Irene",
      role: "Gerente de Auditoría",
      bio: "Especialista en control interno y auditoría financiera, garantizando la transparencia en cada proceso.",
      email: "auditoria@machcontadores.com",
      photoMain: "images/perfiles/GeminiIrene.png",
      photoThumb: "images/perfiles/irene-perfil.png",
    },
    {
      id: 3,
      name: "C.P. Luis",
      role: "Asesor Fiscal",
      bio: "Experto en normativas tributarias vigentes y optimización de recursos empresariales.",
      email: "fiscal@machcontadores.com",
      photoMain: "images/perfiles/C.P.Luis - copia.jpg",
      photoThumb: "images/perfiles/luis-perfil.png",
    },
    {
      id: 4,
      name: "C.P. JC",
      role: "Consultor Senior",
      bio: "Enfoque estratégico en finanzas corporativas y desarrollo de negocios sustentables.",
      email: "consultoria@machcontadores.com",
      photoMain: "images/perfiles/C.P.JC - copia.jpg",
      photoThumb: "images/perfiles/jc-perfil.png",
    },
    {
      id: 5,
      name: "C.P. Alex",
      role: "Jefe de Operaciones",
      bio: "Encargado de la eficiencia operativa y la integración tecnológica en procesos contables.",
      email: "operaciones@machcontadores.com",
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
