# ui

## Usage

Styles import:

```ts
import '@soramitsu-ui/ui/styles'
```

All-in-one plugin:

```ts
import { plugin } from '@soramitsu-ui/ui'
import { createApp } from 'vue'

const app = createApp({}).use(plugin())
```

A-la-carte:

```vue
<script setup>
import { SButton } from '@soramitsu-ui/ui'
</script>

<template>
  <SButton>Click</SButton>
</template>
```

## Migration

### SMenu

SMenu components were renamed:

- `SMenu` -> `SNavigationMenu`
- `SSubmenu` -> `SNavigationSubmenu`
- `SMenuItem` -> `SNavigationMenuItem`

`router` property removed:\
There are no need for `router` as it was just call push with selected item `index`.

`index` property in `SMenuItem`(`SNavigationMenuItem`) renamed to `value`.

Toggling `SNavigationSubmenu` doesn't call `SNavigationMenu` `select` event.
