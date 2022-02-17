import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { SRadioButton, SRadioGroup, useRadioGroupApi } from '@/components/Radio'

before(() => {
  config.global.components = { SRadioButton, SRadioGroup }
})

after(() => {
  config.global.components = {}
})

const testidSelector = (id: string) => `[data-testid=${id}]`
const radioButtonSelector = `[role=radio]${testidSelector('radio-button')}`

const findRadioButtonContains = (text: string) => cy.contains(text).closest(radioButtonSelector)

describe('Initial tabindex', () => {
  it("When RadioGroup doesn't have an initial value, then a11y is ok and the first radio is tabbable", () => {
    mount({
      template: `
      <SRadioGroup>
        <SRadioButton value="1">First</SRadioButton>
        <SRadioButton value="2">Second</SRadioButton>
      </SRadioGroup>
    `,
    })

    findRadioButtonContains('First').should('have.attr', 'tabindex', 0)
    findRadioButtonContains('Second').should('have.attr', 'tabindex', -1)
  })

  it(`When RadioGroup doesn't have an initial value and first radio button is dynamic, tabbable state is always up to date`, () => {
    // Helpers

    const expectRadioToBeTabbable = (innerText: string) =>
      findRadioButtonContains(innerText).should('have.attr', 'tabindex', 0)

    const expectRadioToBeNotTabbable = (innerText: string) =>
      findRadioButtonContains(innerText).should('have.attr', 'tabindex', -1)

    const inc = () => cy.contains('inc').click()

    // Mounting

    mount({
      setup() {
        const { count, inc } = useCounter()

        return { count, inc }
      },
      template: `
      <button @click="inc()">inc</button>

      <SRadioGroup>
        <SRadioButton
          v-for="i in 5"
          :key="count + i"
          :value="count + i"
        >
          Radio {{ count + i }}
        </SRadioButton>
      </SRadioGroup>
    `,
    })

    // Acting

    inc()

    expectRadioToBeTabbable('Radio 1')
    expectRadioToBeNotTabbable('Radio 2')

    inc()

    expectRadioToBeTabbable('Radio 2')
    expectRadioToBeNotTabbable('Radio 3')
  })
})

describe('Keyboard navigation', () => {
  beforeEach(() => {
    mount({
      setup() {
        return {
          value: ref(null),
        }
      },
      template: `
      <p>
        Model: {{ value || 'none' }}
      </p>

      <button>Pre</button>

      <SRadioGroup v-model="value">
        <template #label>
          Pizza Crust
        </template>
    
        <SRadioButton value="regular">
          Regular crust
        </SRadioButton>
    
        <SRadioButton value="deep">
          Deep dish
        </SRadioButton>
    
        <SRadioButton value="thin">
          Thin crust
        </SRadioButton>
      </SRadioGroup>
  

      <button>Post</button>
    `,
    })
  })

  const modelShouldBe = (value: string) => cy.contains(`Model: ${value}`)

  it('When focus enters radio group, firstly it focuses on the first button, but value is not automatically selected', () => {
    modelShouldBe('none')

    cy.contains('Pre')
      .focus()
      .tab()
      .contains('Regular crust')

    modelShouldBe('none')
  })

  it('When a radio group is "tabbed through", value is not selected', () => {
    cy.contains('Pre')
      .focus()
      .tab()
      .tab()
      .contains('Post')

    modelShouldBe('none')
  })

  it(`When an empty radio group is "tabbed" and {space} is pressed, then value is selected`, () => {
    cy.contains('Pre')
      .focus()
      .tab()
      .type('{space}')

    modelShouldBe('regular')
  })

  it('When arrow keys are pressed when radio group is focused, value is changed appropriate', () => {
    cy.contains('Pre')
      .tab()
      // going next with Down
      .type('{downarrow}')

    cy.focused().contains('Deep dish')
    modelShouldBe('deep')

    // going back with Up
    cy.focused().type('{uparrow}')

    cy.focused().contains('Regular crust')
    modelShouldBe('regular')

    // going "back" with Left (should jump to the last, cycle)
    cy.focused().type('{leftarrow}')

    cy.focused().contains('Thin crust')
    modelShouldBe('thin')

    // and again "next" to the first with Right
    cy.focused().type('{rightarrow}')

    cy.focused().contains('Regular crust')
    modelShouldBe('regular')
  })
})

describe('v-modeling', () => {
  const TestRadio = defineComponent({
    props: {
      value: Object,
    },
    setup(props) {
      const api = useRadioGroupApi().registerRadio()

      const el = templateRef('root')
      watch(el, (x) => api.setEl(x as HTMLElement))

      watch(
        () => props.value,
        (x) => api.setValue(x),
        { immediate: true },
      )

      const { isChecked } = toRefs(api)

      function handleClick() {
        api.check()
      }

      return {
        isChecked,
        handleClick,
      }
    },
    template: `
      <div role="radio" @click="handleClick" tabindex=0>
        <slot />

        Is checked: {{ isChecked }}
      </div>
    `,
  })

  it('When complex value with `value-key` prop is used, v-modeling works fine', () => {
    mount({
      components: { TestRadio },
      setup() {
        interface Option {
          val: number
        }

        const OPTIONS: Option[] = [
          {
            val: 1,
          },
          {
            val: 2,
          },
        ]

        function valueKey(x: Option) {
          return x.val
        }

        return {
          value: ref(1),
          valueKey,
        }
      },
      template: `
        Model: {{ value }}

        <SRadioGroup v-model="value" :value-key="valueKey">
          <TestRadio
            v-for="x in OPTIONS"
            :key="x.val"
            :value="x"
          >
            Radio {{ x.val }}
          </TestRadio>
        </SRadioGroup>
      `,
    })

    const modelShouldBe = (val: string) => cy.contains(`Model: ${val}`)

    modelShouldBe('1')
    cy.contains('Radio 1').contains('Is checked: true')

    cy.contains('Radio 2')
      .contains('Is checked: false')
      .click()

    cy.contains('Radio 2').contains('Is checked: true')
    cy.contains('Radio 1').contains('Is checked: false')
    modelShouldBe('2')
  })
})
