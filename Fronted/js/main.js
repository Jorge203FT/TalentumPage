document.addEventListener("DOMContentLoaded", () => {

    console.log("Talentum Selección iniciado correctamente");


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

    const counters =
        document.querySelectorAll(".counter");


    counters.forEach((counter) => {

        // Número final
        const target =
            Number(counter.dataset.target);

        // Signos + y %
        const prefix =
            counter.dataset.prefix || "";

        const suffix =
            counter.dataset.suffix || "";

        // Duración de la animación
        // 900 = 0.9 segundos
        const duration = 900;

        // Comenzamos desde 1
        const startValue = 1;

        let startTime = null;


        function animateCounter(currentTime) {

            if (!startTime) {

                startTime = currentTime;

            }


            // Progreso entre 0 y 1
            const progress = Math.min(

                (currentTime - startTime) / duration,

                1

            );


            // Animación suave y rápida
            const easeOut =
                1 - Math.pow(1 - progress, 3);


            // Calculamos el número actual
            const currentValue =
                Math.floor(

                    startValue +
                    (target - startValue) *
                    easeOut

                );


            // Formato del número
            const formattedValue =
                currentValue.toLocaleString("en-US");


            // Mostramos el resultado
            counter.textContent =

                prefix +
                formattedValue +
                suffix;


            // Continuamos hasta llegar
            // al número final
            if (progress < 1) {

                requestAnimationFrame(
                    animateCounter
                );

            } else {

                // Terminamos exactamente
                // en el número indicado

                counter.textContent =

                    prefix +
                    target.toLocaleString("en-US") +
                    suffix;

            }

        }


        // Iniciar animación
        requestAnimationFrame(
            animateCounter
        );

    });



    /* ==========================================
       CARRUSEL DE EMPRESAS / LOGOS
    =========================================== */

    const track =
        document.getElementById("carouselTrack");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const wrapper =
        document.querySelector(".carousel-wrapper");


    /*
       Solo ejecutamos el carrusel
       si los elementos existen.
    */

    if (track && prevBtn && nextBtn && wrapper) {

        const slides =
            Array.from(track.children);

        let currentIndex = 0;

        let autoPlayTimer = null;



        /* ==========================================
           LOGOS VISIBLES SEGÚN PANTALLA
        =========================================== */

        function getVisibleSlides() {

            if (window.innerWidth <= 600) {

                return 2;

            }

            if (window.innerWidth <= 900) {

                return 3;

            }

            return 4;

        }



        /* ==========================================
           ACTUALIZAR CARRUSEL
        =========================================== */

        function updateCarousel() {

            const visibleSlides =
                getVisibleSlides();

            const maxIndex =
                Math.max(
                    slides.length - visibleSlides,
                    0
                );


            if (currentIndex > maxIndex) {

                currentIndex = 0;

            }


            if (currentIndex < 0) {

                currentIndex = maxIndex;

            }


            if (slides.length === 0) {

                return;

            }


            const slideWidth =
                slides[0]
                    .getBoundingClientRect()
                    .width;


            track.style.transform =

                `translateX(-${
                    currentIndex * slideWidth
                }px)`;

        }



        /* ==========================================
           SIGUIENTE
        =========================================== */

        function nextSlide() {

            const visibleSlides =
                getVisibleSlides();

            const maxIndex =
                Math.max(
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

            const visibleSlides =
                getVisibleSlides();

            const maxIndex =
                Math.max(
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

            autoPlayTimer =
                setInterval(
                    nextSlide,
                    3500
                );

        }


        function stopAutoPlay() {

            if (autoPlayTimer) {

                clearInterval(
                    autoPlayTimer
                );

                autoPlayTimer = null;

            }

        }



        /* ==========================================
           BOTONES
        =========================================== */

        nextBtn.addEventListener(
            "click",
            () => {

                nextSlide();

                startAutoPlay();

            }
        );


        prevBtn.addEventListener(
            "click",
            () => {

                prevSlide();

                startAutoPlay();

            }
        );



        /* ==========================================
           PAUSAR CON EL MOUSE
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

        window.addEventListener(
            "resize",
            updateCarousel
        );



        /* ==========================================
           INICIAR CARRUSEL
        =========================================== */

        updateCarousel();

        startAutoPlay();

    }

});