<template>
  <i v-if="computedClass" :class="computedClass" :style="computedStyles" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import last from 'lodash/fp/last'

import { Icons16, Icons24, StatusIcons } from '../consts'

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

  private visible = false

  mounted (): void {
    this.checkVisibility()
  }

  get computedClass (): string {
    if (!this.name) {
      return ''
    }
    if (this.name.startsWith('el-icon')) {
      return this.name
    }
    const is16Size = (Object.values(Icons16) as Array<string>).includes(this.name)
    const is24Size = (Object.values(Icons24) as Array<string>).includes(this.name)
    const isStatusIcon = (Object.values(StatusIcons) as Array<string>).includes(this.name)
    if (!(is16Size || is24Size || isStatusIcon)) {
      console.warn(`'${this.name}' was not found`)
      return ''
    }
    return `s-icon-${this.name}`
  }

  get computedStyles () {
    const styles = {} as any
    if (this.size) {
      styles.fontSize = !isNaN(+this.size) ? `${this.size}px` : this.size
    } else if (this.name.includes('16') || this.name.includes('24')) {
      const words = this.name.split('-')
      styles.fontSize = `${last(words)}px`
    }
    if (!this.visible) {
      styles.color = 'transparent'
    }
    return styles
  }

  private async checkVisibility (): Promise<void> {
    const cssClass = this.computedClass
    if (!cssClass) {
      this.visible = false
      return
    }
    const fonts = (document as any).fonts
    if (!fonts) {
      // Ignore this check if the browser has no support
      this.visible = true
      return
    }
    if (cssClass.startsWith('el-icon')) {
      if (fonts.check('1em element-icons')) {
        this.visible = true
        return
      }
    } else {
      if (fonts.check('1em soramitsu-icons')) {
        this.visible = true
        return
      }
    }
    await new Promise(resolve => setTimeout(resolve, 50))
    await this.checkVisibility()
  }
}
</script>
