import { withKnobs } from '@storybook/addon-knobs'

import Vue from 'vue'

import { SButton, SDivider } from '../components'

export default {
  title: 'Design System/Components/Messages & Notifications',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SButton, SDivider },
  template: `<div>
               <h4>Alert messages</h4>
               <h5 class="s-code">this.$alert('Message', { title: 'Title', type })</h5>
               <s-divider />
               <div class="s-flex" style="align-items: center;">
                 <s-button v-for="type in types" :key="type + 'Alert'" @click="handleOpenAlert(type)">{{ type || 'default' }}</s-button>
               </div>
               <s-divider />
               <h4>Notifications</h4>
               <h5 class="s-code">this.$notify({ message: 'Message', title: 'Title', type })</h5>
               <s-divider />
               <div class="s-flex" style="align-items: center;">
                 <s-button v-for="type in types" :key="type + 'Notification'" @click="handleOpenNotification(type)">{{ type || 'default' }}</s-button>
               </div>
             </div>`,
  data: () => ({
    types: ['error', 'warning', 'success', 'info', '']
  }),
  methods: {
    handleOpenAlert: (type: string) => {
      Vue.prototype.$alert(`Some ${type} message`, { title: 'Title', type })
    },
    handleOpenNotification: (type: string) => {
      Vue.prototype.$notify({ message: `Some ${type} message`, title: 'Title', type })
    }
  }
})
