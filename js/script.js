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

    const productGrid = document.querySelectorAll(".product-card");

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

    const filterButtons = document.querySelectorAll(".filter-button");
    const productCards = document.querySelectorAll("#productGrid .product-card");
    const noProducts = document.getElementById("noProducts");

    if (filterButtons.length > 0 && productCards.length > 0) {

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const selectedCategory = button.dataset.filter;

                // Restablecer el estilo de todos los botones
                filterButtons.forEach(function (btn) {

                    btn.classList.remove(
                        "is-active",
                        "bg-neon",
                        "text-tinta"
                    );

                    btn.classList.add(
                        "bg-transparent",
                        "text-neon"
                    );

                    btn.setAttribute("aria-pressed", "false");
                });

                // Activar visualmente el botón seleccionado
                button.classList.add("is-active");

                button.classList.remove(
                    "bg-transparent",
                    "text-neon"
                );

                button.classList.add(
                    "bg-neon",
                    "text-tinta"
                );

                button.setAttribute("aria-pressed", "true");

                // Mostrar únicamente los productos de esa categoría
                let visibleProducts = 0;

                productCards.forEach(function (card) {

                    const productCategory = card.dataset.category;

                    const isVisible =
                        selectedCategory === "todo" ||
                        productCategory === selectedCategory;

                    card.hidden = !isVisible;

                    if (isVisible) {
                        visibleProducts++;
                    }
                });

                // Mostrar mensaje si no hay productos
                if (noProducts) {
                    noProducts.classList.toggle(
                        "hidden",
                        visibleProducts > 0
                    );
                }

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

/* ======================================
   8. MARQUEE INFINITO
====================================== */

    const marqueeTrack = $(".marquee-track");

    if (marqueeTrack.length) {

        const originalContent = marqueeTrack.find(".marquee-content").first();

        // Duplicamos el contenido para crear el bucle
        const duplicatedContent = originalContent.clone();

        marqueeTrack.append(duplicatedContent);

    }

});

    /* ======================================
       8. PÁGINA CÓMIC
    ====================================== */


    /* ======================================
       8.1. ELIGE UNA ÉPOCA
    ====================================== */

    const comicPage = document.querySelector(".comic-page");

    if (comicPage) {

        const eraButtons = comicPage.querySelectorAll(".era-book");

        const eraPeriod = comicPage.querySelector("#eraPeriod");

        const eraTitle = comicPage.querySelector("#eraTitle");

        const eraDescription = comicPage.querySelector("#eraDescription");

        const eraExamples = comicPage.querySelector("#eraExamples");


        // Información de cada época

        const eras = [

            {
                period: "1900 - 1930",
                title: "LOS PIONEROS",

                description:
                    "Los primeros pasos del cómic moderno. Tiras cómicas, prensa ilustrada y personajes que sentaron las bases del lenguaje secuencial.",

                examples: [
                    "PRENSA ILUSTRADA",
                    "PRIMERAS SERIES",
                    "TIRAS CÓMICAS"
                ]

            },

            {
                period: "1930 - 1950",
                title: "LA EDAD DEL TEBEO",

                description:
                    "La expansión del cómic popular. Aparecen grandes personajes, revistas y publicaciones que consolidan el medio.",

                examples: [
                    "AVENTURAS",
                    "SUPERHÉROES",
                    "REVISTAS"
                ]

            },

            {
                period: "1960 - 1980",
                title: "UNDERGROUND",

                description:
                    "Una generación de autores explora nuevas formas de expresión. Historias alternativas, experimentación gráfica y cómic independiente.",

                examples: [
                    "CONTRACULTURA",
                    "CÓMIC ALTERNATIVO",
                    "AUTOEDICIÓN"
                ]

            },

            {
                period: "1900 - HOY",
                title: "NOVELA GRÁFICA",

                description:
                    "Memorias, no ficción y obras de autor que se leen como novelas. Lo que debatimos cada mes en el club.",

                examples: [
                    "MEMORIAS",
                    "NO FICCIÓN",
                    "DEBUT"
                ]

            }

        ];


        // Cambiar la información del panel

        function showEra(index) {

            const selectedEra = eras[index];

            if (!selectedEra) return;


            eraPeriod.textContent = selectedEra.period;

            eraTitle.textContent = selectedEra.title;

            eraDescription.textContent = selectedEra.description;


            // Actualizar las portadas de ejemplo

            eraExamples.innerHTML = "";


            selectedEra.examples.forEach(function (example) {

                const article = document.createElement("article");

                article.classList.add("era-example");


                const cover = document.createElement("div");

                cover.classList.add("era-cover-placeholder");

                cover.textContent = "(PORTADA)";


                const heading = document.createElement("h4");

                heading.textContent = example;


                article.appendChild(cover);

                article.appendChild(heading);

                eraExamples.appendChild(article);

            });

        }


        // Solo puede haber una época seleccionada

        eraButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const selectedIndex = Number(button.dataset.era);


                eraButtons.forEach(function (otherButton) {

                    const isSelected = otherButton === button;

                    otherButton.classList.toggle(
                        "is-active",
                        isSelected
                    );

                    otherButton.setAttribute(
                        "aria-expanded",
                        String(isSelected)
                    );

                });


                showEra(selectedIndex);

            });

        });


        // Inicializar con la primera época

        if (eraButtons.length && eraPeriod && eraTitle &&
            eraDescription && eraExamples) {

            showEra(0);

        }

    }



    /* ======================================
       8.2. CLUB DE LECTURA - ENCUESTA
    ====================================== */

    const comicPollForm = document.getElementById("comicPollForm");

    const pollFeedback = document.getElementById("pollFeedback");


    if (comicPollForm && pollFeedback) {

        const pollOptions = comicPollForm.querySelectorAll(
            'input[name="comicVote"]'
        );


        const pollBars = comicPollForm.querySelectorAll(
            ".poll-result-bar"
        );


        const pollPercentages = comicPollForm.querySelectorAll(
            ".poll-percentage"
        );


        // Resultados iniciales

        const initialVotes = [0, 0, 0];


        // Guardamos los votos en el navegador

        const storageKey = "pixelPorcelainComicVotes";

        const userVoteKey = "pixelPorcelainComicUserVote";


        let votes = initialVotes.slice();

        let previousVote = null;


        // Recuperar resultados guardados

        try {

            const savedVotes = localStorage.getItem(storageKey);

            const savedUserVote = localStorage.getItem(userVoteKey);


            if (savedVotes) {

                const parsedVotes = JSON.parse(savedVotes);

                if (
                    Array.isArray(parsedVotes) &&
                    parsedVotes.length === 3 &&
                    parsedVotes.every(
                        vote => Number.isInteger(vote) && vote >= 0
                    )
                ) {

                    votes = parsedVotes;

                }

            }


            if (savedUserVote !== null) {

                const parsedUserVote = Number(savedUserVote);

                if (
                    Number.isInteger(parsedUserVote) &&
                    parsedUserVote >= 0 &&
                    parsedUserVote < 3
                ) {

                    previousVote = parsedUserVote;

                }

            }

        } catch (error) {

            console.warn("No se pudieron recuperar los votos guardados.");

        }


        // Calcular y mostrar porcentajes

        function updatePollResults() {

            const totalVotes = votes.reduce(
                function (total, vote) {
                    return total + vote;
                },
                0
            );


            pollOptions.forEach(function (option, index) {

                const percentage = totalVotes > 0
                    ? Math.round((votes[index] / totalVotes) * 100)
                    : 0;


                pollBars[index].style.width = percentage + "%";

                pollPercentages[index].textContent =
                    percentage + "%";


                // Marcar la opción que ha votado el usuario

                option.checked = previousVote === index;

            });

        }


        // Mostrar resultados guardados al cargar la página

        updatePollResults();


        // Registrar el voto

        comicPollForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const selectedOption = comicPollForm.querySelector(
                'input[name="comicVote"]:checked'
            );


            if (!selectedOption) {

                pollFeedback.textContent =
                    "Selecciona una opción antes de votar.";

                return;

            }


            const selectedVote = Number(selectedOption.value);


            // Si cambia su voto, restamos el anterior

            if (previousVote !== null) {

                votes[previousVote] = Math.max(
                    0,
                    votes[previousVote] - 1
                );

            }


            // Añadimos el nuevo voto

            votes[selectedVote]++;

            previousVote = selectedVote;


            // Guardar resultados

            try {

                localStorage.setItem(
                    storageKey,
                    JSON.stringify(votes)
                );

                localStorage.setItem(
                    userVoteKey,
                    String(previousVote)
                );

            } catch (error) {

                console.warn("No se pudieron guardar los votos.");

            }


            // Actualizar porcentajes

            updatePollResults();


            pollFeedback.textContent =
                "¡Gracias por votar! Tu elección ha sido registrada.";

        });

    }





