<script lang="ts">
export default defineComponent({name: 'SLink'})
</script>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import { IconBasicExternalLink24, IconStatusInfo } from '../icons'

const LINK_TYPE_VALUES = ['link', 'hint'] as const
const LINK_ICON_POSITION_VALUES = ['left', 'right'] as const

type LinkType = typeof LINK_TYPE_VALUES[number]
type LinkIconPosition = typeof LINK_ICON_POSITION_VALUES[number]

function usePropTypeFilter<T>(value: T, validValues: readonly T[], defaultValue: T): ComputedRef<T> {
  return computed(() => {
    if (validValues.includes(value)) {
      return value
    }

    return defaultValue
  })
}

const props = withDefaults(
    defineProps<{
      type?: LinkType,
      iconPosition?: LinkIconPosition,
      icon?: boolean,
      tag?: string | object
    }>(),
    {
      type: 'link',
      iconPosition: 'right',
      icon: false,
      tag: 'a'
    },
)


const definitelyType = usePropTypeFilter(props.type, LINK_TYPE_VALUES, 'link')
const definitelyIconPosition = usePropTypeFilter(props.iconPosition, LINK_ICON_POSITION_VALUES, 'right')
const finalTag = computed(() => props.tag || 'a')
</script>

<template>
  <component
    :is="finalTag"
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
      <IconBasicExternalLink24
        v-if="type === 'link'"
        class="s-link__icon"
      />
      <IconStatusInfo
        v-else
        class="s-link__icon"
      />
    </template>
  </component>
</template>

<style lang="scss">
.s-link {
  @apply cursor-pointer inline-flex items-center text-status-info p2;
  $component: &;

  &:hover {
    text-decoration: none;
  }

  &_type {
    &_link {
      text-decoration: underline;
    }

    &_hint {
      text-decoration: underline dotted;
    }
  }

  &_icon-position_left {
    @apply flex-row-reverse;

    #{$component}__icon {
      @apply mr-5px;
    }
  }

  &_icon-position_right {
    @apply flex-row;

    #{$component}__icon {
      @apply ml-5px;
    }
  }

  &__icon {
    fill: currentColor;
    height: calc(1em + 2px);
    width: calc(1em + 2px);
  }
}
</style>
