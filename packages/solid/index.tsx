import {
  Dynamic,
  renderToString as solidRenderToString,
  renderToStringAsync as solidRenderToStringAsync,
} from 'solid-js/web'
import { Component, splitProps, JSX } from 'solid-js'

import { setup, TW, Configuration } from 'twind'
import { style, StyleConfig, StyleProps, tw as defaultTwInstance } from 'twind/style'
import { getStyleTag, virtualSheet } from 'twind/sheets'
import { getStyleTag as asyncGetStyleTag, asyncVirtualSheet } from 'twind/server'

export * from 'twind/style'

type Tags = keyof JSX.IntrinsicElements
type StyledConfig<Variants> = StyleConfig<Variants> & { tw?: TW }

export function styled<Variants, Tag extends Tags>(
  tag: Tag = 'div' as Tag,
  styledConfig: StyledConfig<Variants> = {},
) {
  const { tw: twInstance, ...config } = styledConfig
  const tw = twInstance || defaultTwInstance

  const component = style(config)

  type StyledProps = StyleProps<Variants> & JSX.IntrinsicElements[Tag]

  const styledComponent: Component<StyledProps> = (props) => {
    const variants: any = Object.keys(config.variants || {})

    const [internal, external] = splitProps(props, ['children'])
    const [twindProps, solidProps] = splitProps(external, [
      'class',
      'className',
      'css',
      'tw',
      ...variants,
    ])

    return (
      <Dynamic
        component={tag}
        {...solidProps}
        class={tw(component(twindProps as StyleProps<Variants>))}
        children={internal.children}
      />
    )
  }

  return styledComponent
}

export function renderToString<T>(
  app: () => T,
  options: {
    eventNames?: string[] | undefined
    stylesAttributes?: Record<string, string>
  } & Configuration = {},
) {
  const { eventNames, stylesAttributes, ...twindOptions } = options
  const sheet = twindOptions.sheet || virtualSheet()

  setup({ ...twindOptions, sheet })

  // @ts-ignore : seems like sheet.reset() doesn't exist
  sheet.reset()

  const results = solidRenderToString(app, { eventNames })

  // @ts-ignore : seems like there's a Sheet / StyleTagSheet type mismatch
  const styles = getStyleTag(sheet, stylesAttributes ? { stylesAttributes } : undefined)

  return { ...results, styles }
}

export async function renderToStringAsync<T>(
  app: () => T,
  options: {
    eventNames?: string[] | undefined
    timeoutMs?: number | undefined
    stylesAttributes?: Record<string, string>
  } & Configuration = {},
) {
  const { eventNames, timeoutMs, stylesAttributes, ...twindOptions } = options
  const sheet = twindOptions.sheet || asyncVirtualSheet()

  setup({ ...twindOptions, sheet })

  // @ts-ignore : seems like sheet.reset() doesn't exist
  sheet.reset()

  const results = await solidRenderToStringAsync(app, { eventNames, timeoutMs })

  // @ts-ignore : seems like there's a Sheet / StyleTagSheet type mismatch
  const styles = asyncGetStyleTag(sheet, stylesAttributes ? { stylesAttributes } : undefined)

  return { ...results, styles }
}
