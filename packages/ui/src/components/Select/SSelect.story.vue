<script setup lang="ts">
import SSelect from './SSelect.vue'
import { SelectButtonStyle, SelectOptionStyle, SelectSize } from './types'

const OPTIONS: { key: number; label: string; disabled?: boolean }[] = [
  { key: 1, label: 'Mark' },
  { key: 2, label: 'Jane' },
  { key: 3, label: 'Cloc', disabled: true },
  { key: 4, label: 'Rela' },
]

const model = shallowRef()

const state = reactive({
  size: SelectSize.Md,
  multiple: false,
  optionStyle: SelectOptionStyle.Check,
  buttonStyle: SelectButtonStyle.Default,
})

const reverse = (x: unknown) => Object.fromEntries(Object.entries(x).map(([k, v]) => [v, k]))

const sizeOptions = reverse(SelectSize)
const optionStyleOptions = reverse(SelectOptionStyle)
const buttonStyleOptions = reverse(SelectButtonStyle)
</script>

<template>
  <Story>
    <template #controls>
      <HstSelect
        v-model="state.size"
        title="Size"
        :options="sizeOptions"
      />

      <HstSelect
        v-model="state.optionStyle"
        title="Option style"
        :options="optionStyleOptions"
      />

      <HstSelect
        v-model="state.buttonStyle"
        title="Button style"
        :options="buttonStyleOptions"
      />

      <HstCheckbox
        v-model="state.multiple"
        title="Multiple"
      />
    </template>

    <div class="p-4">
      <SSelect
        v-model="model"
        :options="OPTIONS"
        option-get-key="key"
        option-get-disabled="disabled"
        option-get-label="label"
        label="Lorem"
        :size="state.size"
        :multiple="state.multiple"
        :option-style="state.optionStyle"
        :button-style="state.buttonStyle"
      />
    </div>
  </Story>
</template>
