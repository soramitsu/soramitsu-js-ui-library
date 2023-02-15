---
'@soramitsu-ui/ui': patch
---

**fix**(`STable`): fix WindiCSS utility usage - replace comma with underscore (~~`grid-cols-[min-content,1fr]`~~ `grid-cols-[min-content_1fr]`). Comma caused an error when compiled styles are imported through SCSS.
