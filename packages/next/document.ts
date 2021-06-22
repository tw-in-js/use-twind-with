/* eslint-env node */
// ^^^^ This comment is need to prevent browser bundles of this file

import type { DocumentContext } from 'next/document'
import Document from 'next/document'
import * as React from 'react'

import type { Configuration } from 'twind/server'
import { setup, asyncVirtualSheet, hash, getStyleTagProperties } from 'twind/server'

export type Constructor<T = object, S = object> = (new (...input: any[]) => T) & S

export default function withTwindDocument<
  P = {},
  Base extends Constructor<Document<P>, typeof Document> = typeof Document,
>(config?: Configuration, BaseDocument?: Base): Base

export default function withTwindDocument<
  P = {},
  Base extends Constructor<Document<P>, typeof Document> = typeof Document,
>(BaseDocument?: Base): Base

export default function withTwindDocument<
  P = {},
  Base extends Constructor<Document<P>, typeof Document> = typeof Document,
>(configOrBase?: Configuration | Base, BaseDocument?: Base): Base {
  if (typeof configOrBase == 'function') {
    BaseDocument = configOrBase
    configOrBase = {}
  }

  const sheet = asyncVirtualSheet()

  setup({ ...configOrBase, sheet })

  // @ts-ignore
  return class extends (BaseDocument || Document) {
    static getInitialProps(ctx: DocumentContext) {
      sheet.reset()

      const originalRenderPage = ctx.renderPage

      ctx.renderPage = async (options) => {
        const { html, head = [] } = await originalRenderPage(options)

        const { id, textContent } = getStyleTagProperties(sheet)

        return {
          html,
          head: [
            ...head,
            React.createElement('style', {
              id: '__' + hash(textContent),
              key: id,
              dangerouslySetInnerHTML: {
                __html: textContent,
              },
            }),
          ],
        }
      }

      return super.getInitialProps(ctx)
    }
  }
}
