<script lang="ts">
export default { name: 'SAccordion' }
</script>

<script setup lang="ts">
import { AccordionItemApi, AccordionApi, ACCORDION_API_KEY } from './api'
import { provide, Ref, watch } from 'vue'

const props = withDefaults(
    defineProps<{
      modelValue?: (string | number)[],
      multiple?: boolean
    }>(),
    {
      modelValue: () => [],
      multiple: true
    },
)

const emit = defineEmits<(event: 'update:modelValue', value: (string | number)[]) => void>()
const model = useVModel(props, 'modelValue', emit, { passive: true })

const items: Ref<AccordionItemApi>[] = []

watch(model, () => {
  items.forEach(item => {
    const isItemActive = model.value.includes(item.value.name)
    item.value.toggle(isItemActive)
  })
}, { immediate: true })

function handleSelection(item: AccordionItemApi) {
  if (item.isActive) {
    items.forEach(x => {
      if (x.value !== item) x.value.toggle(false)
    })
  }
}

const api: AccordionApi = {
  register(item: Ref<AccordionItemApi>) {
    items.push(item)
    watch(item, handleSelection)
  },
  unregister(item: Ref<AccordionItemApi>) {
    const itemIndex = items.indexOf(item)

    if (itemIndex === -1) return

    items.splice(itemIndex, 1)
  }
}

provide(ACCORDION_API_KEY, api)
</script>

<template>
  <slot />
</template>

<style lang="scss">
.s-accordion {

}
</style>
