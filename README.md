# Rgram

## Техническое задание

Необходимо реализовать проект «Моменты жизни», где можно выкладывать воспоминания в формате фотографий с подписями. Возможности комментирования и оценки формируют сообщество и позволяют пользователям активно взаимодействовать друг с другом.
В качестве образца реализации рекомендуется использовать Instagram.

```Используемые технологии
Код приложения пишется на Python + Django + Django REST framework.
Приложение запускается под управлением сервера uwsgi.
База данных – Postgress.
Для отдачи статики используется nginx.
Для доставки real-time сообщений centrifugo.
Для кеширования данных – memcached.
Взаимодействие интерфейса с пользователем обеспечивается react.
Для авторизации и хранения пользователей можно использовать приложение django.contrib.auth. 
Основные сущности
Пользователь – электронная почта, никнейм, пароль, аватарка, дата регистрации, рейтинг.
Момент – заголовок, содержание, автор, дата создания, изображение.
Комментарий – содержание, автор, дата написания
Подписка - автор, подписчик, дата подписки
Лайк - автор, момент/комментарий, дата создания
Теги - момент, название
```


## Главная страница 
<img src="https://raw.githubusercontent.com/dark0ghost/rgram/main/readme_file/rgram.png" alt="main menu">

##  Панель добавления постов
<img src="https://raw.githubusercontent.com/dark0ghost/rgram/main/readme_file/addpost.png" alt="add moment">

## Страница авторизации
<img src="https://raw.githubusercontent.com/dark0ghost/rgram/main/readme_file/login.png" alt="login panel">


## Страница регистрации
<img src="https://raw.githubusercontent.com/dark0ghost/rgram/main/readme_file/signup.png" alt="sign up panel">

## Профиль
<img src="https://raw.githubusercontent.com/dark0ghost/rgram/main/readme_file/profile.png" alt="profile">
<img src="https://raw.githubusercontent.com/dark0ghost/rgram/main/readme_file/profile-1.png" alt="profile  1">

## Страница с комментариями
<img src="https://raw.githubusercontent.com/dark0ghost/rgram/main/readme_file/comments.png" alt="comments">