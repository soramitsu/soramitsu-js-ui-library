import { defineComponent } from 'vue'
import { useTableApi } from '@/components'
import { PropType } from '@vue/runtime-core'
import { nextIncrementalCounter } from '@/util'
import { usePropTypeFilter } from '@/composables/prop-type-filter'
import { TABLE_COLUMN_ALIGN_VALUES, TABLE_COLUMN_TYPE_VALUES } from '@/components/Table/consts'
import { TableColumnAlign, TableColumnType } from '@/components/Table/types'
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
      required: true,
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
    sortMethod: Function as PropType<typeof Array.prototype.sort>,
    /**
     * specify which property to sort by, works when sortable is true and sort-method is undefined.
     * If set to an Array, the column will sequentially sort by the next property if the previous one is equal
     */
    sortBy: [String, Function, Array],
    /**
     * the order of the sorting strategies used when sorting the data, works when sortable is true.
     * Accepts an array, as the user clicks on the header, the column is sorted in order of the elements in the array
     */
    sortOrders: {
      type: Array as PropType<('ascending' | 'descending' | null)[]>,
      default: () => ['ascending', 'descending', null],
    },
    /**
     * whether column width can be resized, works when border of el-table is true
     */
    resizable: {
      type: Boolean,
      default: true,
    },
    /**
     * function that formats cell content
     */
    formatter: Function,
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
      type: String as PropType<'left' | 'center' | 'right'>,
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
    selectable: Function,
    /**
     * whether to reserve selection after data refreshing, works when type is 'selection'.
     * Note that row-key is required for this to work
     */
    reserveSelection: Boolean,
  },
  setup(props) {
    const tableApi = useTableApi()
    const slots = useSlots()
    // =================================

    const columnId = 's-table_column_' + nextIncrementalCounter()

    const filterProp = usePropTypeFilter(props)
    const definitelyType = filterProp('type', TABLE_COLUMN_TYPE_VALUES, 'default')
    const definitelyAlign = filterProp('align', TABLE_COLUMN_ALIGN_VALUES, 'left')
    const definitelyHeaderAlign = filterProp('headerAlign', TABLE_COLUMN_ALIGN_VALUES, 'left')

    // Width
    const cellStarts: Record<Exclude<TableColumnType, 'default'>, ColumnWidthProps> = {
      selection: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
      },
      expand: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
      },
    }

    const widthProps = computed(() => {
      if (definitelyType.value !== 'default') {
        return cellStarts[definitelyType.value]
      }

      const parsedWith = parseInt(props.width, 10)
      const parsedMinWidth = parseInt(props.minWidth, 10)

      return {
        width: parsedWith || null,
        minWidth: parsedMinWidth || 80,
        realWidth: parsedWith || parsedMinWidth || 80,
      }
    })

    tableApi.register({
      cellSlot: slots.default,
      headerSlot: slots.header,
      prop: props.prop,
      label: props.label,
      showOverflowTooltip: props.showOverflowTooltip,
      align: definitelyAlign.value,
      headerAlign: definitelyHeaderAlign.value,
      ...widthProps.value,
    })

    return () => null
  },
})
