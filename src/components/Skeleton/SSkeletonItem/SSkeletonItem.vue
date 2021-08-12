<template>
  <el-skeleton-item :variant="variant" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ElSkeletonItem from 'element-ui/lib/skeleton-item'

import { SkeletonItemVariant } from '../consts'

@Component({
  components: { ElSkeletonItem }
})
export default class SSkeletonItem extends Vue {
  /**
   * The current rendering skeleton type.
   * Possible values are: `p` / `text` / `h1` / `h2` / `h3` / `text` / `caption` / `button` / `image` / `circle` / `rect`
   */
  @Prop({ default: SkeletonItemVariant.TEXT, type: String }) readonly variant!: string
}
</script>
