import { Vue, Component, Prop } from 'vue-property-decorator'

import { Size } from '../types'

@Component
export default class SizeMixin extends Vue {
  /**
   * Size of component. Possible values: `"big"`, `"medium"`, `"small"`.
   *
   * By default it's set to `"medium"`
   */
  @Prop({ default: Size.MEDIUM }) readonly size!: string

  get isStandardSize (): boolean {
    return (Object.values(Size) as Array<string>).includes(this.size)
  }

  get computedSize (): Size | string {
    if (this.size === Size.BIG || !this.isStandardSize) {
      return ''
    }
    return this.size
  }
}
