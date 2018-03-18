const tap = require('tap')
const buildFastify = require('../app')
const isMutant= require('../api/controllers/analyze')
const fastify = buildFastify()

//Mocks
const humanDna= ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCCTCA","TCACTT"]
const mutantDna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
const statResponse = {
  "count_mutant_dna": 1,
  "count_human_dna": 1,
  "ratio": 1
}

tap.equal(isMutant(humanDna).mutant, false)
tap.equal(isMutant(mutantDna).mutant, true)

tap.test('POST `/` mutants', t => {
  t.plan(4)
  
  t.tearDown(() => fastify.close())

  fastify.inject({
    method: 'POST',
    url: '/mutants',
    payload: {dna: humanDna},
  }, (err, response) => {
		t.error(err)
    t.strictEqual(response.statusCode, 403)
    t.strictEqual(response.headers['content-type'], 'application/json')
    t.deepEqual(JSON.parse(response.payload), { isMutant: false })
  })
})

tap.test('POST `/` mutants', t => {
  t.plan(4)

  fastify.inject({
    method: 'POST',
    url: '/mutants',
    payload: {dna: mutantDna},
  }, (err, response) => {
		t.error(err)
    t.strictEqual(response.statusCode, 200)
    t.strictEqual(response.headers['content-type'], 'application/json')
    t.deepEqual(JSON.parse(response.payload), { isMutant: true })
  })
})

tap.test('GET `/` stats', t => {
  t.plan(4)
  t.tearDown(() => fastify.close())

  fastify.inject({
    method: 'GET',
    url: '/stats'
  }, (err, response) => {
		t.error(err)
    t.strictEqual(response.statusCode, 200)
    t.strictEqual(response.headers['content-type'], 'application/json')
    t.deepEqual(JSON.parse(response.payload), statResponse)
  })
})
