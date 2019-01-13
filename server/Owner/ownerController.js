// Опишем контроллер к модели владельца авто

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let ownerModel = require('./ownerModel');

// добавление нового пользователя
router.post('/', (request, response) => {
    // Напечатаем в консоль что нам пришло в запросе
    console.log("Request for Owner insert:\n", request.body);
    
    // вставка объекта в базу
    // если некоторых значений не будет, они будут пустыми (по типу схемы) или default
    ownerModel.ownerSchema.create({
            name: request.body.name,
            other: request.body.other,
            cars: request.body.cars
        }, 
        (err, owner) => { // callback функция на вставку в базу
            if (err) return response.status(500).send("There was a problem adding the information to the database."); // произошла ошибка – 500 HTTP
            response.status(200).send(owner); // если все прошло хорошо, то 200 HTTP ответ и значение из базы
        });
});


// вывод всех пользователей
router.get('/', (request, response) => {
    ownerModel.ownerSchema.find(
        {}, // передадим пустые параметры для поиска – вывод всех данных
        (err, owners) => {
        if (err) return response.status(500).send("There was a problem finding the owners.");
        response.status(200).send(owners);
    });
});


// получим первого пользователя с фамилией заданной в параметрах запроса
router.get('/:last', (request, response) => {
    ownerModel.ownerSchema.find(
        {'name.last': request.params.last},  // в качестве параметров для поиска передадим фамилию
        'name other' // через пробел задаются данные, которые отдаются (пустая строка - все)
    ).lean().exec((err, owner) => { 
        // lean - говорит моного отдать данные как Object – в разы ускоряет работу, но лишает нас get(), set() и save()
        // через exec "навесим" callback 
        if (err) return response.status(500).send("There was a problem finding the owner.");
        if (!owner) return response.status(404).send("No owner found.");
        response.status(200).send(owner);
    });
});


// поиск по фамилии и имени
router.get('/:last/:first', (request, response) => {
    ownerModel.ownerSchema.find( 
        {
            'name.last': request.params.last,
            'name.first': request.params.first
        },
        'name other').lean().exec((err, owner) => {
        if (err) return response.status(500).send("There was a problem finding the owner.");
        if (!owner) return response.status(404).send("No owner found.");
        response.status(200).send(owner);
    });
});

module.exports.router = router;
