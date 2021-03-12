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

export default function withTwind(
  config: Configuration & TwindPreactConfiguration,
  render: (data: any) => VNode,
  options?: PrerenderOptions,
): WithTwindResult {
  // we use dynamic import to prevent prerender from being loaded in the browser
  let prerender: Promise<(data: any) => Promise<PrerenderResult>>

  return {
    hydrate: (jsx, parent) => {
      if (typeof window != 'undefined') {
        setup(config)
        hydrate(jsx, parent)
      }
    },
    prerender: async (data) =>
      (
        await (prerender ||
          (prerender = import('@twind/wmr/prerender').then((m) =>
            m.default(config, render, options),
          )))
      )(data),
  }
}
