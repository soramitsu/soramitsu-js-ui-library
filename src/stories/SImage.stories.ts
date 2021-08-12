import { text, boolean, number, select, withKnobs } from '@storybook/addon-knobs'

import { SImage, ImageFit } from '../components/Image'

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
      default: text('Src', 'https://picsum.photos/1024')
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

export const LazyImages = () => ({
  components: { SImage },
  template: `<div style="width: 100%;">
    <s-image :src="imageSrc + '?random=1'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=2'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=3'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=4'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=5'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=6'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=7'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=8'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=9'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=10'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=11'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=12'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=13'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=14'" :lazy="true" :has-skeleton="false" />
    <s-image :src="imageSrc + '?random=15'" :lazy="true" :has-skeleton="false" />
  </div>`,
  data: () => ({
    imageSrc: 'https://picsum.photos/1024'
  })
})
