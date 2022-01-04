/* eslint-env node */
// ^^^^ This comment is need to prevent browser bundles of this file

import type { VNode } from 'preact'
import type { PrerenderResult, PrerenderOptions } from 'preact-iso/prerender'
import prerender from 'preact-iso/prerender'

import type { Configuration } from 'twind'
import type { TwindPreactConfiguration } from '@twind/preact'
import { asyncVirtualSheet, getStyleTagProperties } from 'twind/server'
import { setup } from '@twind/preact'

export default function prerenderWithTwind(
  config: Configuration & TwindPreactConfiguration,
  render: (data: any) => VNode,
  options?: PrerenderOptions,
): (data: any) => Promise<PrerenderResult> {
  const sheet = asyncVirtualSheet()

  setup({ ...config, sheet })

  // Ensure to start a new async scope
  return (data) =>
    Promise.resolve().then(async () => {
      await sheet.reset()

      const result = await prerender(render(data), options)
      const { id, textContent: children } = getStyleTagProperties(sheet)

      return {
        ...result,
        head: {
          elements: new Set([{ type: 'style', props: { id, children } }])
        },
      }
    })
}
