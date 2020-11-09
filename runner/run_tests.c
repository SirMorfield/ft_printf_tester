/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   run_tests.c                                        :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/04 19:23:07 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/09 15:38:32 by mvan-wij      ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

#ifdef FT
	#define PRINTER ft_printf
	#include "ft_printf.h"
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
