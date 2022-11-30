import { Meta, Story } from '@storybook/vue'

import { SSkeleton, SSkeletonItem, SkeletonItemElement } from '../../components/Skeleton'

export default {
  component: SSkeletonItem,
  title: 'Design System/Components/Skeleton/SkeletonItem',
  excludeStories: /.*Data$/,
  argTypes: {
    animated: {
      name: 'Animated',
      control: {
        type: 'boolean'
      }
    },
    loading: {
      name: 'Loading',
      control: {
        type: 'boolean'
      }
    },
    element: {
      name: 'Element',
      contol: {
        type: 'select',
        options: Object.values(SkeletonItemElement)
      }
    }
  },
  args: {
    element: SkeletonItemElement.TEXT,
    loading: true,
    animated: true
  }
} as Meta

export const Configurable: Story = (args, { argTypes }) => ({
  components: {
    SSkeleton,
    SSkeletonItem
  },
  props: Object.keys(argTypes),
  template: `
    <div class="s-flex" style="flex: 1; flex-direction: column;">
      <s-skeleton :animated="animated" :loading="loading" style="width: 100%;">
        <template #template>
          <s-skeleton-item :element="element" />
        </template>
      </s-skeleton>
    </div>`
})
