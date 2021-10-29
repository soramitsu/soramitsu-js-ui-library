# theme

## Working with CSS Custom Properties

All of them are collected in `ThemeVars` enum. The simplest usage example may look like this:

```vue
<script setup>
import { SButton } from '@soramitsu-ui/ui'
import { ThemeVars } from '@soramitsu-ui/theme'
</script>

<template>
  <div :style="{ [ThemeVars.BrandSoramitsuRed]: 'green' }">
    <SButton> I am green now! </SButton>
  </div>
</template>
```

**But** it is much more convenient to use the WindiCSS preset & plugins.

## Work with WindiCSS

**Preset** with colors / fonts etc (WIP):

```ts
// windi.config.ts
import { windicssPreset } from '@soramitsu-ui/theme'

export default {
  presets: [windicssPreset],
}
```

**Theme plugin**:

```ts
// windi.config.ts
import { windicssPluginTheme, definePartialThemePreset, ThemeVars } from '@soramitsu-ui/theme'

export default {
  plugins: [
    windicssPluginTheme(
      'my',
      definePartialThemePreset({
        [ThemeVars.BrandSoramitsuRed]: 'green',
      }),
    ),
  ],
}
```

```html
<div class="s-theme-my">
  <!-- Here BrandSoramitsuRed is overrided with 'green' -->
</div>
```

**Typography plugin**:

```ts
// windi.config.ts
import { windicssPluginTypography } from '@soramitsu-ui/theme'

export default {
  plugins: [windicssPluginTypography()],
}
```

```html
<div class="s-ty-d1">I am D1 block from Design System</div>
```

## Fonts

Available fonts:

- Sora
- JetBrainsMono

Import them separately:

```js
import '@soramitsu-ui/theme/fonts/Sora/index.css'
// same for other
```

And use in CSS:

```css
h1 {
  font-family: Sora;
}
```

> Or use `font-sora` from WindiCSS preset.
