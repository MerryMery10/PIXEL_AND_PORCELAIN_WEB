/* =========================================================
   PIXEL AND PORCELAIN
   JAVASCRIPT COMPARTIDO
   HOME + SUPERHÉROES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. ANIMACIONES AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });

    }


    /* =====================================================
       2. MENÚ HAMBURGUESA
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute("aria-expanded", String(!isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Abrir menú" : "Cerrar menú"
            );

            navigation.classList.toggle("is-open", !isOpen);

        });


        // Cerrar menú al seleccionar un enlace

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("is-open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Abrir menú");

            });

        });


        // Cerrar menú al pulsar fuera

        document.addEventListener("click", function (event) {

            const clickedInside =
                navigation.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInside) {

                navigation.classList.remove("is-open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Abrir menú");

            }

        });

    }


    /* =====================================================
       3. MODO CLARO / OSCURO
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        // Recuperar preferencia guardada

        const savedTheme = localStorage.getItem("pixel-theme");

        if (savedTheme === "light") {

            document.body.classList.add("light-mode");

        }


        // Cambiar tema

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            const isLight = document.body.classList.contains("light-mode");

            localStorage.setItem(
                "pixel-theme",
                isLight ? "light" : "dark"
            );

            themeToggle.textContent = isLight
                ? "◐ MODO OSCURO"
                : "◐ MODO CLARO";

        });


        // Actualizar texto inicial

        themeToggle.textContent =
            document.body.classList.contains("light-mode")
                ? "◐ MODO OSCURO"
                : "◐ MODO CLARO";

    }


    /* =====================================================
       4. FILTRO DE PRODUCTOS
    ===================================================== */

    const categoryFilter = document.getElementById("categoryFilter");

    const productCards = document.querySelectorAll(
        "#productos .product-card"
    );

    if (categoryFilter && productCards.length > 0) {

        categoryFilter.addEventListener("change", function () {

            const selectedCategory = categoryFilter.value;

            productCards.forEach(function (card) {

                const category = card.dataset.category;

                const matches =
                    selectedCategory === "all" ||
                    category === selectedCategory;

                card.hidden = !matches;

            });

        });

    }


    /* =====================================================
       5. CARRUSEL DE PRODUCTOS
    ===================================================== */

    const productsCarousel = document.getElementById("productsCarousel");

    const productsPrev = document.getElementById("productsPrev");

    const productsNext = document.getElementById("productsNext");


    if (productsCarousel) {

        function getScrollAmount() {

            const firstCard = productsCarousel.querySelector(
                ".product-card:not([hidden])"
            );

            if (!firstCard) {
                return 250;
            }

            const cardWidth = firstCard.getBoundingClientRect().width;

            return cardWidth + 20;

        }


        if (productsNext) {

            productsNext.addEventListener("click", function () {

                productsCarousel.scrollBy({
                    left: getScrollAmount(),
                    behavior: "smooth"
                });

            });

        }


        if (productsPrev) {

            productsPrev.addEventListener("click", function () {

                productsCarousel.scrollBy({
                    left: -getScrollAmount(),
                    behavior: "smooth"
                });

            });

        }

    }


    /* =====================================================
       6. NEWSLETTER
    ===================================================== */

    const newsletterForm = document.getElementById("newsletterForm");

    const newsletterEmail = document.getElementById("newsletterEmail");

    const formFeedback = document.getElementById("formFeedback");


    if (newsletterForm && newsletterEmail && formFeedback) {

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!newsletterEmail.checkValidity()) {

                newsletterEmail.reportValidity();

                return;

            }

            formFeedback.textContent =
                "¡Gracias por suscribirte! Tu formulario está preparado.";

            newsletterEmail.value = "";

        });

    }


    /* =====================================================
       7. NAVEGACIÓN ACTIVA
    ===================================================== */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navigationLinks = document.querySelectorAll(
        ".navigation a"
    );

    navigationLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });


    /* =====================================================
       8. CERRAR MENÚ AL CAMBIAR A ESCRITORIO
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1023 && navigation && menuToggle) {

            navigation.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });


    /* =====================================================
       9. ACTUALIZAR AOS SI HAY CAMBIOS DE CONTENIDO
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.refresh();

    }


    console.log("Pixel and Porcelain: JavaScript iniciado correctamente.");

});