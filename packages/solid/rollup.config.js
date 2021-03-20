import withSolid from 'rollup-preset-solid'

export default withSolid([
  { input: 'src/core.tsx', external: [/twind\/*/] },
  {
    input: 'src/server.tsx',
    external: [/twind\/*/],
    targets: ['cjs', 'esm'],
    writePackageJson: true,
  },
])
