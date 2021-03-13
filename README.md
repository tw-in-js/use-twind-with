# Twind Integration Packages

> [Twind](https://twind.dev) integration packages for frameworks & libraries with examples

## Available Packages

- [@twind/next](./packages/next#readme) – [Next.js](https://nextjs.org)
- [@twind/preact](./packages/preact#readme) – [Preact](https://preactjs.com) which allows to use the [tw property](https://github.com/tw-in-js/twind-jsx-preprocessor/blob/main/docs/tw-prop.md), `css` property and `className` (shim without [shim](https://twind.dev/docs/handbook/getting-started/using-the-shim.html))
- [@twind/wmr](./packages/wmr#readme) – [WMR](https://github.com/preactjs/wmr/tree/main/packages/wmr) utilizing [@twind/preact](https://www.npmjs.com/package/@twind/preact)

## Contribute

Thanks for being willing to contribute!

> This project is free and open-source, so if you think this project can help you or anyone else, you may [star it on GitHub](https://github.com/tw-in-js/use-twind-with). Feel free to [open an issue](https://github.com/tw-in-js/use-twind-with/issues) if you have any idea, question, or you've found a bug.

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

We are following the [Conventional Commits](https://www.conventionalcommits.org) convention.

### Develop

Clone the repository and cd into the project directory.

Run `yarn install`.

- `lerna run test`: Run test suite including linting
- `lerna run format`: Ensure consistent code style
- `lerna run build`: Build all packages
- `lerna publish`: To publish all changed packages

## License

[MIT](https://github.com/tw-in-js/use-twind-with/blob/main/LICENSE)
