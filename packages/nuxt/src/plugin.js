import { create } from 'twind'

export default ({ ssrContext }, inject) => {
  const { preflight, theme, plugins, variants, darkMode, mode } = <%= JSON.stringify(options, null, 2) %>
  const sheet = process.server ? ssrContext.$twSheet : undefined
  const { tw } = create({
    preflight,
    theme,
    plugins,
    variants,
    darkMode,
    mode,
    sheet,
  })
  inject('tw', tw)
}
