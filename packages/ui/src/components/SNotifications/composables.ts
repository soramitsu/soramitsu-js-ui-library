import { Slot, h, unref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import { NOTIFICATIONS_API_KEY } from './api'
import { Status } from '@/types'
import { forceInject } from '@/util'
import SNotificationBody from './SNotificationBody.vue'

export interface ShowNotificationParams {
  title?: MaybeRef<string | undefined | null>
  titleSlot?: Slot
  description?: MaybeRef<string | undefined | null>
  descriptionSlot?: Slot
  /**
   * @default Status.Info
   */
  status?: MaybeRef<Status>
  /**
   * @default 5000
   */
  timeout?: MaybeRef<number | undefined>
  /**
   * @default false
   */
  showCloseBtn?: MaybeRef<boolean>
}

export interface ShowNotificationReturn {
  close: () => void
}

export interface UseNotificationsReturn {
  show: (params: ShowNotificationParams) => ShowNotificationReturn
}

export function useNotifications(): UseNotificationsReturn {
  const toasts = forceInject(NOTIFICATIONS_API_KEY)

  return {
    show: (params) => {
      function onClickClose() {
        unreg()
      }

      function onTimeout() {
        unreg()
      }

      const unreg = toasts.register({
        slot: () =>
          h(
            SNotificationBody,
            {
              title: unref(params.title),
              description: unref(params.description),
              status: unref(params.status),
              timeout: unref(params.timeout) ?? 5000,
              showCloseBtn: unref(params.showCloseBtn),
              'onClick:close': onClickClose,
              onTimeout,
            },
            {
              title: params.titleSlot,
              description: params.descriptionSlot,
            },
          ),
      })

      return {
        close: unreg,
      }
    },
  }
}
