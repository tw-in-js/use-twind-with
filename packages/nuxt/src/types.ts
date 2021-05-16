import type { CSSRules, DarkMode, Mode, Plugin, Preflight, ThemeConfiguration } from 'twind'

export interface NuxtTwindModuleOptions {
  preflight?: Preflight | boolean | CSSRules
  theme?: ThemeConfiguration
  plugins?: Record<string, Plugin | undefined>
  variants?: Record<string, string>
  darkMode?: DarkMode
  mode?: Mode | 'strict' | 'warn' | 'silent'
  ssr: boolean
}
