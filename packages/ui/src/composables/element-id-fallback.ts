import { type Ref } from 'vue'
import { uniqueElementId } from '@/util'

export function useElementIdFallback(optional: Ref<undefined | null | string>): Ref<string> {
  let unique: string | undefined

  return computedEager((): string => {
    const opt = optional.value
    if (opt) return opt
    if (!unique) unique = uniqueElementId()
    return unique
  })
}
