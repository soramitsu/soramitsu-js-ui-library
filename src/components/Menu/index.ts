import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SMenu from './SMenu.vue'
import SMenuItem from './SMenuItem.vue'
import SMenuItemGroup from './SMenuItemGroup.vue'
import SSubmenu from './SSubmenu.vue'
import { MenuMode, MenuTrigger } from './consts'

SMenu.install = function (vue: VueConstructor) {
  vue.component(Components.SMenu, SMenu)
}

SMenuItem.install = function (vue: VueConstructor) {
  vue.component(Components.SMenuItem, SMenuItem)
}

SMenuItemGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SMenuItemGroup, SMenuItemGroup)
}

SMenuItemGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SMenuItemGroup, SMenuItemGroup)
}

export { SMenu, SMenuItem, SMenuItemGroup, SSubmenu, MenuMode, MenuTrigger }
