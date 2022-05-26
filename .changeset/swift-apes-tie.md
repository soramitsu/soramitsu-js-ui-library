---
'@soramitsu-ui/ui': minor
---

**BREAKING**: exclude `SJsonInput` from the library bundle

**Why.** It has dirty dependencies (`jsoneditor`, `lodash`) which prevented the library from being side-effect-free. Anyway, `SJsonInput` seems to be unused and out of our Design System.
