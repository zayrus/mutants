const fastify = require('fastify')()

fastify.register(require("fastify-swagger"), {
  mode: 'static',
  specification: {
    path: "./api/swagger/swagger.yaml"
  },
  exposeRoute: true
});

fastify.listen(3000, '127.0.0.1', function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
