# @soramitsu-ui/ui

## 0.6.1

### Patch Changes

- 4f3fdcd: **fix**: fix icon components that aren't built as Vue components, close #429
- 80856f7: **fix**: (`SAccordionItem`) workaround #433 by using `modelValue` directly

## 0.6.0

### Minor Changes

- c592754: **feat**: make library tree-shakeable, e.g. free from side-effects!
- 4c18cbd: **build** (BREAKING): rename build files from `lib.esm.js` & `lib.cjs.js` to `lib.mjs` & `lib.cjs` relatively.

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

- 65e40b8: **feat**: add Transitions component (`SCollapse`)
- 65e40b8: **feat**: add Menu components (`SNavigationMenu`, `SNavigationSubmenu`, `SNavigationMenuItem`, `SNavigationMenuItemBody`)
- c592754: **BREAKING**(`SModal`): drop opinionated usage of `body-scroll-lock`, provide an unopinionated solution.

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

- c592754: **BREAKING**: change exported enums format.

  **What is the change.** Previously enums was defined as plain TypeScript enums:

  ```ts
  enum Status {
    Info = 'info',
  }
  ```

  Now we define enums as follows:

  ```ts
  const Status = {
    Info: 'info',
  } as const

  type Status = typeof Status[keyof typeof Status]
  ```

  **Why the change was made:** it turned out that TypeScript enums are not tree-shakeable because they are compiled into IIFE.

  **How to migrate** - you don't need to do anything except of some cases:

  - If you use some enum variant as a type, e.g.

    ```ts
    function acceptOnlyInfo(status: Status.Info) {}
    ```

    then you should add `typeof`:

    ```ts
    function acceptOnlyInfo(status: typeof Status.Info) {}
    ```

- c44463d: **refactor** (BREAKING): `STextField` - add default "model value strict synchronization" behaviour and `no-model-value-strict-sync` prop to disable it.

  Now `STextField` has a default `strict-sync` behaviour. It is useful when you need to filter `modelValue` e.g. to allow only numeric input.

  To understand why this change is made, take a look into this example:

  ```vue
  <script setup>
  const nums = ref('')

  function onInput(e) {
    const newValue = e.target.value

    if (/^\d+$/.test(newValue)) {
      nums.value = newValue
    }
  }
  </script>

  <template>
    <input :value="nums" @input="onInput" />
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

- c592754: **BREAKING**: exclude `SJsonInput` from the library bundle

  **Why.** It has dirty dependencies (`jsoneditor`, `lodash`) which prevented the library from being side-effect-free. Anyway, `SJsonInput` seems to be unused and out of our Design System.

### Patch Changes

- c592754: **refactor**(`SModal`): use `StyleValue` type for style props (`rootStyle`, `modalStyle` etc)

## 0.5.0

### Minor Changes

- b8e7fc6: **feat**: Added ProgressBar component
- 8c4dd8f: **feat**: add Checkbox components (`SCheckboxAtom`, `SCheckboxSolo`)
- 8c4dd8f: **feat**: add Radio components (`SRadioAtom`, `SRadio`, `SRadioGroup`)
- 681200f: **feat**: Add STabsPanel and STab components.

### Patch Changes

- 1611a3a: **refactor**: use consistent `uniqueElementId` everywhere, thus generated IDs will be a bit different

## 0.4.0

### Minor Changes

- 45bd45e: **feat**: add link component
- 6dd0df4: **feat**: Added Badge component
- 49059b7: **feat**: add accordion component

### Patch Changes

- a4ee513: **fix**: STextField: fix show password in input because in form it becomes submit
- 7735926: **fix**: STextField: make root inherit classes and styles instead of input
- 5444756: **fix**: move windicss classes to styles
- cd0a8ea: **fix**: add generated windicss styles to bundle
- d5d3274: **fix**: SButton: fix style selector
- 7c74f0d: **fix**: SModal: use `object` type for `focus-trap` prop so Vue can validate it as an a boolean or object; `Options` typing is lost.
- 4cc17f2: **feat**: improve a11y of SModal & SModalCard components; `SModal` now **must** have a label, but it is automatically generated by SModal and used by SModalCard, thus no any breaking change here.
- 32a5c6f: **refactor**: use the same `nextIncrementalCounter()` utility within SAccordionItem & SModal
- d5d3274: **build**: add test id removing from production build
- e42a546: **fix**: (`STextField`) update password eye - use other icons, remove transition, fix layout

## 0.3.0

### Minor Changes

- b3108d3: **refactor**: `SModalCard`

  - Drop `width` prop - its width now can be configured just as a plain HTML element
  - Add "close" icon button and `close` prop to control it visibility
  - Update appearance, sync it with the design

- 14eead2: **feat**: add button component
- f38b3fb: **feat**: include into the plugin more components (e.g. `SSelect*` internal components)

### Patch Changes

- f38b3fb: **fix**: explicitly define component names
- 6771146: **chore**: update dependencies

## 0.2.0

### Minor Changes

- 7a43636: Add a lot of new components; update dependencies; fixes;
