'use strict'
const isMutant = require('./api/controllers/analyze')

async function routes (fastify, options) {
  const database = fastify.mongo.db('dna')
	const collHumans = database.collection('humans')
	const collMutants = database.collection('mutants')
	
	fastify.post('/mutants', async(request, reply) => {
		const analisys = isMutant(request.body.dna)
		let responseCode
		if (analisys.mutant){
			const result = await collMutants.findOne({ dna: analisys.dna })
			if (result === null) {
				collMutants.insertOne({dna: analisys.dna})
			}
			responseCode = 200
		} else {
			const result = await collHumans.findOne({ dna: analisys.dna })
			if (result === null) {
				collHumans.insertOne({dna: analisys.dna})
			}
			responseCode = 403
		}
		reply.type('application/json').code(responseCode)
		return {isMutant: analisys.mutant}
	})
	
	fastify.get('/stats', async(request, reply) => {
		const mutantDna = await collMutants.count()
		const humanDna = await collHumans.count()
		const ratioDna = mutantDna / humanDna
		let stats = {
			count_mutant_dna: mutantDna,
			count_human_dna: humanDna,
			ratio: ratioDna
		}
		reply.type('application/json').code(200)
		return stats
	})

	fastify.get('/', async (request, reply) => {
		reply.type('application/json').code(200)
		return { hello: 'world' }
	})
}

module.exports = routes