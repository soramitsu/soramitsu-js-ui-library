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

  const bodyHeightStyles = ref({})

  watch(
    [headerHeight, tableHeight],
    (): void => {
      if (propHeight.value) {
        const bodyHeight = tableHeight.value - headerHeight.value

        bodyHeightStyles.value = {
          height: bodyHeight ? bodyHeight + 'px' : '',
        }

        return
      }

      if (propMaxHeight.value) {
        const maxHeight = parseHeight(propMaxHeight.value)

        if (typeof maxHeight === 'number') {
          // FIXME https://github.com/soramitsu/soramitsu-js-ui-library/issues/517
          // @ts-ignore
          return {
            'max-height': maxHeight - headerHeight.value + 'px',
          }
        }
      }
    },
    { immediate: true },
  )

  return {
    tableHeightStyles,
    bodyHeightStyles,
  }
}
