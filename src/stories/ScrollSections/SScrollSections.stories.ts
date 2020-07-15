import StoryRouter from 'storybook-vue-router'
import { SScrollSectionItem, SScrollSections } from '../../components'

export default {
  component: SScrollSections,
  title: 'Design System/Scroll Sections',
  decorators: [StoryRouter({}, { initialEntry: '/' })]
}

export const defaultUsage = () => ({
  components: { SScrollSections, SScrollSectionItem },
  template: `<s-scroll-sections :router="this.$router">
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
