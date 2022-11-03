# @soramitsu-ui/bem

Type-level [BEM](https://en.bem.info/methodology/naming-convention/) notation.

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
```

## Install

```bash
npm i @soramitsu-ui/bem
```

## Questions

### Why keys are duplicated in both `camelCase` and `kebab-case`?

`camelCase` is used to make access shorter:

```ts
// shorter
bem.leftIcon_active

// longer
bem['left-icon_active']
```

However, in some cases we need access a key dynamically with some value:

```ts
const bem = defineBem('tooltip')
  .mod('position', ['left-bottom', 'right-top'] as const)
  .build()

function getClassByPosition(value: 'left-bottom' | 'right-top') {
  return bem[`_position_${value}`]
}
```

Without preserving the initial case of `position` modifier, we wouldn't be able to implement `getClassByPosition()` so easy.

### Well, mostly I don't need to preserve keys case. How to avoid extra generation?

For now the implementation is naive and not focused on such an optimisation. However, it might be possible to be optimised with `Proxy` and lazy-keys-computation under the hood. But it is a question if it is possible to implement this without even bigger performance overhead.
