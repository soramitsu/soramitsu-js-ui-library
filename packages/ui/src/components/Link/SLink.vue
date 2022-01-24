<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SLink',
})
</script>

<script setup lang="ts">
import { IconBasicExternalLink24, IconStatusInfo } from '../icons'

type LinkType = 'link' | 'hint'
type LinkIconPosition = 'left' | 'right'

const props = withDefaults(
    defineProps<{
      type?: LinkType,
      iconPosition?: LinkIconPosition,
      icon?: boolean
    }>(),
    {
      type: 'link',
      iconPosition: 'right',
      icon: false
    },
)
</script>

<template>
  <a
    role="button"
    tabindex="0"
    :class="[
      's-link',
      `s-link_type_${type}`,
      `s-link_icon-position_${iconPosition}`,
    ]"
  >
    <span>
      <slot />
    </span>
    <template v-if="icon">
      <IconBasicExternalLink24 v-if="type === 'link'" />
      <IconStatusInfo v-else />
    </template>
  </a>
</template>

<style lang="scss">
.s-link {
  &_type {
    &_link {
      text-decoration: underline;
    }

    &_hint {
      text-decoration: underline dotted;
    }
  }
}
</style>
