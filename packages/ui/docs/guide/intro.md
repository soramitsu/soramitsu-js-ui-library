# Getting started

## About monorepo

It consists of these packages:

- `@soramitsu-ui/ui` - main lib
- `@soramitsu-ui/theme` - contains theme-related things, decoupled from main lib
- `@soramitsu-ui/icons` - WIP
- `@soramitsu-ui/script-utils` - internal utility library for dev scripts

These names are inner project names and could be changed for publishing.

## `@soramitsu-ui/ui`

Usage of library consists of 2 main parts - **components** and **their theming**.

### Components

Global install:

```ts
import { createApp } from 'vue'
import { plugin } from '@soramitsu-ui/ui'

createApp().use(plugin()).mount('#app')
```

A-la-carte usage:

```vue
<script setup>
import { SJsonInput } from '@soramitsu-ui/ui'
import { ref } from 'vue'

const data = ref({})
</script>

<template>
  <SJsonInput v-model="data" />
</template>
```

### Theming

Read about [`@soramitsu-ui/theme` package](#soramitsu-ui-theme).

## `@soramitsu-ui/theme`

:::info
Variables set and WindiCSS preset are WIP
:::

Theme customisation is available via set of CSS Custom Properties (scroll to the bottom of the section to see them all). Anyway, you have to apply some theme by yourself, and there are a lot of ways to do it.

Use default generated preset:

```ts
// It will apply all default variables to `:root` pseudo-element
import '@soramitsu-ui/dist/themes/default.css'
```

...or use WindiCSS in your project and add theme utility:

```ts
// windi.config.ts
import { defineConfig } from 'windicss/helpers'
import { THEME_DEFAULT, windicssPluginThemeUtility } from '@soramitsu-ui/theme'

export default defineConfig({
  plugins: [windicssPluginThemeUtility('my-default', THEME_DEFAULT)],
})
```

```html
<div class="theme-my-default">
  <!-- CSS variables set applied inside of this element -->
</div>
```

And of course you able to use WindiCSS preset to use these Soramitsu-variables in convenient way:

```ts
// windi.config.ts
import { defineConfig } from 'windicss/helpers'
import { windicssPreset } from '@soramitsu-ui/theme'

export default defineConfig({
  presets: [windicssPreset],
})
```

```html
<div class="text-white bg-status-success p-2">Sora</div>
```

<div class="text-white bg-status-success p-2">Sora</div>

[More about Windi.](https://windicss.org/)

Here is the `packages/theme/src/core.ts` file with defitinion of variables:

<<< @/../../theme/src/core.ts

## `@soramitsu-ui/icons`

WIP
