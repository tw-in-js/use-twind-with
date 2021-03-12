import App from 'next/app'

import type { Configuration } from 'twind/observe'
import { observe, setup } from 'twind/observe'

export type Constructor<T = object, S = object> = (new (...input: any[]) => T) & S

export default function withTwindApp<
  P = {},
  Base extends Constructor<App<P>, typeof App> = typeof App
>(config?: Configuration, BaseApp?: Base): Base

export default function withTwindApp<
  P = {},
  Base extends Constructor<App<P>, typeof App> = typeof App
>(BaseApp?: Base): Base

export default function withTwindApp<
  P = {},
  Base extends Constructor<App<P>, typeof App> = typeof App
>(configOrBase?: Configuration | Base, BaseApp?: Base): Base {
  if (typeof configOrBase == 'function') {
    BaseApp = configOrBase
    configOrBase = {}
  }

  // If this run on the server _document.js has already done the setup
  if (typeof document !== 'undefined') {
    setup(configOrBase)
    observe(document.documentElement)
  }

  // @ts-ignore
  return BaseApp || App
}
