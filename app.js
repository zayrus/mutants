'use strict'

const fastify = require('fastify')()
const fastifySwagger = require('fastify-swagger')

fastify.register(require('./dbconnector'), {
  url: 'mongodb://localhost:27017/'
})

fastify.register(require('./routes'))

fastify.register(fastifySwagger, {
  mode: 'static',
  specification: {
    path: "./api/swagger/swagger.yaml"
  },
  exposeRoute: true
})

fastify.listen(3000, '127.0.0.1', function (err) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${fastify.server.address().port}`)
})
