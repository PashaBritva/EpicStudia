# Руководство по внесению вклада в EpicStudia

Спасибо за интерес к проекту EpicStudia! Это руководство поможет вам начать вносить свой вклад.

## 📋 Содержание

- [Начало работы](#начало-работы)
- [Процесс разработки](#процесс-разработки)
- [Стиль кода](#стиль-кода)
- [Pull Request'ы](#pull-requestы)
- [Сообщение об ошибках](#сообщение-об-ошибках)

## 🚀 Начало работы

### Требования

- Node.js 18+
- npm 9+
- Git

### Установка

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/PashaBritva/EpicStudia.git
   cd EpicStudia
   ```

2. Запустите скрипт инициализации:
   ```bash
   # Для macOS/Linux
   ./scripts/init.sh
   
   # Для Windows (PowerShell)
   ./scripts/init.ps1
   ```

3. Или установите зависимости вручную:
   ```bash
   npm run install:all
   ```

4. Настройте переменные окружения:
   ```bash
   # Скопируйте .env.example в .env и настройте
   cp .env.example .env
   ```

5. Запустите проект:
   ```bash
   npm run dev:all
   ```

## 🔄 Процесс разработки

Мы используем [GitHub Flow](https://guides.github.com/introduction/flow/):

1. Создайте ветку от `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Внесите изменения и закоммитьте:
   ```bash
   git add .
   git commit -m "feat: описание изменений"
   ```

3. Отправьте изменения:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Создайте Pull Request на GitHub.

### Соглашение о коммитах

Мы используем [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — новая функция
- `fix:` — исправление ошибки
- `docs:` — изменения в документации
- `style:` — форматирование, отступы
- `refactor:` — рефакторинг кода
- `test:` — добавление тестов
- `chore:` — изменения в сборке, зависимостях

**Примеры:**
```bash
feat: добавить поиск по хэштегам
fix: исправить ошибку с загрузкой видео
docs: обновить README.md
refactor: оптимизировать загрузку фильмов
```

## 📝 Стиль кода

### Общие правила

- Используйте 4 пробела для отступов
- Максимальная длина строки — 100 символов
- Используйте single quotes для строк
- Всегда используйте точку с запятой

### React компоненты

```jsx
// Используйте функциональные компоненты с хуками
function MyComponent({ prop1, prop2 }) {
    const [state, setState] = useState(initialValue);
    
    useEffect(() => {
        // логика
    }, [dependencies]);
    
    return (
        <Box sx={{ ... }}>
            {/* контент */}
        </Box>
    );
}
```

### Именование

- Компоненты: `PascalCase` (MovieCard, HomePage)
- Файлы: `PascalCase.jsx` для компонентов, `camelCase.js` для утилит
- Переменные и функции: `camelCase`
- Константы: `UPPER_SNAKE_CASE`
- CSS классы: `kebab-case`

## 🔀 Pull Request'ы

### Перед созданием PR

1. Убедитесь, что код проходит линтер:
   ```bash
   npm run lint
   ```

2. Убедитесь, что сборка успешна:
   ```bash
   npm run build
   ```

3. Обновите документацию если нужно

### Создание PR

1. Заполните шаблон Pull Request
2. Укажите связанный Issue (если есть)
3. Добавьте скриншоты для UI изменений
4. Дождитесь ревью

### Процесс ревью

- Минимум 1 аппрув требуется для мержа
- Все комментарии должны бытьresolved
- CI/CD проверки должны быть зелёными

## 🐛 Сообщение об ошибках

Создайте Issue с шаблоном "Bug Report". Укажите:

- Описание проблемы
- Шаги воспроизведения
- Ожидаемое поведение
- Версию браузера и ОС
- Скриншоты (если возможно)

## 📚 Полезные ссылки

- [Документация React](https://react.dev/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

## ❓ Вопросы

Создайте Issue с вопросом или свяжитесь с maintainer'ом.
