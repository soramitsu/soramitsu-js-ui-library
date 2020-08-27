import Vue from 'vue'
import Element, {
  Loading,
  Message,
  MessageBox as MsgBox,
  Notification
} from 'element-ui'

import i18n from '../lang'

Vue.use(Loading.directive)
Vue.use(Element, { i18n: (key, value) => i18n.t(key, value) })
const MessageBox = MsgBox
Vue.prototype.$loading = Loading.service
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

export {
  Loading,
  MessageBox,
  Message,
  Notification
}
