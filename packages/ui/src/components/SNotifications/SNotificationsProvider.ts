import { h, FunctionalComponent } from 'vue'
import { SToastsProvider, SToastsDisplay, ToastDisplayPlacement } from '../SToasts'
import { TOAST_DISPLAY_PLACEMENT_PROP } from '../SToasts/util'
import { NOTIFICATIONS_API_KEY } from './api'

/**
 * @remarks
 * Usage:
 *
 * ```html
 * <SNotificationsProvider>
 *   <!-- use notifications here -->
 * </SNotificationsProvider>
 * ```
 *
 * Btw it is a shortcut for:
 *
 * ```vue
 * <script setup>
 * import { SToastsProvider, SToastsDisplay, NOTIFICATIONS_API_KEY } from '@soramitsu-ui/ui'
 * </script>
 *
 * <template>
 *   <SToastsProvider :api-key="NOTIFICATIONS_API_KEY">
 *     <SToastsDisplay />
 *
 *     <!-- ... -->
 *   </SToastsProvider>
 * </template>
 * ```
 */
const component: FunctionalComponent<{
  placement: ToastDisplayPlacement
  absolute?: boolean
  to?: string
}> = (props, { slots }) =>
  h(
    SToastsProvider,
    {
      apiKey: NOTIFICATIONS_API_KEY,
    },
    {
      default: () => [h(SToastsDisplay as any, props), slots.default?.()],
    },
  )

component.props = {
  placement: TOAST_DISPLAY_PLACEMENT_PROP,
  absolute: Boolean,
  to: String,
}

component.displayName = 'SNotificationsProvider'

export default component
