<script setup lang="ts">
import { ref, onMounted, markRaw } from 'vue'

const SJsonInput = ref<any>(null)

// This components is not SSR-friendly, so it is necessary to import it dynamically
// https://vitepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
onMounted(() => {
  import('@/components/Input').then((x) => {
    SJsonInput.value = markRaw(x.SJsonInput)
  })
})

const value = ref({})
</script>

<template>
  <div class="space-y-2">
    <DemoSection>
      <component
        :is="SJsonInput"
        v-model="value"
      />
    </DemoSection>

    <p>Value:</p>

    <pre class="bg-gray-100 p-4 text-p4">{{ value }}</pre>
  </div>
</template>
