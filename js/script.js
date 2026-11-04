document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Móvil
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // 2. Filtro de Categorías de Productos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('#product-carousel article');
    const categoryButtonText = document.querySelector('.group button');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            // Actualizar el texto del botón
            categoryButtonText.innerHTML = `${e.target.innerText} <span class="text-xl">⌄</span>`;

            // Filtrar productos
            products.forEach(product => {
                if (filter === 'todos' || product.dataset.category === filter) {
                    product.style.display = 'flex';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});