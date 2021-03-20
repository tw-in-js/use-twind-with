import {
  renderToString as solidRenderToString,
  renderToStringAsync as solidRenderToStringAsync,
} from 'solid-js/web'

import { setup, Configuration } from 'twind'
import { getStyleTag, VirtualSheet, virtualSheet } from 'twind/sheets'
import { getStyleTag as asyncGetStyleTag, asyncVirtualSheet, AsyncVirtualSheet } from 'twind/server'

export function renderToString<T>(
  app: () => T,
  options: {
    eventNames?: string[] | undefined
    stylesAttributes?: Record<string, string>
    sheet?: VirtualSheet
  } & Configuration = {},
) {
  const { eventNames, stylesAttributes, ...twindOptions } = options
  const sheet = twindOptions.sheet || virtualSheet()

  sheet.reset()
  setup({ ...twindOptions, sheet })

  const results = solidRenderToString(app, { eventNames })

  const styles = getStyleTag(sheet, stylesAttributes)

  return { ...results, styles }
}

export function renderToStringAsync<T>(
  app: () => T,
  options: {
    eventNames?: string[] | undefined
    timeoutMs?: number | undefined
    stylesAttributes?: Record<string, string>
    sheet?: AsyncVirtualSheet
  } & Configuration = {},
) {
  const { eventNames, timeoutMs, stylesAttributes, ...twindOptions } = options
  const sheet = twindOptions.sheet || asyncVirtualSheet()

  sheet.reset()
  setup({ ...twindOptions, sheet })

  return Promise.resolve().then(async () => {
    const results = await solidRenderToStringAsync(app, { eventNames, timeoutMs })
    const styles = asyncGetStyleTag(sheet, stylesAttributes)

    return { ...results, styles }
  })
}
