const ErrorResponse = require('./error')

class MethodDoesNotExists {
  constructor() {
    return new ErrorResponse('METHOD_DOES_NOT_EXISTS', 11)
  }
}

module.exports = MethodDoesNotExists
