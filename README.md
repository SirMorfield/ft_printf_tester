# ft_printf tester

A extremely complete NodeJS tester for ft_printf.
![Example missing](doc/example.png?raw=true "Example")

## Installation
Install NodeJS
```bash
sudo apt install -y nodejs
```

In `app.js` change:
```js
const build_cmd = 'make -C ../ft_printf/'	// The command that is used to compile your ft_printf
const ft_bin = '../ft_printf/bin/' 			// The directory that contains your libftprintf.a file.
const ft_header = '../ft_printf/'  			// The directory that contains your header file.
```

## Usage

```bash
node app.js
```
Or alternatively, a single option:
```bash
node app.js --output <testcase>
```
![Example missing](doc/single.png?raw=true "Example")

## Contributing
More testcases are more better, thankyou.  
See testCases.js for more details.
