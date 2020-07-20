<template>
  <section :id="section" class="s-scroll-section-item">
    <span v-if="title" class="title">{{ title }}</span>
    <slot v-if="this.$slots.title && !title" name="title"></slot>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
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
}
</script>

<style lang="scss">
.s-scroll-section-item {
  padding: 10px 20px;
  &:first-child {
    margin-top: 10px;
  }
  &:last-child {
    margin-bottom: 120%;
  }
  .title {
    font-weight: bold;
    display: block;
    padding-bottom: 12px;
  }
}
</style>
