'use strict'

const fastify = require('fastify')()
const fastifySwagger = require('fastify-swagger')
const isMutant = require('./api/controllers/analyze')

fastify.register(fastifySwagger, {
  mode: 'static',
  specification: {
    path: "./api/swagger/swagger.yaml"
  },
  exposeRoute: true
})

fastify.post('/mutants', async (request, reply) => {
  const analisys = isMutant(request.body.dna)
  const responseCode = analisys ? 200 : 403
  reply.type('application/json').code(responseCode)
  return analisys
})

fastify.get('/stats', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'world' }
})

fastify.listen(3000, '127.0.0.1', function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})