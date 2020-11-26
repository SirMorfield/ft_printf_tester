/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   outputs.js                                         :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/12 21:10:07 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/26 01:30:14 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const execSync = require('child_process').execSync
const fs = require('fs')
const {
	runParallel,
	color,
	grade,
	options
} = require('./helpers.js')

async function getOutputsCompile(testCase, ft_bin, ft_header) {
	await runParallel([
		`gcc -DTESTCASE="${testCase.replace(/"/g, `\\"`)}" ./runner/run_tests.c -o runner/printf`,
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
		// console.log(err)
		ft_printf_output = `${color('Execution error', 255, 0, 0)}`
	}
	return { printf_output, ft_printf_output }
}

function runft_printf(testCase, ft_bin, ft_header) {
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
}

function runLeaks(testCases, ft_bin, ft_header) {
	let headerFiles = fs.readdirSync(ft_header)
	headerFiles = headerFiles.filter(file => file.match(/\.h\$/))
	let file = ''
	for (const headerFile of headerFiles) {
		file += `#include "${headerFile}"\n\n`
	}
	file += `int main (void)\n`
	file += `{\n`

	for (const testCase of testCases) {
		file += `	ft_printf(${testCase});\n`
	}
	file += `	return (0);\n`
	file += `}\n`
	fs.writeFileSync('./runner/leaks.c', file)
	let out
	console.log(`Running leak test by valgrid`)
	try {
		execSync(`gcc ./runner/leaks.c -L${ft_bin} -I${ft_header} -lftprintf -o ./runner/leaks`, { stdio: 'pipe' })
		out = (execSync(`valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes --log-file=runner/valgrind-out.txt ./runner/leaks`, { stdio: 'pipe' })).toString()
		console.log((fs.readFileSync('runner/valgrind-out.txt')).toString())
	} catch (err) {
		process.stdout.write(err.stdout.toString())
		process.stdout.write(err.stderr.toString())
	}
}

async function getOutputsMarius(testCase, ft_bin, ft_header) {
	const { run, ft_printf, printf } = require('ft_printf_js_interface')
	const [printf_output, len] = run(printf, testCase)
	const [ft_printf_output, len2] = run(ft_printf, testCase);

	return {
		printf_output,
		ft_printf_output
	}
}

module.exports = {
	getOutputsCompile,
	runft_printf,
	runLeaks,
	getOutputsMarius,
}
