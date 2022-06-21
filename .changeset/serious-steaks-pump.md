---
'@soramitsu-ui/ui': minor
---

**BREAKING**: change exported enums format.

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
