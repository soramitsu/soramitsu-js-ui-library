<template>
  <el-dialog
    ref="dialog"
    :visible.sync="model"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :top="computedTop"
    :show-close="showClose"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :class="computedClasses"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnEsc"
    :before-close="handleBeforeClose"
    :center="center"
    @open="handleOpen"
    @close="handleClose"
    @opened="handleAfterOpened"
    @closed="handleAfterClosed"
  >
    <slot slot="title" name="title"></slot>
    <div :key="contentKey">
      <slot></slot>
    </div>
    <slot slot="footer" name="footer"></slot>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch, Ref } from 'vue-property-decorator'
import ElDialog from 'element-ui/lib/dialog'
import elementResizeDetectorMaker from 'element-resize-detector'

import DesignSystemInject from '../DesignSystem/DesignSystemInject'
import BorderRadiusMixin from '../../mixins/BorderRadiusMixin'

@Component({
  components: { ElDialog }
})
export default class SDialog extends Mixins(BorderRadiusMixin, DesignSystemInject) {
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
   * Margin top of the dialog component. Default value is `"auto"`.
   * It means that top margin will be automatically calculated based on dialog height/browser window size.
   *
   * Also, the value of the top property can be **CSS top** property.
   * For instance, `"10%"`, `"200px"`, `"15vh"` etc.
   */
  @Prop({ default: 'auto', type: String }) readonly top!: string
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
   * `beforeClose(closeFn: () => void)`
   */
  @Prop({ type: Function }) readonly beforeClose!: ((closeFn: () => void) => void) | null
  /**
   * Key for dialog content.
   * If you need force rerender of table content (for instance, columns were changed)
   * or something else in the dialog, you should set some condition value here.
   */
  @Prop({ default: '', type: [String, Number] }) readonly contentKey!: string | number

  @Ref('dialog') dialog!: any

  readonly erd = elementResizeDetectorMaker()

  get model (): boolean {
    return this.visible
  }

  set model (value: boolean) {
    this.$emit('update:visible', value)
  }

  computedTop = ''
  shouldNotBeClosed = false

  created (): void {
    this.computedTop = this.top
  }

  @Watch('visible')
  private handlePropChange (value: boolean): void {
    const wrapper = (this.dialog || {}).$el as HTMLElement
    if (!wrapper) {
      return
    }
    const activeDialog = wrapper.children[0]
    if (!activeDialog) {
      return
    }
    if (!value) {
      this.erd.uninstall(wrapper)
      this.erd.uninstall(activeDialog)
      activeDialog.removeEventListener('mouseleave', this.handleCheckCursorPosition)
    } else {
      this.erd.listenTo(wrapper, this.computeTop)
      this.erd.listenTo(activeDialog, this.computeTop)
      activeDialog.addEventListener('mouseleave', this.handleCheckCursorPosition)
    }
  }

  handleCheckCursorPosition (e): void {
    if (e.buttons) { // When was pressed and left
      this.shouldNotBeClosed = true
    }
  }

  handleBeforeClose (closeFn: () => void) {
    if (this.shouldNotBeClosed) {
      this.shouldNotBeClosed = false
      return
    }
    if (this.beforeClose) {
      this.beforeClose(closeFn)
    } else {
      closeFn()
    }
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    if (this.customClass) {
      cssClasses.push(this.customClass)
    }
    return cssClasses
  }

  destroyed (): void {
    if (this.visible) {
      const wrapper = (this.dialog || {}).$el as HTMLElement
      if (!wrapper) {
        return
      }
      const activeDialog = wrapper.children[0]
      if (!activeDialog) {
        return
      }
      this.erd.uninstall(wrapper)
      this.erd.uninstall(activeDialog)
      activeDialog.removeEventListener('mouseleave', this.handleCheckCursorPosition)
    }
  }

  computeTop (): void {
    if (this.top !== 'auto') {
      this.computedTop = this.top
      return
    }
    const wrapper = (this.dialog || {}).$el as HTMLElement
    if (!wrapper || !wrapper.clientHeight) {
      this.computedTop = this.top
      return
    }
    const dialog = wrapper.getElementsByClassName('el-dialog')[0] as HTMLElement
    const top = wrapper.clientHeight - dialog.clientHeight > 0
      ? Math.floor((wrapper.clientHeight - dialog.clientHeight) / 2)
      : 0
    this.computedTop = `${top}px`
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
