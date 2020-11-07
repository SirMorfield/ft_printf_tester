/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   app.js                                             :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:31:54 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/07 16:42:39 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const ft_bin = '../ft_printf/bin/'
const ft_header = '../ft_printf/'

const testCases = require('./testcases.js')
const { execSync, exec } = require('child_process')
const fs = require('fs').promises

function color(text, r, g, b) {
	return ("\033[38;2;" + `${r};${g};${b}m${text}` + "\033[0m")
}

(async () => {
	for (const testCase of testCases) {
		execSync(`gcc -w -DTESTCASE='${testCase}' ./runner/run_tests.c -o runner/printf`)
		execSync(`gcc -w -DTESTCASE='${testCase}' -DFT ./runner/run_tests.c -L${ft_bin} -I${ft_header} -lftprintf -o runner/ft_printf`)
		const printf_output = (execSync(`./runner/printf`)).toString()
		const ft_printf_output = (execSync(`./runner/ft_printf`)).toString()

		if (printf_output != ft_printf_output) {
			console.log(`${color('[KO]', 255, 0, 0)} ft_printf(${testCase})`)
			console.log(`printf:        <${printf_output}>`)
			console.log(`ft_printf:     <${ft_printf_output}>\n`)
		}
		else {
			console.log(`${color('[OK]', 0, 255, 0)} ft_printf(${testCase})`)
		}
	}
})()
