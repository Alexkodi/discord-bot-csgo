const assert = require('assert')
const app = require("../app/engine.js");

let testFunctions = []


function test(name, func) {
	testFunctions.push({ name, func })
}

function run() {
	testFunctions.forEach(t => {
		try {
			t.func()
			console.log('🟩', t.name)
		} catch (e) {
			console.log('🟥', t.name)
			console.log(e.stack)
		}
	})
}

test('cs lvl szymi', () => {
    assert.strictEqual(app.displayLvl('szymi'), "[9] Szymi")
})

run()

