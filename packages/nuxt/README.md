> [Twind](https://twind.dev) integration for [Nuxt.js](https://nuxtjs.org/) which allows to use the [tw property](https://github.com/tw-in-js/twind-jsx-preprocessor/blob/main/docs/tw-prop.md) through a globally injected `$tw` property.

## Installation

Add `@twind/nuxt` dependency to your project:

```bash
yarn add --dev @twind/nuxt
```

## Configure

Then, add `@twind/nuxt` to the `buildModules` section of `nuxt.config.js`:

```ts [nuxt.config.js]
export default {
  buildModules: ['@twind/nuxt'],
  twind: {
    preflight: true,
    theme: {},
    plugins: {},
    variants: {},
    darkMode: 'media',
    mode: 'silent',
    ssr: true,
  },
}
```

## Usage

```html
<template>
  <main :class="$tw('h-screen bg-purple-400 flex items-center justify-center')">
    <h1 :class="$tw('font-bold text(center 5xl white sm:gray-800 md:pink-700)">This is Twind!</h1>
  </main>
</template>
```

## License

[MIT](https://github.com/tw-in-js/use-with-twind/blob/main/LICENSE)
