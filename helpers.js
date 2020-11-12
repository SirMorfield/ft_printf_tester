/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   helpers.js                                         :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/09 14:52:56 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/12 21:07:17 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const execSync = require('child_process').execSync

async function runParallel(commands) {
	commands = commands.map((cmd) => { return exec(cmd) })
	await Promise.all(commands)
}

function execSyncSafe(cmd) {
	try {
		console.log(color((execSync(cmd, { stdio: 'pipe' })).toString(), 105, 105, 105))
	} catch (err) {
		process.stdout.write(err.stdout.toString())
		process.stdout.write(err.stderr.toString())
		process.exit(1)
	}
}

function color(text, r, g, b) {
	return ("\033[38;2;" + `${r};${g};${b}m${text}` + "\033[0m")
}

const grade = {
	ko: color('[KO]', 255, 0, 0),
	ok: color('[OK]', 0, 255, 0)
}

function clearLine() {
	process.stdout.clearLine()
	process.stdout.cursorTo(0)
}

const options = {
	"output": process.argv.includes('--output'),
	"only-ko": process.argv.includes('--only-ko')
}

module.exports = {
	runParallel,
	execSyncSafe,
	color,
	grade,
	clearLine,
	options
}
