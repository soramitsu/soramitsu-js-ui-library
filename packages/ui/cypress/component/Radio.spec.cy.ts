import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { SRadioButton, SRadioGroup } from '@/components/Radio'

before(() => {
  config.global.components = { SRadioButton, SRadioGroup }
})

after(() => {
  config.global.components = {}
})

const testidSelector = (id: string) => `[data-testid=${id}]`
const radioButtonSelector = `[role=radio]${testidSelector('radio-button')}`

const findRadioButtonContains = (text: string) => cy.contains(text).closest(radioButtonSelector)

const expectRadioToBeTabbable = (innerText: string) =>
  findRadioButtonContains(innerText).should('have.attr', 'tabindex', 0)

const expectRadioToBeNotTabbable = (innerText: string) =>
  findRadioButtonContains(innerText).should('have.attr', 'tabindex', -1)

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

    cy.injectAxeAndConfigureCTDefaults()
    cy.checkA11y()

    expectRadioToBeTabbable('First')
    expectRadioToBeNotTabbable('Second')
  })

  it(`When RadioGroup doesn't have an initial value and first radio button is dynamic, tabbable state is always up to date`, () => {
    // Helpers

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

    expectRadioToBeTabbable('Radio 2')
    expectRadioToBeNotTabbable('Radio 3')

    inc()

    expectRadioToBeTabbable('Radio 3')
    expectRadioToBeNotTabbable('Radio 4')
  })

  it('When there is no selected value initially, but then it appears, then related radio button is tabbable', () => {
    mount({
      setup() {
        const val = ref<string | null>(null)

        function set() {
          val.value = 'foo'
        }

        return {
          val,
          set,
        }
      },
      template: `
        <button @click="set">Set</button>

        <SRadioGroup v-model="val">
          <SRadioButton value="bar">Bar</SRadioButton>
          <SRadioButton value="foo">Foo</SRadioButton>
        </SRadioGroup>
      `,
    })

    expectRadioToBeTabbable('Bar')
    expectRadioToBeNotTabbable('Foo')

    cy.contains('Set').click()

    expectRadioToBeNotTabbable('Bar')
    expectRadioToBeTabbable('Foo')
  })

  // it(
  //   "When some radio was selected, but then value changed so radio group doesn't have a selected radio anymore, then zero tabindex is saved for the last tabbable radio",
  // )
})

describe('Keyboard, Focusing', () => {
  beforeEach(() => {
    mount({
      setup() {
        const valueRef = ref<null | string>(null)
        const root = templateRef<HTMLElement>('root')
        const keys = useMagicKeys({ target: root })

        whenever(
          keys['Shift+R'],
          () => {
            valueRef.value = 'regular'
          },
          { flush: 'sync' },
        )

        return {
          value: valueRef,
        }
      },
      template: `
        <div class="p-4" ref="root">
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
        </div>
      `,
    })
  })

  const modelShouldBe = (value: string) => cy.contains(`Model: ${value}`)

  it('When something is focused by click, a11y is ok', () => {
    findRadioButtonContains('Deep dish').click()

    cy.injectAxeAndConfigureCTDefaults()
    cy.checkA11y()
  })

  it('When focus enters radio group, firstly it focuses on the first button, but value is not automatically selected', () => {
    modelShouldBe('none')

    cy.contains('Pre').focus().tab().contains('Regular crust')

    modelShouldBe('none')
  })

  it('When a radio group is "tabbed through", value is not selected', () => {
    cy.contains('Pre').focus().tab().tab().contains('Post')

    modelShouldBe('none')
  })

  it(`When an empty radio group is "tabbed" and {space} is pressed, then value is selected`, () => {
    cy.contains('Pre').focus().tab().type(' ')

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

  it("When some radio is focused & selected, but value is changed to another radio, then focus isn't changed to it, as well as tabindex, and value can be re-selected by {space}", () => {
    findRadioButtonContains('Thin crust').click()
    modelShouldBe('thin')

    cy.focused().type('{shift+r}')
    modelShouldBe('regular')
    cy.focused().contains('Thin crust')
    expectRadioToBeTabbable('Thin crust')
    expectRadioToBeNotTabbable('Regular crust')

    cy.focused().type(' ')
    modelShouldBe('thin')
    expectRadioToBeTabbable('Thin crust')
    expectRadioToBeNotTabbable('Regular crust')
  })

  it('When value of the selected & focused radio is changed to another radio, then keyboard navigation works relative to the focused radio', () => {
    findRadioButtonContains('Thin crust').click().type('{shift+r}')
    modelShouldBe('regular')
    findRadioButtonContains('Thin crust').should('be.focused').type('{leftarrow}')
    findRadioButtonContains('Deep dish').should('be.focused')
    modelShouldBe('deep')
  })
})

// describe.skip('v-modeling', () => {
//   const TestRadio = defineComponent({
//     props: {
//       value: Object,
//     },
//     setup(props) {
//       const elRef = templateRef<HTMLElement>('root')
//       const valueRef = computed(() => props.value)

//       const api = useRadioGroupApi().registerRadio({ elRef, valueRef })

//       const { isChecked } = toRefs(api)

//       function handleClick() {
//         api.check()
//       }

//       return {
//         isChecked,
//         handleClick,
//       }
//     },
//     template: `
//       <div role="radio" @click="handleClick" tabindex=0>
//         <slot />

//         Is checked: {{ isChecked }}
//       </div>
//     `,
//   })

//   it('When complex value with `value-key` prop is used, v-modeling works fine', () => {
//     mount({
//       components: { TestRadio },
//       setup() {
//         interface Option {
//           val: number
//         }

//         const OPTIONS: Option[] = [
//           {
//             val: 1,
//           },
//           {
//             val: 2,
//           },
//         ]

//         function valueKey(x: Option) {
//           return x.val
//         }

//         return {
//           value: ref(1),
//           valueKey,
//         }
//       },
//       template: `
//         Model: {{ value }}

//         <SRadioGroup v-model="value" :value-key="valueKey">
//           <TestRadio
//             v-for="x in OPTIONS"
//             :key="x.val"
//             :value="x"
//           >
//             Radio {{ x.val }}
//           </TestRadio>
//         </SRadioGroup>
//       `,
//     })

//     const modelShouldBe = (val: string) => cy.contains(`Model: ${val}`)

//     modelShouldBe('1')
//     cy.contains('Radio 1').contains('Is checked: true')

//     cy.contains('Radio 2').contains('Is checked: false').click()

//     cy.contains('Radio 2').contains('Is checked: true')
//     cy.contains('Radio 1').contains('Is checked: false')
//     modelShouldBe('2')
//   })
// })
