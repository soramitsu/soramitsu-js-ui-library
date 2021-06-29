import Element, {
  Loading,
  Message,
  MessageBox,
  Notification
} from 'element-ui'

import i18n from '../lang'

const ElementUIPlugin = {
  install: (Vue) => {
    Vue.use(Loading.directive)
    Vue.use(Element, { i18n: (key, value) => i18n.t(key, value) })
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$message = Message
    Vue.prototype.$notify = Notification
  }
}

export default ElementUIPlugin

export {
  Loading,
  MessageBox,
  Message,
  Notification
}
