/**
 * This file is similar to the one present at the root of this project.
 * It's used to prepare a special environement for Solid handling.
 *
 * The Solid's JSX needs special transformation via Babel which Jiti
 * provides out of the box and can additionally transform
 * typescript's syntax down to common js.
 */
const { transformSync } = require('@babel/core')

// Hint all the build tools that we are in a test environement
process.env.NODE_ENV = 'test'

// Babel transform applied to [j|t]sx? files when imported
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
