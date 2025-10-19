// Инициализация переменных
const startButtonInitial = document.getElementById('start-button-initial-pos');
const startButtonMoved = document.getElementById('start-button-moved-pos');
const imageDisplay = document.getElementById('image-display');
const resultImage = document.getElementById('result-image');
const resultText = document.getElementById('result-text');

let isStarted = false;
let isCoolingDown = false; // Состояние кулдауна

// URL-ы заглушек изображений
const imagePlaceholders = {
    up: 'https://placehold.co/400x225/59e890/000000?text=UP+%E2%96%B2+%28up1.jpg%29',
    down: 'https://placehold.co/400x225/e85959/000000?text=DOWN+%E2%96%BC+%28down1.jpg%29'
};

/**
 * Основная функция для обработки клика и обновления UI
 * @param {Event} e - Событие клика
 */
function handleStartClick(e) {
    // 0. Проверка кулдауна
    if (isCoolingDown) {
        return;
    }

    // 1. Смена состояния и перемещение кнопки (только при первом клике)
    if (!isStarted) {
        isStarted = true;
        
        // Визуальное изменение: начальная кнопка скрывается, перемещенная показывается
        startButtonInitial.classList.add('hidden');
        startButtonMoved.classList.remove('hidden');
        
        // Изменение структуры DOM: перемещение блока изображения
        const mainContent = document.getElementById('main-content');
        mainContent.insertBefore(imageDisplay, startButtonMoved);
        imageDisplay.classList.remove('hidden');
    }
    
    // Определяем, какая кнопка СЕЙЧАС активна (после возможного изменения состояния)
    const activeButton = isStarted ? startButtonMoved : startButtonInitial;

    // 2. Запуск кулдауна (5 секунд)
    isCoolingDown = true;
    let countdown = 5;

    // Отключаем кнопку и показываем таймер
    activeButton.disabled = true;
    activeButton.classList.add('opacity-50', 'cursor-not-allowed');
    activeButton.textContent = `Cooldown (${countdown}s)`;

    const cooldownInterval = setInterval(() => {
        countdown--;

        if (countdown > 0) {
            // Обновляем текст на активной кнопке
            activeButton.textContent = `Cooldown (${countdown}s)`;
        } else {
            // Кулдаун завершен
            clearInterval(cooldownInterval);
            isCoolingDown = false;

            // Включаем кнопку обратно
            activeButton.disabled = false;
            activeButton.classList.remove('opacity-50', 'cursor-not-allowed');
            activeButton.textContent = 'Start';
        }
    }, 1000); // Интервал в 1 секунду
    
    // 3. Логика обновления изображения
    
    // Убираем предыдущий текст
    resultText.classList.remove('visible');

    // Случайный выбор UP или DOWN
    const choice = Math.random() < 0.5 ? 'up' : 'down';
    
    // Обновление изображения и текста
    const imageURL = imagePlaceholders[choice];
    const overlayText = choice === 'up' ? 'UP' : 'DOWN';

    // Обновляем изображение
    resultImage.src = imageURL;
    resultImage.alt = overlayText + ' result';

    // Обновляем и показываем текст
    setTimeout(() => {
        resultText.textContent = overlayText;
        resultText.style.color = 'black'; 
        resultText.classList.add('visible');
    }, 100); 
}

// Прикрепление обработчиков событий
startButtonInitial.addEventListener('click', handleStartClick);
startButtonMoved.addEventListener('click', handleStartClick);
