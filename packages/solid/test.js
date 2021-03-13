const { transformSync } = require('@babel/core')

process.env.NODE_ENV = 'test'

function transform({ filename, source }) {
  const { code } = transformSync(source, {
    filename,
    presets: [
      [require('@babel/preset-typescript')],
      [require('babel-preset-solid'), { generate: 'ssr', hydrate: true }],
    ],
    plugins: [[require('@babel/plugin-transform-modules-commonjs')]],
  })

  return { code }
}

const extensions = ['.ts', '.tsx', '.jsx', '.js']

const jiti = require('jiti')(__filename, { transform, extensions })
jiti('./solid.spec.tsx')
