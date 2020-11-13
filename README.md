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
Install dependencies

```
cd ft_printf_tester/

npm i -f --ignore-scripts

```
In `app.js` change:
```js
// The paths should be absolute (starting with a /).
const ft_bin = '/home/joppe/GitHub/ft_printf/bin' // The directory that contains your libftprintf.a file.
const ft_header = '/home/joppe/GitHub/ft_printf'  // The directory that contains your header file.
```

## Usage
```bash
node app.js
```
Or alternatively, only run a single test case:
```bash
node app.js --output '"%s", "Hello World!"' # mind the quotes!
```
![Example missing](doc/single.png?raw=true "Example")
Or alternatively, only showing the wrong outputs:
```bash
node app.js --only-ko
```
## Contributing
More testcases are more better, thankyou.  
See testCases.js for more details.
