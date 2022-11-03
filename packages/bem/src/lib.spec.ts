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

    type test = Expect<Equal<typeof bem, { _: 's-table' }>>

    expect(bem).toMatchInlineSnapshot(`
      {
        "_": "s-table",
      }
    `)
  })

  test('Simple block', () => {
    const bem = defineBem('block').elem('elem').build()

    type test = Expect<
      Equal<
        typeof bem,
        {
          _: 'block'
          elem: 'block__elem'
        }
      >
    >

    expect(bem).toMatchInlineSnapshot(`
      {
        "_": "block",
        "elem": "block__elem",
      }
    `)
  })

  test('Complex classic build', () => {
    const bem = complexBem.build()

    type test = Expect<
      Equal<
        typeof bem,
        {
          _: 'v-btn'
          '_icon-size_little': 'v-btn_icon-size_little'
          '_icon-size_small': 'v-btn_icon-size_small'
          '_icon-size_very-small': 'v-btn_icon-size_very-small'
          _iconSize_little: 'v-btn_icon-size_little'
          _iconSize_small: 'v-btn_icon-size_small'
          _iconSize_verySmall: 'v-btn_icon-size_very-small'
          _loading: 'v-btn_loading'
          '_show-icon': 'v-btn_show-icon'
          _showIcon: 'v-btn_show-icon'
          'left-icon': 'v-btn__left-icon'
          'left-icon_active': 'v-btn__left-icon_active'
          'left-icon_has-stroke': 'v-btn__left-icon_has-stroke'
          'left-icon_right-span_big': 'v-btn__left-icon_right-span_big'
          'left-icon_right-span_huge': 'v-btn__left-icon_right-span_huge'
          'left-icon_right-span_very-big': 'v-btn__left-icon_right-span_very-big'
          leftIcon: 'v-btn__left-icon'
          leftIcon_active: 'v-btn__left-icon_active'
          leftIcon_hasStroke: 'v-btn__left-icon_has-stroke'
          leftIcon_rightSpan_big: 'v-btn__left-icon_right-span_big'
          leftIcon_rightSpan_huge: 'v-btn__left-icon_right-span_huge'
          leftIcon_rightSpan_veryBig: 'v-btn__left-icon_right-span_very-big'
          spinner: 'v-btn__spinner'
        }
      >
    >

    expect(bem).toMatchInlineSnapshot(`
      {
        "_": "v-btn",
        "_icon-size_little": "v-btn_icon-size_little",
        "_icon-size_small": "v-btn_icon-size_small",
        "_icon-size_very-small": "v-btn_icon-size_very-small",
        "_iconSize_little": "v-btn_icon-size_little",
        "_iconSize_small": "v-btn_icon-size_small",
        "_iconSize_verySmall": "v-btn_icon-size_very-small",
        "_loading": "v-btn_loading",
        "_show-icon": "v-btn_show-icon",
        "_showIcon": "v-btn_show-icon",
        "left-icon": "v-btn__left-icon",
        "left-icon_active": "v-btn__left-icon_active",
        "left-icon_has-stroke": "v-btn__left-icon_has-stroke",
        "left-icon_right-span_big": "v-btn__left-icon_right-span_big",
        "left-icon_right-span_huge": "v-btn__left-icon_right-span_huge",
        "left-icon_right-span_very-big": "v-btn__left-icon_right-span_very-big",
        "leftIcon": "v-btn__left-icon",
        "leftIcon_active": "v-btn__left-icon_active",
        "leftIcon_hasStroke": "v-btn__left-icon_has-stroke",
        "leftIcon_rightSpan_big": "v-btn__left-icon_right-span_big",
        "leftIcon_rightSpan_huge": "v-btn__left-icon_right-span_huge",
        "leftIcon_rightSpan_veryBig": "v-btn__left-icon_right-span_very-big",
        "spinner": "v-btn__spinner",
      }
    `)
  })

  test('Complex two-dashes build', () => {
    const bem = complexBem.build('two-dashes')

    type test = Expect<
      Equal<
        typeof bem,
        {
          _: 'v-btn'
          '_icon-size_little': 'v-btn--icon-size--little'
          '_icon-size_small': 'v-btn--icon-size--small'
          '_icon-size_very-small': 'v-btn--icon-size--very-small'
          _iconSize_little: 'v-btn--icon-size--little'
          _iconSize_small: 'v-btn--icon-size--small'
          _iconSize_verySmall: 'v-btn--icon-size--very-small'
          _loading: 'v-btn--loading'
          '_show-icon': 'v-btn--show-icon'
          _showIcon: 'v-btn--show-icon'
          'left-icon': 'v-btn__left-icon'
          'left-icon_active': 'v-btn__left-icon--active'
          'left-icon_has-stroke': 'v-btn__left-icon--has-stroke'
          'left-icon_right-span_big': 'v-btn__left-icon--right-span--big'
          'left-icon_right-span_huge': 'v-btn__left-icon--right-span--huge'
          'left-icon_right-span_very-big': 'v-btn__left-icon--right-span--very-big'
          leftIcon: 'v-btn__left-icon'
          leftIcon_active: 'v-btn__left-icon--active'
          leftIcon_hasStroke: 'v-btn__left-icon--has-stroke'
          leftIcon_rightSpan_big: 'v-btn__left-icon--right-span--big'
          leftIcon_rightSpan_huge: 'v-btn__left-icon--right-span--huge'
          leftIcon_rightSpan_veryBig: 'v-btn__left-icon--right-span--very-big'
          spinner: 'v-btn__spinner'
        }
      >
    >

    expect(bem).toMatchInlineSnapshot(`
      {
        "_": "v-btn",
        "_icon-size_little": "v-btn--icon-size--little",
        "_icon-size_small": "v-btn--icon-size--small",
        "_icon-size_very-small": "v-btn--icon-size--very-small",
        "_iconSize_little": "v-btn--icon-size--little",
        "_iconSize_small": "v-btn--icon-size--small",
        "_iconSize_verySmall": "v-btn--icon-size--very-small",
        "_loading": "v-btn--loading",
        "_show-icon": "v-btn--show-icon",
        "_showIcon": "v-btn--show-icon",
        "left-icon": "v-btn__left-icon",
        "left-icon_active": "v-btn__left-icon--active",
        "left-icon_has-stroke": "v-btn__left-icon--has-stroke",
        "left-icon_right-span_big": "v-btn__left-icon--right-span--big",
        "left-icon_right-span_huge": "v-btn__left-icon--right-span--huge",
        "left-icon_right-span_very-big": "v-btn__left-icon--right-span--very-big",
        "leftIcon": "v-btn__left-icon",
        "leftIcon_active": "v-btn__left-icon--active",
        "leftIcon_hasStroke": "v-btn__left-icon--has-stroke",
        "leftIcon_rightSpan_big": "v-btn__left-icon--right-span--big",
        "leftIcon_rightSpan_huge": "v-btn__left-icon--right-span--huge",
        "leftIcon_rightSpan_veryBig": "v-btn__left-icon--right-span--very-big",
        "spinner": "v-btn__spinner",
      }
    `)
  })
})
