# Messenger
## Описание
Это веб месенджер в котором можно вести переписку через браузер.

## Установка и запуск проекта

- `yarn` — установка пакетов
- `yarn dev` — запуск версии для разработчика
- `yarn eslint` — проверка eslint
- `yarn check-types` — проверка типов eslint
- `yarn stylelint` — проверка стилей
- `yarn test` — запуск тестов
- `yarn start` — сборка продакшен версии и запуск express сервера по адресу http://localhost:3000/

## Ссылка на проект в netlify

https://deploy--messenger-339f64.netlify.app/


## Ссылки на страницы

- http://localhost:5173/messenger  главная мессенджер
- http://localhost:5173/settings настройки профиля
- http://localhost:5173/settings-edit изменение профиля
- http://localhost:5173/password-edit изменение пароля
- http://localhost:5173 авторизация
- http://localhost:5173/sign-up регистрация
- http://localhost:5173/error500 ошибка 500
- http://localhost:5173/error400 ошибка 400

## Функционал

- компонентный подход
- валидация полей формы
- сбор данных формы
- роутинг без перезагрузки страницы
- взаимодействие с rest api и web socket
- тестирование компонента, роутера, модуля запросов
- прекоммит: запуск тестов и линтеров
