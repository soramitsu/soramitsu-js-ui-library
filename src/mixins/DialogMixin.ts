import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class DialogMixin extends Vue {
  /**
   * Dialog visibility
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false, required: true }) readonly visible!: boolean

  isVisible = this.visible

  @Watch('visible')
  public handleVisibleChange (value: boolean): void {
    this.isVisible = value
  }

  @Watch('isVisible')
  public handleIsVisibleChange (value: boolean): void {
    this.$emit('update:visible', value)
  }
}
