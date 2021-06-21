import { Dynamic } from 'solid-js/web'
import { Component, splitProps, JSX } from 'solid-js'

import { TW } from 'twind'
import { style, StyleConfig, StyleProps, tw as defaultTwInstance } from 'twind/style'

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
        children={internal.children as StyleProps<Variants>}
      />
    )
  }

  return styledComponent
}
