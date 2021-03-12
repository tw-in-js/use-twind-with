/* eslint-env node */
// ^^^^ This comment is need to prevent browser bundles of this file

import type { VNode } from 'preact'
import type { PrerenderResult, PrerenderOptions } from 'preact-iso/prerender'
import prerender from 'preact-iso/prerender'

import type { Configuration } from 'twind'
import type { TwindPreactConfiguration } from '@twind/preact'
import { asyncVirtualSheet, getStyleTag } from 'twind/server'
import { setup } from '@twind/preact'

export default function prerenderWithTwind(
  config: Configuration & TwindPreactConfiguration,
  render: (data: any) => VNode,
  options?: PrerenderOptions,
): (data: any) => Promise<PrerenderResult> {
  const sheet = asyncVirtualSheet()

  setup({ ...config, sheet })

  return async (data) => {
    sheet.reset()

    let { html, ...rest } = await prerender(render(data), options)

    return { ...rest, html: getStyleTag(sheet) + html }
  }
}
