import { boolean, number, withKnobs } from '@storybook/addon-knobs'

import { SSkeleton, SSkeletonItem } from '../../components/Skeleton'

export default {
  component: SSkeleton,
  title: 'Design System/Components/Skeleton/SSkeleton',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: {
    SSkeleton,
    SSkeletonItem
  },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-skeleton
                :animated="animated"
                :count="count"
                :loading="loading"
                :rows="2"
                :throttle="throttle"
                style="width: 100%;"
              >
                <template #template>
                  <s-skeleton-item variant="image" />
                  <s-skeleton-item variant="p" />
                  <s-skeleton-item variant="p" />
                </template>
                <template>
                  <img src="https://picsum.photos/150">
                  <p class="p3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p class="p3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </template>
              </s-skeleton>
            </div>`,
  props: {
    animated: {
      default: boolean('Animated', false)
    },
    count: {
      default: number('Count', 1)
    },
    loading: {
      default: boolean('Loading', true)
    },
    rows: {
      default: number('Rows', 4)
    },
    throttle: {
      default: number('Throttle', 0)
    }
  }
})
