import { defineComponent } from 'vue'
import { useNotifications, SNotificationsProvider } from '@/lib'

describe('useNotifications()', () => {
  it('Composable works, notification is shown', () => {
    const Trigger = defineComponent({
      setup() {
        const { show } = useNotifications()

        function fire() {
          show({
            title: 'Hey!',
            description: 'Per aspera ad astra',
          })
        }

        return { fire }
      },
      template: `
        <button @click="fire">Open notification</button>
      `,
    })

    cy.mount({
      components: {
        SNotificationsProvider,
        Trigger,
      },
      template: `
        <SNotificationsProvider placement="bottom-right">
          <Trigger />
        </SNotificationsProvider>
      `,
    })

    cy.contains('Per aspera ad astra').should('not.exist')
    cy.contains('Open notification').click()
    cy.contains('Per aspera ad astra').should('exist')
  })

  it('Appeared notification closes on timeout')
  it('Appeared notification closes on click on close button')
  it('Appeared notification closes by `close()` callback returned from `show()` trigger')
  it('Notification is still rendered even if its initiator component is unmounted')
})
