/** @type {import('twind').Configuration} */
export default {
  theme: {
    extend: {
      colors: {
        gray: {
          custom: '#242331',
        },
        yellow: {
          custom: '#edf060',
        },
        red: {
          custom: '#ef233c',
        },
      },
      screens: {
        standalone: { raw: '(display-mode:standalone)' },
      },
    },
  },
}
