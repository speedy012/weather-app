<h1 align='center'>Weather App</h1>

## Getting Started

**1. Install the correct Node version.**

Used in this project is Node 20.12.7.

[I recommend doing so via `nvm`.](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating)

If you [integrate it via your shell](https://github.com/nvm-sh/nvm/blob/master/README.md#deeper-shell-integration), you can make it so that NVM will automatically use the correct version of Node. It will also download a version of Node if you don't have one that matches the requirements laid out in the local `.nvmrc` file.

**2. Setup `pnpm` and install dependencies**

Once you have a Node runtime available, you can use the following commands to activate `pnpm` and install the project's dependencies.

**3. Start the development server**

```
pnpm run dev

# You can CTRL+Click on the logged URL, or...
# Open your browser at the relevant URL
# By default, it should be localhost:5173, but you can override the port with a `-p` flag
```
