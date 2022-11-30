import { SCollapse, SCollapseItem } from '../../components'
import { BorderTypes } from '../../components/Collapse'

export default {
  component: SCollapse,
  title: 'Design System/Components/Collapse 🟣',
  argTypes: {
    accordion: {
      name: 'Accordion',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    borders: {
      name: 'Borders',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    bordersType: {
      name: 'Borders Type',
      control: {
        type: 'select',
        options: Object.values(BorderTypes)
      },
      defaultValue: BorderTypes.INTERNAL
    }
  }
}

export const configurable = (args, { argTypes }) => ({
  components: { SCollapse, SCollapseItem },
  props: Object.keys(argTypes),
  template: `
  <s-collapse :accordion="accordion" :borders="borders" :borders-type="bordersType" @change="handleChange" style="flex: 1;">
    <s-collapse-item title="Consistency" name="1">
      <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
    </s-collapse-item>
    <s-collapse-item title="Feedback" name="2">
      <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
      <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
    </s-collapse-item>
    <s-collapse-item title="Efficiency" name="3">
      <div>Simplify the process: keep operating process simple and intuitive;</div>
      <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
      <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
    </s-collapse-item>
    <s-collapse-item title="Controllability" name="4">
      <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
      <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
    </s-collapse-item>
  </s-collapse>
  `,
  methods: {
    handleChange: (activeNames: string | number | Array<string | number>) => {
      console.log(activeNames)
    }
  }
})
