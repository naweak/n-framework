class Response {
  constructor(data, code = 1, isError = false) {
    this.data = data
    this.code = code
    return isError ? {
      error: { data: this.data, code: this.code }
    } : {
      success: this.data
    }
  }
}

module.exports = Response
