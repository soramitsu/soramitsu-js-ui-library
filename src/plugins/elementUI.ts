import Vue from 'vue'

import Loading from 'element-ui/lib/loading'
import Message from 'element-ui/lib/message'
import MessageBox from 'element-ui/lib/message-box'
import Notification from 'element-ui/lib/notification'

import Breadcrumb from 'element-ui/lib/breadcrumb'
import BreadcrumbItem from 'element-ui/lib/breadcrumb-item'
import Button from 'element-ui/lib/button'
import ButtonGroup from 'element-ui/lib/button-group'
import Card from 'element-ui/lib/card'
import Checkbox from 'element-ui/lib/checkbox'
import Collapse from 'element-ui/lib/collapse'
import CollapseItem from 'element-ui/lib/collapse-item'
import DatePicker from 'element-ui/lib/date-picker'
import Dialog from 'element-ui/lib/dialog'
import Divider from 'element-ui/lib/divider'
import Dropdown from 'element-ui/lib/dropdown'
import DropdownMenu from 'element-ui/lib/dropdown-menu'
import DropdownItem from 'element-ui/lib/dropdown-item'
import Form from 'element-ui/lib/form'
import FormItem from 'element-ui/lib/form-item'
import Input from 'element-ui/lib/input'

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

    vue.use(Breadcrumb)
    vue.use(BreadcrumbItem)
    vue.use(Button)
    vue.use(ButtonGroup)
    vue.use(Card)
    vue.use(Checkbox)
    vue.use(Collapse)
    vue.use(CollapseItem)
    vue.use(DatePicker)
    vue.use(Dialog)
    vue.use(Divider)
    vue.use(Dropdown)
    vue.use(DropdownMenu)
    vue.use(DropdownItem)
    vue.use(Form)
    vue.use(FormItem)
    vue.use(Input)
  }
}

export default ElementUIPlugin

export {
  Loading,
  MessageBox,
  Message,
  Notification
}
