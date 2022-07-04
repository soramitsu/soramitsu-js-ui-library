import { defineComponent, PropType } from 'vue'
import { useTableApi } from '@/components'
import { nextIncrementalCounter } from '@/util'
import { usePropTypeFilter } from '@/composables/prop-type-filter'
import { TABLE_COLUMN_ALIGN_VALUES, TABLE_COLUMN_TYPE_VALUES } from '@/components/Table/consts'
import {
  ColumnCellValueFormatter,
  ColumnRowSelectableFunc,
  ColumnSortBy,
  ColumnSortOrder,
  TableColumnAlign,
  TableColumnType,
} from '@/components/Table/types'
import { ColumnWidthProps } from './api'

export default defineComponent({
  props: {
    /**
     * column type
     */
    type: {
      type: String as PropType<TableColumnType>,
      default: 'default',
    },
    /**
     * column label (in header)
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * prop name form data row
     */
    prop: {
      type: String,
      default: '',
    },
    /**
     * column width
     */
    width: {
      type: String,
      default: '',
    },
    /**
     * column minimum width. Columns with width has a fixed width, while columns with min-width has a width that is distributed in proportion
     */
    minWidth: {
      type: String,
      default: '80',
    },
    /**
     * whether column can be sorted. Remote sorting can be done by setting
     * this attribute to 'custom' and listening to the sort-change event of Table
     */
    sortable: {
      type: [Boolean, String] as PropType<boolean | 'custom'>,
      default: false,
    },
    /**
     * sorting method, works when sortable is true. Should return a number, just like Array.sort
     */
    sortMethod: {
      type: Function as PropType<<T>(a: T, b: T) => number>,
      default: null,
    },
    /**
     * specify which property to sort by, works when sortable is true and sort-method is undefined.
     * If set to an Array, the column will sequentially sort by the next property if the previous one is equal
     */
    sortBy: {
      type: [String, Function, Array] as PropType<ColumnSortBy>,
      default: null,
    },
    /**
     * the order of the sorting strategies used when sorting the data, works when sortable is true.
     * Accepts an array, as the user clicks on the header, the column is sorted in order of the elements in the array
     */
    sortOrders: {
      type: Array as PropType<ColumnSortOrder[]>,
      default: () => ['ascending', 'descending', null],
    },
    /**
     * function that formats cell content
     */
    formatter: {
      type: Function as PropType<ColumnCellValueFormatter>,
      default: null,
    },
    /**
     * whether to hide extra content and show them in a tooltip when hovering on the cell
     */
    showOverflowTooltip: {
      type: Boolean,
      default: false,
    },
    /**
     * alignment
     */
    align: {
      type: String as PropType<TableColumnAlign>,
      default: 'left',
    },
    /**
     * alignment of the table header. If omitted, the value of the above align attribute will be applied
     */
    headerAlign: {
      type: String as PropType<TableColumnAlign | null>,
      default: null,
    },
    /**
     * class name of cells in the column
     */
    className: {
      type: String,
      default: '',
    },
    /**
     * class name of the label of this column
     */
    labelClassName: {
      type: String,
      default: '',
    },
    /**
     * function that determines if a certain row can be selected, works when type is 'selection'
     */
    selectable: {
      type: Function as PropType<ColumnRowSelectableFunc>,
      default: null,
    },
    /**
     * whether to reserve selection after data refreshing, works when type is 'selection'.
     * Note that row-key is required for this to work
     */
    reserveSelection: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tableApi = useTableApi()
    const slots = useSlots()

    const filterProp = usePropTypeFilter(props)
    const definitelyType = filterProp('type', TABLE_COLUMN_TYPE_VALUES, 'default')
    const definitelyAlign = filterProp('align', TABLE_COLUMN_ALIGN_VALUES, 'left')
    const definitelyHeaderAlign = filterProp('headerAlign', [null, ...TABLE_COLUMN_ALIGN_VALUES], null)

    const widthsPresets: Record<Exclude<TableColumnType, 'default'>, ColumnWidthProps> = {
      selection: {
        width: 52,
        minWidth: 52,
      },
      expand: {
        width: 52,
        minWidth: 52,
      },
    }

    const widthProps = computed(() => {
      if (definitelyType.value !== 'default') {
        return widthsPresets[definitelyType.value]
      }

      return {
        width: parseInt(props.width, 10) || null,
        minWidth: parseInt(props.minWidth, 10) || 80,
      }
    })

    const sortProps = computed(() => {
      return {
        sortable: props.sortable === 'custom' ? ('custom' as const) : Boolean(props.sortable),
        sortMethod: props.sortMethod,
        sortBy: props.sortBy,
        sortOrders: props.sortOrders,
      }
    })

    const api = shallowReactive({
      id: 's-table_column_' + nextIncrementalCounter(),
      type: definitelyType.value,
      cellSlot: slots.default,
      headerSlot: slots.header,
      prop: props.prop,
      label: props.label,
      showOverflowTooltip: props.showOverflowTooltip,
      align: definitelyAlign.value,
      headerAlign: definitelyHeaderAlign.value || definitelyAlign.value,
      className: props.className,
      labelClassName: props.labelClassName,
      formatter: props.formatter,
      selectable: props.selectable,
      reserveSelection: props.reserveSelection,
      ...widthProps.value,
      ...sortProps.value,
    })

    watchEffect(() => {
      api.type = definitelyType.value
      api.cellSlot = slots.default
      api.headerSlot = slots.header
      api.prop = props.prop
      api.label = props.label
      api.showOverflowTooltip = props.showOverflowTooltip
      api.align = definitelyAlign.value
      api.headerAlign = definitelyHeaderAlign.value || definitelyAlign.value
      api.className = props.className
      api.labelClassName = props.labelClassName
      api.formatter = props.formatter
      api.selectable = props.selectable
      api.reserveSelection = props.reserveSelection
      api.width = widthProps.value.width
      api.minWidth = widthProps.value.minWidth
      api.sortable = sortProps.value.sortable
      api.sortMethod = sortProps.value.sortMethod
      api.sortBy = sortProps.value.sortBy
      api.sortOrders = sortProps.value.sortOrders
    })

    tableApi.register(api)

    return () => null
  },
})
