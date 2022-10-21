# @soramitsu-ui/bem

Type-level BEM notation.

## Features

- Statically typed BEM schema
- Less boilerplate - no need to repeat root block name
- Less possibility to make a typo
- Support of classic BEM style (`block__elem_mod-name_mod-key`) and two-dashes (`block__elem--mod-name--mod-key`)

## Example

### Classic style

```ts
const bem = defineBem('v-btn')
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
  .build()

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
```

### Two-dashes style

```ts
const bem = defineBem('v-btn')
  .mod('loading')
  .mod('show-icon')
  .mod('icon-size', ['small', 'very-small'] as const)
  .mod('icon-size', 'little')
  .elem('spinner')
  .elem('left-icon', (el) =>
    el
      //
      .mod('active')
      .mod('has-stroke')
      .mod('right-span', ['big', 'very-big'] as const)
      .mod('right-span', 'huge'),
  )
  .build('two-dashes')

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
```

## Install

```bash
npm i @soramitsu-ui/bem
```
