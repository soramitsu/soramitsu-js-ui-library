<template>
  <el-image
    ref="image"
    class="s-image"
    :src="src"
    :fit="fit"
    :alt="alt"
    :lazy="lazy"
    :scroll-container="scrollContainer"
    :z-ndex="zIndex"
  >
    <s-skeleton v-if="hasSkeleton" slot="placeholder" :animated="animated">
      <template #template>
        <s-skeleton-item :element="SkeletonItemElement.IMAGE" />
      </template>
    </s-skeleton>
  </el-image>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import ElImage from 'element-ui/lib/image'

import { SSkeleton, SSkeletonItem, SkeletonItemElement } from '../../Skeleton'
import { ImageFit } from '../consts'

@Component({
  components: {
    ElImage,
    SSkeleton,
    SSkeletonItem
  }
})
export default class SImage extends Vue {
  /**
   * Image source, same as native, this is required property
   */
  @Prop({ type: String, required: true }) readonly src!: string
  /**
   * Indicate how the image should be resized to fit its container, same as object-fit.
   * Possible values are: `fill` / `contain` / `cover` / `none` / `scale-down`.
   * Default value is ImageFit.NONE.
   */
  @Prop({ default: ImageFit.NONE, type: String }) readonly fit!: string
  /**
   * Native alt
   */
  @Prop({ default: '', type: String }) readonly alt!: string
  /**
   * Whether to use lazy load
   */
  @Prop({ default: false, type: Boolean }) readonly lazy!: boolean
  /**
   * The container to add scroll listener when using lazy load.
   * Posssible value is the nearest parent container whose overflow property is auto or scroll
   */
  @Prop({ type: [String, HTMLElement] }) readonly scrollContainer!: string | HTMLElement
  /**
   * Set image preview z-index
   */
  @Prop({ default: 0, type: Number }) readonly zIndex!: number
  /**
   * Whether image has skeleton
   */
  @Prop({ default: true, type: Boolean }) readonly hasSkeleton!: boolean
  /**
   * Whether skeleton has animation
   */
  @Prop({ default: true, type: Boolean }) readonly animated!: boolean

  readonly SkeletonItemElement = SkeletonItemElement

  @Ref('image') elImage!: any
}
</script>
