<script setup lang="ts">
import { ref } from 'vue'
import { SJsonInput } from '@/components/Input'

const value = ref({})
</script>

<template>
  <div class="space-y-2">
    <DemoSection>
      <SJsonInput v-model="value" />
    </DemoSection>

    <p>Value:</p>

    <pre class="bg-gray-100 p-4 text-p4">{{ value }}</pre>
  </div>
</template>
