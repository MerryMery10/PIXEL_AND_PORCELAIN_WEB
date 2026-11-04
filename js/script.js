
/* ==========================================
   PIXEL AND PORCELAIN
   JAVASCRIPT PRINCIPAL
========================================== */


document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
       1. MENÚ HAMBURGUESA
    ====================================== */

    const menuToggle = document.getElementById("menuToggle");

    const navigation = document.getElementById("navigation");


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            // Comprobamos si el menú está abierto

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";


            // Cambiamos su estado

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            // Actualizamos el texto accesible

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Abrir menú" : "Cerrar menú"
            );


            // Mostramos u ocultamos la navegación

            navigation.classList.toggle("is-open", !isOpen);

        });


        // Cerramos el menú al seleccionar una sección

        const menuLinks = navigation.querySelectorAll("a");

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Abrir menú");

                navigation.classList.remove("is-open");

            });

        });


        // Cerramos el menú si volvemos a escritorio

        window.addEventListener("resize", function () {

            if (window.innerWidth > 800) {

                menuToggle.setAttribute("aria-expanded", "false");

                navigation.classList.remove("is-open");

            }

        });

    }



    /* ======================================
       2. MODO CLARO / OSCURO
    ====================================== */

    const themeToggle = document.getElementById("themeToggle");


    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            // Activamos o desactivamos la clase del modo claro

            document.body.classList.toggle("light-mode");


            // Comprobamos el modo actual

            const isLight =
                document.body.classList.contains("light-mode");


            // Actualizamos el botón

            themeToggle.textContent = isLight
                ? "☀ MODO CLARO"
                : "◐ MODO OSCURO";

        });

    }



    /* ======================================
       3. FILTRO DE PRODUCTOS
    ====================================== */

    const categoryFilter =
        document.getElementById("categoryFilter");


    const productCards =
        document.querySelectorAll(".product-card");


    if (categoryFilter) {

        categoryFilter.addEventListener("change", function () {

            // Obtenemos la categoría seleccionada

            const selectedCategory = categoryFilter.value;


            // Recorremos todos los productos

            productCards.forEach(function (card) {

                const productCategory = card.dataset.category;


                // Mostramos todos si se selecciona "all"

                if (
                    selectedCategory === "all" ||
                    productCategory === selectedCategory
                ) {

                    card.hidden = false;

                } else {

                    card.hidden = true;

                }

            });


            // Volvemos al principio del carrusel

            productsCarousel.scrollTo({

                left: 0,

                behavior: "smooth"

            });

        });

    }



    /* ======================================
       4. CARRUSEL DE PRODUCTOS
    ====================================== */

    const productsCarousel =
        document.getElementById("productsCarousel");


    const previousButton =
        document.getElementById("productsPrev");


    const nextButton =
        document.getElementById("productsNext");


    // Función para desplazar el carrusel

    function moveCarousel(direction) {

        if (!productsCarousel) return;


        // Buscamos el primer producto visible

        const firstProduct =
            productsCarousel.querySelector(
                ".product-card:not([hidden])"
            );


        if (!firstProduct) return;


        // Calculamos cuánto debemos desplazarnos

        const productWidth =
            firstProduct.getBoundingClientRect().width;


        const gap = 16;


        productsCarousel.scrollBy({

            left: direction * (productWidth + gap),

            behavior: "smooth"

        });

    }


    // Botón anterior

    if (previousButton) {

        previousButton.addEventListener("click", function () {

            moveCarousel(-1);

        });

    }


    // Botón siguiente

    if (nextButton) {

        nextButton.addEventListener("click", function () {

            moveCarousel(1);

        });

    }


    // También permitimos utilizar las flechas del teclado

    if (productsCarousel) {

        productsCarousel.addEventListener("keydown", function (event) {

            if (event.key === "ArrowRight") {

                moveCarousel(1);

            }

            if (event.key === "ArrowLeft") {

                moveCarousel(-1);

            }

        });

    }



    /* ======================================
       5. FORMULARIO NEWSLETTER
    ====================================== */

    const newsletterForm =
        document.getElementById("newsletterForm");


    const formFeedback =
        document.getElementById("formFeedback");


    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (event) {

            // Evitamos que la página se recargue

            event.preventDefault();


            // Mostramos un mensaje de confirmación

            formFeedback.textContent =
                "¡Gracias por suscribirte!";


            // Limpiamos el formulario

            newsletterForm.reset();

        });

    }



    /* ======================================
       6. ANIMACIONES DE ENTRADA AOS
    ====================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 700,

            once: true,

            offset: 70,

            disable: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches

        });

    }

});
