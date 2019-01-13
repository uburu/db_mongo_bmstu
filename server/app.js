var express = require('express');
var app = express();
var cors = require('cors')

// контроллеры наших моделей
var ownerController = require('./Owner/ownerController');
var carController = require('./Car/carController');

/*
не пугайтесь, это стрелочная функция

(a, b) => {};
все равно, что
function(a, b){

};

тут мы по GET-запросу по url: '/' будем вызывать функцию (callback), которая отдаст приветсвенное сообщение
*/
app.get('/', (request, response) => {
    response.status(200).send(
        {
            'welcome' : "Привет, добро пожаловать в лабораторную по Монго",
            'info' : "Для подробной информации о лабораторной изучай README на гитхабе",
            'README.md' : "https://github.com/uburu/db_mongo_bmstu/blob/master/README.md",
            'github' : "https://github.com/uburu/db_mongo_bmstu/"
        });
});

// задаем url пути к нашим контроллерам, внутри которых описаны методы
app.use('/owners', ownerController.router);
app.use('/cars', carController.router);

module.exports.app = app;
