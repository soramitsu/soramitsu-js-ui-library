<template>
  <el-button-group :class="computedClasses">
    <slot></slot>
  </el-button-group>
</template>

<script lang="ts">
import { Component, Mixins, Provide } from 'vue-property-decorator'
import ElButtonGroup from 'element-ui/lib/button-group'
import DesignSystemInject from '../../DesignSystem/DesignSystemInject'
import SizeMixin from '../../../mixins/SizeMixin'
import BorderRadiusMixin from '../../../mixins/BorderRadiusMixin'

@Component({
  components: {
    ElButtonGroup
  }
})
export default class SButtonGroup extends Mixins(DesignSystemInject, SizeMixin, BorderRadiusMixin) {
  @Provide('sButtonGroup') sButtonGroup = this

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    if (this.isStandardSize) {
      cssClasses.push(`s-${this.size}`)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses
  }
}
</script>
