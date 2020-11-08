
// DO NOT USE ``'`` IN ONE OF THE TEST CASES EVEN WHEN ESCAPED
module.exports = [
	`"%s", "Hello World!"`,
	`"%010i", 42`,
	`"%s", (char *)(0)`,
	// `"%5i", 42`,
	// `"%-5i", 42`,
	// `"%-05i", 42`,
	`"%-i", -42`,
	`"%-05i", 42`,
	`"%05i", -42`,
	`"%5i", -42`,
	`"%-5i", -42`,
	`"%-05i", -42`,
	`"%-05i", -42`,
	`"%-10d", 42`,
]
