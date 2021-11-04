<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div>
    {{ label }}
  </div>
</template>
