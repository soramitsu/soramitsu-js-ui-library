<template>
  <el-tabs
    class="s-tabs"
    :class="computedClasses"
    v-model="model"
    :type="computedType"
    :closable="closable"
    :addable="addable"
    :editable="editable"
    :stretch="stretch"
    :tab-position="position"
    :before-leave="beforeLeave"
    @tab-click="handleClick"
    @tab-remove="handleRemove"
    @tab-add="handleAdd"
    @edit="handleEdit"
  >
    <slot></slot>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

import DesignSystemInject from '../../DesignSystem/DesignSystemInject'
import BorderRadiusMixin from '../../../mixins/BorderRadiusMixin'
import { TabsType, TabsPosition } from '../consts'

@Component
export default class STabs extends Mixins(BorderRadiusMixin, DesignSystemInject) {
  /**
   * Name of the selected tab. Can be used with `v-model`.
   *
   * First value by default
   */
  @Prop({ type: String }) readonly value!: string
  /**
   * Type of tabs. Can be `"card"`/`"border-card"`/`"rounded"` or unset.
   *
   * `"rounded"` works only when position is `"top"` or `"bottom"`
   */
  @Prop({ type: String, default: '' }) readonly type!: TabsType
  /**
   * Will tabs be closable.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly closable!: boolean
  /**
   * Will tabs be added.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly addable!: boolean
  /**
   * Will tabs be closable and added by user.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly editable!: boolean
  /**
   * Will width of tab automatically fits its container.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly stretch!: boolean
  /**
   * Tabs position. Available values: `"top"`/`"bottom"`/`"right"`/`"left"`.
   *
   * `"top"` by default
   */
  @Prop({ type: String, default: TabsPosition.TOP }) readonly position!: string
  /**
   * Hook function before switching tab.
   * If `false` is returned or a `Promise` is returned and then is rejected, switching will be prevented
   */
  @Prop({ type: Function }) readonly beforeLeave!: (activeName: string, oldActiveName: string) => (false | Promise<any>)

  model = this.value

  @Watch('value')
  private handlePropChange (value: string): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: string): void {
    this.$emit('change', value)
  }

  get computedType (): string {
    if (!(Object.values(TabsType) as Array<string>).includes(this.type)) return ''
    if ([TabsType.ROUNDED, TabsType.ACCENT_ROUNDED].includes(this.type)) return ''
    return this.type
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    if (this.type === TabsType.ROUNDED &&
      ([TabsPosition.TOP, TabsPosition.BOTTOM] as Array<string>).includes(this.position)) {
      cssClasses.push('s-rounded')
    }
    if (this.type === TabsType.ACCENT_ROUNDED &&
      ([TabsPosition.TOP, TabsPosition.BOTTOM] as Array<string>).includes(this.position)) {
      cssClasses.push('s-accent-rounded')
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses
  }

  handleClick (component: Vue, event: MouseEvent): void {
    this.$emit('click', component, event)
  }

  handleRemove (tabName: string): void {
    this.$emit('remove', tabName)
  }

  handleAdd (): void {
    this.$emit('add')
  }

  handleEdit (tabName: string, action: 'add' | 'remove'): void {
    this.$emit('edit', tabName, action)
  }
}
</script>
