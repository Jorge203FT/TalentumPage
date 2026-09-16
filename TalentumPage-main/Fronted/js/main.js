document.addEventListener("DOMContentLoaded", () => {

    console.log("Talentum Selección iniciado correctamente");


    /* ==========================================
       CONTADORES ANIMADOS - MÉTRICAS
    =========================================== */

    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {

        // Número final
        const target = Number(counter.dataset.target);

        // Signos + y %
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";

        // Duración de la animación en milisegundos
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
            const easeOut = 1 - Math.pow(1 - progress, 3);


            // Calculamos el número actual
            const currentValue = Math.floor(
                startValue + (target - startValue) * easeOut
            );


            // Formato del número
            const formattedValue = currentValue.toLocaleString("en-US");


            // Mostramos el resultado
            counter.textContent =
                prefix +
                formattedValue +
                suffix;


            // Continuamos hasta llegar al número final
            if (progress < 1) {

                requestAnimationFrame(animateCounter);

            } else {

                // Nos aseguramos de terminar exactamente
                // en el número indicado

                counter.textContent =
                    prefix +
                    target.toLocaleString("en-US") +
                    suffix;

            }

        }


        // Iniciar animación
        requestAnimationFrame(animateCounter);

    });


});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const wrapper = document.querySelector('.carousel-wrapper');

    let currentIndex = 0;
    let autoPlayTimer = null;

    // Obtener la cantidad de logos visibles según el ancho de pantalla
    function getVisibleSlides() {
        if (window.innerWidth <= 600) return 2;
        if (window.innerWidth <= 900) return 3;
        return 4;
    }

    // Mover el carrusel a la posición actual
    function updateCarousel() {
        const visibleSlides = getVisibleSlides();
        const maxIndex = slides.length - visibleSlides;
        
        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;

        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Avanzar a la siguiente imagen
    function nextSlide() {
        const visibleSlides = getVisibleSlides();
        const maxIndex = slides.length - visibleSlides;
        currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
        updateCarousel();
    }

    // Retroceder a la imagen anterior
    function prevSlide() {
        const visibleSlides = getVisibleSlides();
        const maxIndex = slides.length - visibleSlides;
        currentIndex = (currentIndex <= 0) ? maxIndex : currentIndex - 1;
        updateCarousel();
    }

    // Iniciar el avance automático (cada 3.5 segundos)
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, 3500);
    }

    // Detener el avance automático
    function stopAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    // Eventos de los botones de flecha
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay(); // Reiniciar el temporizador tras un clic manual
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
    });

    // Pausar reproducción cuando el mouse pasa por encima
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);

    // Ajustar si se cambia el tamaño de la ventana
    window.addEventListener('resize', updateCarousel);

    // Arrancar el movimiento automático al cargar
    startAutoPlay();
});