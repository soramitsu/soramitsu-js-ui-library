<template>
  <el-pagination
    ref="pagination"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next"
    :total="400"
  >
  </el-pagination>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { ElPagination } from 'element-ui/types/pagination'
import cloneDeep from 'lodash/fp/cloneDeep'

@Component
export default class SPagination extends Vue {
  /**
   * Divider direction property. Can be `"horizontal"` or `"vertical"`.
   *
   * By default it's set to `"horizontal"`
   */
  @Prop({ default: '', type: String }) readonly direction!: string
  /**
   * Position of the content. Can be `"left"`, `"right"` or `"center"`.
   *
   * By default it's set to `"center"`
   */
  @Prop({ default: '', type: String }) readonly contentPosition!: string

  @Ref('pagination') pagination!: ElPagination

  private getChildItemsArray (): Array<Node> {
    return Array.from(this.pagination.$el.childNodes)
  }

  mounted (): void {
    const [total, itemsPerPage, prevButton, pages, nextButton] = this.getChildItemsArray()
    console.log(itemsPerPage)
    total.textContent = '1—10 of 400'
    const itemsPerPageText = document.createElement('span')
    itemsPerPageText.textContent = 'Rows per page'
    itemsPerPageText.classList.add('per-page-text')
    this.pagination.$el.insertBefore(itemsPerPageText, itemsPerPage)
    this.pagination.$el.replaceChild(pages, prevButton)
    this.pagination.$el.replaceChild(prevButton, nextButton)
    this.pagination.$el.appendChild(nextButton)
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
}
</style>
