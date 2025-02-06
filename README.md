# ЭпикСтудия

## Описание
ЭпикСтудия — это веб-приложение для просмотра фильмов, добавления комментариев и взаимодействия с пользователями.

## Технологии
- **Vite + React** — основной фронтенд-фреймворк
- **React Router** — маршрутизация между страницами
- **Axios** — работа с API
- **Material UI** — стилизация компонентов

## Структура проекта
```
src/
│── components/        # Компоненты
│   ├── Header.jsx     # Шапка сайта
│   ├── MovieCard.jsx  # Карточка фильма
│   ├── SearchCard.jsx # Поиск фильмов
│
│── pages/             # Основные страницы приложения
│   ├── CreateMoviePage.jsx # Страница создания фильма
│   ├── HomePage.jsx        # Главная страница
│   ├── MoviePage.jsx       # Страница просмотра фильма
│   ├── UserPage.jsx        # Профиль пользователя
│
│── services/          # API-запросы к серверу
│   ├── api.js         # Файл с API-функциями
│
│── theme/             # Тема оформления
│   ├── theme.jsx      # Настройки темы
│
│── App.js             # Главный компонент приложения
```

## Установка
1. Склонируйте репозиторий:
   ```sh
   git clone https://github.com/PashaBritva/EpicStudia.git
   ```
2. Перейдите в папку проекта:
   ```sh
   cd EpicStudia
   ```
3. Установите зависимости:
   ```sh
   npm install
   ```
4. Запустите приложение:
   ##### Для удобной разработки
      ```sh
      npm dev
      ```
   ##### Для сборки веб-приложения в html-css-js
      ```sh
      npm build
      ```
   ##### Для запуска обычного веб-приложения в html-css-js (только после `npm build`)
      ```sh
      npm preview
      ```

## API
- API находится в файле `services/api.js` и включает в себя:
- - Получение списка фильмов
- - Получение фильма по ID
- - Добавление нового фильма
- - Добавление комментариев
- - Вход пользователя / регистрация
- - Получение списка пользователей
- - Изменение роли пользователя
- - Блокировка пользователя

## Лицензия

Copyright (C) 2025 ISAAC

This software is proprietary and confidential. Unauthorized copying, distribution, modification, or use of this software, in whole or in part, is strictly prohibited.

The software is provided "as is," without warranty of any kind, express or implied. The owner reserves all rights not expressly granted.

For inquiries about licensing, please contact: `britanpavel65@gmail.com`
