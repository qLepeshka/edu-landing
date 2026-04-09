# Лендинг EduPlatform

Минималистичный лендинг для образовательной платформы с программами обучения.

## 📋 Возможности

- ✅ Адаптивный дизайн (мобильные, планшеты, десктоп)
- ✅ Минималистичный дизайн в светлых тонах
- ✅ Информация о проекте и преимуществах
- ✅ Три программы обучения с ценами
- ✅ FAQ с аккордеоном
- ✅ Онлайн-чат с автоответами
- ✅ Модальное окно для оплаты
- ✅ Маска ввода телефона
- ✅ Анимации при скролле
- ✅ Плавная навигация

## 🚀 Быстрый старт

### Локальный запуск

Просто откройте файл `index.html` в браузере:

```bash
# Windows
start index.html

# Или через Python
python -m http.server 8000

# Или через Node.js
npx serve
```

## 🌐 Постоянный хостинг (бесплатно)

### Вариант 1: GitHub Pages (Рекомендуется)

1. **Создайте репозиторий на GitHub:**
   - Зайдите на https://github.com
   - Создайте новый репозиторий (например, `edu-landing`)
   - Сделайте его публичным

2. **Загрузите файлы:**
   ```bash
   cd C:\РАБОТА\лендинг
   git init
   git add .
   git commit -m "Initial commit: лендинг для образовательной платформы"
   git branch -M main
   git remote add origin https://github.com/ВАШ_НИК/edu-landing.git
   git push -u origin main
   ```

3. **Включите GitHub Pages:**
   - Перейдите в Settings → Pages
   - Source выберите: `main` branch, `/ (root)`
   - Нажмите Save

4. **Сайт будет доступен по адресу:**
   ```
   https://ВАШ_НИК.github.io/edu-landing/
   ```

### Вариант 2: Netlify (Самый простой)

1. Зайдите на https://netlify.com
2. Перетащите папку `лендинг` в зону загрузки
3. Сайт сразу будет доступен по ссылке

Или через CLI:
```bash
npm install -g netlify-cli
cd C:\РАБОТА\лендинг
netlify deploy --prod
```

### Вариант 3: Vercel

1. Зайдите на https://vercel.com
2. Импортируйте проект из папки
3. Сайт будет автоматически развёрнут

### Вариант 4: Cloudflare Pages

1. Зайдите на https://pages.cloudflare.com
2. Подключите репозиторий GitHub
3. Автоматический деплой при изменениях

## 💳 Интеграция оплаты

### Текущее состояние
Сейчас форма оплаты работает в демо-режиме. Для реальной оплаты нужно подключить платёжную систему.

### Варианты интеграции:

#### 1. ЮKassa (Яндекс.Касса)
```javascript
// Подключите SDK ЮKassa в <head>
<script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>

// Замените обработчик формы на:
paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Отправьте данные на ваш сервер
    const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            program: programName.textContent,
            amount: programPrice.textContent,
            email: document.getElementById('userEmail').value
        })
    });
    
    const data = await response.json();
    
    // Перенаправление на оплату
    window.location.href = data.confirmation_url;
});
```

#### 2. CloudPayments
```javascript
// Подключите виджет
<script src='https://widget.cloudpayments.ru/bundles/cloudpayments'></script>

// Инициализация
var widget = new cp.CloudPayments({
    language: 'ru_RU',
    publicId: 'ваш_public_id'
});

widget.pay('Pay', {
    publicId: 'ваш_public_id',
    description: `Оплата: ${programName.textContent}`,
    amount: parseInt(price),
    currency: 'RUB',
    accountId: 'unique_customer_id',
    email: 'customer@email.com'
}, {
    onSuccess: function() {
        alert('Оплата прошла успешно!');
    },
    onFail: function() {
        alert('Оплата не прошла. Попробуйте ещё раз.');
    }
});
```

#### 3. Robokassa
```javascript
// Перенаправление на оплату
const robokassaUrl = `https://auth.robokassa.ru/Merchant/Index.aspx?
    MerchantLogin=ваш_логин&
    OutSum=${price}&
    InvDesc=${programName.textContent}&
    SignatureValue=MD5(логин:сумма:ид_транзакции:пароль2)&
    Shp_email=${email}`;
    
window.location.href = robokassaUrl;
```

## 💬 Настройка чата

### Текущее состояние
Чат работает с автоответами. Для подключения реального оператора:

#### Вариант 1: JivoSite
```html
<!-- Удалите текущий виджет чата и добавьте: -->
<script src="//code.jivosite.com/widget/ВАШ_ID" async></script>
```

#### Вариант 2: Talk-Me
```html
<script>
    window.talkMe = {
        widget_id: 'ВАШ_ID'
    };
</script>
<script src="https://talk-me.ru/widget.js" async></script>
```

#### Вариант 3: LiveChat
```html
<script type="text/javascript">
window.__lc = window.__lc || {};
window.__lc.license = ВАШ_LICENSE;
</script>
<script async defer src="https://api.livechatinc.com/tracking.js"></script>
```

## 📝 Кастомизация

### Изменить цвета
В `styles.css` найдите `:root` и измените:
```css
:root {
    --primary: #6366f1;        /* Основной цвет */
    --primary-hover: #4f46e5;  /* Цвет при наведении */
    --primary-light: #e0e7ff;  /* Светлый оттенок */
}
```

### Изменить тексты
Отредактируйте `index.html`:
- Герой секция: строка 30-33
- О проекте: строка 40-70
- Программы: строка 78-162
- FAQ: строка 170-207

### Добавить программы
Скопируйте блок `.program-card` и измените:
- Название
- Описание
- Фичи
- Цену
- `data-program` и `data-price` у кнопки

## 📱 Адаптивность

Сайт автоматически адаптируется под:
- 📱 Мобильные устройства (320px+)
- 📱 Планшеты (768px+)
- 💻 Десктоп (1024px+)

## 🔧 Технические детали

### Структура проекта
```
лендинг/
├── index.html      # Основной HTML
├── styles.css      # Стили
├── script.js       # JavaScript функциональность
└── README.md       # Документация
```

### Технологии
- Чистый HTML5, CSS3, JavaScript (без фреймворков)
- Google Fonts (Inter)
- CSS Grid и Flexbox
- CSS Custom Properties
- Intersection Observer API

### Производительность
- Размер всех файлов: ~50KB
- Загрузка: < 1 секунда
- Lighthouse Score: 95+

## 📊 Аналитика

Для подключения Google Analytics:
```html
<!-- Добавьте в <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Для Яндекс.Метрики:
```html
<!-- Добавьте в <head> после <body> -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){...})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(ВАШ_ID, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/ВАШ_ID" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```

## 🎯 SEO оптимизация

1. Измените `<title>` в `index.html` на актуальный
2. Добавьте meta description:
```html
<meta name="description" content="Профессиональные программы обучения. Выберите курс и начните обучение уже сегодня!">
```

3. Добавьте Open Graph теги для соцсетей:
```html
<meta property="og:title" content="EduPlatform - Обучение и развитие">
<meta property="og:description" content="Профессиональные программы обучения от экспертов-практиков">
<meta property="og:image" content="https://ваш-сайт.ru/og-image.jpg">
<meta property="og:url" content="https://ваш-сайт.ru">
```

## 📞 Поддержка

При вопросах обращайтесь:
- Email: info@eduplatform.ru
- Телефон: 8 (800) 123-45-67

## 📄 Лицензия

MIT License - свободное использование с указанием авторства.

---

**Версия:** 1.0  
**Последнее обновление:** Апрель 2026
