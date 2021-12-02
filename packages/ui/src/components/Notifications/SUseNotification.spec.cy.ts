import { mount } from '@cypress/vue'
import { ref } from 'vue'
import SNotificationsProvider from './SNotificationsProvider'
import SUseNotification from './SUseNotification'

const findCloseBtn = () => cy.get('[data-testid=close-btn]', {})

it('Notification is controlled by the boolean model', () => {
  mount(
    {
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
    },
    {
      global: {
        components: {
          SNotificationsProvider,
          SUseNotification,
        },
        stubs: {
          'transition-group': false,
        },
      },
    },
  )

  cy.contains('My custom title').should('not.exist')
  cy.get('input').click()
  cy.contains('My custom title').should('exist')
  findCloseBtn().click()
  cy.contains('My custom title').should('not.exist')
  cy.contains('show - false')
})
