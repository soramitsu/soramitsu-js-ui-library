---
'@soramitsu-ui/ui': minor
---

**BREAKING**(`SModal`): drop opinionated usage of `body-scroll-lock`, provide an unopinionated solution.

**What is the change:** there is a new component - `SBodyScrollLockProvider`:

```vue
<script setup>
import { SModal, SBodyScrollLockProvider, BodyScrollLockApi } from '@soramitsu-ui/ui'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

const lockApi: BodyScrollLockApi = {
  lock: (el) => {
    disableBodyScroll(el)
  },
  unlock: (el) => {
    enableBodyScroll(el)
  },
}
</script>

<template>
  <SBodyScrollLockProvider :api="lockApi">
    <!-- Modal uses provided API -->
    <SModal />
  </SBodyScrollLockProvider>
</template>
```

`SModal` prop `lockScroll` now is just a boolean which _reactively_ controls whether it should use provided API (if there is some) or not.

**Why the change was made:** `body-scroll-lock` has little side-effects, thus it is not fully tree-shakeable.

**How to migrate:** if you use `SModal`, you should now use `SBodyScrollLockProvider` if you need to lock the scroll.
