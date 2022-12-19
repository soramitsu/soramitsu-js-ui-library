<script setup lang="ts">
import { SCheckboxAtom, CheckboxState } from '@/components'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    checked?: CheckboxState
  }>(),
  {
    disabled: false,
    checked: false,
  },
)

const emit = defineEmits<(event: 'select') => void>()
</script>

<template>
  <div class="s-table-cell-selection h-full flex flex-col justify-center px-16px">
    <SCheckboxAtom
      :class="{ 'cursor-pointer': !disabled }"
      size="xl"
      data-testid="table-selection-checkbox"
      :tabindex="disabled ? -1 : 0"
      :checked="checked"
      :disabled="disabled"
      @click.stop="disabled || emit('select')"
      @keypress.space="disabled || emit('select')"
    />
  </div>
</template>
