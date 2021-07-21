import { withKnobs, boolean } from '@storybook/addon-knobs'

import { SScrollbar } from '../components'

export default {
  component: SScrollbar,
  title: 'Design System/Components/Scrollbar',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SScrollbar },
  template: `
            <s-scrollbar :native="native" :noresize="noresize" style="background-color: var(--s-color-base-background);">
              <div style="height: 200px;">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
              </div>
            </s-scrollbar>`,
  props: {
    native: {
      default: boolean('Native', false)
    },
    noresize: {
      default: boolean('Noresize', false)
    }
  }
})
