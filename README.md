# ft_printf tester

A extremely complete NodeJS tester for ft_printf.
![Example missing](doc/example.png?raw=true "Example")

## Installation
Install NodeJS
```bash
# Linux
/bin/bash -c "$(curl -fsSL https://deb.nodesource.com/setup_14.x)"
sudo apt install -y nodejs

# Mac
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew install nodejs

# Mac on 42 campus
curl -fsSL https://rawgit.com/kube/42homebrew/master/install.sh | zsh

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
Or alternatively, only showing the wrong outputs:
```bash
node app.js --only-ko
```
## Contributing
More testcases are more better, thankyou.  
See testCases.js for more details.
