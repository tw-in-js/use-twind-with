# @twind/wmr [![Latest Release](https://flat.badgen.net/npm/v/twind?icon=npm&label&cache=10800&color=blue)](https://www.npmjs.com/package/@twind/wmr) [![MIT License](https://flat.badgen.net/github/license/tw-in-js/use-twind-with)](https://github.com/tw-in-js/use-twind-with/blob/main/LICENSE)

> [Twind](https://twind.dev) integration for [WMR](https://github.com/preactjs/wmr/tree/main/packages/wmr) utilizing [@twind/preact](https://www.npmjs.com/package/@twind/preact).

## Installation

```sh
npm install @twind/wmr
```

## Usage

```diff
-import hydrate from 'preact-iso/hydrate';
+import withTwind from '@twind/wmr';

+const { hydrate, prerender } = withTwind({
+  // Options for @twind/preact
+  props: {
+    className: true, // Shim like experience without the shim
+  },
+  /* other twind configuration options */
+}, (data) => <App {...data} />)

hydrate(<App />)

-export async function prerender(data) {
-  // we use dynamic import to prevent this from being loaded in the browser:
-  return (await import('preact-iso/prerender')).default(<App {...data} />);
-}
+export { prerender }
```

## License

[MIT](https://github.com/tw-in-js/use-with-twind/blob/main/LICENSE)
