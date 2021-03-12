import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { options as preactOptions } from 'preact'
import { html } from 'htm/preact'
import render from 'preact-render-to-string'

import type { TW } from 'twind'
import type { VirtualSheet } from 'twind/sheets'
import { create } from 'twind'
import { virtualSheet } from 'twind/sheets'

import { setup } from '.'

const test = suite<{
  sheet: VirtualSheet
  tw: TW
  vnode: typeof preactOptions.vnode
}>('@twind/react')

test.before((context) => {
  context.sheet = virtualSheet()
  context.tw = create({
    sheet: context.sheet,
    mode: 'strict',
    prefix: false,
    preflight: false,
  }).tw
  context.vnode = preactOptions.vnode
})

test.after.each(({ sheet, vnode }) => {
  sheet.reset()
  preactOptions.vnode = vnode
})

test('using className option', ({ tw, sheet }) => {
  setup({ tw, props: { className: true } })

  const markup = render(html`
    <main className="h-screen bg-purple-400 flex items-center justify-center">
      <h1 class="font-bold text(center 5xl white sm:gray-800 md:pink-700)">This is Twind!</h1>
    </main>
  `)

  assert.is(
    markup,
    [
      `<main class="h-screen bg-purple-400 flex items-center justify-center">`,
      `<h1 class="font-bold text-center text-5xl text-white sm:text-gray-800 md:text-pink-700">This is Twind!</h1>`,
      `</main>`,
    ].join(''),
  )
  assert.equal(sheet.target, [
    '.text-white{--tw-text-opacity:1;color:#fff;color:rgba(255,255,255,var(--tw-text-opacity))}',
    '.text-5xl{font-size:3rem;line-height:1}',
    '.bg-purple-400{--tw-bg-opacity:1;background-color:#a78bfa;background-color:rgba(167,139,250,var(--tw-bg-opacity))}',
    '.h-screen{height:100vh}',
    '.flex{display:flex}',
    '.font-bold{font-weight:700}',
    '.text-center{text-align:center}',
    '.items-center{align-items:center}',
    '.justify-center{justify-content:center}',
    '@media (min-width:640px){.sm\\:text-gray-800{--tw-text-opacity:1;color:#1f2937;color:rgba(31,41,55,var(--tw-text-opacity))}}',
    '@media (min-width:768px){.md\\:text-pink-700{--tw-text-opacity:1;color:#be185d;color:rgba(190,24,93,var(--tw-text-opacity))}}',
  ])
})

test('using tw option', ({ tw, sheet }) => {
  setup({ tw, props: { tw: true } })

  const markup = render(html`
    <div tw="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div tw="flex-shrink-0" class="logo">
        <img tw="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
      </div>
      <div>
        <div tw="text-xl font-medium text-black" className="title">{title}</div>
        <p tw="text-gray-500">{message}</p>
      </div>
    </div>
  `)

  assert.is(
    markup,
    [
      `<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">`,
      `<div class="flex-shrink-0 logo">`,
      `<img src="/img/logo.svg" alt="ChitChat Logo" class="h-12 w-12" />`,
      `</div>`,
      `<div>`,
      `<div class="text-xl font-medium text-black title">{title}</div>`,
      `<p class="text-gray-500">{message}</p>`,
      `</div>`,
      `</div>`,
    ].join(''),
  )
  assert.equal(sheet.target, [
    '*{--tw-shadow:0 0 transparent}',
    '.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:1rem;margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}',
    '.text-black{--tw-text-opacity:1;color:#000;color:rgba(0,0,0,var(--tw-text-opacity))}',
    '.text-gray-500{--tw-text-opacity:1;color:#6b7280;color:rgba(107,114,128,var(--tw-text-opacity))}',
    '.text-xl{font-size:1.25rem;line-height:1.75rem}',
    '.mx-auto{margin-left:auto;margin-right:auto}',
    '.bg-white{--tw-bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--tw-bg-opacity))}',
    '.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}',
    '.h-12{height:3rem}',
    '.w-12{width:3rem}',
    '.p-6{padding:1.5rem}',
    '.flex{display:flex}',
    '.flex-shrink-0{flex-shrink:0}',
    '.font-medium{font-weight:500}',
    '.max-w-sm{max-width:24rem}',
    '.items-center{align-items:center}',
    '.rounded-xl{border-radius:0.75rem}',
  ])
})

test.run()
