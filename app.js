/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   app.js                                             :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:31:54 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/11 15:58:53 by jkoers        ########   odam.nl         */
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

const grade = {
	ko: color('[KO]', 255, 0, 0),
	ok: color('[OK]', 0, 255, 0)
}

try {
	console.log(color((execSync(build_cmd, { stdio: 'pipe' })).toString(), 105, 105, 105))
} catch (err) {
	process.stdout.write(err.stdout.toString())
	process.stdout.write(err.stderr.toString())
	process.exit(1)
}

const options = {
	"output": process.argv.includes('--output'),
	"only-ko": process.argv.includes('--only-ko')
}

function clearLine() {
	process.stdout.clearLine()
	process.stdout.cursorTo(0)
}

if (options['output']) {
	let out
	const testCase = process.argv[process.argv.indexOf('--output') + 1]
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

async function getOutputs(testCase) {
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
	return { printf_output, ft_printf_output }
}

(async () => {
	let has_ko = false
	for (const testCase of testCases) {
		let consoleOutput = ''
		consoleOutput += `Testing (${testCase}) `
		const { printf_output, ft_printf_output } = await getOutputs(testCase)
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
