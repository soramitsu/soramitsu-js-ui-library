import type { Ref } from 'vue'

interface TableHeightsComposableParams {
  propHeight: Ref<number | string>
  propMaxHeight: Ref<number | string>
  headerHeight: Ref<number>
  tableHeight: Ref<number>
}

export function useTableHeights({
  propHeight,
  propMaxHeight,
  headerHeight,
  tableHeight,
}: TableHeightsComposableParams) {
  function parseHeight(height: string | number) {
    if (typeof height === 'number') {
      return height
    }

    if (/^\d+(?:px)?$/.test(height)) {
      return parseInt(height, 10)
    }

    return height
  }

  const tableHeightStyles = computed(() => {
    const parsedHeight = parseHeight(propHeight.value)
    const parsedMaxHeight = parseHeight(propMaxHeight.value)

    return {
      height: typeof parsedHeight === 'number' ? parsedHeight + 'px' : parsedHeight,
      'max-height': typeof parsedMaxHeight === 'number' ? parsedMaxHeight + 'px' : parsedMaxHeight,
    }
  })

  const bodyHeightStyles = shallowReactive<Pick<CSSStyleDeclaration, 'height' | 'maxHeight'>>({
    height: '',
    maxHeight: '',
  })

  watch(
    [headerHeight, tableHeight, propHeight, propMaxHeight],
    ([header, table, prop, propMax]) => {
      let heightFinal = ''
      if (prop) {
        const bodyHeight = table - header
        heightFinal = bodyHeight ? bodyHeight + 'px' : ''
      }
      bodyHeightStyles.height = heightFinal

      let maxHeightFinal = ''
      if (propMax) {
        const maxHeight = parseHeight(propMax)
        if (typeof maxHeight === 'number') {
          maxHeightFinal = maxHeight - header + 'px'
        }
      }
      bodyHeightStyles.maxHeight = maxHeightFinal
    },
    { immediate: true },
  )

  return {
    tableHeightStyles,
    bodyHeightStyles,
  }
}
