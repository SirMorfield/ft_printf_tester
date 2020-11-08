/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   run_tests.c                                        :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:23:07 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/08 20:54:28 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */


#ifdef FT
	#define PRINTER ft_printf
#else
	#include <stdio.h>
	#define PRINTER printf
#endif

#ifndef TESTCASE
	#define TESTCASE "%s", "No testcase specified"
#endif

int	main(void)
{
	PRINTER(TESTCASE);
	return (0);
}
