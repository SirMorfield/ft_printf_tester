/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   appAsync.js                                        :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:31:54 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/09 14:44:06 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const build_cmd = 'make -C ../ft_printf/'
const ft_bin = '../ft_printf/bin/'
const ft_header = '../ft_printf/'

const testCases = require('./testcases.js')
const { execSync } = require('child_process')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

function color(text, r, g, b) {
	return ("\033[38;2;" + `${r};${g};${b}m${text}` + "\033[0m")
}

try {
	console.log(color((execSync(build_cmd, { stdio: 'pipe' })).toString(), 105, 105, 105));
} catch (err) {
	process.stdout.write(err.stdout.toString())
	process.stdout.write(err.stderr.toString())
}

async function compile(testCase) {
	const gccs = [
		exec(`gcc -w -DTESTCASE='${testCase}' ./runner/run_tests.c -o runner/printf`),
		exec(`gcc -w -DTESTCASE='${testCase}' -DFT ./runner/run_tests.c -L${ft_bin} -I${ft_header} -lftprintf -o runner/ft_printf`)
	]
	await Promise.all(gccs)
}

if (process.argv[2] == '--output') {
	let out
	console.log(`Testing (${process.argv[3]}) `)
	try {
		execSync(`gcc -w -DTESTCASE='${process.argv[3]}' -DFT ./runner/run_tests.c -L${ft_bin} -I${ft_header} -lftprintf -o runner/ft_printf`, { stdio: 'pipe' })
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

(async () => {
	for (const testCase of testCases) {
		process.stdout.write(`Testing (${testCase}) `)
		await compile(testCase)
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
			ft_printf_output = `${color('Execution error', 255, 0, 0)}`
		}

		if (printf_output != ft_printf_output) {
			console.log(`${color('[KO]', 255, 0, 0)}`)
			console.log(`printf:    <${printf_output}>`)
			console.log(`ft_printf: <${ft_printf_output}>`)
		}
		else {
			console.log(`${color('[OK]', 0, 255, 0)}`)
			console.log(`<${color(printf_output, 0, 255, 0)}>`)
		}
		console.log("");

	}
})()
