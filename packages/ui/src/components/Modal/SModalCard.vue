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
    <div class="s-modal-card__title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <slot />
  </div>
</template>

<style lang="scss">
.s-modal-card {
  @apply bg-utility-surface rounded-xl p-6;

  // TODO add to theme "Floating Notification" shadow
  box-shadow: 0px 68px 80px rgba(24, 24, 29, 0.09), 0px 30.1471px 24.1177px rgba(24, 24, 29, 0.058643),
    0px 12.5216px 10.0172px rgba(24, 24, 29, 0.045), 0px 4.5288px 3.62304px rgba(24, 24, 29, 0.031357);

  &__title {
    @apply text-center;

    // TODO add to typography "Title 2"
    font-family: Sora;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 28px;
  }
}
</style>
