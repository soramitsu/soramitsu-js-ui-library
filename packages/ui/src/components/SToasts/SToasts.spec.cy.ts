import SToastsProvider from './SToastsProvider'
import SToastsDisplay from './SToastsDisplay.vue'

import { h, onScopeDispose, defineComponent, ref } from 'vue'
import { mount } from '@cypress/vue'
import { useCounter } from '@vueuse/core'
import { ToastsApi, TOASTS_API_KEY } from './api'
import { forceInject } from '@/util'

const UseToggle = defineComponent({
  setup() {
    const flag = ref(false)
    return { flag }
  },
  template: `
    <input v-model="flag" type="checkbox">
    <slot v-bind="{ value: flag }" />
  `,
})

const Toast = defineComponent({
  props: {
    via: {
      type: [String, Symbol],
      default: TOASTS_API_KEY,
    },
  },
  setup(props, { slots }) {
    const api = forceInject<ToastsApi>(props.via)

    onScopeDispose(
      api.register({
        slot: () => slots.default?.(),
      }),
    )

    return () => null
  },
})

it('Playground', () => {
  mount(
    {
      template: `
        <SToastsProvider>
          <SToastsDisplay placement="top-left" />

            <Toast>
              Here I am
            </Toast>
        </SToastsProvider>
      `,
    },
    {
      global: {
        components: {
          SToastsProvider,
          SToastsDisplay,
          Toast,
          UseToggle,
        },
      },
    },
  )
})

it('Minimal working repr', () => {
  mount(
    {
      template: `
        <SToastsProvider>
          <SToastsDisplay placement="top-right" />

          <UseToggle v-slot="{ value }">
            <Toast v-if="value">
              Here I am
            </Toast>
          </UseToggle>
        </SToastsProvider>
      `,
    },
    {
      global: {
        components: {
          SToastsProvider,
          SToastsDisplay,
          Toast,
          UseToggle,
        },
      },
    },
  )

  cy.contains('Here I am').should('not.exist')

  cy.get('input[type=checkbox]').click()
  cy.contains('Here I am')

  cy.get('input[type=checkbox]').click()
  cy.contains('Here I am').should('not.exist')
})

it('Different nested providers with different displays', () => {
  mount(
    {
      template: `
        <SToastsProvider api-key="notify">
          <SToastsDisplay placement="top-right" />

          <SToastsProvider api-key="message">
            <SToastsDisplay placement="bottom-left" />

            <Toast via="notify">Notification</Toast>
            <Toast via="message">Message</Toast>
          </SToastsProvider>
        </SToastsProvider>
      `,
    },
    {
      global: {
        components: {
          SToastsProvider,
          SToastsDisplay,
          Toast,
        },
      },
    },
  )

  cy.get('.s-toasts-display')
    .should('have.length', 2)
    .first()
    .within(() => {
      cy.contains('Notification')
    })
    .next()
    .contains('Message')
})

it('Multiple providers with multiple displays in the deep', () => {
  mount(
    {
      template: `
        <SToastsProvider api-key="A">
          <SToastsProvider api-key="B">
            <SToastsDisplay api-key="A" placement="top-right" />
            <SToastsDisplay api-key="B" placement="bottom-left" />

            <Toast via="A">ToastA</Toast>
            <Toast via="B">ToastB</Toast>
          </SToastsProvider>
        </SToastsProvider>
      `,
    },
    {
      global: {
        components: {
          SToastsProvider,
          SToastsDisplay,
          Toast,
        },
      },
    },
  )

  cy.get('.s-toasts-display')
    .should('have.length', 2)
    .first()
    .within(() => {
      cy.contains('ToastA')
    })
    .next()
    .contains('ToastB')
})

it('Composed provider', () => {
  mount(
    {
      template: `
        <SToastsProvider :api-key="['A', 'B']">
          <SToastsDisplay placement="top-right" />

          <Toast via="A">ToastA</Toast>
          <Toast via="B">ToastB</Toast>
        </SToastsProvider>
      `,
    },
    {
      global: {
        components: {
          SToastsProvider,
          SToastsDisplay,
          Toast,
        },
      },
    },
  )

  cy.get('.s-toasts-display')
    .children()
    .should('have.length', 2)
    .first()
    .within(() => {
      cy.contains('ToastA')
    })
    .next()
    .contains('ToastB')
})

it("Reactivity in Toast's slot is not broken", () => {
  mount(
    {
      setup() {
        const { count, inc } = useCounter()

        return { count, inc }
      },
      template: `
        <SToastsProvider>
          <SToastsDisplay placement="top" />

          <button @click="inc()">inc</button>

          <Toast>
            Count: {{ count }}
          </Toast>
        </SToastsProvider>
      `,
    },
    {
      global: {
        components: {
          SToastsProvider,
          SToastsDisplay,
          Toast,
        },
      },
    },
  )

  cy.contains('Count: 0')
  cy.contains('inc').click().click().click()
  cy.contains('Count: 3')
})

it('Component in slot keeps its state', () => {
  const Counter = defineComponent({
    setup() {
      const { count, inc } = useCounter()

      return { count, inc }
    },
    template: `<button @click="inc()">Count: {{ count }}</button>`,
  })

  mount({
    setup() {
      return () =>
        h(
          SToastsProvider,
          {},
          {
            default: () => [
              h(SToastsDisplay as any, {
                placement: 'top',
              }),
              h(Counter, { 'data-cy': 'outer' }),
              h(
                Toast,
                {},
                {
                  default: () => h(Counter, { 'data-cy': 'inner' }),
                },
              ),
            ],
          },
        )
    },
  })

  cy.get('[data-cy=inner]')
    .contains('Count: 0')
    .click()
    .click()
    .contains('Count: 2')
    .get('[data-cy=outer]')
    .click()
    .contains('Count: 1')
    .get('[data-cy=inner]')
    .contains('Count: 2')
})
