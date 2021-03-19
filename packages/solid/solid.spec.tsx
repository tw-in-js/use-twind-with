// @jsxImportSource solid-js
import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { TW } from 'twind'
import type { VirtualSheet } from 'twind/sheets'

import { create, tw } from 'twind'
import { virtualSheet } from 'twind/sheets'
import { createResource, Suspense } from 'solid-js'
import { renderToString as solidRenderToString } from 'solid-js/web'

import { styled, renderToString, renderToStringAsync } from './index'

const test = suite<{ sheet: VirtualSheet; tw: TW }>('@twind/solid')

test.before((context) => {
  context.sheet = virtualSheet()
  context.tw = create({
    sheet: context.sheet,
    mode: 'strict',
    prefix: false,
    preflight: false,
  }).tw
})

test.after.each(({ sheet }) => {
  sheet.reset()
})

test('styled', ({ tw, sheet }) => {
  const Button = styled('button', {
    tw,
    variants: {
      size: {
        sm: `text-sm`,
        lg: `text-lg`,
      },
    },
  })

  assert.equal(sheet.target, [])

  const { html } = solidRenderToString(() => (
    <Button size="lg" class="x" type="button">
      Click Me
    </Button>
  ))

  assert.is(html, '<button type="button" class="tw-xz6gsm tw-jo04kc x">Click Me</button>')
  assert.equal(sheet.target, ['.tw-xz6gsm{font-size:1.125rem;line-height:1.75rem}'])
})

test('renderToString emits critical CSS', () => {
  const { html, styles } = renderToString(
    () => <button class={tw`bg-blue-500 text-gray-50`}>Click Me</button>,
    { preflight: false },
  )

  assert.ok(html.includes('bg-blue-500 text-gray-50'))
  assert.ok(styles.includes('bg-blue-500'))
  assert.ok(styles.includes('text-gray-50'))
})

test.skip('renderToStringAsync emits critical CSS', async () => {
  const { html, styles } = await renderToStringAsync(
    () => {
      const [text] = createResource(
        'weDontCareAboutThis',
        (): Promise<string> => {
          return new Promise((res) => setTimeout(res, 1000, 'Click Me'))
        },
      )

      return (
        <Suspense fallback="Loading...">
          <button class={tw`bg-blue-500 text-gray-50`}>{text()}</button>
        </Suspense>
      )
    },
    { preflight: false },
  )

  assert.ok(html.includes('bg-blue-500 text-gray-50'))
  assert.ok(styles.includes('bg-blue-500'))
  assert.ok(styles.includes('text-gray-50'))
})

test.run()
