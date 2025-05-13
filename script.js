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
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isHidden = mobileMenu.classList.contains('hidden');

    menuIcon.classList.toggle('hidden', !isHidden);
    closeIcon.classList.toggle('hidden', isHidden);

    if (!isHidden) {
        mobileMenu.classList.remove('opacity-0', '-translate-y-full');
        mobileMenu.classList.add('opacity-100', 'translate-y-0');
    } else {
        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', '-translate-y-full');
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



document.addEventListener('DOMContentLoaded', function() {
    // Логика для галереи на странице
    const galleries = document.querySelectorAll('.portfolio-gallery-container');

    galleries.forEach(container => {
        const gallery = container.querySelector('.portfolio-gallery');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        const cards = gallery.querySelectorAll('.portfolio-card');
        let currentIndex = 0;
        let cardsPerView = 3; // По умолчанию показываем 3 карточки

        // Проверка, что кнопки найдены
        if (!prevBtn) {
            console.error('Кнопка "влево" (.prev-btn) не найдена в контейнере:', container);
            return;
        }
        if (!nextBtn) {
            console.error('Кнопка "вправо" (.next-btn) не найдена в контейнере:', container);
            return;
        }

        // Явно устанавливаем видимость кнопки "влево" при инициализации
        prevBtn.style.opacity = '1';
        prevBtn.style.visibility = 'visible';

        // Определяем количество видимых карточек в зависимости от ширины экрана
        function updateCardsPerView() {
            if (window.innerWidth <= 640) {
                cardsPerView = 1;
            } else if (window.innerWidth <= 1024) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
            currentIndex = Math.min(currentIndex, Math.max(0, cards.length - cardsPerView)); // Корректируем индекс
            updateGallery();
            updateButtonVisibility();
        }

        // Обновляем состояние кнопок
        function updateButtonVisibility() {
            // Кнопка "влево" всегда видима, но может быть неактивной
            if (currentIndex === 0) {
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }

            // Управляем кнопкой "вправо"
            if (currentIndex < cards.length - cardsPerView) {
                nextBtn.classList.add('visible');
            } else {
                nextBtn.classList.remove('visible');
            }
        }

        // Обновляем позицию галереи
        function updateGallery() {
            const cardWidth = cards[0].offsetWidth + 24; // Учитываем gap (1.5rem = 24px)
            const offset = -currentIndex * cardWidth;
            gallery.style.transform = `translateX(${offset}px)`;
        }

        // Предыдущие карточки
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateGallery();
                updateButtonVisibility();
            }
        });

        // Следующие карточки
        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - cardsPerView) {
                currentIndex++;
                updateGallery();
                updateButtonVisibility();
            }
        });

        // Вызываем updateButtonVisibility после завершения анимации листания
        gallery.addEventListener('transitionend', () => {
            updateButtonVisibility();
        });

        // Обновляем при изменении размера окна
        window.addEventListener('resize', updateCardsPerView);

        // Инициализация
        updateCardsPerView();
    });

    // Логика для модального окна
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    let modal = null;
    let currentImages = [];
    let currentIndex = 0;

    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.closest('.portfolio-gallery').dataset.category;
            const index = parseInt(card.dataset.index, 10);

            // Собираем все изображения в текущей категории
            const categoryCards = document.querySelectorAll(`.portfolio-gallery[data-category="${category}"] .portfolio-card img`);
            currentImages = Array.from(categoryCards).map(img => ({
                src: img.src,
                alt: img.alt
            }));
            currentIndex = index;

            // Показываем модальное окно
            showModal();
        });
    });

    // Функция отображения модального окна
    function showModal() {
        if (modal) {
            document.body.removeChild(modal);
        }

        modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-nav-btn modal-prev-btn">❮</button>
                <img src="${currentImages[currentIndex].src}" alt="${currentImages[currentIndex].alt}">
                <button class="modal-nav-btn modal-next-btn">❯</button>
                <button class="modal-close-btn">×</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Обработчики событий
        const closeBtn = modal.querySelector('.modal-close-btn');
        const prevBtn = modal.querySelector('.modal-prev-btn');
        const nextBtn = modal.querySelector('.modal-next-btn');

        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', handleKey);
    }

    // Показ предыдущего изображения
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateModalImage();
    }

    // Показ следующего изображения
    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateModalImage();
    }

    // Обновление изображения в модальном окне
    function updateModalImage() {
        const modalImg = modal.querySelector('img');
        modalImg.src = currentImages[currentIndex].src;
        modalImg.alt = currentImages[currentIndex].alt;
    }

    // Закрытие модального окна
    function closeModal() {
        if (modal) {
            document.body.removeChild(modal);
            modal = null;
            document.removeEventListener('keydown', handleKey);
        }
    }

    // Обработка нажатий клавиш
    function handleKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('callback-popup');
    const openButtons = document.querySelectorAll('[data-popup-open="true"]');
    const closeButton = document.getElementById('popup-close');
    const form = document.getElementById('callback-form');
    const formMessage = document.getElementById('form-message');

    // Открытие pop-up
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.classList.remove('hidden');
            formMessage.classList.add('hidden'); // Скрыть сообщение при открытии
        });
    });

    // Закрытие pop-up
    closeButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    // Закрытие при клике вне pop-up
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.add('hidden');
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formMessage.classList.add('hidden');

        const formData = new FormData(form);
        try {
            const response = await fetch('https://formspree.io/f/mnndpgqk', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessage.classList.remove('hidden');
                formMessage.classList.remove('text-red-400');
                formMessage.classList.add('text-green-400');
                formMessage.textContent = 'Заявка успешно отправлена!';
                form.reset();
                setTimeout(() => {
                    popup.classList.add('hidden');
                }, 2000); // Закрыть pop-up через 2 секунды
            } else {
                throw new Error('Ошибка отправки формы');
            }
        } catch (error) {
            formMessage.classList.remove('hidden');
            formMessage.classList.remove('text-green-400');
            formMessage.classList.add('text-red-400');
            formMessage.textContent = 'Ошибка при отправке. Попробуйте позже.';
        }
    });
});