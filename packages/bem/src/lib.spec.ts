import { test, expect, describe } from 'vitest'
import { defineBem } from './lib'
import { Expect, Equal } from './types'

describe('defineBem', () => {
  const complexBem = defineBem('v-btn')
    // Block modifiers
    .mod('loading')
    .mod('show-icon')
    .mod('icon-size', ['small', 'very-small'] as const)
    .mod('icon-size', 'little')
    // Block elements
    .elem('spinner')
    .elem('left-icon', (el) =>
      el
        // Element modifiers
        .mod('active')
        .mod('has-stroke')
        .mod('right-span', ['big', 'very-big'] as const)
        .mod('right-span', 'huge'),
    )

  test('Only block', () => {
    const bem = defineBem('s-table').build()

    type test = Expect<Equal<typeof bem, { block: 's-table' }>>

    expect(test).toMatchInlineSnapshot('[Function]')
  })

  test('Simple block', () => {
    const bem = defineBem('block').elem('elem').build()

    type test = Expect<
      Equal<
        typeof bem,
        {
          block: 'block'
          block__elem: 'block__elem'
        }
      >
    >

    expect(bem).toMatchInlineSnapshot(`
      {
        "block": "block",
        "block__elem": "block__elem",
      }
    `)
  })

  test('Complex classic build', () => {
    const bem = complexBem.build()

    type test = Expect<
      Equal<
        typeof bem,
        {
          block: 'v-btn'
          block_loading: 'v-btn_loading'
          block_showIcon: 'v-btn_show-icon'
          block_iconSize_small: 'v-btn_icon-size_small'
          block_iconSize_verySmall: 'v-btn_icon-size_very-small'
          block_iconSize_little: 'v-btn_icon-size_little'
          block__spinner: 'v-btn__spinner'
          block__leftIcon: 'v-btn__left-icon'
          block__leftIcon_active: 'v-btn__left-icon_active'
          block__leftIcon_hasStroke: 'v-btn__left-icon_has-stroke'
          block__leftIcon_rightSpan_big: 'v-btn__left-icon_right-span_big'
          block__leftIcon_rightSpan_veryBig: 'v-btn__left-icon_right-span_very-big'
          block__leftIcon_rightSpan_huge: 'v-btn__left-icon_right-span_huge'
        }
      >
    >

    expect(bem).toMatchInlineSnapshot(`
      {
        "block": "v-btn",
        "block__leftIcon": "v-btn__left-icon",
        "block__leftIcon_active": "v-btn__left-icon_active",
        "block__leftIcon_hasStroke": "v-btn__left-icon_has-stroke",
        "block__leftIcon_rightSpan_big": "v-btn__left-icon_right-span_big",
        "block__leftIcon_rightSpan_veryBig": "v-btn__left-icon_right-span_very-big",
        "block__spinner": "v-btn__spinner",
        "block_iconSize_small": "v-btn_icon-size_small",
        "block_iconSize_verySmall": "v-btn_icon-size_very-small",
        "block_loading": "v-btn_loading",
        "block_showIcon": "v-btn_show-icon",
      }
    `)
  })

  test('Complex two-dashes build', () => {
    const bem = complexBem.build('two-dashes')

    type test = Expect<
      Equal<
        typeof bem,
        {
          block: 'v-btn'
          block_loading: 'v-btn--loading'
          block_showIcon: 'v-btn--show-icon'
          block_iconSize_small: 'v-btn--icon-size--small'
          block_iconSize_verySmall: 'v-btn--icon-size--very-small'
          block_iconSize_little: 'v-btn--icon-size--little'
          block__spinner: 'v-btn__spinner'
          block__leftIcon: 'v-btn__left-icon'
          block__leftIcon_active: 'v-btn__left-icon--active'
          block__leftIcon_hasStroke: 'v-btn__left-icon--has-stroke'
          block__leftIcon_rightSpan_big: 'v-btn__left-icon--right-span--big'
          block__leftIcon_rightSpan_veryBig: 'v-btn__left-icon--right-span--very-big'
          block__leftIcon_rightSpan_huge: 'v-btn__left-icon--right-span--huge'
        }
      >
    >

    expect(bem).toMatchInlineSnapshot(`
      {
        "block": "v-btn",
        "block__leftIcon": "v-btn__left-icon",
        "block__leftIcon_active": "v-btn__left-icon--active",
        "block__leftIcon_hasStroke": "v-btn__left-icon--has-stroke",
        "block__leftIcon_rightSpan_big": "v-btn__left-icon--right-span--big",
        "block__leftIcon_rightSpan_veryBig": "v-btn__left-icon--right-span--very-big",
        "block__spinner": "v-btn__spinner",
        "block_iconSize_small": "v-btn--icon-size--small",
        "block_iconSize_verySmall": "v-btn--icon-size--very-small",
        "block_loading": "v-btn--loading",
        "block_showIcon": "v-btn--show-icon",
      }
    `)
  })
})
