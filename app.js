'use strict'

const Fastify = require('fastify')
const fastifySwagger = require('fastify-swagger')
const fastify = buildFastify()

function buildFastify () {
  const fastify = Fastify()

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
  return fastify
}

fastify.listen(3000, '127.0.0.1', function (err) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${fastify.server.address().port}`)
})

module.exports = buildFastify