<script setup lang="ts">
import { uniqueElementId } from '@/util'
import type { ParsedOptionGroup } from './types'
import { useSelectApi } from './api'

defineProps<{
  group: ParsedOptionGroup<unknown>
}>()

const labelId = uniqueElementId()

const api = useSelectApi()
</script>

<template>
  <ul
    role="group"
    :aria-labelledby="labelId"
  >
    <li
      :id="labelId"
      role="presentation"
    >
      {{ group.label }}
    </li>

    <slot />
  </ul>
</template>
