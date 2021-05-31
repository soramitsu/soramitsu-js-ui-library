import { Component, Vue, Inject, Prop } from 'vue-property-decorator'
import { DesignSystemProvideKey } from './consts'
import { DesignSystemTypes } from '../../utils/DesignSystem'

@Component
export default class DesignSystemInject extends Vue {
  @Prop({ default: true, type: Boolean }) readonly useDesignSystem!: boolean
  @Inject({ from: DesignSystemProvideKey, default: DesignSystemTypes.DEFAULT }) readonly designSystem!: any

  get designSystemClass (): string {
    return this.useDesignSystem ? this.designSystem.value : ''
  }
}
