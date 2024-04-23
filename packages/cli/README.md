<p align="center">
 <img align="center" src="https://raw.githubusercontent.com/lucamqf/rabbithook/main/apps/www/src/public/logo.svg" width="400" />
</p>

Welcome to **Rabbithook**! This is a React hook library inspired by the Shadcn architecture, but designed specifically for managing and adding hooks to your React projects. Rabbithook provides a simple command-line interface to initialize, add, and list available hooks, making it easy to quickly integrate functionality into your React applications.

## Getting Started

To start using Rabbithook in your React project, follow these steps:

1. Ensure you have a React project set up. If not, create one with `create-react-app` or your preferred method.
2. Open a terminal in your project directory.
3. Run the following command to initialize Rabbithook:

```bash
  npx rabbithook@latest init
```

This command creates a configuration file that Rabbithook uses to determine where to add hooks and other settings.

## Available Commands

Rabbithook provides three main commands to interact with your project:

### `add <...hooks>`

The `add` command allows you to add one or more hooks to your project. To use it, specify the hooks you want to add. For example, to add `useFetch` and `useEventListener`, run:

```bash
npx rabbithook@latest add useFetch useEventListener
```

Rabbithook will download the requested hooks, handle any required dependencies, and add them to your project.

### `init`

The `init` command initializes the configuration file for Rabbithook in your project. This command should be run before adding any hooks. It sets up the necessary paths and other configuration options.

```bash
npx rabbithook@latest init
```

### `list`

The `list` command displays a list of all available hooks that you can add to your project. To see all available hooks, run:

```bash
npx rabbithook@latest list
```

## Example Usage

Here is an example workflow using Rabbithook:

1. **Initialize Rabbithook**: Run `npx rabbithook@latest init` to create the configuration file.
2. **List Available Hooks**: Use `npx rabbithook@latest list` to see the hooks you can add to your project.
3. **Add Hooks**: Add desired hooks to your project with `npx rabbithook@latest add <hook1> <hook2> ...`. For example, to add `useWindowSize` and `useOnlineStatus`, run `npx rabbithook@latest add useWindowSize useOnlineStatus`.
