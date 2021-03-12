import type { VNode } from 'preact'
import type { PrerenderResult, PrerenderOptions } from 'preact-iso/prerender'
import hydrate from 'preact-iso/hydrate'

import type { Configuration } from 'twind'
import type { TwindPreactConfiguration } from '@twind/preact'
import { setup } from '@twind/preact'

export interface WithTwindResult {
  hydrate: typeof hydrate
  prerender: (data: any) => Promise<PrerenderResult>
}

export type PrerenderCallback = (data: any) => VNode

export default function withTwind(
  config: Configuration & TwindPreactConfiguration,
  render: PrerenderCallback,
  options?: PrerenderOptions,
): WithTwindResult

export default function withTwind(
  render: PrerenderCallback,
  options?: PrerenderOptions,
): WithTwindResult

export default function withTwind(
  config: (Configuration & TwindPreactConfiguration) | PrerenderCallback,
  render?: PrerenderCallback | PrerenderOptions,
  options?: PrerenderOptions,
): WithTwindResult {
  if (typeof config == 'function') {
    options = render as PrerenderOptions
    render = config
    config = {}
  }
  // we use dynamic import to prevent prerender from being loaded in the browser
  let prerender: Promise<(data: any) => Promise<PrerenderResult>>

  return {
    hydrate: (jsx, parent) => {
      if (typeof window != 'undefined') {
        setup(config as Configuration & TwindPreactConfiguration)
        hydrate(jsx, parent)
      }
    },
    prerender: async (data) =>
      (
        await (prerender ||
          (prerender = import('@twind/wmr/prerender').then((m) =>
            m.default(
              config as Configuration & TwindPreactConfiguration,
              render as PrerenderCallback,
              options,
            ),
          )))
      )(data),
  }
}
