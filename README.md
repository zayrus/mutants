# Mutants DNA analyzer

Made with
- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v8.9.4
- [fastify](https://www.fastify.io)
- [mongodb](https://www.mongodb.com/download-center)
- [Swagger](http://swagger.io)
- [tap](https://www.node-tap.org)

## Getting Started
- Run `git clone https://github.com/zayrus/mutants.git`
- Run `cd mutants & npm i`
- Rename .example_env to .env
- Run `mongod`
- Run `npm start`

## API Routes
- /mutants
- /stats
- /documentation

## Tests
Run `npm test`

## Example data

### Mutant
- Method: POST
- Endpoint: /mutants
- Body: {dna: ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]}

#### Curl 
curl -X POST \
  https://mutants-bjnfgbemjb.now.sh/mutants \
  -H 'Content-Type: application/json' \
  -d ' {"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}'

### Human
- Method: POST
- Endpoint: /mutants
- Body: {dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}

#### Curl
curl -X POST \
  https://mutants-bjnfgbemjb.now.sh/mutants \
  -H 'Content-Type: application/json' \
  -d '{"dna": ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]}'
