declare module '*.vue' {
  import Vue, { VueConstructor } from 'vue'

  type InstallFn = (vue: VueConstructor) => void
  type VueConstructorOverride = VueConstructor<Vue> & { install: InstallFn }

  const _default: VueConstructorOverride
  export default _default
}
