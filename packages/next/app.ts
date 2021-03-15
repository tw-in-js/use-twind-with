import App from 'next/app'

import type { Configuration } from 'twind'
import { setup } from 'twind'

export default function withTwindApp<Base = typeof App>(
  config?: Configuration,
  BaseApp?: Base,
): Base

export default function withTwindApp<Base = typeof App>(BaseApp?: Base): Base

export default function withTwindApp<Base = typeof App>(
  configOrBase?: Configuration | Base,
  BaseApp?: Base,
): Base {
  if (typeof configOrBase == 'function') {
    BaseApp = configOrBase
    configOrBase = {}
  }

  // If this run on the server _document.js has already done the setup
  if (typeof window !== 'undefined') {
    setup(configOrBase)
  }

  // @ts-ignore
  return BaseApp || App
}
