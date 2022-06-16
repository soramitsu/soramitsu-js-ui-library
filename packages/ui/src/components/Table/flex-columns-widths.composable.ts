import { ActionColumnApi, ColumnApi } from '@/components'
import { MaybeElementRef } from '@vueuse/core'

export function useFlexColumns(columns: (ColumnApi | ActionColumnApi)[], table: MaybeElementRef) {
  const tableWidth = ref(0)

  const columnsWidths = computed(() => {
    const baseColumnsWidths = columns.map((col) => col.width ?? col.minWidth)
    const baseColumnsWidthsSum = baseColumnsWidths.reduce((sum, width) => sum + width, 0)
    const freeSpace = tableWidth.value - baseColumnsWidthsSum
    const columnsMinWidthsSum = columns.reduce((sum, col) => sum + (col.width ? 0 : col.minWidth), 0)

    if (freeSpace > 0) {
      return columns.map((col) => {
        if (col.width) return col.width

        return col.minWidth + Math.floor((col.minWidth * freeSpace) / columnsMinWidthsSum)
      })
    }

    return baseColumnsWidths
  })

  const columnsWidthsSum = computed(() => columnsWidths.value.reduce((sum, width) => sum + width, 0))

  useResizeObserver(table, (entries) => {
    tableWidth.value = entries[0].contentRect.width
  })

  return {
    columnsWidths,
    columnsWidthsSum
  }
}
