<template>
  <section :id="section" class="s-scroll-section-item">
    <span v-if="title" class="title">{{ title }}</span>
    <slot v-if="this.$slots.title && !title" name="title"></slot>
    <slot></slot>
    <s-divider v-if="withDivider" style="margin: 20px 0 0 0;"></s-divider>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'

import { SDivider } from '../Divider'

@Component({
  components: { SDivider }
})
export default class SScrollSectionItem extends Vue {
  /**
   * Required section property of scroll section item. It should be unique.
   *
   * For, instance, if you want to go to the `your-url#article`,
   * you should set `section="article"`
   */
  @Prop({ default: '', type: String, required: true }) readonly section!: string
  /**
   * Title of scroll section item. Slot `title` can be used as well
   */
  @Prop({ default: '', type: String }) readonly title!: string
  /**
   * Disabled state of scroll section item for menu.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean

  @Inject({ default: '', from: 'sScrollSections' }) sScrollSections

  get withDivider (): boolean {
    return this.sScrollSections?.withDivider
  }
}
</script>

<style lang="scss">
.s-scroll-section-item {
  padding: 10px 20px;
  &:first-child {
    margin-top: 10px;
  }
  &:last-child {
    margin-bottom: 10px;
    .el-divider.el-divider--horizontal {
      height: 0;
    }
  }
  .title {
    font-weight: bold;
    display: block;
    padding-bottom: 12px;
  }
}
</style>
