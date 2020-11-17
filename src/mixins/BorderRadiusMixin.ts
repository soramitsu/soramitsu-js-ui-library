import { Vue, Component, Prop } from 'vue-property-decorator'
import { BorderRadius } from '../types'

@Component
export default class BorderRadiusMixin extends Vue {
  /**
   * Border radius of component. Possible values: `"big"`, `"medium"`, `"small"`, `"mini"`.
   *
   * By default it's set to `"small"`
   */
  @Prop({ default: BorderRadius.SMALL }) borderRadius!: any

  get isStandardBorderRadius (): boolean {
    return (Object.values(BorderRadius) as Array<string>).includes(this.borderRadius)
  }
}
