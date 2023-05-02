import type { SelectOption, SelectOptionGroup } from '@/components'

export function isSelectOptions(
  options: readonly SelectOption[] | readonly SelectOptionGroup[],
): options is readonly SelectOption[] {
  return !options[0] || 'label' in options[0]
}
