import { mount } from '@cypress/vue'
import { ref } from 'vue'
import SNotificationsProvider from './SNotificationsProvider'
import SUseNotification from './SUseNotification'

it('Notification is controlled by the boolean model', () => {
  mount({
    components: {
      SNotificationsProvider,
      SUseNotification,
    },
    setup() {
      return {
        show: ref(false),
      }
    },
    template: `
      <SNotificationsProvider placement="bottom-right">
        <input v-model="show" type="checkbox">

        show - {{ show }}

        <SUseNotification v-model:show="show" show-close-btn>
          <template #title>
            My <code>custom</code> title
          </template>
        </SUseNotification>
      </SNotificationsProvider>
    `,
  })

  cy.contains('My custom title').should('not.exist')
  cy.get('input').click()
  cy.contains('My custom title').should('exist')
  // close btn
  cy.get('button').click()
  cy.contains('My custom title').should('not.exist')
  cy.contains('show - false')
})
