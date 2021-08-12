import { text, boolean, number, select, withKnobs } from '@storybook/addon-knobs'

import { SImage, ImageFit } from '../../components/Image'

export default {
  component: SImage,
  title: 'Design System/Components/Image',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SImage },
  template: `<s-image
    :src="src"
    :fit="fit"
    :alt="alt"
    :lazy="lazy"
    :z-index="zIndex"
    :has-skeleton="hasSkeleton"
    :animated="animated"
  />`,
  props: {
    src: {
      default: text('Src', 'https://picsum.photos/1500')
    },
    fit: {
      default: select('Element', Object.values(ImageFit), ImageFit.NONE)
    },
    lazy: {
      default: boolean('Lazy', true)
    },
    alt: {
      default: text('Alt', '')
    },
    zIndex: {
      default: number('Z-index', 0)
    },
    hasSkeleton: {
      default: boolean('Has Skeleton', true)
    },
    animated: {
      default: boolean('Skeleton has Animation', true)
    }
  }
})
