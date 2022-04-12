<script lang="ts">
export default { name: 'SAccordion' }
</script>

<script setup lang="ts">
import { AccordionItemApi, AccordionApi, ACCORDION_API_KEY } from './api'
import { provide, Ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    multiple?: boolean
  }>(),
  {
    modelValue: () => [],
    multiple: false,
  },
)

const emit = defineEmits<(event: 'update:modelValue', value: string[]) => void>()
const model = useVModel(props, 'modelValue', emit, { passive: true })

const items: Ref<AccordionItemApi>[] = []
const itemsToOpen = computed(() => {
  return props.multiple || !model.value.length ? model.value : [model.value[0]]
})

watch(
  itemsToOpen,
  () => {
    items.forEach((item) => {
      updateItemState(item.value)
    })
  },
  { immediate: true },
)

function updateItemState(item: AccordionItemApi) {
  if (!item.name) return

  const isItemActive = itemsToOpen.value.includes(item.name)
  item.toggle(isItemActive)
}

function handleSelection(item: AccordionItemApi) {
  if (!props.multiple && item.isActive) {
    items.forEach((x) => {
      if (x.value !== item) x.value.toggle(false)
    })
  }
}

const api: AccordionApi = {
  register(item: Ref<AccordionItemApi>) {
    items.push(item)
    updateItemState(item.value)
    watch(item, handleSelection)
  },
  unregister(item: Ref<AccordionItemApi>) {
    const itemIndex = items.indexOf(item)

    if (itemIndex === -1) return

    items.splice(itemIndex, 1)
  },
}

provide(ACCORDION_API_KEY, api)
</script>

<template>
  <div class="s-accordion">
    <slot />
  </div>
</template>

<style lang="scss">
.s-accordion {
  .s-accordion-item:first-child {
    @apply rounded-t-8px;

    .s-accordion-item__trigger {
      @apply rounded-t-8px;
    }
  }

  .s-accordion-item:last-child {
    @apply rounded-b-8px;
  }
}
</style>
