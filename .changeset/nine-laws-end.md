---
'@soramitsu-ui/ui': minor
---

**refactor!**(`SSelectBase`): remove `trigger-search` and `dropdown-search` props; don't pass `search` flag into `trigger` and `dropdown` slots

It was made because technically these props were just passed to slots as-is. It could be done in a parent component without interference of `SSelectBase`.
