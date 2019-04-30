const Response = require('./response')

class ErrorResponse extends Response {
  constructor (data, code) {
    super(data, code, true)
  }
}

module.exports = ErrorResponse
