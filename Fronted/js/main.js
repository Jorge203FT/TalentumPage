/* ==========================================
   FIREBASE / FIRESTORE
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("Talentum Selección iniciado correctamente");

    /* ==========================================
   NAVBAR - ENLACE ACTIVO
========================================== */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        // Quitar active de todos
        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        // Agregar active al enlace presionado
        link.classList.add("active");

    });

});


    /* ==========================================
       MENÚ HAMBURGUESA RESPONSIVE
    =========================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");


    // Verificamos que ambos elementos existan
    if (menuToggle && navMenu) {

        /* ABRIR / CERRAR MENÚ */

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const menuIsOpen =
                navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                menuIsOpen
            );


            /* Cambiar icono ☰ por X */

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                if (menuIsOpen) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });



        /* ==========================================
           CERRAR MENÚ AL ELEGIR UNA OPCIÓN
        =========================================== */

        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });



        /* ==========================================
           CERRAR MENÚ AL VOLVER A PC
        =========================================== */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 900) {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    }



   /* ==========================================
   CONTADORES ANIMADOS - MÉTRICAS
=========================================== */

const counters = document.querySelectorAll(".counter");

/* Animar contador desde 0 */
function animateCounter(counter) {

    const target = Number(counter.dataset.target);
    const prefix = counter.dataset.prefix || "";
    const suffix = counter.dataset.suffix || "";

    const duration = 1000;

    let startTime = null;

    /* Evita ejecutar dos animaciones al mismo tiempo */
    counter.dataset.animating = "true";

    function updateCounter(currentTime) {

        if (!startTime) {
            startTime = currentTime;
        }

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        /* Movimiento suave */
        const easeOut =
            1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(
            target * easeOut
        );

        counter.textContent =
            prefix +
            currentValue.toLocaleString("en-US") +
            suffix;

        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            counter.textContent =
                prefix +
                target.toLocaleString("en-US") +
                suffix;

            counter.dataset.animating = "false";
        }
    }

    requestAnimationFrame(updateCounter);
}


/* Reiniciar contador en 0 */
function resetCounter(counter) {

    const prefix = counter.dataset.prefix || "";
    const suffix = counter.dataset.suffix || "";

    counter.textContent =
        prefix + "0" + suffix;

    counter.dataset.animating = "false";
}


/* ==========================================
   DETECTAR ENTRADA / SALIDA DE PANTALLA
=========================================== */

const counterObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            /* Cuando aparece */
            if (entry.isIntersecting) {

                if (
                    entry.target.dataset.animating !== "true"
                ) {
                    animateCounter(entry.target);
                }

            }

            /* Cuando desaparece */
            else {

                resetCounter(entry.target);

            }

        });

    },
    {
        threshold: 0.4
    }
);


/* ==========================================
   INICIALIZAR CONTADORES
=========================================== */

counters.forEach((counter) => {

    resetCounter(counter);

    counterObserver.observe(counter);

});


    /* ==========================================
   CARRUSEL DE EMPRESAS / LOGOS
=========================================== */

const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const wrapper = document.querySelector(".carousel-wrapper");
const carouselContainer = document.querySelector(".carousel-container");

