import Vue from 'vue'
import { modules, Modules } from '../store'

const SoramitsuUIStorePlugin = {
  install (vue: typeof Vue, options?: any): void {
    // TODO: maybe we'll need error message about storage here
    if (options && options.store) {
      Object.values(Modules).forEach(molude => {
        options.store.registerModule(molude, modules[molude])
      })
    }
  }
}

export default SoramitsuUIStorePlugin
