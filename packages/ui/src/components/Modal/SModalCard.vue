<script lang="ts">
export default defineComponent({
  name: 'SModalCard',
})
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /**
     * If `title` slot is presented, this value is ignored
     */
    title?: string

    /**
     * @default '300px'
     */
    width?: string
  }>(),
  {
    width: '300px',
  },
)
</script>

<template>
  <div
    class="s-modal-card"
    :style="{ width }"
  >
    <!-- FIXME typography class in Figma is set incorrectly; wait for update and bind it here then -->
    <div class="text-center sora-tpg-h3">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <slot />
  </div>
</template>

<style lang="scss">
@use '@/theme';

$col-surface: theme.token-as-var('sys.color.util.surface');
$shadow: theme.token-as-var('sys.shadow.floating-notification');

.s-modal-card {
  @apply rounded-xl p-6;

  background: $col-surface;
  box-shadow: $shadow;
}
</style>