if (
    track &&
    prevBtn &&
    nextBtn &&
    wrapper &&
    carouselContainer
) {

    const slides = Array.from(track.children);

    let currentIndex = 0;
    let autoPlayTimer = null;
    let resizeTimer = null;


    /* ==========================================
       LOGOS VISIBLES SEGÚN PANTALLA
    =========================================== */

    function getVisibleSlides() {

        const width = window.innerWidth;

        if (width <= 600) {
            return 2;
        }

        if (width <= 900) {
            return 3;
        }

        return 4;
    }


    /* ==========================================
       ACTUALIZAR CARRUSEL
    =========================================== */

    function updateCarousel() {

        if (slides.length === 0) {
            return;
        }

        const visibleSlides = getVisibleSlides();

        const maxIndex = Math.max(
            slides.length - visibleSlides,
            0
        );

        /* Evitar índices inválidos al cambiar
           de monitor, tablet o celular */
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        /* Calculamos el ancho utilizando
           el contenedor visible real */
        const containerWidth =
            carouselContainer.clientWidth;

        const slideWidth =
            containerWidth / visibleSlides;

        track.style.transform =
            `translate3d(-${currentIndex * slideWidth}px, 0, 0)`;
    }


    /* ==========================================
       SIGUIENTE
    =========================================== */

    function nextSlide() {

        const visibleSlides = getVisibleSlides();

        const maxIndex = Math.max(
            slides.length - visibleSlides,
            0
        );

        currentIndex =
            currentIndex >= maxIndex
                ? 0
                : currentIndex + 1;

        updateCarousel();
    }


    /* ==========================================
       ANTERIOR
    =========================================== */

    function prevSlide() {

        const visibleSlides = getVisibleSlides();

        const maxIndex = Math.max(
            slides.length - visibleSlides,
            0
        );

        currentIndex =
            currentIndex <= 0
                ? maxIndex
                : currentIndex - 1;

        updateCarousel();
    }


    /* ==========================================
       AUTOPLAY
    =========================================== */

    function startAutoPlay() {

        stopAutoPlay();

        autoPlayTimer = setInterval(
            nextSlide,
            3500
        );
    }


    function stopAutoPlay() {

        if (autoPlayTimer) {

            clearInterval(autoPlayTimer);

            autoPlayTimer = null;
        }
    }


    /* ==========================================
       BOTONES
    =========================================== */

    nextBtn.addEventListener("click", () => {

        nextSlide();
        startAutoPlay();

    });


    prevBtn.addEventListener("click", () => {

        prevSlide();
        startAutoPlay();

    });


    /* ==========================================
       PAUSAR CON MOUSE
    =========================================== */

    wrapper.addEventListener(
        "mouseenter",
        stopAutoPlay
    );


    wrapper.addEventListener(
        "mouseleave",
        startAutoPlay
    );


    /* ==========================================
       RESPONSIVE
    =========================================== */

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            updateCarousel();

        }, 100);

    });


    /* ==========================================
       INICIAR
    =========================================== */

    updateCarousel();
    startAutoPlay();
}


});

