# ЭпикСтудия

[![CI/CD](https://github.com/PashaBritva/EpicStudia/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/PashaBritva/EpicStudia/actions/workflows/ci-cd.yml)
[![License](https://img.shields.io/badge/license-proprietary-blue.svg)](LICENSE)

Веб-приложение для просмотра фильмов, добавления комментариев и взаимодействия с пользователями.

## 📋 Содержание

- [Возможности](#возможности)
- [Технологии](#технологии)
- [Быстрый старт](#быстрый-старт)
- [Разработка](#разработка)
- [Структура проекта](#структура-проекта)
- [API](#api)
- [Вклад в проект](#вклад-в-проект)
- [Лицензия](#лицензия)

## ✨ Возможности

- 🎬 Просмотр фильмов в различных качествах (360p, 720p, 1080p)
- 💬 Комментарии к фильмам
- ⭐ Система рейтингов
- 🔍 Поиск по хэштегам
- 👤 Профиль пользователя
- 🔐 Авторизация и регистрация
- 🛡️ Админ-панель для управления пользователями
- 📱 Адаптивный дизайн

## 🛠 Технологии

**Frontend:**
- **Vite + React 18** — сборка и основной фреймворк
- **React Router v7** — маршрутизация
- **Material UI v6** — UI компоненты
- **Axios** — HTTP-клиент

**Backend:**
- **Node.js + Express** — сервер
- **SQLite/MySQL/PostgreSQL** — база данных
- **JWT** — аутентификация
- **Multer** — загрузка файлов
- **FFmpeg** — обработка видео

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- npm 9+
- Git

### Установка

#### Автоматическая установка (рекомендуется)

```bash
# Для macOS/Linux
./scripts/init.sh

# Для Windows (PowerShell)
./scripts/init.ps1
```

#### Ручная установка

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/PashaBritva/EpicStudia.git
   cd EpicStudia
   ```

2. Установите зависимости:
   ```bash
   npm run install:all
   ```

3. Настройте окружение:
   ```bash
   # Скопируйте .env.example в .env
   cp .env.example .env
   
   # Отредактируйте .env при необходимости
   ```

### Запуск

```bash
# Запуск фронтенда и API одновременно
npm run dev:all

# Только фронтенд
npm run dev

# Только API
npm run api
```

Приложение будет доступно по адресу: http://localhost

## 👨‍💻 Разработка

### Доступные команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск фронтенда (Vite) |
| `npm run dev:all` | Запуск фронтенда и API |
| `npm run api` | Запуск только API |
| `npm run build` | Сборка проекта |
| `npm run lint` | Проверка кода ESLint |
| `npm run preview` | Предпросмотр сборки |
| `npm run install:all` | Установка всех зависимостей |

### Ветвление

Мы используем [GitHub Flow](https://guides.github.com/introduction/flow/):

```bash
# Создать ветку для новой функции
git checkout -b feature/your-feature-name

# Создать ветку для исправления
git checkout -b fix/bug-description
```

### Коммиты

Используем [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: добавить новую функцию
fix: исправить ошибку
docs: обновить документацию
style: форматирование кода
refactor: рефакторинг
test: добавить тесты
chore: изменения в сборке
```

## 📁 Структура проекта

```
EpicStudia/
├── .github/                    # GitHub конфигурация
│   ├── workflows/             # CI/CD pipeline
│   ├── ISSUE_TEMPLATE/        # Шаблоны issue
│   └── PULL_REQUEST_TEMPLATE/ # Шаблон PR
├── scripts/                   # Скрипты инициализации
├── src/
│   ├── components/            # React компоненты
│   │   ├── Header.jsx         # Шапка
│   │   ├── MovieCard.jsx      # Карточка фильма
│   │   └── ...
│   ├── pages/                 # Страницы
│   │   ├── HomePage.jsx       # Главная
│   │   ├── MoviePage.jsx      # Фильм
│   │   ├── UserPage.jsx       # Профиль
│   │   ├── SearchPage.jsx     # Поиск
│   │   └── CreateMoviePage.jsx # Загрузка фильма
│   ├── services/              # API сервисы
│   │   └── api.js
│   ├── theme/                 # Тема Material UI
│   │   └── theme.jsx
│   ├── App.jsx                # Главный компонент
│   └── main.jsx               # Точка входа
├── .env                       # Переменные окружения
├── .env.example               # Пример окружения
├── package.json               # Зависимости
└── vite.config.js             # Конфигурация Vite
```

## 📡 API

Базовый URL: `/api/v1`

### Эндпоинты

#### Фильмы
| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/movies` | Получить список фильмов |
| GET | `/movies/:id` | Получить фильм по ID |
| GET | `/movies/:id/stream` | Стриминг видео |
| POST | `/movies/upload` | Загрузить фильм |
| GET | `/movies/search` | Поиск по хэштегам |
| POST | `/movies/:id/rating` | Оценить фильм |
| POST | `/movies/:id/comment` | Добавить комментарий |
| GET | `/movies/:id/comments` | Получить комментарии |

#### Пользователи
| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| POST | `/user/register` | Регистрация |
| POST | `/user/login` | Вход |
| GET | `/user/profile` | Получить профиль |
| GET | `/user/all` | Все пользователи (admin) |
| POST | `/user/:id/block` | Заблокировать (admin) |
| POST | `/user/:id/role` | Изменить роль (admin) |

## 🤝 Вклад в проект

Приветствуется любой вклад в проект! Пожалуйста, ознакомьтесь с [CONTRIBUTING.md](CONTRIBUTING.md) перед началом работы.

### Как внести вклад

1. Создайте Issue с описанием проблемы или предложения
2. Форкните репозиторий
3. Создайте ветку (`git checkout -b feature/amazing-feature`)
4. Внесите изменения
5. Закоммитьте (`git commit -m 'feat: amazing feature'`)
6. Отправьте (`git push origin feature/amazing-feature`)
7. Создайте Pull Request

## 📄 Лицензия

Copyright (C) 2025 ISAAC

Это программное обеспечение является собственностью. Несанкционированное копирование, распространение, модификация или использование этого программного обеспечения, полностью или частично, строго запрещено.

Программное обеспечение предоставляется "как есть", без каких-либо гарантий. Владелец оставляет за собой все права, явно не предоставленные.

По вопросам лицензирования обращайтесь: `pashamarshak@ya.ru`

---

**Сделано с ❤️ для любителей кино**
