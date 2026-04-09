// ===== МОБИЛЬНОЕ МЕНЮ =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===== ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FAQ АККОРДЕОН =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрыть все
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Открыть текущий если был закрыт
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== ЧАТ ВИДЖЕТ =====
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

// Открытие/закрытие чата
chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        chatInput.focus();
    }
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Отправка сообщения
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message) {
        // Добавить сообщение пользователя
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Имитация ответа специалиста
        setTimeout(() => {
            const response = getAutoResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAutoResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость') || lowerMessage.includes('сколько')) {
        return 'У нас есть три программы: Базовый курс - 9 900 ₽, Профессиональный - 29 900 ₽, Премиум - 79 900 ₽. Все цены указаны с учётом скидки!';
    }
    
    if (lowerMessage.includes('рассрочк') || lowerMessage.includes('платеж')) {
        return 'Да, доступна рассрочка на 3, 6 или 12 месяцев без процентов. Подробности могу рассказать подробнее!';
    }
    
    if (lowerMessage.includes('возврат') || lowerMessage.includes('вернуть')) {
        return 'Мы предоставляем гарантию возврата денег в течение 14 дней. Просто свяжитесь с нашей поддержкой!';
    }
    
    if (lowerMessage.includes('сертификат') || lowerMessage.includes('документ')) {
        return 'После окончания курса вы получите электронный сертификат с уникальным номером, который можно добавить в портфолио или резюме.';
    }
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй') || lowerMessage.includes('добрый')) {
        return 'Здравствуйте! Рада вас видеть! Чем могу помочь? Могу рассказать о наших программах обучения.';
    }
    
    if (lowerMessage.includes('программ') || lowerMessage.includes('курс') || lowerMessage.includes('обучени')) {
        return 'У нас есть три программы: Базовый (для начинающих), Профессиональный (для углублённого изучения) и Премиум (с индивидуальным подходом). Какая вас интересует?';
    }
    
    // Стандартный ответ
    return 'Спасибо за ваш вопрос! Наш специалист скоро ответит вам подробнее. А пока могу подсказать: вас интересуют программы обучения, цены или условия оплаты?';
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ===== МОДАЛЬНОЕ ОКНО ОПЛАТЫ =====
const paymentModal = document.getElementById('paymentModal');
const modalClose = document.getElementById('modalClose');
const programName = document.getElementById('programName');
const programPrice = document.getElementById('programPrice');
const paymentForm = document.getElementById('paymentForm');

const programNames = {
    basic: 'Базовый курс',
    professional: 'Профессиональный курс',
    premium: 'Премиум курс'
};

// Открытие модального окна
document.querySelectorAll('.js-buy-program').forEach(btn => {
    btn.addEventListener('click', () => {
        const program = btn.dataset.program;
        const price = btn.dataset.price;
        
        programName.textContent = programNames[program];
        programPrice.textContent = `${parseInt(price).toLocaleString('ru-RU')} ₽`;
        
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Закрытие модального окна
function closeModal() {
    paymentModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && paymentModal.classList.contains('active')) {
        closeModal();
    }
});

// ===== ОБРАБОТКА ФОРМЫ ОПЛАТЫ =====
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        program: programName.textContent,
        price: programPrice.textContent,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
    };
    
    // Здесь будет интеграция с платёжной системой
    // Пока что просто показываем сообщение
    alert(`Спасибо, ${formData.name}!\n\nВы выбрали: ${formData.program}\nК оплате: ${formData.price}\n\nВ реальном проекте здесь будет перенаправление на страницу оплаты.\n\nДанные будут отправлены на: ${formData.email}`);
    
    closeModal();
    paymentForm.reset();
});

// ===== МАСКА ТЕЛЕФОНА =====
const phoneInput = document.getElementById('userPhone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value[0] === '7' || value[0] === '8') {
            value = value.substring(1);
        }
        
        let formattedValue = '+7';
        
        if (value.length > 0) {
            formattedValue += ' (' + value.substring(0, 3);
        }
        if (value.length >= 3) {
            formattedValue += ') ' + value.substring(3, 6);
        }
        if (value.length >= 6) {
            formattedValue += '-' + value.substring(6, 8);
        }
        if (value.length >= 8) {
            formattedValue += '-' + value.substring(8, 10);
        }
        
        e.target.value = formattedValue;
    }
});

// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Добавить анимацию к секциям
document.querySelectorAll('.program-card, .feature, .faq-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== НАВИГАЦИЯ ПРИ СКРОЛЛЕ =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== СЧЁТЧИК АНИМАЦИЯ =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('ru-RU') + (element.dataset.suffix || '');
    }, 30);
}

// Запуск анимации счётчиков
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[\d]/g, '');
                stat.dataset.suffix = suffix;
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

console.log('🚀 Лендинг EduPlatform загружен успешно!');
