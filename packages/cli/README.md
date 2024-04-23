<p align="center">
 <img align="center" src="https://raw.githubusercontent.com/lucamqf/rabbithook/main/apps/www/src/public/logo.svg" width="400" />
</p>

Welcome to the **Rabbithook** Monorepo! This repository contains the source code for the Rabbithook project, a comprehensive toolset designed for simplifying the use of React hooks. Rabbithook is inspired by Shadcn, but tailored for managing and adding hooks to your React projects with ease.

This monorepo is organized into three primary components:
- **CLI**: The command-line interface for interacting with the Rabbithook ecosystem.
- **Registry**: The backend service responsible for storing and serving the hooks.
- **Landing Page**: The public-facing website that provides information about Rabbithook.

## Repository Structure

Here's an overview of the repository structure:

- `packages/cli`: Contains the source code for the Rabbithook CLI.
- `packages/registry`: Houses the code for the Rabbithook backend, which manages the storage and distribution of hooks.
- `www`: Under development...

## CLI Project

The CLI component allows users to add React hooks to their projects via a simple command-line interface. For more details on how to use the CLI, refer to the [CLI README](./packages/cli/README.md).

## Registry Project

The Registry component acts as the backend service, storing and serving hooks. [Registry README](./packages/registry/README.md).

## Landing Page Project
Under development...


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
