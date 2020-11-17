<template>
  <el-pagination
    ref="pagination"
    :page-sizes="pageSizes"
    :page-size.sync="pageSizeModel"
    :layout="layout"
    :total="total"
    :small="small"
    :background="background"
    :class="computedClasses"
    :current-page.sync="currentPageModel"
    :popper-class="computedPopperClass"
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
import { Component, Mixins, Prop, Ref, Watch } from 'vue-property-decorator'
import { ElPagination } from 'element-ui/types/pagination'
import cloneDeep from 'lodash/fp/cloneDeep'

import BorderRadiusMixin from '../../mixins/BorderRadiusMixin'

@Component
export default class SPagination extends Mixins(BorderRadiusMixin) {
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

  get computedPopperClass (): string {
    const cssClasses: Array<string> = []
    if (this.popperClass) {
      cssClasses.push(this.popperClass)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses.join(' ')
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses
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
