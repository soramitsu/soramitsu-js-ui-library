# icons

For now, it contains only old icons exported as raw SVGs. You probably should use a bundler to use this package.

## Usage example

**Vite:**

Setup [vite-svg-loader](https://www.npmjs.com/package/vite-svg-loader) or [`@soramitsu/vite-plugin-svg`](../vite-plugin-svg/README.md) plugin.

**Webpack:**

Setup [@svgv/webpack](https://www.npmjs.com/package/@svgv/webpack) loader.

Import example:

```vue
<script setup>
import ArrowBottomIcon from '@soramitsu-ui/icons/icomoon/arrow-bottom-16.svg'
</script>

<template>
  <ArrowBottomIcon />
</template>
```
