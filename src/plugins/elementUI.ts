import Vue from 'vue'

import Element, {
  Loading,
  Message,
  MessageBox,
  Notification
} from 'element-ui'

import i18n from '../lang'

const ElementUIPlugin = {
  install: (vue: typeof Vue) => {
    vue.use(Loading.directive)
    vue.use(Element, { i18n: (key, value) => i18n.t(key, value) })
    vue.prototype.$loading = Loading.service
    vue.prototype.$prompt = MessageBox.prompt
    vue.prototype.$alert = MessageBox.alert
    vue.prototype.$message = Message
    vue.prototype.$notify = Notification
  }
}

export default ElementUIPlugin

export {
  Loading,
  MessageBox,
  Message,
  Notification
}
