import { ComputedRef, computed, InjectionKey, inject } from 'vue'

export interface DesignSystemProviderAPI {
  readonly current: DesignSystem
}

export enum DesignSystem {
  Default = 'DEFAULT',
  Neumorphic = 'NEUMORPHIC',
}

export const DESIGN_SYSTEM_KEY: InjectionKey<DesignSystemProviderAPI> = Symbol('Soramitsu UI Design System')

export function useDesignSystem(): ComputedRef<DesignSystem> {
  const api = inject(DESIGN_SYSTEM_KEY)

  return computed(() => api?.current ?? DesignSystem.Default)
}
