import type { PropType } from 'vue'
import { h, defineComponent, onScopeDispose } from 'vue'
import { useVModel } from '@vueuse/core'
import { Status } from '@/types'
import SNotificationBody from './SNotificationBody.vue'
import { useConditionalScope } from '@/composables/conditional-scope'
import { forceInject } from '@/util'
import { NOTIFICATIONS_API_KEY } from './api'

export default /* @__PURE__ */ defineComponent({
  name: 'SUseNotification',
  props: {
    show: Boolean,
    title: String,
    status: {
      type: String as PropType<Status>,
      default: Status.Info,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    showCloseBtn: Boolean,
    description: String,
  },
  emits: ['update:show', 'click:close', 'timeout'],
  setup(props, { emit, slots }) {
    const show = useVModel(props, 'show', emit)

    const toasts = forceInject(NOTIFICATIONS_API_KEY)

    function onTimeout() {
      show.value = false
      emit('timeout')
    }

    function onClickClose() {
      show.value = false
      emit('click:close')
    }

    useConditionalScope(show, () => {
      const unreg = toasts.register({
        slot: () => {
          const { show: _show, ...rest } = props
          return h(
            SNotificationBody,
            {
              ...rest,
              'onClick:close': onClickClose,
              onTimeout,
            },
            slots,
          )
        },
      })

      onScopeDispose(unreg)
    })

    return () => null
  },
})
