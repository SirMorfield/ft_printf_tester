/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   app.js                                             :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:31:54 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/14 00:20:32 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const ft_bin = '/home/joppe/GitHub/ft_printf/bin'
const ft_header = '/home/joppe/GitHub/ft_printf'
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
	getOutputsMarius
} = require('./outputs.js')

// execSyncSafe(build_cmd)
rebuild({ headerDir: ft_header, libDir: ft_bin })

if (options['output']) {
	const testCase = process.argv[process.argv.indexOf('--output') + 1]
	runft_printf(testCase)
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
	const koPercent = kos == 0 ? '100.000' : ((kos / testCases.length) * 100).toFixed(3)
	console.log(`Completed ${testCases.length} tests, with ${kos} KOs: ${koPercent}%`)
	console.log(`Grade: ${kos > 0 ? grade.ko : grade.ok}`)
})()
