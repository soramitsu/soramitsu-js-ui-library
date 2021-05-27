import { Component, Vue, Inject, Prop } from 'vue-property-decorator'
import { DesignSystemTypes, DesignSystemProvideKey } from './consts'

@Component
export default class DesignSystemInject extends Vue {
  @Prop({ default: true, type: Boolean }) readonly useDesignSystem!: boolean
  @Inject({ from: DesignSystemProvideKey, default: DesignSystemTypes.DEFAULT }) readonly designSystem!: any

  get designSystemClass (): string {
    return this.useDesignSystem ? this.designSystem.value : ''
  }
}
