---
'@soramitsu-ui/ui': minor
---

**build** (BREAKING): rename build files from `lib.esm.js` & `lib.cjs.js` to `lib.mjs` & `lib.cjs` relatively.

**Motivation**: https://v3.nuxtjs.org/guide/going-further/esm/#what-kinds-of-problems-can-there-be

**How to migrate**: if you use direct imports of library build artifacts, you should update those imports, e.g.:

```ts
// change this
import { Status } from '@soramitsu-ui/ui/dist/lib.esm'
import { Status } from '@soramitsu-ui/ui/dist/lib.cjs'

// to this (no change for cjs btw)
import { Status } from '@soramitsu-ui/ui/dist/lib.mjs'
import { Status } from '@soramitsu-ui/ui/dist/lib.cjs'
```
