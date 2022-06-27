---
'@soramitsu-ui/ui': minor
---

**refactor** (BREAKING): `STextField` - add default "model value strict synchronization" behaviour and `no-model-value-strict-sync` prop to disable it.

Now `STextField` has a default `strict-sync` behaviour. It is useful when you need to filter `modelValue` e.g. to allow only numeric input.

To understand why this change is made, take a look into this example:

```vue
<script setup>
const nums = ref('')

function onInput(e) {
  const newValue = e.target.value;

  if (/^\d+$/.test(newValue)) {
    nums.value = newValue
  }
}
</script>

<template>
  <input :value="nums" @input="onInput">
</template>
```

If you type `123ffa`, your `nums` will be `123`, but input value will be `123ffa`. If you need to **strictly synchronize** `<input>`'s value with `nums`, you need to add the following line at the end of `onInput`:

```ts
e.target.value = nums.value
```

Now `STextField` does it by default, and you can prevent it with a new prop:

```vue
<template>
  <STextField no-model-value-strict-sync />
</template>
```
