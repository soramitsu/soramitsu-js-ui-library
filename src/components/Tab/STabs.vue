<template>
  <el-tabs
    class="s-tabs"
    :class="computedClasses"
    v-model="model"
    :type="computedType"
    :closable="closable"
    :addable="addable"
    :editable="editable"
    :stretch="stretch"
    :tab-position="position"
    :before-leave="beforeLeave"
    @tab-click="handleClick"
    @tab-remove="handleRemove"
    @tab-add="handleAdd"
    @edit="handleEdit"
  >
    <slot></slot>
  </el-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

import { TabsType, TabsPosition } from './consts'

@Component
export default class STabs extends Vue {
  /**
   * Name of the selected tab. Can be used with `v-model`.
   *
   * First value by default
   */
  @Prop({ type: String }) readonly value!: string
  /**
   * Type of tabs. Can be `"card"`/`"border-card"`/`"rounded"` or unset.
   *
   * `"rounded"` works only when position is `"top"` or `"bottom"`
   */
  @Prop({ type: String, default: '' }) readonly type!: string
  /**
   * Will tabs be closable.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly closable!: boolean
  /**
   * Will tabs be added.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly addable!: boolean
  /**
   * Will tabs be closable and added by user.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly editable!: boolean
  /**
   * Will width of tab automatically fits its container.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly stretch!: boolean
  /**
   * Tabs position. Available values: `"top"`/`"bottom"`/`"right"`/`"left"`.
   *
   * `"top"` by default
   */
  @Prop({ type: String, default: TabsPosition.TOP }) readonly position!: string
  /**
   * Hook function before switching tab.
   * If `false` is returned or a `Promise` is returned and then is rejected, switching will be prevented
   */
  @Prop({ type: Function }) readonly beforeLeave!: (activeName: string, oldActiveName: string) => (false | Promise<any>)

  model = this.value

  @Watch('value')
  private handlePropChange (value: string): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: string): void {
    this.$emit('change', value)
  }

  get computedType (): string {
    if (!(Object.values(TabsType) as Array<string>).includes(this.type)) {
      return ''
    }
    return this.type !== TabsType.ROUNDED ? this.type : ''
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.type === TabsType.ROUNDED &&
      ([TabsPosition.TOP, TabsPosition.BOTTOM] as Array<string>).includes(this.position)) {
      cssClasses.push('s-rounded')
    }
    return cssClasses
  }

  handleClick (component: Vue, event: MouseEvent): void {
    this.$emit('click', component, event)
  }

  handleRemove (tabName: string): void {
    this.$emit('remove', tabName)
  }

  handleAdd (): void {
    this.$emit('add')
  }

  handleEdit (tabName: string, action: 'add' | 'remove'): void {
    this.$emit('edit', tabName, action)
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
.s-tabs {
  width: 100%;
  .el-tabs__item {
    font-weight: bold;
    .el-icon-close {
      &:before {
        font-weight: bold;
      }
      &:hover {
        background-color: transparent;
        color: inherit;
      }
    }
    &:not(.is-active) {
      color: $s-color-basic-black;
    }
  }
  .el-tab-pane {
    color: $s-color-basic-black;
  }
  .el-tabs__nav-wrap::after {
    background-color: $s-color-neutral-placeholder;
  }
  .el-tabs--card {
    > .el-tabs__header {
      border-bottom-color: $s-color-neutral-hover;
      .el-tabs__nav {
        border-color: $s-color-neutral-hover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .el-tabs__item {
        border-left-color: $s-color-neutral-hover;
      }
    }
  }
  .el-tabs--border-card {
    border-color: $s-color-neutral-border;
    > .el-tabs__header {
      background-color: $s-color-neutral-placeholder;
      border-bottom-color: $s-color-neutral-border;
    }
  }
  &.s-rounded {
    .el-tabs__header {
      width: fit-content;
    }
    .el-tabs__nav-wrap {
      background-color: $s-color-neutral-placeholder;
      border-radius: 8px;
      height: 32px;
      padding-top: 2px;
      padding-left: 2px;
      padding-right: 2px;
      &::after, .el-tabs__active-bar {
        height: 0;
      }
      .el-tabs__item {
        padding: 0 32px;
        height: 28px;
        line-height: 28px;
        &:nth-child(2), &:last-child {
          padding: 0 32px;
        }
        &.is-active {
          color: $s-color-basic-black;
          background-color: #FFFFFF;
          box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
          border-radius: 8px;
        }
        &:focus.is-focus {
          // TODO: make it more focusable
          box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
