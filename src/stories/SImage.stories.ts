import { Meta, Story } from '@storybook/vue'

import { SImage, ImageFit } from '../components/Image'

export default {
  component: SImage,
  title: 'Design System/Components/Image',
  argTypes: {
    src: {
      name: 'Src',
      control: {
        type: 'text'
      },
      defaultValue: 'https://picsum.photos/1024'
    },
    fit: {
      name: 'Fit',
      control: {
        type: 'select',
        options: Object.values(ImageFit)
      },
      defaultValue: ImageFit.NONE
    },
    lazy: {
      name: 'Lazy',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    alt: {
      name: 'Alt',
      control: {
        type: 'text'
      },
      defaultValue: 'Alt text'
    },
    zIndex: {
      name: 'Z-index',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 0
    },
    hasSkeleton: {
      name: 'Has Skeleton',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    animated: {
      name: 'Skeleton has Animation',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    srcList: {
      name: 'Src List',
      control: {
        type: 'object'
      },
      defaultValue: ['https://picsum.photos/1024', 'https://picsum.photos/1024/300']
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SImage },
  props: Object.keys(argTypes),
  template: `
    <s-image
      :src="src"
      :fit="fit"
      :alt="alt"
      :lazy="lazy"
      :src-list="srcList"
      :z-index="zIndex"
      :has-skeleton="hasSkeleton"
      :animated="animated"
      style="height: 300px;"
    />`
})

export const LazyImages: Story = () => ({
  components: { SImage },
  template: `
    <div style="width: 100%; overflow-y: auto; height: 300px;">
      <s-image :src="imageSrc + '?random=1'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=2'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=3'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=4'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=5'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=6'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=7'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=8'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=9'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=10'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=11'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=12'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=13'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=14'" lazy style="height: inherit;" />
      <s-image :src="imageSrc + '?random=15'" lazy style="height: inherit;" />
    </div>`,
  data: () => ({
    imageSrc: 'https://picsum.photos/1024/300'
  })
})

export const FailedImage: Story = () => ({
  components: { SImage },
  template: '<s-image src="\'\'" lazy style="height: 300px;" />'
})
