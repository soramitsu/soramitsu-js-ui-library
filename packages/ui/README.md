# ui

## Usage

All in one:

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
