function createTests(char = 'i', testVals = [42]) {
	const negPad = 0b1000000
	const zeroPad = 0b0100000
	const fw_1 = 0b0010000
	const fw_7 = 0b0001000
	const p_0 = 0b0000100
	const p_1 = 0b0000010
	const p_9 = 0b0000001

	const MAX = negPad * 2 - 1

	const a = []
	for (let i = 0; i < MAX; i++) {
		const test = `"%${i & negPad ? '-' : ''}${i & zeroPad ? '0' : ''}${i & fw_1 ? '1' : ''}${i & fw_7 ? '7' : ''}${i & (p_0 | p_1 | p_9) ? '.' : ''}${i & p_1 ? '1' : ''}${i & p_9 ? '9' : ''}${char}", `
		for (const val of testVals) {
			a.push(`${test}${typeof val == 'string' ? char == 'c' ? `'${val}'` : `"${val}"` : val}`)
		}
	}
	return a
}
module.exports = createTests
