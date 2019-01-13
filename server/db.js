// создадим общую переменную подключения к БД 
// mongoose - почти официальная библиотка для работы с монго из nodejs
// https://mongoosejs.com 
// я буду звать его монгусь
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');

module.exports.mongoose = mongoose;
