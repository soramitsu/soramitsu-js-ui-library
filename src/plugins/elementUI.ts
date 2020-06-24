import Vue from 'vue'
import {
  Aside,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Col,
  Container,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  Form,
  FormItem,
  Header,
  Input,
  InputNumber,
  Loading,
  Main,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Notification,
  Option,
  Pagination,
  Radio,
  RadioGroup,
  Row,
  Select,
  Submenu,
  Switch,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  Tooltip,
  Upload
} from 'element-ui'
// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'

Vue.use(Dialog)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Badge)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Loading.directive)
Vue.use(Checkbox)
const MsgBox = MessageBox
Vue.prototype.$prompt = MsgBox.prompt
Vue.prototype.$alert = MsgBox.alert
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
// locale.use(lang) // TODO: it will be used later
