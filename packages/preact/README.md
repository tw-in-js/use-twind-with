# @twind/preact [![Latest Release](https://flat.badgen.net/npm/v/twind?icon=npm&label&cache=10800&color=blue)](https://www.npmjs.com/package/@twind/preact) [![MIT License](https://flat.badgen.net/github/license/tw-in-js/use-twind-with)](https://github.com/tw-in-js/use-twind-with/blob/main/LICENSE)

> [Twind](https://twind.dev) integration for [Preact](https://preactjs.com) which allows to use the [tw property](https://github.com/tw-in-js/twind-jsx-preprocessor/blob/main/docs/tw-prop.md), `css` property and `className` (shim without [shim](https://twind.dev/docs/handbook/getting-started/using-the-shim.html)).

## Installation

```sh
npm install @twind/preact
```

## Usage

> You **must** call `setup` during the app initialization.

```js
import { setup } from '@twind/preact'

// Must call
setup({
  // Optional define props to use
  props: {
    // tw: false, // to disable
    // css: false, // to disable
    // className: true, // to enable
  },
  /* other twind configuration options */
})

const App = () => (
  <main
    tw="h-screen bg-purple-400 flex items-center justify-center"
    css={
      {
        /* CSS Object */
      }
    }
  >
    <h1 tw="font-bold text(center 5xl white sm:gray-800 md:pink-700)">This is Twind!</h1>
  </main>
)
```

## Shim-like usage but without the [shim](https://twind.dev/docs/handbook/getting-started/using-the-shim.html)

```js
import { setup } from '@twind/preact'

setup({
  props: {
    // tw: false, // to disable
    // css: false, // to disable
    className: true, // to enable – suppports `class` property as well
  },
  /* other twind configuration options */
})

const App = () => (
  <main className="h-screen bg-purple-400 flex items-center justify-center">
    <h1 class="font-bold text(center 5xl white sm:gray-800 md:pink-700)">This is Twind!</h1>
  </main>
)
```

## Styled API

> Coming soon! In the mean time try [@twind/react](https://github.com/tw-in-js/twind-react) with [aliasing React to Preact](https://preactjs.com/guide/v10/getting-started#aliasing-react-to-preact)

## License

[MIT](https://github.com/tw-in-js/use-with-twind/blob/main/LICENSE)
