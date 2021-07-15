import Vue from 'vue'

import Loading from 'element-ui/lib/loading'
import Message from 'element-ui/lib/message'
import MessageBox from 'element-ui/lib/message-box'
import Notification from 'element-ui/lib/notification'

import ElementLocale from 'element-ui/lib/locale'
import i18n from '../lang'

const ElementUIPlugin = {
  install: (vue: typeof Vue) => {
    ElementLocale.i18n((key, value) => i18n.t(key, value))
    vue.use(Loading.directive)
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
