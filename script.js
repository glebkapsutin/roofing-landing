document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const detailsContent = button.parentElement.nextElementSibling;
            if (detailsContent) {
                detailsContent.classList.toggle('show');
                button.classList.toggle('active');
            }
        });
    });
});

const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

menuButton.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');

    // Переключаем иконки
    menuIcon.classList.toggle('hidden', !isOpen);
    closeIcon.classList.toggle('hidden', isOpen);

    // Переключаем меню
    if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('translate-y-0', 'opacity-100');
        mobileMenu.classList.add('-translate-y-full', 'opacity-0');
    } else {
        mobileMenu.classList.remove('hidden');
        // Задержка для плавной анимации
        setTimeout(() => {
            mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
            mobileMenu.classList.add('translate-y-0', 'opacity-100');
        }, 10);
    }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

