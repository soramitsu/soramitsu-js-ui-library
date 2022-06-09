import { ActionColumnApi, ColumnApi } from '@/components'
import { MaybeElementRef } from '@vueuse/core'

export function useFlexColumns(columns: (ColumnApi | ActionColumnApi)[], table: MaybeElementRef) {
  const tableWidth = ref(0)

  const columnsWidths = computed(() => {
    const baseColumnsWidths = columns.map((col) => col.width ?? col.minWidth)
    const baseColumnsWidthsSum = baseColumnsWidths.reduce((sum, width) => sum + width, 0)
    const freeSpace = tableWidth.value - baseColumnsWidthsSum

    if (freeSpace > 0) {
      return columns.map((col) => {
        if (col.width) return col.width

        return col.minWidth + Math.floor((col.minWidth * freeSpace) / baseColumnsWidthsSum)
      })
    }

    return baseColumnsWidths
  })

  useResizeObserver(table, (entries) => {
    tableWidth.value = entries[0].contentRect.width
  })

  return {
    columnsWidths,
  }
}
