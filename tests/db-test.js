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

test('cs db testowy', () => {
    assert.strictEqual(app.db('testowy'), "[2] testowy")
})
test('cs db <@115381941385947159>', () => {
    assert.strictEqual(app.db('<@115381941385947159>'), "[2] testowy")
})
test('cs db 1', () => {
    assert.strictEqual(app.db('1'), "\`Ilość młotów [0] z takim poziomem\`")
})
test('cs db 2', () => {
    assert.strictEqual(app.db('2'), "testowy\n\`Ilość młotów [1] z takim poziomem\`")
})
test('cs db %', () => {
    assert.strictEqual(app.db('%'), "Nie rozumiem")
})
test('cs db john', () => {
    assert.strictEqual(app.db('john'), "Nie ma takiej osoby")
})
test('cs db 100983482940', () => {
    assert.strictEqual(app.db('100983482940'), "Nie wiem co to, ale poziom to cyfra [1 - 9]")
})
test('cs db "test"', () => {
    assert.strictEqual(app.db('"test"'), "Nie rozumiem")
})


run()

