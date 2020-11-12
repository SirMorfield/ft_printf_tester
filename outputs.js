/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   outputs.js                                         :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/12 21:10:07 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/12 21:22:49 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const execSync = require('child_process').execSync
const {
	runParallel,
	color,
	grade,
	options
} = require('./helpers.js')

async function getOutputsCompile(testCase, ft_bin, ft_header) {
	await runParallel([
		`gcc -w -DTESTCASE="${testCase.replace(/"/g, `\\"`)}" ./runner/run_tests.c -o runner/printf`,
		`gcc -w -DTESTCASE="${testCase.replace(/"/g, `\\"`)}" -DFT ./runner/run_tests.c -L${ft_bin} -I${ft_header} -lftprintf -o runner/ft_printf`
	])
	let printf_output
	let ft_printf_output
	try {
		printf_output = (execSync(`./runner/printf`, { stdio: 'pipe' })).toString()
	} catch (err) {
		printf_output = `${color('Execution error', 255, 0, 0)}`
	}
	try {
		ft_printf_output = (execSync(`./runner/ft_printf`, { stdio: 'pipe' })).toString()
	} catch (err) {
		console.log(err)
		ft_printf_output = `${color('Execution error', 255, 0, 0)}`
	}
	return { printf_output, ft_printf_output }
}

function runft_printf(testCase) {
	let out
	console.log(`Testing (${testCase}) `)
	try {
		execSync(`gcc -w -DTESTCASE='${testCase}' -DFT ./runner/run_tests.c -L${ft_bin} -I${ft_header} -lftprintf -o runner/ft_printf`, { stdio: 'pipe' })
		out = (execSync(`./runner/ft_printf`, { stdio: 'pipe' })).toString()
	} catch (err) {
		process.stdout.write(err.stdout.toString())
		process.stdout.write(err.stderr.toString())
	}
	if (out) {
		console.log(out)
	}
	return
}

// const { rebuild } = require('ft_printf_js_interface')
// rebuild({ headerDir: ft_header, libDir: ft_bin })
// const {
// 	run,
// 	ft_printf,
// 	printf
// } = require('ft_printf_js_interface')
// const len = run(printf, `"Hello %s\n", "world"`)
// const len2 = run(ft_printf, `"This uses ft_printf instead of printf\n"`);

module.exports = {
	getOutputsCompile,
	runft_printf,
}
