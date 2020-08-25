<template>
  <el-dialog
    :visible.sync="model"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :show-close="showClose"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnEsc"
    :before-close="beforeClose"
    :center="center"
    @open="handleOpen"
    @close="handleClose"
    @opened="handleAfterOpened"
    @closed="handleAfterClosed"
  >
    <slot slot="title" name="title"></slot>
    <slot></slot>
    <slot slot="footer" name="footer"></slot>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class SDialog extends Vue {
  /**
   * Visibility of the dialog component.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly visible!: boolean
  /**
   * Title of the dialog component
   */
  @Prop({ default: '', type: String }) readonly title!: string
  /**
   * Width of the dialog component. Default value is `"50%"`.
   *
   * In this context, the value of the width property must match the valid value of the
   * **CSS width** property. For instance, `"auto"`, `"200px"`, `"50%"` etc.
   */
  @Prop({ default: '50%', type: String }) readonly width!: string
  /**
   * Fullscreen mode of the dialog component.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly fullscreen!: boolean
  /**
   * Margin top of the dialog component. Default value is `"30vh"`.
   *
   * In this context, the value of the width property must match the valid value of the
   * **CSS width** property. For instance, `"auto"`, `"200px"`, `"15vh"` etc.
   */
  @Prop({ default: '30vh', type: String }) readonly top!: string
  /**
   * Background dimming state of the dialog component.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly modal!: boolean
  /**
   * Will the modal be appended to body element.
   * If false, the modal will be appended to Dialog's parent element.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly modalAppendToBody!: boolean
  /**
   * Will the dialog component be appended to body.
   * A nested dialog should have this attribute set to `true`.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly appendToBody!: boolean
  /**
   * Disabled state of the scroll for the body while the dialog component is shown.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly lockScroll!: boolean
  /**
   * Custom CSS class for the dialog component
   */
  @Prop({ default: '', type: String }) readonly customClass!: string
  /**
   * Will close button be shown.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly showClose!: boolean
  /**
   * Can the dialog component be closed by clicking on the background mask.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly closeOnClickModal!: boolean
  /**
   * Can the dialog component be closed by clicking on the Escape button.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly closeOnEsc!: boolean
  /**
   * Will dialog header and footer be centered.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly center!: boolean
  /**
   * Will dialog elements be destroyed after closing the dialog.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly destroyOnClose!: boolean
  /**
   * Function that will be called before closing.
   *
   * `(done: boolean) => {}`
   */
  @Prop({ type: Function }) readonly beforeClose!: (done: boolean) => {}

  model = this.visible

  @Watch('visible')
  private handlePropChange (value: boolean): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: boolean): void {
    this.$emit('update:visible', value)
  }

  handleOpen (): void {
    this.$emit('open')
  }

  handleClose (): void {
    this.$emit('close')
  }

  handleAfterOpened (): void {
    this.$emit('after-opened')
  }

  handleAfterClosed (): void {
    this.$emit('after-closed')
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.el-dialog {
  border-radius: 8px;
  .el-dialog__title {
    font-weight: bold;
    font-size: 16px;
    color: $color-basic-black;
  }
  > * {
    word-break: break-word;
  }
}
</style>
