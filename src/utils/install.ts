import { VueConstructor } from 'vue'

import { Components, SFCWithInstall } from '../types/components'

export default function (component: Components, instance: SFCWithInstall<any>) {
  return function (vue: VueConstructor) {
    vue.component(component, instance)
  }
}
