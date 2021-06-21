/* eslint-env node */
// ^^^^ This comment is need to prevent browser bundles of this file

import type { DocumentContext } from 'next/document'
import Document from 'next/document'

import type { Configuration } from 'twind/server'
import { shim } from 'twind/shim/server'
import withTwind from '@twind/next/document'

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
  // @ts-ignore
  return class extends withTwind(configOrBase as Configuration, BaseDocument) {
    static getInitialProps(ctx: DocumentContext) {
      const originalRenderPage = ctx.renderPage

      ctx.renderPage = async (options) => {
        const result = await originalRenderPage(options)

        return {
          ...result,
          html: shim(result.html),
        }
      }

      return super.getInitialProps(ctx)
    }
  }
}
