<template>
  <i v-if="computedClass" :class="computedClass" :style="computedStyles"></i>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { Icons } from './consts'

@Component
export default class SIcon extends Vue {
  /**
   * Size property for Icon component.
   * It should be `number/string` value which will be used as font-size.
   */
  @Prop() readonly size!: number | string
  /**
   * CSS class name from soramitsu-ui-library without prefix, like
   *
   * `"s-icon-refresh"` -> `name="refresh"`.
   *
   * Also, you can use element-ui icons from here: https://element.eleme.io/#/en-US/component/icon
   *
   * For instance: `name="el-icon-plus"`
   */
  @Prop({ type: String, required: true }) readonly name!: string

  get computedClass (): string {
    if (!this.name) {
      return ''
    }
    if (this.name.startsWith('el-icon')) {
      return this.name
    }
    if (!(Object.values(Icons) as Array<string>).includes(this.name)) {
      console.warn(`'${this.name}' was not found`)
      return ''
    }
    return `s-icon-${this.name}`
  }

  get computedStyles () {
    const styles = {} as any
    if (this.size) {
      styles.fontSize = typeof this.size === 'number' ? `${this.size}px` : this.size
    }
    return styles
  }
}
</script>