/* ==========================================
   CARRUSEL DE TESTIMONIOS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("testimoniosTrack");
    const prevButton = document.getElementById("testimonialPrev");
    const nextButton = document.getElementById("testimonialNext");

    // Si alguno de los elementos no existe, detenemos este código
    if (!track || !prevButton || !nextButton) {
        return;
    }

    const cards = Array.from(
        track.querySelectorAll(".testimonio-card")
    );

    let currentIndex = 0;
    let autoPlay;


    /* ==========================================
       CANTIDAD DE TESTIMONIOS VISIBLES
    ========================================== */

    function getVisibleCards() {

        // Celular = 1
        if (window.innerWidth <= 600) {
            return 1;
        }

        // Tablet y computadora = 2
        return 2;
    }


    /* ==========================================
       ACTUALIZAR POSICIÓN
    ========================================== */

    function updateCarousel() {

        const visibleCards = getVisibleCards();

        const maxIndex = Math.max(
            0,
            cards.length - visibleCards
        );


        // Evitar salir del carrusel
        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        if (currentIndex < 0) {
            currentIndex = maxIndex;
        }


        // Obtenemos el ancho real de una tarjeta
        const cardWidth =
            cards[0].getBoundingClientRect().width;


        // Obtenemos el espacio GAP del track
        const trackStyles =
            window.getComputedStyle(track);

        const gap =
            parseFloat(trackStyles.gap) || 0;


        // Distancia que debemos mover
        const movement =
            currentIndex * (cardWidth + gap);


        track.style.transform =
            `translateX(-${movement}px)`;

    }


    /* ==========================================
       SIGUIENTE
    ========================================== */

    function nextTestimonial() {

        const visibleCards = getVisibleCards();

        const maxIndex = Math.max(
            0,
            cards.length - visibleCards
        );

        if (currentIndex >= maxIndex) {

            currentIndex = 0;

        } else {

            currentIndex++;

        }

        updateCarousel();

    }


    /* ==========================================
       ANTERIOR
    ========================================== */

    function previousTestimonial() {

        const visibleCards = getVisibleCards();

        const maxIndex = Math.max(
            0,
            cards.length - visibleCards
        );

        if (currentIndex <= 0) {

            currentIndex = maxIndex;

        } else {

            currentIndex--;

        }

        updateCarousel();

    }


    /* ==========================================
       AUTOPLAY
    ========================================== */

    function startAutoPlay() {

        stopAutoPlay();

        autoPlay = setInterval(() => {

            nextTestimonial();

        }, 4000);

    }


    function stopAutoPlay() {

        if (autoPlay) {

            clearInterval(autoPlay);

        }

    }


    /* ==========================================
       CLICK FLECHA DERECHA
    ========================================== */

    nextButton.addEventListener("click", () => {

        nextTestimonial();

        // Reiniciamos el tiempo automático
        startAutoPlay();

    });


    /* ==========================================
       CLICK FLECHA IZQUIERDA
    ========================================== */

    prevButton.addEventListener("click", () => {

        previousTestimonial();

        startAutoPlay();

    });


    /* ==========================================
       RESPONSIVE
    ========================================== */

    window.addEventListener("resize", () => {

        currentIndex = 0;

        updateCarousel();

    });


    /* ==========================================
       INICIAR
    ========================================== */

    updateCarousel();

    startAutoPlay();

});

