<template>
  <el-skeleton
    class="s-skeleton"
    :animated="animated"
    :count="count"
    :loading="loading"
    :rows="rows"
    :throttle="throttle"
  >
    <slot slot="template" name="template" />
    <slot />
  </el-skeleton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ElSkeleton from 'element-ui/lib/skeleton'
import ElSkeletonItem from 'element-ui/lib/skeleton-item'

@Component({
  components: { ElSkeleton, ElSkeletonItem }
})
export default class SSkeleton extends Vue {
  /**
   * Whether showing the animation
   */
  @Prop({ default: false, type: Boolean }) readonly animated?: boolean
  /**
   * How many fake items to render to the DOM, should have integer value
   */
  @Prop({ default: 1, type: Number }) readonly count?: number
  /**
   * Whether showing the skeleton
   */
  @Prop({ default: true, type: Boolean }) readonly loading?: boolean
  /**
   * Numbers of the row, only useful when no template slot were given, should have integer value
   */
  @Prop({ default: 4, type: Number }) readonly rows?: number
  /**
   * Rendering delay in millseconds, should have integer value
   */
  @Prop({ default: 0, type: Number }) readonly throttle?: number
}
</script>
