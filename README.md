# db_mongo_bmstu
# Лабораторная по mongo 

## Условие 

Создать приложение на [MongoDB](https://www.mongodb.com)

## Warning

Если вы никогда не работали с nodejs, mongoDB или не знайте, что такое API, то лучше прочитать README до конца.

## Warning 2

А раз лень читать и хочется сразу смотреть код, то вот рекомендованная последовательность для изучения:

1. index.js
2. /server/app.js
3. /server/db.js
4. /server/Owner/ownerModel.js
5. /server/Owner/ownerController.js
6. /server/Cars/carModel.js
7. /server/Cars/carController.js


## Установка

### Установка ПО
1. [Установите nodejs](https://nodejs.org/en/)
2. [Установите mongodb](https://www.mongodb.com)
    2.1. иногда бывает полезно почитать [тут](https://docs.mongodb.com/manual/administration/install-community/)
3. Установите ПО, где вы сможете тестировать запросы, например [Postman](https://www.getpostman.com)

### Установка Лабораторной
1. Склонируйте репозиторий к себе
2. Установите зависимости перейдя в "/db_mongo_bmstu" `npm install` или `npm i`


## Запуск

1. В новом окне терминала запустите mongo (mongod)
2. В новом окне терминала запустите из "/db_mongo_bmstu" `npm start`

## Работа с приложением

1. Запустите Postman или любой другой инструмент для создания запросов
2. Используйте POST или GET запросы к [API](#API)

## Теория 

* Что такое [MongoDB](https://www.mongodb.com)?

MongoDB - [документо-ориентированная база данных](https://ru.wikipedia.org/wiki/Документоориентированная_СУБД) (NoSQL), то есть вместо привычных строк хранятся документы.

* Что за документы в ней хранятся?

MongoDB хранит в себе BSON файлы. BSON (Binary JSON) - бинарный формат JSON, без лишних пробелов и т.п.
```
{
    _id : id в Монго (добавляется по-умолчанию), по нему идет поиск (findById),
    name : {
        first : в монго поддерживается вложенность
        last : круто, да?
    }
    __v : версия документа, нужно, чтобы избежать конфликтов при изменении данных и наличии репликации
}
```

* JavaScript

Так как лабораторная выполнена на JavaScript предлагаю ознакомится с классным [учебником по JS](https://learn.javascript.ru) 

* Архитекутра

Темой лабораторной работы были выбраны автомобили и их владельцы

Схема владельца авто:
```
let ownerSchema = new db.mongoose.Schema({  
    /* 
    тут сразу все интресно: 
        как тебе вложенные строки? 
    
    Монго - документо-ориентированная БД и она хранит документы (JSON, а точнее, бинарный BSON),
    и поэтому в качестве "строки" тут хрантся записи, которые описываются схемами 
    */
    name: {
        /*
        тут много интересного:
        unique - проверяет только уникальный ли монговский индекс (_id), а не уникально ли значение
        required - проверет пришло ли такое значние

        # ВАЖНО 
        В монго можно создавать дублирующиеся объекты, при этом их _id будет отличаться,
        поэтому, всегда смотрите на _id
        если нужно делать действительно уникальное значение - то прийдется сходить в базу и посмотреть,
            есть ли такие значения, а затем делать вставку
            (делать конечно же, я этого не буду)
        */
        first: {type: String, unique: true, required: true},
        last: {type: String, unique: true, required: true},
    },
    other: Object,
    cars: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'Cars' }] // аналог Foreign-key в mongoose
});
```

Схема для автомобиля:
```
let carSchema = new db.mongoose.Schema({  
    manufacturer: String,
    model: String,
    other: Object,
    plate: String,
    owner: { type: db.mongoose.Schema.Types.ObjectId, ref: 'Owner' },
});
```


## [API](https://ru.wikipedia.org/wiki/API) 

Каждая из сущностей доступны из API:

Владельцы по `/owners/` и их автомобили по `/cars/`

Методы для Владельцев:

1. POST '/' – отправка данных о владельце
2. GET '/' – получить всех владельцев
3. GET '/{last}' – получить всех владельцев c фамилией {last}
4. GET '/{last}/{first}' – получить всех владельцев c фамилией {last} и именем {first}


Методы для Автомобилей:

1. POST '/' – отправка данных об авто
2. GET '/' – получить все авто
3. GET '/{manufacturer}' – получить все авто у которых производитель {manufacturer}
4. GET '/{manufacturer}/{model}' – получить все авто у которых производитель {manufacturer} и модель {model}
5. GET '/{manufacturer}/{model}/{plate}' – получить все авто у которых производитель {manufacturer} и модель {model} с номером {plate}

