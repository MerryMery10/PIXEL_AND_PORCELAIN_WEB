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


    /* ======================================
       9. PÁGINA MANGA
    ====================================== */


    /* ======================================
       9.1. SELECCIÓN DE DEMOGRAFÍAS
    ====================================== */

    const mangaPage = document.querySelector(".manga-page");

    if (mangaPage) {

        const mangaBooks = mangaPage.querySelectorAll(".manga-book");

        const mangaAudience = mangaPage.querySelector("#mangaAudience");

        const mangaTypeTitle = mangaPage.querySelector("#mangaTypeTitle");

        const mangaTypeDescription = mangaPage.querySelector(
            "#mangaTypeDescription"
        );

        const mangaFeaturedGrid = mangaPage.querySelector(
            "#mangaFeaturedGrid"
        );


        // Información de las cuatro demografías

        const mangaTypes = [

            {
                audience: "PARA UN PÚBLICO JOVEN",

                title: "SHONEN",

                description:
                    "Historias de acción, aventura, amistad y superación. Protagonistas que crecen, se enfrentan a desafíos y persiguen sus sueños.",

                featured: [
                    "ONE PIECE",
                    "HAIKYUU!!",
                    "MY HERO ACADEMIA"
                ]

            },

            {
                audience: "PARA UN PÚBLICO JOVEN FEMENINO",

                title: "SHOJO",

                description:
                    "Historias centradas en las emociones, las relaciones personales y el crecimiento. Romance, amistad y personajes que descubren quiénes son.",

                featured: [
                    "FRUITS BASKET",
                    "SAILOR MOON",
                    "NANA"
                ]

            },

            {
                audience: "PARA UN PÚBLICO ADULTO",

                title: "SEINEN",

                description:
                    "Narrativas de mayor complejidad temática. Conflictos psicológicos, dilemas morales, violencia, crítica social y mundos llenos de matices.",

                featured: [
                    "MONSTER",
                    "BERSERK",
                    "VINLAND SAGA"
                ]

            },

            {
                audience: "PARA UN PÚBLICO ADULTO FEMENINO",

                title: "JOSEI",

                description:
                    "Relatos sobre la vida adulta, las relaciones y la identidad. Historias más cotidianas, íntimas y realistas, con personajes complejos.",

                featured: [
                    "PARADISE KISS",
                    "CHIHAYAFURU",
                    "PRINCESS JELLYFISH"
                ]

            }

        ];


        // Actualizar el panel de información

        function showMangaType(index) {

            const selectedType = mangaTypes[index];

            if (!selectedType) return;


            mangaAudience.textContent = selectedType.audience;

            mangaTypeTitle.textContent = selectedType.title;

            mangaTypeDescription.textContent =
                selectedType.description;


            // Crear los mangas destacados

            mangaFeaturedGrid.innerHTML = "";


            selectedType.featured.forEach(function (manga) {

                const article = document.createElement("article");

                article.classList.add("manga-featured-item");


                const cover = document.createElement("div");

                cover.classList.add("manga-cover-placeholder");

                cover.textContent = "(PORTADA)";


                const heading = document.createElement("h4");

                heading.textContent = manga;


                article.appendChild(cover);

                article.appendChild(heading);

                mangaFeaturedGrid.appendChild(article);

            });

        }


        // Activar un solo lomo cada vez

        mangaBooks.forEach(function (button) {

            button.addEventListener("click", function () {

                const selectedIndex = Number(button.dataset.mangaType);


                mangaBooks.forEach(function (otherButton) {

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


                showMangaType(selectedIndex);

            });

        });


        // Inicializar la primera demografía

        if (
            mangaBooks.length &&
            mangaAudience &&
            mangaTypeTitle &&
            mangaTypeDescription &&
            mangaFeaturedGrid
        ) {

            showMangaType(0);

        }

    }



    /* ======================================
       9.2. ENCUESTA COMUNIDAD MANGA
    ====================================== */

    const mangaPollForm = document.getElementById("mangaPollForm");

    const mangaPollFeedback = document.getElementById(
        "mangaPollFeedback"
    );


    if (mangaPollForm && mangaPollFeedback) {

        const mangaPollOptions = mangaPollForm.querySelectorAll(
            'input[name="mangaVote"]'
        );


        const mangaPollBars = mangaPollForm.querySelectorAll(
            ".manga-poll-result-bar"
        );


        const mangaPollPercentages = mangaPollForm.querySelectorAll(
            ".manga-poll-percentage"
        );


        // Resultados iniciales

        const initialMangaVotes = [0, 0, 0];


        // Claves independientes de la encuesta de cómic

        const mangaVotesStorageKey = "pixelPorcelainMangaVotes";

        const mangaUserVoteStorageKey = "pixelPorcelainMangaUserVote";


        let mangaVotes = initialMangaVotes.slice();

        let previousMangaVote = null;


        // Recuperar los resultados guardados

        try {

            const savedMangaVotes = localStorage.getItem(
                mangaVotesStorageKey
            );

            const savedMangaUserVote = localStorage.getItem(
                mangaUserVoteStorageKey
            );


            if (savedMangaVotes) {

                const parsedVotes = JSON.parse(savedMangaVotes);


                if (
                    Array.isArray(parsedVotes) &&
                    parsedVotes.length === 3 &&
                    parsedVotes.every(
                        vote => Number.isInteger(vote) && vote >= 0
                    )
                ) {

                    mangaVotes = parsedVotes;

                }

            }


            if (savedMangaUserVote !== null) {

                const parsedUserVote = Number(savedMangaUserVote);


                if (
                    Number.isInteger(parsedUserVote) &&
                    parsedUserVote >= 0 &&
                    parsedUserVote < 3
                ) {

                    previousMangaVote = parsedUserVote;

                }

            }

        } catch (error) {

            console.warn(
                "No se pudieron recuperar los votos de manga."
            );

        }


        // Calcular porcentajes que sumen exactamente 100

        function calculateMangaPercentages(votes) {

            const total = votes.reduce(
                (sum, vote) => sum + vote,
                0
            );


            if (total === 0) {

                return [0, 0, 0];

            }


            const exactPercentages = votes.map(
                vote => (vote / total) * 100
            );


            const roundedPercentages = exactPercentages.map(
                percentage => Math.floor(percentage)
            );


            let remaining = 100 - roundedPercentages.reduce(
                (sum, percentage) => sum + percentage,
                0
            );


            const remainders = exactPercentages.map(
                (percentage, index) => ({
                    index: index,
                    remainder: percentage - roundedPercentages[index]
                })
            );


            remainders.sort(function (a, b) {

                return b.remainder - a.remainder;

            });


            for (let i = 0; i < remaining; i++) {

                roundedPercentages[remainders[i].index]++;

            }


            return roundedPercentages;

        }


        // Actualizar visualmente los resultados

        function updateMangaPoll() {

            const percentages = calculateMangaPercentages(
                mangaVotes
            );


            mangaPollOptions.forEach(function (option, index) {

                mangaPollBars[index].style.width =
                    percentages[index] + "%";


                mangaPollPercentages[index].textContent =
                    percentages[index] + "%";


                // Recuperar la selección del usuario

                option.checked = previousMangaVote === index;

            });

        }


        // Mostrar resultados al cargar

        updateMangaPoll();


        // Registrar el voto

        mangaPollForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const selectedOption = mangaPollForm.querySelector(
                'input[name="mangaVote"]:checked'
            );


            if (!selectedOption) {

                mangaPollFeedback.textContent =
                    "Selecciona una opción antes de votar.";

                return;

            }


            const selectedVote = Number(selectedOption.value);


            // Restar el voto anterior si cambia de opción

            if (previousMangaVote !== null) {

                mangaVotes[previousMangaVote] = Math.max(
                    0,
                    mangaVotes[previousMangaVote] - 1
                );

            }


            // Añadir el nuevo voto

            mangaVotes[selectedVote]++;

            previousMangaVote = selectedVote;


            // Guardar los resultados en el navegador

            try {

                localStorage.setItem(
                    mangaVotesStorageKey,
                    JSON.stringify(mangaVotes)
                );


                localStorage.setItem(
                    mangaUserVoteStorageKey,
                    String(previousMangaVote)
                );

            } catch (error) {

                console.warn(
                    "No se pudieron guardar los votos de manga."
                );

            }


            // Actualizar porcentajes

            updateMangaPoll();


            mangaPollFeedback.textContent =
                "¡Gracias por votar! Tu elección ha sido registrada.";

        });

    }


