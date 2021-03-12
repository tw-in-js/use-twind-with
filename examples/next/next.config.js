const withTM = require('next-transpile-modules')(['@twind/next'])

module.exports = withTM({
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    return config
  },
})
