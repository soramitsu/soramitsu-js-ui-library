import { ActionColumnApi, ColumnApi } from '@/components'
import { Ref } from 'vue'

export function useFlexColumns(columns: (ColumnApi | ActionColumnApi)[], tableWidth: Ref<number>, fit: Ref<boolean>) {
  const columnsWidths = computed(() => {
    const baseColumnsWidths = columns.map((col) => col.width ?? col.minWidth)

    if (fit.value) {
      const baseColumnsWidthsSum = baseColumnsWidths.reduce((sum, width) => sum + width, 0)
      const freeSpace = tableWidth.value - baseColumnsWidthsSum
      const columnsMinWidthsSum = columns.reduce((sum, col) => sum + (col.width ? 0 : col.minWidth), 0)

      if (freeSpace > 0) {
        return columns.map((col) => {
          if (col.width) return col.width

          return col.minWidth + Math.floor((col.minWidth * freeSpace) / columnsMinWidthsSum)
        })
      }
    }

    return baseColumnsWidths
  })

  const columnsWidthsSum = computed(() => columnsWidths.value.reduce((sum, width) => sum + width, 0))

  return {
    columnsWidths,
    columnsWidthsSum,
  }
}
