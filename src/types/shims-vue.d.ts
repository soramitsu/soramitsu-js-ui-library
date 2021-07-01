declare module '*.vue' {
  import Vue, { VueConstructor, PluginFunction } from 'vue'

  type VueConstructorOverride = VueConstructor<Vue> & { install: PluginFunction<any> }

  const _default: VueConstructorOverride

  export default _default
}
