import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { TW } from 'twind'
import type { VirtualSheet } from 'twind/sheets'

import { create } from 'twind'
import { virtualSheet } from 'twind/sheets'
import { renderToString } from 'solid-js/web'

import { styled } from '.'

// React is messing with JSX types
// Disabling them  for now..
declare module 'react' {
  namespace JSX {}
}

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

  const { html } = renderToString(() => (
    <Button size="lg" class="x" type="button">
      Click Me
    </Button>
  ))

  assert.is(html, '<button type="button" class="tw-xz6gsm tw-jo04kc x">Click Me</button>')
  assert.equal(sheet.target, ['.tw-xz6gsm{font-size:1.125rem;line-height:1.75rem}'])
})

test.run()
