'use strict'
function isMutant(dna) {
	const matrixDna = dna.map(function(obj) {
			return Object.keys(obj).sort().map(function(key) {
					return obj[key]
			})
	})

	const dnaA = ['A', 'A', 'A', 'A']
	const dnaC = ['C', 'C', 'C', 'C']
	const dnaG = ['G', 'G', 'G', 'G']
	const dnaT = ['T', 'T', 'T', 'T']
	const dnaAJoin = dnaA.join()
	const dnaCJoin = dnaC.join()
	const dnaGJoin = dnaG.join()
	const dnaTJoin = dnaT.join()
	let dnaToAnalize
	let sequenceCount = 0
	let i, j, k
	let matrixLength = matrixDna.length
	// Look for this combination horizontally.
	for (i = 0; i < matrixLength; i++) {
			for (j = 0; j <= matrixDna[i].length - dnaA.length; j++) {
					dnaToAnalize = []
					for (k = 0; k < dnaA.length; k++) {
							dnaToAnalize.push(matrixDna[i][j + k])
					}
					if (dnaToAnalize.join() === dnaAJoin ||
							dnaToAnalize.join() === dnaCJoin ||
							dnaToAnalize.join() === dnaGJoin ||
							dnaToAnalize.join() === dnaTJoin ) {
									sequenceCount++
					}
			}
	}

	// Look for this combination vertically.
	for (i = 0; i < matrixDna[0].length; i++) {
			for (j = 0; j <= matrixLength - dnaA.length; j++) {
					dnaToAnalize = []
					for (k = 0; k < dnaA.length; k++) {
							dnaToAnalize.push(matrixDna[j + k][i])
					}
					if (dnaToAnalize.join() === dnaAJoin ||
							dnaToAnalize.join() === dnaCJoin ||
							dnaToAnalize.join() === dnaGJoin ||
							dnaToAnalize.join() === dnaTJoin ) {
									sequenceCount++
					}
			}
	}

	// Look for this combination diagonally.
	for (i = 0; i <= matrixLength - dnaA.length; i++) {
			for (j = 0; j <= matrixDna[i].length - dnaA.length; j++) {
					dnaToAnalize = []
					for (k = 0; k < dnaA.length; k++) {
							dnaToAnalize.push(matrixDna[i + k][j + k])
					}
					if (dnaToAnalize.join() === dnaAJoin ||
							dnaToAnalize.join() === dnaCJoin ||
							dnaToAnalize.join() === dnaGJoin ||
							dnaToAnalize.join() === dnaTJoin ) {
									sequenceCount++
					}
			}
	}

	// and diagonally the other way...
	for (i = 0; i <= matrixLength - dnaA.length; i++) {
			for (j = matrixDna[i].length-1 ; j >= 0 + dnaA.length-1; j--) {
					dnaToAnalize = []
					for (k = 0; k < dnaA.length; k++) {
							dnaToAnalize.push(matrixDna[i + k][j - k])
					}
					if (dnaToAnalize.join() === dnaAJoin ||
							dnaToAnalize.join() === dnaCJoin ||
							dnaToAnalize.join() === dnaGJoin ||
							dnaToAnalize.join() === dnaTJoin ) {
									sequenceCount++
					}
			}
	}
	console.log('Count ', sequenceCount)
	if (sequenceCount >= 2) {
		//mutant dna
		return {
			mutant:true,
			dna: dna
		}
	} else {
		//human dna
		return {
			mutant:false,
			dna: dna
		}
	}
}

module.exports = isMutant
