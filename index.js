// Это самое сердце приложения, отсюда запускается наш сервер

// для работы с приложением его нужно импортировать
var serverApp = require('./server/app');
var portServer = 8000; // работать приложение будет на 8000 порту (http://127.0.0.1:8000)


// скажем приложению начать слушать запросы по 8000 порту
serverApp.app.listen(portServer, () => {
  console.log('Express server listening on port ' + portServer);
});
