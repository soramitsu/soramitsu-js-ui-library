<script setup lang="ts">

// import {InjectData} from './types'

const props = withDefaults(
  defineProps<{
    modelValue: number
  }>(),
  {
    modelValue: 0
  }
)

const emit = defineEmits(['update:modelValue'])

const selectTab = (tab: number) : void => {
            emit("update:modelValue", tab);
        }
const active  = computed(() => props.modelValue);
const tabs = ref<any[]>([]);

const tabState = {
            active,
            tabs,
            selectTab
        };


provide("tabsState", tabState);

</script>
<template>
  <div
    role="tablist"
    class="tabs-panel flex items-center justify-start"
  >
    <slot />
  </div>
</template>
<style lang="scss">



</style>