## Aviasales

## Структура проекта

**Страница со списком билетов** - находится по адресу [http://localhost:3000](http://localhost:3000).

Чтобы запустить проект необходимо установить пакеты, описанные в **package.json** командой `npm install`.  
Далее запустить локальный сервер командой `npm start`.

Текст задания находится [по адресу](https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend)

Реализована подгрузка данных из `store` при скроллинге вниз, а также их фильтрация.

Вы спросите, почему не реализована последующая загрузка данных с сервера после того, как первая пачка билетов получена, ответ прост, т.к. API не отдаёт фильтрованные данные, а каждый раз мы получаем большой кусок данных
чтобы в последующем их отсортировать, необходимо бежать по массиву данных, который содержит более 100n элементов, что негативно сказывается на производительности, + надо их ещё все отрендерить заново, что сопровождается
подвисанием UI. Поэтому в данном случае я сортирую и отображаю только видимую часть первых 100 полученных билетов.

Будьте внимательны, сервер может **преднамерено** выбросить ошибку, это не значит, что что-то работает неправильно, это сделано для того, чтобы продемонстрировать ошибку сети и возможность её отлавливания.
В данном случае вы увидите кнопку с возможность повторного получения данных, без перезагрузки страницы.

**Буду рад любой критики с Вашей стороны :)**