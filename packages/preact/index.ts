import type { Options, JSX } from 'preact'
import { options as preactOptions } from 'preact'

import { TW, Configuration, Token, CSSRules, directive, Falsy } from 'twind'
import { tw as defaultTW, setup as setupTwind } from 'twind'

export * from 'twind'

export interface TwindPreactConfiguration {
  props?: {
    tw?: boolean
    css?: boolean
    className?: boolean
  }
}

declare module 'preact' {
  namespace JSX {
    interface DOMAttributes<Target extends EventTarget> {
      tw?: Token
      css?: CSSRules | Falsy
      class?: string
      className?: string
    }
  }
}

const css$ = (rules: CSSRules): CSSRules => rules

export const setup = (
  {
    props = {},
    ...config
  }: (TwindPreactConfiguration & { tw: TW }) | (TwindPreactConfiguration & Configuration) = {},
  options: Options = preactOptions,
): void => {
  const tw = (config as { tw?: TW }).tw || defaultTW

  if (!(config as { tw?: TW }).tw) {
    setupTwind(config as Configuration)
  }

  const useTWProp = props.tw !== false
  const useCSSProp = props.css !== false
  const useClassNameProp = props.className === true

  if (useTWProp || useCSSProp || useClassNameProp) {
    const { vnode: vnodeHook } = options

    options.vnode = (vnode) => {
      const { props } = vnode as { props: JSX.DOMAttributes<any> }

      if (typeof props == 'object') {
        const classes: string[] = []

        if (useTWProp && 'tw' in props) {
          if (props.tw) {
            classes.push(tw(props.tw))
          }
          props.tw = undefined
        }

        if (useCSSProp && 'css' in props) {
          if (props.css) {
            classes.push(tw(directive(css$, props.css)))
          }
          props.css = undefined
        }

        // preact/compat changes `className` to a synonym of `class`.
        // Thus, we only need this setup when preact/compat isn't imported.
        if (props.className && !Object.getOwnPropertyDescriptor(props, 'className')?.get) {
          classes.push(useClassNameProp ? tw(props.className) : props.className)
          props.className = undefined
        }

        if (props.class) {
          classes.push(useClassNameProp ? tw(props.class) : props.class)
        }

        if (classes.length) {
          props.class = classes.join(' ')
        }
      }

      // Call previously defined hook if there was any
      if (vnodeHook) {
        vnodeHook(vnode)
      }
    }
  }
}
