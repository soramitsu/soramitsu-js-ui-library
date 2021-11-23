import { mount } from '@cypress/vue'
import { useCounter } from '@vueuse/core'
import { ref } from 'vue'
import SNotificationBody from './SNotificationBody.vue'

it('Playground', () => {
  mount(
    {
      setup() {
        const { count, inc } = useCounter()

        return { count, inc }
      },
      template: `
        <button @click="inc()">Count: {{ count }}</button>
        <SNotificationBody :timeout="1000 + 50 * count">
          <template #title>
            Count: {{ count }}
          </template>
        </SNotificationBody>
      `,
    },
    {
      global: {
        stubs: {
          transition: false,
        },
      },
    },
  )
})

it('Timeout works', () => {
  mount({
    components: { SNotificationBody },
    setup() {
      const show = ref(true)

      return { show }
    },
    template: `
      <SNotificationBody
        v-if="show"
        data-cy="item"
        :timeout="50"
        @timeout="show = false"
      />
    `,
  })

  cy.get('[data-cy=item]', { timeout: 0 }).should('exist')

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(50)
  cy.get('[data-cy=item]', { timeout: 0 }).should('not.exist')
})

it('Close btn works', () => {
  mount({
    components: { SNotificationBody },
    setup() {
      const show = ref(true)
      const closeBtn = ref(false)

      return { show, closeBtn }
    },
    template: `
      <input
        v-model="closeBtn"
        type="checkbox"
      >
      <SNotificationBody
        v-if="show"
        data-cy="item"
        :show-close-btn="closeBtn"
        @click:close="show = false"
      />
    `,
  })

  const CLOSE_BTN_SELECTOR = '.s-notification-body__close-wrapper button'

  cy.get(CLOSE_BTN_SELECTOR)
    .should('not.exist')
    .get('input')
    .click()
    .get(CLOSE_BTN_SELECTOR)
    .should('exist')
    .click()
    .get('[data-cy=item]')
    .should('not.exist')
})
