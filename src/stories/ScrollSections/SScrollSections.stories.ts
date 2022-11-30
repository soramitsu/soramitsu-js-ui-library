import StoryRouter from 'storybook-vue-router'

import { SScrollSectionItem, SScrollSections } from '../../components'

export default {
  component: SScrollSections,
  title: 'Design System/Components/Scroll Sections',
  decorators: [StoryRouter({}, { initialEntry: '/' })],
  argTypes: {
    withDivider: {
      name: 'With Divider',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
}

export const defaultUsage = (args, { argTypes }) => ({
  components: { SScrollSections, SScrollSectionItem },
  props: Object.keys(argTypes),
  template: `<s-scroll-sections :router="this.$router" :with-divider="withDivider">
               <s-scroll-section-item
                 v-for="index in 11"
                 :key="index"
                 :section="'section' + index"
                 :title="'Section ' + index"
               >
                 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
               </s-scroll-section-item>
             </s-scroll-sections>`
})
