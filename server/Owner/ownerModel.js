// Здесь мы будем описывать схему одной записи в базе Монго

// импорт подключения к бд
let db = require('../db');
 

/*
схема (модель) владельца авто:
    name - имя владельца {
        first - имя
        surname - фамилия
    }
    other - набор дополнительных данных о владельце
*/
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


// Теперь скажем монгусю что теперь у него есть схема (модель) владельца 
db.mongoose.model('Owner', ownerSchema);

module.exports.ownerSchema = db.mongoose.model('Owner');


