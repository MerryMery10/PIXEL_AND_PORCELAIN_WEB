
/* ==========================================
   PIXEL AND PORCELAIN
   JAVASCRIPT PRINCIPAL
========================================== */


document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
       1. REFERENCIAS HTML
    ====================================== */

    const menuToggle = document.getElementById("menuToggle");

    const navigation = document.getElementById("navigation");

    const themeToggle = document.getElementById("themeToggle");

    const categoryFilter = document.getElementById("categoryFilter");

    const productsCarousel = document.getElementById("productsCarousel");

    const previousButton = document.getElementById("productsPrev");

    const nextButton = document.getElementById("productsNext");

    const productCards = document.querySelectorAll(".product-card");

    const newsletterForm = document.getElementById("newsletterForm");

    const formFeedback = document.getElementById("formFeedback");


    /* ======================================
       2. MENÚ HAMBURGUESA
    ====================================== */

    if (menuToggle && navigation) {

        function closeMenu() {

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Abrir menú");

            navigation.classList.remove("is-open");

        }


        menuToggle.addEventListener("click", function () {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";


            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Abrir menú" : "Cerrar menú"
            );


            navigation.classList.toggle("is-open", !isOpen);

        });


        // Cerrar al seleccionar una sección

        const menuLinks = navigation.querySelectorAll("a");

        menuLinks.forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });


        // Cerrar al cambiar a escritorio

        window.addEventListener("resize", function () {

            if (window.innerWidth >= 768) {

                closeMenu();

            }

        });

    }



    /* ======================================
       3. MODO CLARO / OSCURO
    ====================================== */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");


            const isLight =
                document.body.classList.contains("light-mode");


            themeToggle.textContent = isLight
                ? "☀ MODO CLARO"
                : "◐ MODO OSCURO";

        });

    }



    /* ======================================
       4. FILTRO DE PRODUCTOS
    ====================================== */

    if (categoryFilter && productsCarousel) {

        categoryFilter.addEventListener("change", function () {

            const selectedCategory = categoryFilter.value;


            productCards.forEach(function (card) {

                const productCategory = card.dataset.category;


                const isVisible =
                    selectedCategory === "all" ||
                    productCategory === selectedCategory;


                card.hidden = !isVisible;

            });


            // Volver al principio del carrusel

            productsCarousel.scrollTo({

                left: 0,

                behavior: "smooth"

            });

        });

    }



    /* ======================================
       5. CARRUSEL DE PRODUCTOS
    ====================================== */

    if (productsCarousel) {

        // Permitimos el acceso mediante teclado

        productsCarousel.setAttribute("tabindex", "0");


        function moveCarousel(direction) {

            const firstProduct =
                productsCarousel.querySelector(
                    ".product-card:not([hidden])"
                );


            if (!firstProduct) return;


            // Ancho real de la tarjeta

            const productWidth =
                firstProduct.getBoundingClientRect().width;


            // Espacio real entre tarjetas

            const carouselStyles =
                window.getComputedStyle(productsCarousel);


            const gap =
                parseFloat(carouselStyles.columnGap) || 0;


            // Desplazamiento

            productsCarousel.scrollBy({

                left: direction * (productWidth + gap),

                behavior: "smooth"

            });

        }


        // BOTÓN ANTERIOR

        if (previousButton) {

            previousButton.addEventListener("click", function () {

                moveCarousel(-1);

            });

        }


        // BOTÓN SIGUIENTE

        if (nextButton) {

            nextButton.addEventListener("click", function () {

                moveCarousel(1);

            });

        }


        // NAVEGACIÓN CON TECLADO

        productsCarousel.addEventListener("keydown", function (event) {

            if (event.key === "ArrowRight") {

                event.preventDefault();

                moveCarousel(1);

            }


            if (event.key === "ArrowLeft") {

                event.preventDefault();

                moveCarousel(-1);

            }

        });

    }



    /* ======================================
       6. FORMULARIO NEWSLETTER
    ====================================== */

    if (newsletterForm && formFeedback) {

        newsletterForm.addEventListener("submit", function (event) {

            // Evitamos recargar la página

            event.preventDefault();


            // Validamos el formulario

            if (!newsletterForm.checkValidity()) {

                newsletterForm.reportValidity();

                return;

            }


            // Mensaje de confirmación visual

            formFeedback.textContent =
                "¡Gracias por suscribirte!";


            // Limpiamos el formulario

            newsletterForm.reset();

        });

    }



    /* ======================================
       7. ANIMACIONES AOS
    ====================================== */

    if (typeof AOS !== "undefined") {

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


        AOS.init({

            duration: 700,

            once: true,

            offset: 70,

            disable: prefersReducedMotion

        });

    }

});
