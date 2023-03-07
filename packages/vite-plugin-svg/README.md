# @soramitsu-ui/vite-plugin-svg

Simplified and **working** version of [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader).

This package is created because of https://github.com/jpkleemans/vite-svg-loader/issues/54

## Install

As a regular NPM package.

## Usage

Install as a Vite plugin:

```ts
// FILE: vite.config.ts

export default {
  plugins: [
    Svg({
      svgo: {}, // pass SVGO options or `false` to disable
    }),
  ],
}
```

Import an SVG as a Vue component:

```vue
<script setup>
import MyIcon from './my-icon.svg'
</script>

<template>
  <MyIcon />
</template>
```
