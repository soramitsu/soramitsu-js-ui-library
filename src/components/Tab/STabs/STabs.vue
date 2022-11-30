<template>
  <el-tabs
    class="s-tabs"
    v-model="model"
    :class="computedClasses"
    :type="computedType"
    :closable="closable"
    :addable="addable"
    :editable="editable"
    :stretch="stretch"
    :tab-position="computedPosition"
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
import Vue from 'vue'
import { Component, Mixins, ModelSync, Prop } from 'vue-property-decorator'
import ElTabs from 'element-ui/lib/tabs'

import DesignSystemInject from '../../DesignSystem/DesignSystemInject'
import BorderRadiusMixin from '../../../mixins/BorderRadiusMixin'
import { TabsType, TabsPosition } from '../consts'

@Component({
  components: { ElTabs }
})
export default class STabs extends Mixins(BorderRadiusMixin, DesignSystemInject) {
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
  /**
   * Name of the selected tab. Can be used with `v-model`.
   *
   * First value by default
   */
  @ModelSync('value', 'input', { type: String })
  readonly model!: string

  get computedType (): string {
    // neu tabs implemented only with TabsType.ROUNDED type
    if (this.isNeumorphic) return ''
    if (!(Object.values(TabsType) as Array<string>).includes(this.type)) return ''
    if ([TabsType.ROUNDED, TabsType.ACCENT_ROUNDED].includes(this.type)) return ''
    return this.type
  }

  get computedPosition (): string {
    if (this.isNeumorphic && ([TabsPosition.LEFT, TabsPosition.RIGHT] as Array<string>).includes(this.position)) {
      console.warn(`[s-tabs] "${this.position}" position is not available with used design system, "${TabsPosition.TOP}" is used instead`)
      return TabsPosition.TOP
    }

    return this.position
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    // neu tabs implemented only with TabsType.ROUNDED or TabsType.CARD types
    if (this.isNeumorphic || ([TabsType.ROUNDED, TabsType.CARD].includes(this.type) && ([TabsPosition.TOP, TabsPosition.BOTTOM] as Array<string>).includes(this.position))) {
      cssClasses.push(`s-${this.type}`)
    } else if (this.type === TabsType.ACCENT_ROUNDED && ([TabsPosition.TOP, TabsPosition.BOTTOM] as Array<string>).includes(this.position)) {
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
