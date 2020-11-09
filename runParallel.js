/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   runParallel.js                                     :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/09 14:52:56 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/09 15:02:11 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function runParallel(commands) {
	
	commands = commands.map((cmd) => {return exec(cmd)})
	
	await Promise.all(commands)
}

module.exports = runParallel
