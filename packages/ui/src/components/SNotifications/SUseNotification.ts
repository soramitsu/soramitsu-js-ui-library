import { h, defineComponent, PropType, onScopeDispose } from 'vue'
import { useVModel } from '@vueuse/core'
import { NotificationType } from './types'
import SNotificationBody from './SNotificationBody.vue'
import { useConditionalScope } from '@/composables/conditional-scope'
import { forceInject } from '@/util'
import { NOTIFICATIONS_API_KEY } from './api'

export default defineComponent({
  name: 'SUseNotification',
  props: {
    show: Boolean,
    title: String,
    type: {
      type: String as PropType<NotificationType>,
      default: NotificationType.Info,
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