/* ==========================================
   FORMULARIOS - FIRESTORE
========================================== */
document.addEventListener("DOMContentLoaded", () => {

    /*Modal*/
    const modalOverlay = document.getElementById("custom-modal");
    const modalIcon = document.getElementById("modal-icon");
    const modalIconSymbol = document.getElementById("modal-icon-symbol");
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    // Función para mostrar el modal dinámico
    function mostrarModal({ titulo, mensaje, tipo = "warning" }) {
        if (!modalOverlay) return;

        const conexaPromo = document.getElementById("modal-conexa-promo");

        modalTitle.textContent = titulo;
        modalMessage.innerHTML = mensaje;

        // Limpiar clases del icono
        modalIcon.className = "modal-icon " + tipo;

        // Cambiar icono según el tipo de respuesta
        if (tipo === "success") {
            modalIconSymbol.className = "fa-solid fa-circle-check";
            if (conexaPromo) {
                conexaPromo.style.display = "block";
            }conexaPromo.style.display = "block"
        } else if (tipo === "error") {
            modalIconSymbol.className = "fa-solid fa-circle-xmark";
            if (conexaPromo){
                conexaPromo.style.display = "none";
            }
        } else {
            modalIconSymbol.className = "fa-solid fa-triangle-exclamation";
            if (conexaPromo){
                conexaPromo.style.display = "none";
            }
        }
        modalOverlay.classList.add("active");
    }

    // Eventos para cerrar el modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", () => {
            modalOverlay.classList.remove("active");
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove("active");
            }
        });
    }

    /*Validación de datos ingresados en el formulario*/
    function esCorreoValido(correo) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(correo);
    }

    function esSoloNumeros(valor) {
        return /^\d+$/.test(valor);
    }

    function limpiarErroresInputs(formulario) {
        const inputs = formulario.querySelectorAll("input");
        inputs.forEach(input => input.classList.remove("input-error"));
    }

    function marcarInputError(idInput) {
        const input = document.getElementById(idInput);
        if (input) {
            input.classList.add("input-error");
            input.focus();
        }
    }

    /* ==========================================
       FORMULARIO CANDIDATOS
    ========================================== */
    const formCandidatos = document.getElementById("form-candidatos");

    if (formCandidatos) {
        formCandidatos.addEventListener("submit", async (event) => {
            event.preventDefault();
            limpiarErroresInputs(formCandidatos);

            const nombre = document.getElementById("candidato-nombre")?.value.trim() || "";
            const dni = document.getElementById("candidato-dni")?.value.trim() || "";
            const modalidad = document.getElementById("candidato-modalidad")?.value.trim() || "";
            const telefono = document.getElementById("candidato-telefono")?.value.trim() || "";
            const correo = document.getElementById("candidato-correo")?.value.trim() || "";
            const area = document.getElementById("candidato-area")?.value.trim() || "";

            /* --- VALIDACIONES DE CAMPOS --- */
            if (!nombre || !dni || !modalidad || !telefono || !correo || !area) {
                mostrarModal({
                    titulo: "Campos Incompletos",
                    mensaje: "Todos los campos de texto son obligatorios.",
                    tipo: "warning"
                });
                return;
            }

            if (nombre.length < 3) {
                marcarInputError("candidato-nombre");
                mostrarModal({
                    titulo: "Nombre Inválido",
                    mensaje: "Por favor, ingresa tu nombre completo.",
                    tipo: "warning"
                });
                return;
            }

            if (!esSoloNumeros(dni) || dni.length !== 8) {
                marcarInputError("candidato-dni");
                mostrarModal({
                    titulo: "DNI Inválido",
                    mensaje: "El número de DNI debe contener exactamente <b>8 dígitos numéricos</b>.",
                    tipo: "warning"
                });
                return;
            }

            if (!esSoloNumeros(telefono) || telefono.length !== 9) {
                marcarInputError("candidato-telefono");
                mostrarModal({
                    titulo: "Teléfono Inválido",
                    mensaje: "El número de teléfono debe contener exactamente <b>9 dígitos</b>.",
                    tipo: "warning"
                });
                return;
            }

            if (!esCorreoValido(correo)) {
                marcarInputError("candidato-correo");
                mostrarModal({
                    titulo: "Correo Inválido",
                    mensaje: "Ingresa un correo electrónico con formato válido (ejemplo@correo.com).",
                    tipo: "warning"
                });
                return;
            }

            const boton = formCandidatos.querySelector('button[type="submit"]');

            try {
                boton.disabled = true;
                boton.textContent = "Enviando...";

                const idCandidato = `${nombre}_${dni}`
                    .trim()
                    .replace(/\s+/g, "_")
                    .replace(/[\/.#$\[\]]/g, "")
                    .toUpperCase();

                await setDoc(
                    doc(db, "solicitudes_candidatos", idCandidato),
                    {
                        nombre,
                        dni,
                        modalidad,
                        telefono,
                        correo,
                        area,
                        fechaRegistro: serverTimestamp()
                    }
                );

                mostrarModal({
                    titulo: "¡Registro Exitoso!",
                    mensaje: `Gracias <b>${nombre}</b>, tu hoja de vida ha sido registrada correctamente en nuestra bolsa de trabajo. Accede a nuestra plataforma de empleo y encuentra nuevas oportunidades`,
                    tipo: "success"
                });

                formCandidatos.reset();

            } catch (error) {
                console.error("Error al guardar candidato:", error);
                mostrarModal({
                    titulo: "Error al registrar",
                    mensaje: "No se pudo guardar la información. Por favor, vuelve a intentarlo en unos momentos.",
                    tipo: "error"
                });
            } finally {
                boton.disabled = false;
                boton.innerHTML = "Enviar mi Información &rarr;";
            }
        });
    }

    /* ==========================================
       FORMULARIO EMPRESAS
    ========================================== */
    const formEmpresas = document.getElementById("form-empresas");

    if (formEmpresas) {
        formEmpresas.addEventListener("submit", async (event) => {
            event.preventDefault();
            limpiarErroresInputs(formEmpresas);

            const ruc = document.getElementById("empresa-ruc")?.value.trim() || "";
            const empresa = document.getElementById("empresa-nombre")?.value.trim() || "";
            const contacto = document.getElementById("empresa-contacto")?.value.trim() || "";
            const cargo = document.getElementById("empresa-cargo")?.value.trim() || "";
            const correo = document.getElementById("empresa-correo")?.value.trim() || "";
            const telefono = document.getElementById("empresa-telefono")?.value.trim() || "";
            const interes = document.getElementById("empresa-interes")?.value.trim() || "";

            /* --- VALIDACIONES DE CAMPOS --- */
            if (!ruc || !empresa || !contacto || !cargo || !correo || !telefono || !interes) {
                mostrarModal({
                    titulo: "Campos incompletos",
                    mensaje: "Por favor, completa todos los campos del formulario.",
                    tipo: "warning"
                });
                return;
            }

            if (!esSoloNumeros(ruc) || ruc.length !== 11) {
                marcarInputError("empresa-ruc");
                mostrarModal({
                    titulo: "RUC Inválido",
                    mensaje: "El número de RUC debe contener exactamente <b>11 dígitos numéricos</b>.",
                    tipo: "warning"
                });
                return;
            }

            if (!esCorreoValido(correo)) {
                marcarInputError("empresa-correo");
                mostrarModal({
                    titulo: "Correo Inválido",
                    mensaje: "Por favor, ingresa una dirección de correo electrónico válida.",
                    tipo: "warning"
                });
                return;
            }

            if (!esSoloNumeros(telefono) || telefono.length !== 9) {
                marcarInputError("empresa-telefono");
                mostrarModal({
                    titulo: "Teléfono Inválido",
                    mensaje: "El número de teléfono debe contener <b>9 dígitos</b>.",
                    tipo: "warning"
                });
                return;
            }

            const boton = formEmpresas.querySelector('button[type="submit"]');

            try {
                boton.disabled = true;
                boton.textContent = "Enviando...";

                const idEmpresa = `${empresa}_${ruc}`
                    .trim()
                    .replace(/\s+/g, "_")
                    .replace(/[\/.#$\[\]]/g, "")
                    .toUpperCase();

                await setDoc(
                    doc(db, "solicitudes_empresas", idEmpresa),
                    {
                        ruc,
                        empresa,
                        contacto,
                        cargo,
                        correo,
                        telefono,
                        interes,
                        fechaRegistro: serverTimestamp()
                    }
                );

                mostrarModal({
                    titulo: "¡Solicitud Enviada!",
                    mensaje: `Hemos recibido la solicitud de <b>${empresa}</b>. Un asesor comercial se pondrá en contacto al correo <b>${correo}</b>.`,
                    tipo: "success"
                });

                formEmpresas.reset();

            } catch (error) {
                console.error("Error al guardar la solicitud:", error);
                mostrarModal({
                    titulo: "Error al enviar",
                    mensaje: "Ocurrió un inconveniente al procesar tu solicitud. Por favor, inténtalo nuevamente.",
                    tipo: "error"
                });
            } finally {
                boton.disabled = false;
                boton.innerHTML = "Solicitar información &rarr;";
            }
        });
    }

  // ==========================================
// SECCIÓN DE SERVICIOS - MODAL
// ==========================================

const modalServicio = document.getElementById("modal-servicio-detalle");
const modalTitulo = document.getElementById("modal-servicio-titulo");
const modalIcono = document.getElementById("modal-servicio-icono");
const modalContenido = document.getElementById("modal-servicio-contenido");
const btnCerrar = document.getElementById("btn-cerrar-modal-servicio");
const btnContacto = document.getElementById("modal-servicio-contacto");

const botonesConocerMas =
    document.querySelectorAll(".btn-open-service-modal");




// ABRIR MODAL
botonesConocerMas.forEach((boton) => {

    boton.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopPropagation();

        const tarjeta = boton.closest(".solution-card");

        if (!tarjeta) return;


        // Obtener información DE LA TARJETA PRESIONADA
        const titulo =
            tarjeta.querySelector("h3")?.innerHTML || "Servicio";

        const icono =
            tarjeta.querySelector(".solution-icon");

        const plantilla =
            tarjeta.querySelector(".service-details-data");


        // Cargar información
        if (modalTitulo) {
            modalTitulo.innerHTML = titulo;
        }

        if (modalIcono && icono) {
            modalIcono.className = icono.className;
            modalIcono.innerHTML = icono.innerHTML;
        }

        if (modalContenido && plantilla) {
            modalContenido.innerHTML = plantilla.innerHTML;
        }


        // Abrir modal exactamente sobre la pantalla actual
if (modalServicio) {
    modalServicio.classList.add("active");
}

    });

});


function cerrarModalServicio() {

    if (modalServicio) {
        modalServicio.classList.remove("active");
    }

}


// Cerrar con X
if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarModalServicio);
}


