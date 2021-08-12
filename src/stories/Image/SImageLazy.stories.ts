import { boolean, withKnobs } from '@storybook/addon-knobs'

import { SImage } from '../../components/Image'

export default {
  component: SImage,
  title: 'Design System/Components/Image/Lazy',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SImage },
  template: `<div style="width: 100%;">
    <s-image :src="imageSrc + '?random=1'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=2'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=3'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=4'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=5'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=6'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=7'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=8'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=9'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=10'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=11'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=12'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=13'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=14'" :lazy="true" :hasSkeleton="false" />
    <s-image :src="imageSrc + '?random=15'" :lazy="true" :hasSkeleton="false" />
  </div>`,
  data: () => ({
    imageSrc: 'https://picsum.photos/1024'
  })
})
