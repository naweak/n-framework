# n-framework

## Установка в ваш проект

```bash
npm i @naweak/n -S
```

## Использование в вашем проекте

```js
const Framework = require('@naweak/n')
const app = new Framework({
  methodsDir: __dirname + '/src/methods/', // Директория с вашими методами API
  host: '127.0.0.1', // Доменное имя / IP-адрес вашего проекта
  port: 3000 // Порт вашего проекта
})
app.runServer()
```

## Создание методов

### Успех

```js
// src/methods/exampleSuccessMethod.js
const Response = require('@naweak/n/lib/response')

module.exports = {
  /**
   * @param {object} params - HTTP параметры
   * @param {string} ip - IP адрес клиента
   */
  run(params, ip) {
    return new Response({
      message: 'Hello world!',
      params,
      ip
    })
  }
}
```

```bash
$ curl "http://127.0.0.1:3000/api/?method=exampleSuccessMethod&test=123"
```

```json
{
  "success": {
    "message": "Hello world!",
    "params": {
      "method": "exampleSuccessMethod",
      "test": "123"
    },
    "ip": "127.0.0.1"
  }
}
```

### Ошибка

```js
// src/methods/exampleErrorMethod.js
const ErrorResponse = require('@naweak/n/lib/error')

module.exports = {
  run() {
    return new ErrorResponse(
      'Failed', // Данные ошибки
      11 // Код ошибки
    )
  }
}
```

```bash
$ curl "http://127.0.0.1:3000/api/?method=exampleErrorMethod"
```

```json
{
  "error": {
    "data": "Failed",
    "code": 11
  }
}
```

## Пользовательские маршруты

```js
// Вы можете использовать express middlewares
app.app.use('/', (req, res) => {
  res.send('Hello world!')
})
```

```bash
$ curl "http://127.0.0.1:3000/"
Hello world!
```

## Бонус

При написании этого файла я еще раз убедился, что русский язык не для техники.
