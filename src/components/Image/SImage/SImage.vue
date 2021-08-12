<template>
  <div class="s-image__container">
    <s-skeleton
      v-if="hasSkeleton"
      :loading="!this.elImage || this.elImage.loading"
      :animated="animated"
    >
      <template #template>
        <s-skeleton-item element="image" />
      </template>
      <template>
        <el-image
          ref="image"
          class="s-image"
          :src="src"
          :fit="fit"
          :alt="alt"
          :lazy="lazy"
          :z-ndex="zIndex"
        />
      </template>
    </s-skeleton>
    <el-image v-else
      ref="image"
      class="s-image"
      :src="src"
      :fit="fit"
      :alt="alt"
      :lazy="lazy"
      :z-ndex="zIndex"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import ElImage from 'element-ui/lib/image'

import { SSkeleton, SSkeletonItem } from '../../Skeleton'
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
   * Image source, same as native
   */
  @Prop({ default: null, type: String }) readonly src!: string | null
  /**
   * Indicate how the image should be resized to fit its container, same as object-fit
   */
  @Prop({ default: ImageFit.NONE, type: String }) readonly fit?: string
  /**
   * Native alt
   */
  @Prop({ default: '', type: String }) readonly alt?: string
  /**
   * Whether to use lazy load
   */
  @Prop({ default: false, type: Boolean }) readonly lazy?: boolean
  /**
   * Set image preview z-index
   */
  @Prop({ default: 0, type: Number }) readonly zIndex?: number
  /**
   * Whether image has skeleton
   */
  @Prop({ default: true, type: Boolean }) readonly hasSkeleton?: boolean
  /**
   * Whether skeleton has animation
   */
  @Prop({ default: true, type: Boolean }) readonly animated?: boolean

  @Ref('image') elImage?: any
}
</script>
