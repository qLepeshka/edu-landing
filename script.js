// ===== ВСЁ ЗАПУСКАЕТСЯ ПОСЛЕ ЗАГРУЗКИ DOM =====
document.addEventListener('DOMContentLoaded', function() {

    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
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

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Закрыть все
            faqItems.forEach(function(i) {
                i.classList.remove('active');
            });

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
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active')) {
                chatInput.focus();
            }
        });
    }

    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
    }

    // Отправка сообщения
    function sendMessage() {
        const message = chatInput.value.trim();

        if (message) {
            // Добавить сообщение пользователя
            addMessage(message, 'user');
            chatInput.value = '';

            // Имитация ответа специалиста
            setTimeout(function() {
                const response = getAutoResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    }

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + type + '-message';
        messageDiv.innerHTML = '<div class="message-content"><p>' + text.replace(/\n/g, '</p><p>') + '</p></div>';
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAutoResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость') || lowerMessage.includes('сколько')) {
            return 'У нас есть 6 программ:\n\n🆓 EvoStart — БЕСПЛАТНО (7 дней)\n💚 EvoBasics «Старт» — 3 490 ₽\n⭐ EvoBasics «С поддержкой» — 5 490 ₽\n🚀 EvoAdvance — 60 000 ₽ (или 12 000 ₽/мес)\n👑 EvoMastery — от 600 000 ₽/год\n🏢 EvoCorporate — от 750 000 ₽/год';
        }

        if (lowerMessage.includes('бесплатн') || lowerMessage.includes('evostart')) {
            return 'EvoStart — это бесплатный 7-дневный практикум! Вы получите 5 вводных уроков и доступ к сообществу. Идеально для старта!';
        }

        if (lowerMessage.includes('разниц') || lowerMessage.includes('отличи') || lowerMessage.includes('разница')) {
            return 'Основные различия:\n\n• EvoBasics «Старт» — только материалы\n• EvoBasics «С поддержкой» — + консультации куратора\n\nВыбор зависит от вашей потребности в поддержке!';
        }

        if (lowerMessage.includes('рассрочк') || lowerMessage.includes('платеж')) {
            return 'Рассрочка доступна для EvoAdvance — 12 000 ₽/мес вместо 60 000 ₽ единоразово. Без процентов и переплат!';
        }

        if (lowerMessage.includes('возврат') || lowerMessage.includes('вернуть')) {
            return 'Мы предоставляем гарантию возврата денег в течение 14 дней. Просто свяжитесь с нашей поддержкой!';
        }

        if (lowerMessage.includes('корпоратив') || lowerMessage.includes('компан') || lowerMessage.includes('команд')) {
            return 'EvoCorporate — корпоративная лицензия для компаний от 50 сотрудников. Включает аналитику, персонального менеджера и API. Оставьте заявку для получения КП!';
        }

        if (lowerMessage.includes('evomastery') || lowerMessage.includes('мастер') || lowerMessage.includes('персональн')) {
            return 'EvoMastery — это 12 месяцев персональной работы с методологом, мастермайнд-группы и индивидуальный подход. Максимальный уровень поддержки!';
        }

        if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй') || lowerMessage.includes('добрый')) {
            return 'Здравствуйте! 👋 Рада вас видеть! Чем могу помочь? Могу рассказать о наших программах — от бесплатного EvoStart до персонального EvoMastery в ЭвоСфера.';
        }

        if (lowerMessage.includes('программ') || lowerMessage.includes('курс') || lowerMessage.includes('обучени')) {
            return 'У нас 6 программ для разных уровней:\n\n🆓 EvoStart — бесплатный старт\n💚 EvoBasics — база за 21 день\n🚀 EvoAdvance — 6 месяцев с AI\n👑 EvoMastery — персональная работа\n🏢 EvoCorporate — для компаний\n\nКакая вас интересует?';
        }

        // Стандартный ответ
        return 'Спасибо за ваш вопрос! Наш специалист скоро ответит вам подробнее. А пока могу подсказать: вас интересуют программы, цены или условия?';
    }

    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // ===== МОДАЛЬНОЕ ОКНО ОПЛАТЫ =====
    const paymentModal = document.getElementById('paymentModal');
    const modalClose = document.getElementById('modalClose');
    const selectedProgramDiv = document.getElementById('selectedProgram');
    const programNameEl = document.getElementById('programName');
    const programPriceEl = document.getElementById('programPrice');
    const paymentForm = document.getElementById('paymentForm');

    const programNames = {
        evostart: 'EvoStart (7-дневный практикум)',
        'evobasics-start': 'EvoBasics «Старт»',
        'evobasics-support': 'EvoBasics «С поддержкой»',
        evoadvance: 'EvoAdvance (6 месяцев)',
        evomastery: 'EvoMastery (12 месяцев)',
        evocorporate: 'EvoCorporate (корпоративный)'
    };

    // Открытие модального окна
    document.querySelectorAll('.js-buy-program').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const program = btn.getAttribute('data-program');
            const price = btn.getAttribute('data-price');

            // Обновляем название программы
            programNameEl.textContent = programNames[program];

            // Обновляем цену
            if (parseInt(price) === 0) {
                programPriceEl.textContent = 'Бесплатно';
            } else {
                programPriceEl.textContent = parseInt(price).toLocaleString('ru-RU') + ' ₽';
            }

            paymentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    function closeModal() {
        paymentModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === paymentModal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && paymentModal && paymentModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ===== ОБРАБОТКА ФОРМЫ ОПЛАТЫ =====
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                phone: document.getElementById('userPhone').value,
                program: programNameEl.textContent,
                price: programPriceEl.textContent,
                paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
            };

            // Проверка на бесплатный курс
            if (formData.price === 'Бесплатно' || formData.price === '0 ₽') {
                alert('🎉 Поздравляем, ' + formData.name + '!\n\nВы записались на: ' + formData.program + '\n\nДоступ к материалам отправлен на: ' + formData.email + '\n\nПроверьте почту в течение 5 минут!');
                closeModal();
                paymentForm.reset();
                return;
            }

            // Для корпоративного и премиум - заявка вместо оплаты
            if (formData.program.includes('EvoMastery') || formData.program.includes('EvoCorporate')) {
                alert('Спасибо, ' + formData.name + '!\n\nВаша заявка на ' + formData.program + ' принята!\n\nНаш специалист свяжется с вами в течение 30 минут по номеру: ' + formData.phone + '\n\nДля обсуждения деталей и подготовки индивидуального предложения.');
                closeModal();
                paymentForm.reset();
                return;
            }

            // Здесь будет интеграция с платёжной системой
            // Пока что просто показываем сообщение
            alert('Спасибо, ' + formData.name + '!\n\nВы выбрали: ' + formData.program + '\nК оплате: ' + formData.price + '\n\nВ реальном проекте здесь будет перенаправление на страницу оплаты.\n\nДанные будут отправлены на: ' + formData.email);

            closeModal();
            paymentForm.reset();
        });
    }

    // ===== МАСКА ТЕЛЕФОНА =====
    const phoneInput = document.getElementById('userPhone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
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
    }

    // ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Добавить анимацию к секциям
    document.querySelectorAll('.program-card, .feature, .faq-item, .contact-item').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== НАВИГАЦИЯ ПРИ СКРОЛЛЕ =====
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
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
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString('ru-RU') + (element.getAttribute('data-suffix') || '');
        }, 30);
    }

    // Запуск анимации счётчиков
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(function(stat) {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/[\d]/g, '');
                    stat.setAttribute('data-suffix', suffix);
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

    console.log('🚀 Лендинг ЭвоСфера загружен успешно!');

}); // Конец DOMContentLoaded
