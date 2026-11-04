/* ==========================================
   PIXEL AND PORCELAIN
   JAVASCRIPT PRINCIPAL
========================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
       1. NAVEGACIÓN Y APARTADO ACTIVO
    ====================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");


    if (navigation) {

        // Detectamos la página actual

        const currentPage = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


        // Buscamos todos los enlaces del menú

        const menuLinks = navigation.querySelectorAll("a");


        menuLinks.forEach(function (link) {

            const linkPage = link.getAttribute("href")
                .split("/")
                .pop()
                .toLowerCase();


            // Limpiamos cualquier estado anterior

            link.classList.remove("active");
            link.removeAttribute("aria-current");


            // Marcamos únicamente la página actual

            if (
                currentPage !== "index.html" &&
                currentPage === linkPage
            ) {

                link.classList.add("active");

                link.setAttribute("aria-current", "page");

            }

        });

    }


    /* ======================================
       2. MENÚ HAMBURGUESA
    ====================================== */

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";


            // Cambiamos el estado

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Abrir menú" : "Cerrar menú"
            );


            // Abrimos o cerramos el menú

            navigation.classList.toggle("is-open", !isOpen);

        });


        // Cerramos el menú al seleccionar una página

        const menuLinks = navigation.querySelectorAll("a");

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Abrir menú");

                navigation.classList.remove("is-open");

            });

        });


        // Cerramos el menú al volver a escritorio

        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Abrir menú");

                navigation.classList.remove("is-open");

            }

        });

    }



    /* ======================================
    3. MODO CLARO / OSCURO
    ====================================== */

    const themeToggle = document.getElementById("themeToggle");

    // Recuperar el tema guardado

    const savedTheme = localStorage.getItem("pixelTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    // Actualizar el botón según el tema actual

    function updateThemeIcon() {

        if (!themeToggle) return;

        const isLight = document.body.classList.contains("light-mode");

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
        );

    }

    // Inicializar icono

    updateThemeIcon();

    // Cambiar tema al pulsar

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            const isLight = document.body.classList.contains("light-mode");

            localStorage.setItem(
                "pixelTheme",
                isLight ? "light" : "dark"
            );

            updateThemeIcon();

        });

    }



    /* ======================================
       4. FILTRO DE PRODUCTOS
    ====================================== */

    const categoryFilter =
        document.getElementById("categoryFilter");


    const productCards =
        document.querySelectorAll(".product-card");


    const productsCarousel =
        document.getElementById("productsCarousel");


    if (categoryFilter) {

        categoryFilter.addEventListener("change", function () {

            const selectedCategory = categoryFilter.value;


            // Filtramos los productos

            productCards.forEach(function (card) {

                const productCategory = card.dataset.category;


                card.hidden = !(
                    selectedCategory === "all" ||
                    productCategory === selectedCategory
                );

            });


            // Volvemos al inicio del carrusel

            if (productsCarousel) {

                productsCarousel.scrollTo({

                    left: 0,

                    behavior: "smooth"

                });

            }

        });

    }



    /* ======================================
       5. CARRUSEL DE PRODUCTOS
    ====================================== */

    const previousButton =
        document.getElementById("productsPrev");


    const nextButton =
        document.getElementById("productsNext");


    // Función para mover el carrusel

    function moveCarousel(direction) {

        if (!productsCarousel) return;


        const firstProduct =
            productsCarousel.querySelector(
                ".product-card:not([hidden])"
            );


        if (!firstProduct) return;


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


    // Navegación con teclado

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
       6. FORMULARIO NEWSLETTER
    ====================================== */

    const newsletterForm =
        document.getElementById("newsletterForm");


    const formFeedback =
        document.getElementById("formFeedback");


    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();


            if (formFeedback) {

                formFeedback.textContent =
                    "¡Gracias por suscribirte!";

            }


            newsletterForm.reset();

        });

    }



    /* ======================================
       7. ANIMACIONES AOS
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