// Botón del modal
if (btnContacto) {
    btnContacto.addEventListener("click", cerrarModalServicio);
}


// Cerrar tocando el fondo
if (modalServicio) {

    modalServicio.addEventListener("click", (e) => {

        if (e.target === modalServicio) {
            cerrarModalServicio();
        }

    });
}

});

/* ==========================================
   ELEMENTOS APARECEN AL HACER SCROLL
========================================== */

const revealElements = document.querySelectorAll(
    ".hero-content, .hero-buttons, .stat-item, section, .solution-card, .stepper"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* ==========================================
   ABRIR MODAL DESDE MENÚ SERVICIOS
========================================== */

document.querySelectorAll(".menu-servicio-modal").forEach((link) => {

    link.addEventListener("click", function (e) {
        e.preventDefault();

        // CERRAR EL MENÚ DESPLEGABLE DE SERVICIOS
        const dropdown = this.closest(".services-dropdown");

        if (dropdown) {
            dropdown.style.display = "none";

            // Permite que vuelva a funcionar al pasar nuevamente el mouse
            setTimeout(() => {
                dropdown.style.display = "";
            }, 300);
        }

        const servicioId = this.dataset.servicio;
        const tarjeta = document.getElementById(servicioId);

        if (!tarjeta) return;

        // Ir suavemente hasta la tarjeta
        tarjeta.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Abrir el mismo modal del botón "Conoce más"
        setTimeout(() => {

            const botonModal =
                tarjeta.querySelector(".btn-open-service-modal");

            if (botonModal) {
                botonModal.click();
            }

        }, 500);
    });

});

/* ==========================================
   CURSOR MORADO PERSONALIZADO
========================================== */

const purpleCursor = document.createElement("div");
purpleCursor.classList.add("cursor-purple", "hidden");

document.body.appendChild(purpleCursor);


/* Seguir al mouse */
document.addEventListener("mousemove", (e) => {

    purpleCursor.style.left = `${e.clientX}px`;
    purpleCursor.style.top = `${e.clientY}px`;

    purpleCursor.classList.remove("hidden");

});


/* Detectar elementos clickeables dinámicamente */
document.addEventListener("mouseover", (e) => {

    if (
        e.target.closest(
            "a, button, .solution-card, .nav-link, .btn, [role='button']"
        )
    ) {
        purpleCursor.classList.add("hover");
    }

});


document.addEventListener("mouseout", (e) => {

    if (
        e.target.closest(
            "a, button, .solution-card, .nav-link, .btn, [role='button']"
        )
    ) {
        purpleCursor.classList.remove("hover");
    }

});


/* Si el mouse sale de la ventana */
document.addEventListener("mouseleave", () => {
    purpleCursor.classList.add("hidden");
});

