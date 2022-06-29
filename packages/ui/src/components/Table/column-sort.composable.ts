import { Ref } from 'vue'
import { ColumnApi } from '@/components'
import { ColumnSortOrder, TableRow } from '@/components/Table/types'
import get from 'lodash/get'

export function useColumnSort(data: Ref<TableRow[]>) {
  const sortState: { column: ColumnApi | null; order: ColumnSortOrder } = shallowReactive({
    column: null,
    order: null,
  })
  let sortedData: Ref<TableRow[]> = ref(data.value)

  function setSortColumn(column: ColumnApi) {
    sortState.column = column
    sortState.order = null
  }

  function getNextOrder(column: ColumnApi, order: ColumnSortOrder) {
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
    if (!column.sortable) {
      return
    }

    if (sortState.column !== column) {
      setSortColumn(column)
    }

    const newOrder = getNextOrder(column, sortState.order)
    sortState.order = newOrder
    sortData(newOrder, column)

    return newOrder
  }

  function sortExplicitly(column: ColumnApi, newOrder: ColumnSortOrder) {
    if (sortState.column !== column) {
      setSortColumn(column)
    }

    sortState.order = newOrder
    sortData(newOrder, column)
  }

  function applyCurrentSort() {
    if (!sortState.column) {
      sortedData.value = data.value

      return
    }

    sortData(sortState.order, sortState.column)
  }

  return {
    sortedData,
    sortState,
    sortExplicitly,
    applyCurrentSort,
    handleSortChange,
    getNextOrder,
  }
}
