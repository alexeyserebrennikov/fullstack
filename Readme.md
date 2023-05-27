# Установка и запуск проекта

Данная инструкция поможет вам установить и запустить проект. Проект состоит из трех частей: базы данных, сервера и клиентской части.

## 1. База данных

1. Подключитесь к вашей PostgreSQL базе данных в вашем редакторе или вашей СУБД.
2. Выполните запросы, содержащиеся в файле `init-db.sql`. Этот файл содержит необходимые инструкции для создания таблиц и наполнения их данными.

## 2. Сервер

### Требования

- Node.js должен быть установлен на вашем компьютере.

### Шаги

1. Перейдите в папку `server` в командной строке или терминале.
2. Выполните команду `npm install` или `yarn`, чтобы установить все зависимости проекта.
3. Измените настройки файла `db.config.js` в папке `config` на свои, указав соответствующие параметры для подключения к вашей PostgreSQL базе данных.
4. Выполните команду `npm run server` или `node app.js`, чтобы запустить сервер. Он будет доступен по адресу `http://localhost:5000`.

## 3. Клиентская часть

### Шаги

1. Перейдите в папку `client` в командной строке или терминале.
2. Откройте новый терминал, сервер должен быть по прежнему запущен в первом терминале.
3. Выполните команду `npm install`, чтобы установить все зависимости клиентской части проекта.
4. Выполните команду `npm run start`, чтобы запустить клиентскую часть проекта.
5. Откройте браузер и перейдите по адресу `http://localhost:3000`. Вы увидите приложение, которое использует шаблон Minimal Free – React Admin Dashboard (источники: https://mui.com/store/items/minimal-dashboard-free/
https://github.com/minimal-ui-kit/material-kit-react)

### Навигация к таблицам

- Перейдите на вкладку "Table" в боковом меню приложения.

## Мои изменения в шаблоне

- В папке `\client\src\sections\dashboard` создана папка `tables`, содержащая мои изменения.
- В папке `\client\src\pages` добавлен файл `TablesPage.js`.
- В файле `\client\src\layouts\dashboard\nav\config.js` добавлена вкладка "Table" в боковом меню.
- Добавлена иконка для таблицы.
- В разных частях проекта внесены незначительные изменения.

Теперь вы должны быть в состоянии установить и запустить проект успешно.