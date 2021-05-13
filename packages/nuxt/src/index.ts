import { resolve } from 'path'
import defu from 'defu'
import { AsyncVirtualSheet, asyncVirtualSheet, getStyleTag } from 'twind/server'
import { NuxtTwindModuleOptions } from './types'
import { Module } from '@nuxt/types'

const defaults: NuxtTwindModuleOptions = {
  preflight: true,
  theme: {},
  plugins: {},
  variants: {},
  darkMode: 'media',
  mode: 'silent',
  ssr: true,
}

const twindModule: Module<NuxtTwindModuleOptions> = async function (moduleOptions) {
  const { nuxt, addPlugin } = this

  const options = defu(moduleOptions, nuxt.options.twind, defaults) as NuxtTwindModuleOptions

  if (options.ssr) {
    nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext: { $twSheet: AsyncVirtualSheet }) => {
      ssrContext.$twSheet = asyncVirtualSheet()
      ssrContext.$twSheet.reset()
    })

    nuxt.hook(
      'vue-renderer:ssr:templateParams',
      (params: { HEAD: string }, ssrContext: { $twSheet: AsyncVirtualSheet }) => {
        params.HEAD += getStyleTag(ssrContext.$twSheet)
        ssrContext.$twSheet.disable()
      },
    )
  }

  addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'twind.js',
    options,
  })
}

export default twindModule
