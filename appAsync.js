/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   appAsync.js                                        :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:31:54 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/09 15:53:49 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const build_cmd = 'make -C ../ft_printf/'
const ft_bin = '../ft_printf/bin/'
const ft_header = '../ft_printf/'

const testCases = require('./testcases.js')
const { execSync } = require('child_process')
const runParallel = require('./runParallel.js')

function color(text, r, g, b) {
	return ("\033[38;2;" + `${r};${g};${b}m${text}` + "\033[0m")
}

try {
	console.log(color((execSync(build_cmd, { stdio: 'pipe' })).toString(), 105, 105, 105))
} catch (err) {
	process.stdout.write(err.stdout.toString())
	process.stdout.write(err.stderr.toString())
}

opt_output = process.argv.indexOf('--output')
opt_only_ko = process.argv.indexOf('--only-ko')
if (opt_output != -1) {
	let out
	console.log(`Testing (${process.argv[opt_output + 1]}) `)
	try {
		execSync(`gcc -w -DTESTCASE='${process.argv[opt_output + 1]}' -DFT ./runner/run_tests.c -L${ft_bin} -I${ft_header} -lftprintf -o runner/ft_printf`, { stdio: 'pipe' })
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
	let has_ko = false
	for (const testCase of testCases) {
		process.stdout.write(`Testing (${testCase}) `)
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
			ft_printf_output = `${color('Execution error', 255, 0, 0)}`
		}

		if (printf_output != ft_printf_output) {
			has_ko = true
			console.log(`${color('[KO]', 255, 0, 0)}`)
			console.log(`printf:    <${printf_output}>`)
			console.log(`ft_printf: <${ft_printf_output}>`)
		}
		else if (opt_only_ko == -1) {
			console.log(`${color('[OK]', 0, 255, 0)}`)
			console.log(`<${color(printf_output, 0, 255, 0)}>`)
		}
		console.log("")
	}
	if (has_ko) {
		console.log(`${color('[KO]', 255, 0, 0)}`)
	} else {
		console.log(`${color('[OK]', 0, 255, 0)}`)
	}
})()
