document.addEventListener('DOMContentLoaded', () => {
    // Animación del header al hacer scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Cambia la clase si el scroll es mayor a 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animación de las secciones al hacer scroll
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Dejar de observar una vez que se activa la animación
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2 // Porcentaje de visibilidad para activar la animación
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animación de los productos al hacer scroll
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`; // Retraso para un efecto escalonado
    });
});