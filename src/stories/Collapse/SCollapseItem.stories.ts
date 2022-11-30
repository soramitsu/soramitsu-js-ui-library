import { SCollapse, SCollapseItem } from '../../components'

export default {
  component: SCollapseItem,
  title: 'Design System/Components/Collapse 🟣/Collapse Item',
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text'
      },
      defaultValue: 'Consistency'
    },
    name: {
      name: 'Name',
      control: {
        type: 'text'
      },
      defaultValue: '1'
    },
    disabled: {
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
}

export const configurable = (args, { argTypes }) => ({
  components: { SCollapse, SCollapseItem },
  props: Object.keys(argTypes),
  template: `<s-collapse style="flex: 1;">
               <s-collapse-item :title="title" :name="name" :disabled="disabled">
                 <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
                 <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
               </s-collapse-item>
             </s-collapse>`
})
