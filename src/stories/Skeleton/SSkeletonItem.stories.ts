import { select, withKnobs } from '@storybook/addon-knobs'

import { SSkeleton, SSkeletonItem, SkeletonItemVariant } from '../../components/Skeleton'

export default {
  component: SSkeletonItem,
  title: 'Design System/Components/Skeleton/SSkeletonItem',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: {
    SSkeleton,
    SSkeletonItem
  },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-skeleton animated :loading="true" style="width: 100%;">
                <template #template>
                  <s-skeleton-item :variant="variant" />
                </template>
              </s-skeleton>
            </div>`,
  props: {
    variant: {
      default: select('Variant', Object.values(SkeletonItemVariant), SkeletonItemVariant.TEXT)
    }
  }
})
