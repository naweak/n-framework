const Response = require('./response')

class MethodDoesNotExists {
  constructor() {
    return new Response('METHOD_DOES_NOT_EXISTS', 11, true)
  }
}

module.exports = MethodDoesNotExists
