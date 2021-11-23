import { InjectionKey } from 'vue'
import { ToastsApi } from '../SToasts'

export const NOTIFICATIONS_API_KEY: InjectionKey<ToastsApi> = Symbol('NotificationsToastsAPI')
