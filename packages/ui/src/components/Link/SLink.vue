<script lang="ts">
export default defineComponent({name: 'SLink'})
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { usePropTypeFilter } from '@/composables/prop-type-filter'
import { IconBasicExternalLink24, IconStatusInfo } from '../icons'
import { LINK_ICON_POSITION_VALUES, LINK_TYPE_VALUES } from './consts'
import { LinkIconPosition, LinkType } from './types'

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


const definitelyType = usePropTypeFilter(() => props.type, LINK_TYPE_VALUES, 'link')
const definitelyIconPosition = usePropTypeFilter(() => props.iconPosition, LINK_ICON_POSITION_VALUES, 'right')
const finalTag = computed(() => props.tag || 'a')
</script>

<template>
  <component
    :is="finalTag"
    :class="[
      's-link',
      `s-link_type_${type}`,
      `s-link_icon-position_${iconPosition}`,
      'sora-tpg-p3',
    ]"
  >
    <span>
      <slot />
    </span>
    <template v-if="icon">
      <IconBasicExternalLink24
        v-if="type === 'link'"
        class="s-link__icon"
        data-testid="icon"
      />
      <IconStatusInfo
        v-else
        class="s-link__icon"
        data-testid="icon"
      />
    </template>
  </component>
</template>

<style lang="scss">
@use '@/theme';

.s-link {
  @apply cursor-pointer inline-flex items-center text-status-info;
  color: theme.token-as-var('sys.color.status.info');
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
