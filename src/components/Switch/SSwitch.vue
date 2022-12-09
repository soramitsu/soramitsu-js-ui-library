<template>
  <div class="s-switch" :class="computedClasses">
    <el-switch
      v-model="model"
      :active-icon-class="activeIconСlass"
      :inactive-icon-class="inactiveIconСlass"
      :active-text="activeText"
      :inactive-text="inactiveText"
      :active-value="activeValue"
      :inactive-value="inactiveValue"
      :name="name"
      :width="width"
      :disabled="disabled"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import ElSwitch from 'element-ui/lib/switch'

import DesignSystemInject from '../DesignSystem/DesignSystemInject'

@Component({
  components: { ElSwitch }
})
export default class SSwitch extends Mixins(DesignSystemInject) {
  /**
   * Class name of the icon displayed when in on state, overrides active-text
   */
  @Prop({ default: '', type: String }) readonly activeIconСlass!: string
  /**
   * Class name of the icon displayed when in off state, overrides inactive-text
   */
  @Prop({ default: '', type: String }) readonly inactiveIconСlass!: string
  /**
   * Text displayed when in on state
   */
  @Prop({ default: '', type: String }) readonly activeText!: string
  /**
   * Text displayed when in off state
   */
  @Prop({ default: '', type: String }) readonly inactiveText!: string
  /**
   * Switch value when in on state
   */
  @Prop({ default: true }) readonly activeValue!: boolean | string | number
  /**
   * Switch value when in off state
   */
  @Prop({ default: false }) readonly inactiveValue!: boolean | string | number
  /**
   * Input name of switch
   */
  @Prop({ default: '', type: String }) readonly name!: string
  /**
   * Width of switch
   */
  @Prop({ default: 40, type: Number }) readonly width!: number
  /**
   * Whether switch is disabled
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Value of switch
   */
  @Prop({ type: [Boolean, String, Number] }) readonly value!: boolean | string | number

  get model (): boolean | string | number {
    return this.value
  }

  set model (value: boolean | string | number) {
    if (this.value !== value) {
      this.$emit('input', value)
    }
  }

  handleChange (value: boolean | string | number): void {
    this.$emit('change', value)
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    return cssClasses
  }
}
</script>
