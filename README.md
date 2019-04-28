# n-framework

## Install to your project

```bash
npm i @naweak/n -S
```

## Use in your project

```js
const Framework = require('@naweak/n')
const app = new Framework({
  methodsDir: __dirname + '/src/methods/', // Your API methods dir
  host: '127.0.0.1', // Your project hostname
  port: 3000 // Your project port
})
app.runServer()
```

## Create methods

### Successful response

```js
// src/exampleSuccessMethod.js
// Demonstrates successful response
const Response = require('@naweak/n/lib/response')

module.exports = {
  /**
   * @param {object} params - HTTP request params
   * @param {string} ip - Client IP address
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

### Error response

```js
// src/exampleErrorMethod.js
// Demonstrates error response
const Response = require('@naweak/n/lib/response')

module.exports = {
  run() {
    return new Response(
      'Failed', // Error data
      11, // Error code
      true // isError
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

## Custom routes

```js
// You can use express middlewares
app.app.use('/', (req, res) => {
  res.send('Hello world!')
})
```

```bash
$ curl "http://127.0.0.1:3000/
Hello world!
```