/* =========================================================
   PÁGINA BLOG — MURO DE LA COMUNIDAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const blogForm = document.getElementById("blogPostForm");

    // Evita ejecutar esta funcionalidad en otras páginas.
    if (!blogForm) return;

    const blogAuthor = document.getElementById("blogAuthor");
    const blogText = document.getElementById("blogPostText");
    const blogCategory = document.getElementById("blogPostCategory");
    const blogCharCounter = document.getElementById("blogCharCounter");
    const blogFeedback = document.getElementById("blogFormFeedback");
    const blogFeed = document.getElementById("blogFeed");
    const blogFilters = document.getElementById("blogFilters");
    const blogEmptyState = document.getElementById("blogEmptyState");
    const blogPostCounter = document.getElementById("blogPostCounter");

    const BLOG_STORAGE_KEY = "pixelPorcelainBlogPosts";
    const BLOG_USER_KEY = "pixelPorcelainBlogUser";

    let activeFilter = "all";

    // Identificador local del navegador.
    // Permite reconocer las publicaciones creadas desde este dispositivo.
    let currentUserId = localStorage.getItem(BLOG_USER_KEY);

    if (!currentUserId) {
        currentUserId = createBlogId();
        localStorage.setItem(BLOG_USER_KEY, currentUserId);
    }


    // GENERAR IDENTIFICADORES

    function createBlogId() {
        if (window.crypto && crypto.randomUUID) {
            return crypto.randomUUID();
        }

        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }


    // LEER PUBLICACIONES GUARDADAS

    function getBlogPosts() {
        try {
            const savedPosts = JSON.parse(
                localStorage.getItem(BLOG_STORAGE_KEY)
            );

            return Array.isArray(savedPosts) ? savedPosts : [];
        } catch (error) {
            console.error("No se pudieron cargar las publicaciones:", error);
            return [];
        }
    }


    // GUARDAR PUBLICACIONES

    function saveBlogPosts(posts) {
        try {
            localStorage.setItem(
                BLOG_STORAGE_KEY,
                JSON.stringify(posts)
            );

            return true;

        } catch (error) {
            console.error("No se pudieron guardar las publicaciones:", error);
            showFeedback("No se ha podido guardar. Puede que el almacenamiento esté lleno.");
            return false;
        }
    }


    // MENSAJES DEL FORMULARIO

    function showFeedback(message, isError = false) {
        blogFeedback.textContent = message;
        blogFeedback.style.color = isError
            ? "#FF6B83"
            : "var(--green, #70FF0D)";
    }


    // CONTADOR DE CARACTERES

    blogText.addEventListener("input", () => {
        const length = blogText.value.length;

        blogCharCounter.textContent = `${length} / 280`;

        blogCharCounter.style.color = length >= 260
            ? "#FF00A1"
            : "rgba(255,255,255,.5)";
    });


    // FECHA LEGIBLE

    function formatBlogDate(dateValue) {
        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "Fecha desconocida";
        }

        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }


    // CREAR ELEMENTOS DE FORMA SEGURA

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }


    // CREAR UNA PUBLICACIÓN

    function createPostCard(post) {

        const article = createElement("article", "blog-post");
        article.dataset.postId = post.id;

        const top = createElement("div", "blog-post-top");
        const user = createElement("div", "blog-post-user");

        const avatar = createElement(
            "div",
            "blog-post-avatar",
            post.author.charAt(0).toUpperCase()
        );

        const userInfo = createElement("div");
        const author = createElement(
            "div",
            "blog-post-author",
            post.author
        );

        const date = createElement(
            "div",
            "blog-post-date",
            formatBlogDate(post.date)
        );

        userInfo.append(author, date);
        user.append(avatar, userInfo);

        const category = createElement(
            "span",
            "blog-post-category",
            post.category
        );

        top.append(user, category);


        // TEXTO

        const message = createElement(
            "p",
            "blog-post-text",
            post.text
        );


        // ACCIONES

        const actions = createElement("div", "blog-post-actions");

        const likeButton = createElement(
            "button",
            "blog-post-action"
        );

        const alreadyLiked = (post.likedBy || []).includes(currentUserId);

        likeButton.classList.toggle("liked", alreadyLiked);
        likeButton.setAttribute(
            "aria-pressed",
            alreadyLiked ? "true" : "false"
        );

        likeButton.innerHTML = `
            <span aria-hidden="true">${alreadyLiked ? "♥" : "♡"}</span>
            <span>${(post.likes || []).length}</span>
        `;

        likeButton.dataset.action = "like";


        const commentButton = createElement(
            "button",
            "blog-post-action",
            `↳ ${post.comments.length} COMENTARIOS`
        );

        commentButton.dataset.action = "comments";


        actions.append(likeButton, commentButton);


        // ELIMINAR PUBLICACIÓN PROPIA

        if (post.userId === currentUserId) {

            const deleteButton = createElement(
                "button",
                "blog-post-action blog-post-delete",
                "ELIMINAR ×"
            );

            deleteButton.dataset.action = "delete";

            actions.append(deleteButton);
        }


        // ZONA DE COMENTARIOS

        const commentsSection = createElement("div", "blog-comments");
        commentsSection.hidden = true;

        const commentsList = createElement(
            "div",
            "blog-comments-list"
        );

        post.comments.forEach(comment => {

            const commentElement = createElement(
                "div",
                "blog-comment"
            );

            const commentAuthor = createElement(
                "strong",
                "",
                comment.author
            );

            const commentText = createElement(
                "span",
                "",
                comment.text
            );

            commentElement.append(commentAuthor, commentText);
            commentsList.append(commentElement);
        });


        // FORMULARIO DE COMENTARIOS

        const commentForm = createElement(
            "form",
            "blog-comment-form"
        );

        const commentInput = document.createElement("input");

        commentInput.type = "text";
        commentInput.maxLength = 180;
        commentInput.placeholder = "Escribe una respuesta...";
        commentInput.required = true;
        commentInput.setAttribute("aria-label", "Escribe un comentario");

        const commentSubmit = createElement(
            "button",
            "",
            "ENVIAR"
        );

        commentSubmit.type = "submit";

        commentForm.append(commentInput, commentSubmit);

        commentsSection.append(commentsList, commentForm);


        article.append(top, message, actions, commentsSection);

        return article;
    }


    // MOSTRAR PUBLICACIONES

    function renderBlogPosts() {

        const posts = getBlogPosts();

        blogFeed.replaceChildren();

        const filteredPosts = posts
            .filter(post => {
                return activeFilter === "all" ||
                    post.category === activeFilter;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        filteredPosts.forEach(post => {
            blogFeed.append(createPostCard(post));
        });

        blogPostCounter.textContent =
            `${posts.length} ${posts.length === 1 ? "POST" : "POSTS"}`;

        blogEmptyState.hidden = filteredPosts.length > 0;
    }


    // PUBLICAR MENSAJE

    blogForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const author = blogAuthor.value.trim();
        const text = blogText.value.trim();
        const category = blogCategory.value;

        if (!author || !text) {
            showFeedback("Completa tu nombre y tu publicación.", true);
            return;
        }

        if (text.length > 280) {
            showFeedback("Tu publicación supera los 280 caracteres.", true);
            return;
        }

        const posts = getBlogPosts();

        const newPost = {
            id: createBlogId(),
            userId: currentUserId,
            author: author,
            text: text,
            category: category,
            date: new Date().toISOString(),
            likes: [],
            likedBy: [],
            comments: []
        };

        posts.unshift(newPost);

        if (!saveBlogPosts(posts)) return;

        // Volver a mostrar todas las categorías.
        activeFilter = "all";

        blogFilters.querySelectorAll(".blog-filter").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.filter === "all"
            );
        });

        blogForm.reset();
        blogCharCounter.textContent = "0 / 280";

        showFeedback("¡PUBLICACIÓN ENVIADA! BIENVENIDA A LA COMUNIDAD.");

        renderBlogPosts();

        // Desplazar el usuario hacia la nueva publicación.
        blogFeed.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


    // FILTRAR PUBLICACIONES

    blogFilters.addEventListener("click", (event) => {

        const button = event.target.closest(".blog-filter");

        if (!button) return;

        activeFilter = button.dataset.filter;

        blogFilters.querySelectorAll(".blog-filter").forEach(filter => {
            filter.classList.toggle("active", filter === button);
        });

        renderBlogPosts();
    });


    // ACCIONES DEL MURO: ME GUSTA, COMENTAR Y ELIMINAR

    blogFeed.addEventListener("click", (event) => {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const article = button.closest(".blog-post");

        if (!article) return;

        const postId = article.dataset.postId;
        const action = button.dataset.action;

        const posts = getBlogPosts();
        const post = posts.find(item => item.id === postId);

        if (!post) return;


        // ME GUSTA

        if (action === "like") {

            post.likes = post.likes || [];
            post.likedBy = post.likedBy || [];

            const liked = post.likedBy.includes(currentUserId);

            if (liked) {
                post.likedBy = post.likedBy.filter(
                    id => id !== currentUserId
                );

                post.likes = post.likes.filter(
                    id => id !== currentUserId
                );

            } else {
                post.likedBy.push(currentUserId);
                post.likes.push(currentUserId);
            }

            if (saveBlogPosts(posts)) {
                renderBlogPosts();
            }
        }


        // MOSTRAR / OCULTAR COMENTARIOS

        if (action === "comments") {

            const commentsSection = article.querySelector(".blog-comments");

            commentsSection.hidden = !commentsSection.hidden;

            button.setAttribute(
                "aria-expanded",
                commentsSection.hidden ? "false" : "true"
            );
        }


        // ELIMINAR PUBLICACIÓN

        if (action === "delete") {

            if (post.userId !== currentUserId) return;

            const confirmDelete = window.confirm(
                "¿Seguro que quieres eliminar esta publicación?"
            );

            if (!confirmDelete) return;

            const updatedPosts = posts.filter(
                item => item.id !== postId
            );

            if (saveBlogPosts(updatedPosts)) {
                renderBlogPosts();
            }
        }

    });


    // ENVIAR COMENTARIOS

    blogFeed.addEventListener("submit", (event) => {

        const form = event.target.closest(".blog-comment-form");

        if (!form) return;

        event.preventDefault();

        const article = form.closest(".blog-post");
        const postId = article.dataset.postId;
        const input = form.querySelector("input");

        const commentText = input.value.trim();

        if (!commentText) return;

        const posts = getBlogPosts();
        const post = posts.find(item => item.id === postId);

        if (!post) return;

        post.comments = post.comments || [];

        const authorName = blogAuthor.value.trim() || "Invitado";

        post.comments.push({
            id: createBlogId(),
            author: authorName,
            text: commentText,
            date: new Date().toISOString()
        });

        if (saveBlogPosts(posts)) {
            renderBlogPosts();

            const updatedArticle = blogFeed.querySelector(
                `[data-post-id="${postId}"]`
            );

            if (updatedArticle) {
                updatedArticle.querySelector(".blog-comments").hidden = false;
            }
        }

    });


    // PRIMERA CARGA

    renderBlogPosts();

});






