---
'@soramitsu-ui/ui': minor
---

**refactor!**(`SSelectBase`, `SSelect`, `SDropdown`): rename `remote-search` prop to `search-external`

That is done because this flag doesn't really enable "remote" or "local" search. It is about whether searching is implemented internally, in the component, or externally.
