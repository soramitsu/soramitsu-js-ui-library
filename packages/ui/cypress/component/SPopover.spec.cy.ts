import { SPopover } from '@/components/Popover'
import { mount } from '@cypress/vue'
import { Instance } from '@popperjs/core'
import { config } from '@vue/test-utils'

before(() => {
  config.global.components = { SPopover }
  config.global.stubs = { transition: false }
})

after(() => {
  config.global.components = {}
  config.global.stubs = {}
})

describe('Trigger mechanisms', () => {
  function mountFactory(params?: { trigger?: 'hover' | 'click' | 'manual'; showDelay?: number; hideDelay?: number }) {
    mount({
      components: {
        // for checking of the state after internal nextTick
        CounterBtn: {
          setup() {
            const { count, inc } = useCounter()

            return { count, inc }
          },
          template: `<button @click="inc()">Count: {{ count }}</button>`,
        },
      },
      setup() {
        const show = ref(false)

        return { params, show }
      },
      template: `
        <div>State: {{ show }}</div>
        <button>Outside btn</button>
        <input v-model="show" type="checkbox">

        <SPopover v-model:show="show" v-bind="params">
          <template #trigger>
            <button>trigger</button>
          </template>

          <template #popper="{ show }">
            <span v-if="show" data-cy="popper">
              <CounterBtn />
            </span>
          </template>
        </SPopover>
      `,
    })
  }

  const findTrigger = () => cy.contains('trigger')
  const findPopper = (params?: { immediate?: boolean }) =>
    cy.get('[data-cy=popper]', {
      timeout: params?.immediate ? 0 : undefined,
    })
  const findPopperCounter = () => findPopper().contains('Count: ')
  const findOutsideBtn = () => cy.contains('Outside btn')
  const findManualCheckbox = () => cy.get('input[type=checkbox]')
  const assertShowState = (state: boolean) => cy.contains(`State: ${state}`)

  it('hover (default)', () => {
    mountFactory()

    findPopper().should('not.exist')
    findTrigger().trigger('mouseenter')
    findPopper().should('exist').trigger('mouseenter')
    findTrigger().trigger('mouseleave')

    // to ensure existence of the popper
    findPopperCounter().click().contains('Count: 1')

    findPopper().trigger('mouseleave').should('not.exist')
  })

  it('click', () => {
    mountFactory({ trigger: 'click' })

    findPopper().should('not.exist')
    findTrigger().click()
    findPopper().should('exist')
    findTrigger().click()
    findPopper().should('not.exist')
  })

  it('click - outside handle', () => {
    mountFactory({ trigger: 'click' })

    findTrigger().click()
    findPopper().should('exist')
    findOutsideBtn().click()
    findPopper().should('not.exist')
  })

  it('click on trigger does not close popper', () => {
    mountFactory({ trigger: 'click' })

    findTrigger().click()
    findPopperCounter().click().contains('Count: 1').click().contains('Count: 2')
  })

  it('manual', () => {
    mountFactory({ trigger: 'manual' })

    findPopper().should('not.exist')

    findManualCheckbox().click()
    findPopper().should('exist')

    // click outside does nothing
    findOutsideBtn().click()
    findPopperCounter().click().contains('Count: 1')

    // click on trigger does nothing
    findTrigger().click()
    findPopperCounter().click().contains('Count: 2')

    // and only checkbox closes popper
    findManualCheckbox().click()
    findPopper().should('not.exist')
  })

  it('show delay (test on click)', () => {
    mountFactory({ trigger: 'click', showDelay: 150 })

    findTrigger().click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50)
    findPopper({ immediate: true }).should('not.exist')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100)
    findPopper().should('exist')
  })

  it('Show delay (test on click) - now shown after double-click', () => {
    mountFactory({ trigger: 'click', showDelay: 150 })

    findTrigger().click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50)
    findTrigger().click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100)
    findPopper({ immediate: true }).should('not.exist')
  })

  it('close delay (test on click)', () => {
    mountFactory({ trigger: 'click', hideDelay: 150 })

    findTrigger().click()
    findPopper().should('exist')
    findTrigger().click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50)
    findPopper({ immediate: true }).should('exist')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100)
    findPopper().should('not.exist')
  })

  it('@update:show always works, e.g. in hover mode', () => {
    mountFactory()

    assertShowState(false)
    findTrigger().trigger('mouseenter')
    assertShowState(true)
    findTrigger().trigger('mouseleave')
    assertShowState(false)
  })
})

describe('Elements binding', () => {
  it('ok if trigger is a single-element component', () => {
    mount({
      components: {
        Trigger: {
          template: `<button>btn</button>`,
        },
      },
      template: `
        <SPopover trigger="click">
          <template #trigger><Trigger/></template>
          <template #popper="{ show }"><span v-if="show">pop</span></template>
        </SPopover>
      `,
    })

    cy.contains('btn').click()
    cy.contains('pop').should('exist')
  })

  it('ok if popper is toggled with v-if inside of transition', () => {
    mount({
      template: `
        <SPopover>
          <template #trigger><button>btn</button></template>
          <template #popper="{ show }">
            <Transition>
              <span v-if="show">pop</span>
            </Transition>
          </template>
        </SPopover>
      `,
    })

    cy.contains('btn').click()
    cy.contains('pop').should('exist')
  })
})

it('Popper instance is available inside of "popper" slot', () => {
  mount({
    setup() {
      const checkInstance = (x: unknown): x is Instance => !!x && !!(x as Instance).state && !!(x as Instance).update

      return { checkInstance }
    },
    template: `
      <SPopover trigger="click">
        <template #trigger>
          <button>trigger</button>
        </template>

        <template #popper="{ show, instance }">
          <span v-if="show">
            Instance: {{ checkInstance(instance) }}
          </span>
        </template>
      </SPopover>
    `,
  })

  cy.get('button').click()
  cy.contains('Instance: true')
})

it('Throws an error if no trigger slot')
it('Throws an error if trigger slot is not a single element')
it('Throws an error if popper slot renders more than 1 element')

describe('Popper options reactivity', () => {
  it('snap: placement change')
  it('snap: distance & skidding changes')
})
