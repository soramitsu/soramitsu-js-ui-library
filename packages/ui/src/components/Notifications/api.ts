import { InjectionKey } from 'vue'
import { ToastsApi } from '../Toasts'

export const NOTIFICATIONS_API_KEY: InjectionKey<ToastsApi> = Symbol('NotificationsToastsAPI')
