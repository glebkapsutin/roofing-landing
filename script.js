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

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
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

