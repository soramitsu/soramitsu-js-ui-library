<template>
  <el-pagination
    ref="pagination"
    :page-sizes="pageSizes"
    :page-size.sync="pageSizeModel"
    :layout="layout"
    :total="total"
    :small="small"
    :background="background"
    :current-page.sync="currentPageModel"
    :popper-class="popperClass"
    :prev-text="prevText"
    :next-text="nextText"
    :disabled="disabled"
    :hide-on-single-page="hideOnSinglePage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    @prev-click="handlePrevClick"
    @next-click="handleNextClick"
  >
    <slot v-if="willBeSlotEnabled"></slot>
  </el-pagination>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { ElPagination } from 'element-ui/types/pagination'
import cloneDeep from 'lodash/fp/cloneDeep'

@Component
export default class SPagination extends Vue {
  /**
   * Will pagination component be small.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly small!: boolean
  /**
   * Will pagination component buttons have background.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly background!: boolean
  /**
   * Items count of each page. It supports the .sync modifier.
   *
   * By default it's set to `10`
   */
  @Prop({ default: 10, type: Number }) readonly pageSize!: number
  /**
   * Total items count of the pagination component
   */
  @Prop({ type: Number }) readonly total!: number
  /**
   * Current page number. It supports the .sync modifier.
   *
   * By default it's set to `1`
   */
  @Prop({ default: 1, type: Number }) readonly currentPage!: number
  /**
   * Layout of the pagination component, which contains elements separated by comma.
   * It should also be ordered as you want to see these elements. List of available items:
   *
   * `"sizes, prev, pager, next, jumper, total, slot"`
   *
   * By default it's set to `"total, sizes, pager, prev, next"`
   */
  @Prop({ default: 'total, sizes, pager, prev, next', type: String }) readonly layout!: string
  /**
   * A list of available page size (items count per page).
   *
   * By default it's set to `[10, 20, 30, 40, 50, 100]`
   */
  @Prop({ default: () => [10, 20, 30, 40, 50, 100], type: Array }) readonly pageSizes!: Array<number>
  /**
   * Custom class name for the page size Select's dropdown
   */
  @Prop({ default: '', type: String }) readonly popperClass!: string
  /**
   * Styles object for the total element of the pagination component
   */
  @Prop() readonly totalStyle!: object
  /**
   * Styles object for the sizes element of the pagination component
   */
  @Prop() readonly sizesStyle!: object
  /**
   * Text of the previous button
   */
  @Prop({ default: '', type: String }) readonly prevText!: string
  /**
   * Text of the next button
   */
  @Prop({ default: '', type: String }) readonly nextText!: string
  /**
   * Disabled state of the pagination component.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Will it be hidden when there's only one page.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly hideOnSinglePage!: boolean

  @Ref('pagination') pagination!: any

  totalItem!: any
  sizesItem!: any
  sizesLabelItem!: any

  pageSizeModel = this.pageSize
  currentPageModel = this.currentPage

  private initPaginationItems (): void {
    const items = Array.from(this.pagination.$el.childNodes) as Array<any>
    this.totalItem = items.find(item => item.className === 'el-pagination__total')
    this.sizesItem = items.find(item => item.className === 'el-pagination__sizes')
    if (this.totalItem && this.totalStyle) {
      for (const styleProp in this.totalStyle) {
        (this.totalItem as HTMLElement).style[styleProp] = this.totalStyle[styleProp]
      }
    }
    if (this.sizesItem && this.sizesStyle) {
      for (const styleProp in this.sizesStyle) {
        (this.sizesItem as HTMLElement).style[styleProp] = this.sizesStyle[styleProp]
      }
    }
  }

  private renderPaginationItems (): void {
    if (this.totalItem && this.total) {
      const upperNumber = this.pageSizeModel * this.currentPageModel
      this.totalItem.textContent = `${upperNumber - this.pageSizeModel + 1}—${upperNumber > this.total ? this.total : upperNumber} of ${this.total}`
    }
    if (this.sizesItem && !this.sizesLabelItem) {
      const itemsPerPageText = document.createElement('span')
      itemsPerPageText.textContent = 'Rows per page'
      itemsPerPageText.classList.add('per-page-text')
      this.pagination.$el.insertBefore(itemsPerPageText, this.sizesItem)
    }
  }

  @Watch('pageSize')
  private handlePageSizePropChange (value: number): void {
    this.pageSizeModel = value
  }

  @Watch('pageSizeModel')
  private handlePageSizeValueChange (value: number): void {
    this.$emit('update:page-size', value)
  }

  @Watch('currentPage')
  private handleCurrentPagePropChange (value: number): void {
    this.currentPageModel = value
  }

  @Watch('currentPageModel')
  private handleCurrentPageValueChange (value: number): void {
    this.$emit('update:current-page', value)
  }

  get willBeSlotEnabled (): boolean {
    return this.layout.includes('slot')
  }

  mounted (): void {
    this.initPaginationItems()
    this.renderPaginationItems()
    this.sizesLabelItem = (Array.from(this.pagination.$el.childNodes) as Array<any>)
      .find(item => item.className === 'per-page-text')
  }

  updated (): void {
    this.renderPaginationItems()
  }

  handleSizeChange (newSize: number): void {
    this.$emit('size-change', newSize)
  }

  handleCurrentChange (newCurrent: number): void {
    this.$emit('current-change', newCurrent)
  }

  handlePrevClick (newCurrent: number): void {
    this.$emit('prev-click', newCurrent)
  }

  handleNextClick (newCurrent: number): void {
    this.$emit('next-click', newCurrent)
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.el-pagination {
  .btn-prev, .btn-next {
    color: $color-basic-black;
  }
  button:disabled {
    color: $color-neutral-inactive;
  }
  .el-pagination__sizes {
    .el-select .el-input {
      width: 65px;
      .el-select__caret, .el-input__inner {
        color: $color-basic-black;
        font-weight: bold;
      }
      .el-select__caret {
        margin-right: 6px;
      }
      .el-input__inner {
        border-radius: 8px;
        padding-right: 20px;
        padding-left: 5px;
        background-color: $color-neutral-placeholder;
        border-color: $color-neutral-placeholder;
      }
      &.is-disabled {
        .el-select__caret, .el-input__inner {
          color: $color-neutral-inactive;
        }
      }
    }
  }
  .el-pagination__editor.el-input {
    .el-input__inner {
      border-radius: 8px;
      background-color: $color-neutral-placeholder;
      border-color: $color-neutral-placeholder;
      color: $color-basic-black;
    }
    &.is-disabled .el-input__inner {
      color: $color-neutral-inactive;
    }
  }
  .el-pagination__total, .per-page-text, .el-pagination__jump {
    color: $color-neutral-secondary;
    font-weight: normal;
  }
  .el-pager li {
    color: $color-basic-black;
    &.btn-quicknext, &.btn-quickprev {
      color: $color-basic-black;
    }
    &:not(.disabled) {
      &:hover, &.active {
        color: $color-main-brand;
      }
    }
    &.disabled {
      color: $color-neutral-inactive;
    }
  }
  &.is-background {
    .el-pager li {
      background-color: $color-neutral-placeholder;
      &.disabled {
        color: $color-neutral-inactive;
      }
    }
    .btn-prev, .btn-next {
      background-color: $color-neutral-placeholder;
      &:disabled {
        color: $color-neutral-inactive;
        background-color: $color-neutral-placeholder;
      }
      &:not(:disabled):hover {
        color: $color-main-brand;
      }
    }
  }
  &.el-pagination--small {
    .el-pagination__editor {
      height: 22px;
    }
    .el-pagination__sizes .el-select .el-input {
      .el-input__inner {
        height: 22px !important;
        font-size: 12px;
      }
      .el-select__caret {
        font-size: 12px;
        line-height: 23px;
      }
    }
  }
}
</style>
