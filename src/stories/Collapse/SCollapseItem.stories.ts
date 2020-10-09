import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import { SCollapse, SCollapseItem } from '../../components'

export default {
  component: SCollapseItem,
  title: 'Design System/Components/Collapse/Collapse Item',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SCollapse, SCollapseItem },
  template: `<s-collapse style="flex: 1;">
               <s-collapse-item :title="title" :name="name" :disabled="disabled">
                 <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
                 <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
               </s-collapse-item>
             </s-collapse>`,
  props: {
    title: {
      default: text('Title', 'Consistency')
    },
    name: {
      default: text('Name', '1')
    },
    disabled: {
      default: boolean('Disabled', false)
    }
  }
})
