# morse-guru

This is a tool used to send messages in morse code with obfuscation. The specs are available [here](https://gist.github.com/kmckelvin/e742e132b338960ca6b02b2eedeed855#file-part-2-md).

## Assumptions
1. If the encoded letter doesn't exists in the spec list, it will be ignored and removed from the output.

## Installation

This package haven't been released to NPM. So, to use locally, you should build it and link it.

```bash
npm build
npm link
```

## Usage

### Interactive mode

```bash
morse-guru
```

This mode will read the message from STDIN and output the obfuscated morse code at the STDOUT. To quit the interactive mode, you should press `ctrl+c`.

### File mode

```bash
morse-guru -f <path>
```

This mode will read the message from a file specified at `<path>`, encode it and write the result at `<path>.min`.
