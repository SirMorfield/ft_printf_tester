/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   app.js                                             :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:31:54 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/12 21:22:43 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const build_cmd = 'make -C ../ft_printf/'
const ft_bin = '../ft_printf/bin/'
const ft_header = '../ft_printf/'

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
const { getOutputsCompile } = require('./outputs.js')

execSyncSafe(build_cmd)

if (options['output']) {
	const testCase = process.argv[process.argv.indexOf('--output') + 1]
	runft_printf(testCase)
	return
}

(async () => {
	let has_ko = false
	for (const testCase of testCases) {
		let consoleOutput = ''
		consoleOutput += `Testing (${testCase}) `
		const { printf_output, ft_printf_output } = await getOutputsCompile(testCase, ft_bin, ft_header)
		if (options['only-ko']) clearLine()
		if (printf_output != ft_printf_output) {
			has_ko = true
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
	console.log(`Grade: ${has_ko ? grade.ko : grade.ok}`)
})()
