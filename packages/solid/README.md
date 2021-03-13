# @twind/solid [![MIT License](https://flat.badgen.net/github/license/tw-in-js/use-twind-with)](https://github.com/tw-in-js/use-twind-with/blob/main/LICENSE)

> [Twind](https://twind.dev) integration for [solid](https://github.com/ryansolid/solid)

## Installation

```sh
npm install @twind/solid
```

## Custom setup function

<!-- TODO: Make a CSB example -->
<!-- [![Edit twind-solid](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/thirsty-banzai-smrpi?fontsize=14&hidenavigation=1&theme=dark) -->

> Coming soon! In the mean time use the default `setup` function provider by `twind`

## Styled API

> Please see [twind/style](https://twind.dev/docs/modules/twind_style.html) for config examples.

### Usage

<!-- TODO: Make a CSB example -->
<!-- [![Try this example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/twind-react-styled-90y9n?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark) -->

```jsx
import { styled } from "@twind/solid"

// If not tag is passed, it will default to a `div`
const Box = styled()

const Button = styled("button", {
  base: `
    appearance-none border-none bg-transparent
    rounded-full px-2.5
  `,

  variants: {
    size: {
      sm: `text-sm h-6`,
      md: `text-base h-9`,
    },

    variant: {
      gray: `
        bg-gray-500
        hover:bg-gray-600
      `,
      primary: `
        text-white bg-purple-500
        hover:bg-purple-600
      `,
    },
    outlined: {
      true: `bg-transparent ring-1`,
    },
  },

  defaults: {
    variant: "gray",
    size: "sm",
  },

  matches: [
    {
      variant: "gray",
      outlined: true,
      use: `ring-gray-500`,
    },
    {
      variant: "primary",
      outlined: true,
      use: `text-purple-500 ring-gray-500 hover:text-white`,
    },
  ],
})

<Box tw="m-2.5 flex flex-wrap" css={{ gap: "20px" }}>
  <Button>Button</Button>
  <Button variant="gray">Gray Button</Button>
  <Button variant="primary">Primary Button</Button>
  <Button variant="gray" outlined>
    Outlined Gray Button
  </Button>
  <Button variant="primary" outlined>
    Outlined Primary Button
  </Button>
  <Button variant="primary" outlined size={{ initial: "sm", lg: "md" }}>
    Responsive Primary Button
  </Button>
</Box>
```

## License

[MIT](https://github.com/tw-in-js/use-with-twind/blob/main/LICENSE)
