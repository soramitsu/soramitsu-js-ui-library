import { Ref } from 'vue'
import { ColumnApi } from '@/components'
import { ColumnSortOrder, TableRow } from '@/components/Table/types'
import get from 'lodash/get'

export function useColumnSort(data: Ref<TableRow[]>) {
  const sortStates = reactive(new Map<ColumnApi, ColumnSortOrder>())
  let sortedData: Ref<TableRow[]> = ref(data.value)

  watch(data, () => {
    sortedData.value = data.value
  })

  function toggleOrder(column: ColumnApi, order: ColumnSortOrder) {
    const index = column.sortOrders.indexOf(order)
    return column.sortOrders[(index + 1) % column.sortOrders.length]
  }

  function getKey(column: ColumnApi, { value, index }: { value: TableRow; index: number }) {
    if (!column.sortBy) {
      return [get(value, column.prop)]
    }

    let sortByArray = Array.isArray(column.sortBy) ? column.sortBy : [column.sortBy]

    return sortByArray.map((by) => {
      if (typeof by === 'string') {
        return get(value, by)
      }

      return by(value, index)
    })
  }

  function compareByKey<T extends { key: any[] }>(a: T, b: T) {
    for (let i = 0; i < a.key.length; i++) {
      if (a.key[i] < b.key[i]) {
        return -1
      }

      if (a.key[i] > b.key[i]) {
        return 1
      }
    }

    return 0
  }

  function sortData(order: ColumnSortOrder, column: ColumnApi) {
    if (column.sortable === 'custom') {
      return
    }

    if (order === null) {
      sortedData.value = data.value

      return
    }

    const orderModifier = order === 'ascending' ? 1 : -1

    if (column.sortMethod) {
      sortedData.value = [...data.value].sort((a, b) => orderModifier * column.sortMethod(a, b))

      return
    }

    sortedData.value = data.value
      .map((value, index) => ({ value, key: getKey(column, { value, index }) }))
      .sort((a, b) => orderModifier * compareByKey(a, b))
      .map((x) => x.value)
  }

  function handleSortChange(column: ColumnApi) {
    const order = sortStates.get(column)

    if (!column.sortable || order === undefined) {
      return
    }

    const newOrder = toggleOrder(column, order)
    sortStates.set(column, newOrder)
    sortData(newOrder, column)

    return newOrder
  }

  return {
    sortStates,
    sortedData,
    handleSortChange,
  }
}
