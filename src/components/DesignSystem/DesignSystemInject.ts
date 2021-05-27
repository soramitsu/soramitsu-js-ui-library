import { Component, Vue, Inject, Prop } from 'vue-property-decorator'

@Component
export default class DesignSystemInject extends Vue {
  @Prop({ default: true, type: Boolean }) readonly useDesignSystem!: boolean
  @Inject('designSystem') readonly designSystem!: any

  get designSystemClass (): string {
    return this.useDesignSystem ? this.designSystem.value : ''
  }
}
