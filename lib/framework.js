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
    this.app.use('/api', async (req, res) => {
      res.set('Access-Control-Allow-Origin', '*')
      let params = req.method == 'POST' ? req.body : req.query
      let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      try {
        let method = require(this.methodsDir + params.method)
        method.run(params, ip).then((response) => {
          res.send(response)
        }).catch(console.error)
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
