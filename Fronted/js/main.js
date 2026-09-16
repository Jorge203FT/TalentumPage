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