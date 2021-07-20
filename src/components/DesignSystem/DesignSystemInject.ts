import { Component, Vue, Inject, Prop } from 'vue-property-decorator'
import { DesignSystemProvideKey } from './consts'
import { DesignSystem } from '../../utils/DesignSystem'

@Component
export default class DesignSystemInject extends Vue {
  @Prop({ default: true, type: Boolean }) readonly useDesignSystem!: boolean
  @Inject({ from: DesignSystemProvideKey, default: DesignSystem.DEFAULT }) readonly designSystem!: any

  get designSystemClass (): string {
    return this.useDesignSystem ? this.designSystem.value : ''
  }
}
