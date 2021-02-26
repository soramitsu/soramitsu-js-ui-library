<template>
  <el-option :value="value" :label="label" :disabled="disabled" class="s-option">
    <slot></slot>
  </el-option>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SOption extends Vue {
  /**
   * Value of the option group
   */
  @Prop({ default: '' }) readonly value!: string | number | object
  /**
   * Label of the option group, same as `value` if omitted
   */
  @Prop({ default: '' }) readonly label!: string | number | object
  /**
   * Disabled state of the option group.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
}
</script>
