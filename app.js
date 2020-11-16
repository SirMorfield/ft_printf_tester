/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   app.js                                             :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:31:54 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/16 14:40:33 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const ft_buildCmd = 'make -C ../ft_printf/'
const ft_bin = '../ft_printf/bin'
const ft_header = '../ft_printf'
const { rebuild } = require('ft_printf_js_interface')

const createTests = require('./createTests.js')
const testCases = [
	...require('./testcases.js'),
	// ...createTests('s', ['abc', 'abcdefghijklmnopqrstuvwxyz']),
	// ...createTests('i', [-42, 123456789]),
	// ...createTests('u', [42, 123456789])
]

const {
	execSyncSafe,
	color,
	grade,
	clearLine,
	options
} = require('./helpers.js')
const {
	getOutputsCompile,
	getOutputsMarius,
	runft_printf,
} = require('./outputs.js')

execSyncSafe(ft_buildCmd)
rebuild({ headerDir: ft_header, libDir: ft_bin })

if (options['output']) {
	const testCase = process.argv[process.argv.indexOf('--output') + 1]
	runft_printf(testCase, ft_bin, ft_header)
	return
}

let kos = 0;
(async () => {
	for (const testCase of testCases) {
		let consoleOutput = ''
		consoleOutput += `Testing (${testCase}) `
		const { printf_output, ft_printf_output } = await getOutputsMarius(testCase, ft_bin, ft_header)
		if (options['only-ko']) clearLine()
		if (printf_output != ft_printf_output) {
			kos++
			consoleOutput += `${grade.ko}\n`
			consoleOutput += `printf:    <${printf_output}>\n`
			consoleOutput += `ft_printf: <${ft_printf_output}>\n\n`
		} else {
			consoleOutput += `${grade.ok}`
			if (!options['only-ko']) {
				consoleOutput += `\n<${color(printf_output, 0, 255, 0)}>\n\n`
			}
		}
		process.stdout.write(consoleOutput)
	}
	if (options['only-ko']) clearLine()
	const koPercent = kos == 0 ? color('0%', 0, 255, 0) : color(((kos / testCases.length) * 100).toFixed(3) + '%', 255, 0, 0)
	console.log(`Completed ${testCases.length} tests, with ${kos} KOs: ${koPercent}`)
	console.log(`Grade: ${kos > 0 ? grade.ko : grade.ok}`)
})()
