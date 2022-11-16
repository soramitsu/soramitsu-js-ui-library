import { Meta, Story } from '@storybook/vue'

import { SSkeleton, SSkeletonItem } from '../../components/Skeleton'
import { SImage } from '../../components/Image'

export default {
  component: SSkeleton,
  title: 'Design System/Components/Skeleton/Skeleton',
  excludeStories: /.*Data$/,
  argTypes: {
    animated: {
      name: 'Animated',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    count: {
      name: 'Count',
      control: {
        type: 'number',
        min: 1
      },
      defaultValue: 1
    },
    loading: {
      name: 'Loading',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    rows: {
      name: 'Rows',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 2
    },
    throttle: {
      name: 'Throttle',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 0
    },
    src: {
      name: 'Image Src',
      control: {
        type: 'text'
      },
      defaultValue: 'https://picsum.photos/1024'
    },
    lazy: {
      name: 'Image Lazy',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    }
  }
} as Meta

export const Configurable: Story = (args, { argTypes }) => ({
  components: {
    SSkeleton,
    SSkeletonItem,
    SImage
  },
  props: Object.keys(argTypes),
  template: `
    <div class="s-flex" style="flex: 1; flex-direction: column;">
      <s-skeleton
        :animated="animated"
        :count="count"
        :loading="loading"
        :rows="rows"
        :throttle="throttle"
        style="width: 100%;"
      >
        <template #template>
          <s-skeleton-item element="image" />
          <s-skeleton-item element="p" />
          <s-skeleton-item element="p" />
        </template>
        <template>
          <s-image :src="src" :lazy="lazy" :has-skeleton="false" />
          <p class="p3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p class="p3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </template>
      </s-skeleton>
    </div>`
})
