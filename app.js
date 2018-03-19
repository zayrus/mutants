'use strict'
require('dotenv').config()
const Fastify = require('fastify')
const fastifySwagger = require('fastify-swagger')
const fastify = buildFastify()
const port = process.env.PORT || 3000

function buildFastify () {
  const dbHost = process.env.DB_HOST
  const fastify = Fastify()

  fastify.register(require('./dbconnector'), {
    url: dbHost
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

fastify.listen(port, '0.0.0.0', function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})

module.exports = buildFastify