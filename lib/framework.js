const express = require('express')
const bodyParser = require('body-parser')
const MethodDoesNotExists = require('./method-does-not-exists')

class Framework {
  constructor(options = {}) {
    this.methodsDir = options.methodsDir
    this.host = options.host
    this.port = options.port 
    this.app = express()
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    this.app.use('/api', (req, res) => {
      res.set('Access-Control-Allow-Origin', '*')
      let params = req.method == 'POST' ? req.body : req.query
      let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      try {
        res.send(require(this.methodsDir + params.method).run(params, ip))
      }
      catch (e) {
        console.error(e)
        res.send(new MethodDoesNotExists())
      }
    })
  }
  runServer() {
    this.app.listen(
      this.port,
      this.host,
      () => console.log('Server running on ' + this.host + ':' + this.port)
    )
  }
}

module.exports = Framework
