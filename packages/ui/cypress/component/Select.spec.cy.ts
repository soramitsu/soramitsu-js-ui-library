import { VueTestUtils } from 'cypress/vue'
import { SSelect, SSelectBase, SSelectButton, SSelectInput, SDropdown, SelectSize, STextField } from '@/lib'

const SIZES = [SelectSize.Sm, SelectSize.Md, SelectSize.Lg, SelectSize.Xl]

before(() => {
  VueTestUtils.config.global.components = { SDropdown, SSelectButton, SSelectInput, SSelectBase, SSelect }
  VueTestUtils.config.global.stubs = { transition: false }
})

after(() => {
  VueTestUtils.config.global.components = {}
  VueTestUtils.config.global.stubs = {}
})

const findBtnLabel = () => cy.get('.s-select-btn__label')

it('Gallery - Dropdown', () => {
  cy.mount({
    setup() {
      return {
        model: ref<string[]>([]),
        options: [
          {
            label: 'Aaaa',
            value: 'a',
          },
          {
            label: 'Bbbb',
            value: 'b',
          },
        ],
        SIZES,
      }
    },
    template: `
      <div class="p-2 space-y-2">
        <code>Model: {{ model }}</code>

        <div class="grid grid-cols-2 gap-2">
          <template v-for="inline in [false, true]">
            <template v-for="size in SIZES">
              <SDropdown
                v-model="model"
                v-bind="{ inline, size, options }"
                multiple
                label="My label"
              />
            </template>
          </template>
        </div>
      </div>
    `,
  })
})

it('Gallery - Select', () => {
  cy.mount({
    setup() {
      return {
        model: ref<string[]>([]),
        options: [
          {
            label: 'One',
            value: 1,
          },
          {
            label: 'Two',
            value: 2,
          },
          {
            label: 'Three',
            value: 3,
          },
        ],
        SIZES,
      }
    },
    template: `
      <div class="p-2 space-y-2">
        <code>Model: {{ model }}</code>

        <div class="grid grid-cols-2 gap-2">
          <template v-for="size in SIZES">
            <SSelect
              v-model="model"
              v-bind="{ size, options }"
              multiple
              label="My label"
            />
          </template>
        </div>
      </div>
    `,
  })
})

for (const [ControlComponent, name] of [
  [SSelectButton, 'Button'],
  [SSelectInput, 'Input'],
] as [any, string][]) {
  it(`${name} - api is available at \'label\' slot`, () => {
    cy.mount({
      components: { ControlComponent },
      setup() {
        return {
          bind: {
            modelValue: [1, 2],
            options: [
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
            ],
          },
        }
      },
      template: `
        <SSelectBase v-bind="bind">
          <template #control>
            <ControlComponent>
              <template #label="api">
                CHECKING: {{ api.selectedOptions.length }}
              </template>
            </ControlComponent>
          </template>
        </SSelectBase>
      `,
    })

    cy.contains('CHECKING: 2')
  })

  it(`${name} - Control is not clickable if input is disabled`, () => {
    cy.mount({
      components: { ControlComponent },
      template: `
        <SSelectBase label="Test" disabled>
          <template #control>
            <ControlComponent />
          </template>
        </SSelectBase>
      `,
    })

    cy.contains('Test').should('have.css', 'pointer-events', 'none')
  })
}

it('Menu is closed automatically if input becomes disabled', () => {
  const disabled = ref(false)

  cy.mount(() =>
    h(
      SSelectBase,
      { label: 'test label', disabled: disabled.value },
      {
        control: () => h(SSelectButton),
        dropdown: () => h('div', { 'data-cy': 'menu' }, 'menu'),
      },
    ),
  )

  cy.contains('test label').click()
  cy.get('[data-cy=menu]')
    .should('be.visible')
    .then(() => {
      disabled.value = true
    })

  cy.get('[data-cy=menu]').should('not.be.visible')
})

it('SSelect - renders label without slot', () => {
  cy.mount(SSelect, { props: { label: 'dip dap' } })

  cy.contains('dip dap')
})

it('SDropdown - renders label without slot', () => {
  cy.mount(SDropdown, { props: { label: 'dap dip' } })

  cy.contains('dap dip')
})

it('SSelect - clicking options, checking auto-transformations', () => {
  cy.mount({
    setup() {
      const model = ref(null)
      const modelStr = computed(() => JSON.stringify(model.value))

      const options = [
        { label: 'Opt 1', value: 1 },
        { label: 'Opt 2', value: 2 },
        { label: 'Opt 3', value: 3 },
      ]
      const [multiple, toggle] = useToggle(false)

      const buttonLabel = computed(() => (multiple.value ? 'multi' : 'single'))

      return { model, modelStr, options, multiple, toggle, buttonLabel }
    },
    template: `
      <div>Value: {{ modelStr }}</div>
      <button @click="toggle()">{{ buttonLabel }}</button>
      <SSelect
        v-model="model"
        v-bind="{ options, multiple }"
        label="Dap"
      />
    `,
  })

  function assertValue(val: string) {
    cy.contains(`Value: ${val}`)
  }

  cy.contains('Dap').click()
  cy.contains('Opt 1').click()
  assertValue('1')

  cy.contains('Opt 2').click()
  assertValue('2')

  // auto-transformation into an array
  cy.get('button').contains('single').click()
  assertValue('[2]')

  cy.contains('Dap').click()
  cy.contains('Opt 3').click()
  assertValue('[2,3]')

  // auto-transformation into a single value
  cy.get('button').contains('multi').click()
  assertValue('2')
})

it('SDropdown - model usage works', () => {
  cy.mount({
    setup() {
      const model = ref(null)
      const options = [{ value: true, label: 'Truth' }]

      return { model, options }
    },
    template: `
      <span>Value: {{ model }}</span>
      <SDropdown
        v-model="model"
        label="drop"
        v-bind="{ options }"
      />  
    `,
  })

  cy.contains('drop').click()
  cy.contains('Truth').click()
  cy.contains('Value: true')
})

it('SDropdown - show/hide by clicks', () => {
  cy.mount({
    setup() {
      return {
        options: [{ label: 'OPTION', value: 0 }],
      }
    },
    template: `
      <SDropdown
        label="Label"
        :options="options"
      />
    `,
  })

  cy.contains('Label').click()
  cy.contains('OPTION').should('be.visible')
  cy.contains('Label').click()
  cy.contains('OPTION').should('not.be.visible')
})

describe('Auto-close', () => {
  const OPTIONS = [
    { value: 'pizza', label: 'Pizza' },
    { value: 'burger', label: 'Burger' },
    { value: 'cocktail', label: 'Cocktail' },
  ]

  for (const component of ['SSelect', 'SDropdown']) {
    it(`Single-choice ${component} is auto-closed after selection`, () => {
      mount({
        setup: () => ({
          options: OPTIONS,
          model: ref(null),
        }),
        template: `
          <${component} v-model="model" v-bind="{ options }" label="What to consume" />

          <p>Selection: {{ model || 'none' }}</p>
        `,
      })

      cy.contains('Selection: none')
      cy.contains('What to consume').click()
      cy.contains('Pizza').click()
      cy.contains('Cocktail').should('not.be.visible')
      cy.contains('Selection: pizza')

      // ensure that next selection causes auto-close as well
      cy.contains('What to consume').click()
      cy.contains('Cocktail').click()
      cy.contains('Burger').should('not.be.visible')
      cy.contains('Selection: cocktail')
    })

    it(`Multi-choice ${component} is not auto-closed after selection`, () => {
      mount({
        setup: () => ({
          options: OPTIONS,
          model: ref(null),
        }),
        template: `
          <${component} v-model="model" v-bind="{ options }" label="What to consume" multiple />
        `,
      })

      cy.contains('What to consume').click()
      cy.contains('Burger').click()
      cy.contains('Pizza').click()
      cy.contains('Cocktail').should('be.visible')
    })

    it(`${component} doesn't close when 'no-auto-close' is set`, () => {
      mount(
        {
          setup: () => ({
            options: OPTIONS,
            model: ref(null),
          }),
          template: `
          <${component} v-model="model" v-bind="{ options }" label="What to consume" no-auto-close />
        `,
        },

        {
          global: {
            stubs: {
              // to enable instant re-render
              transition: true,
            },
          },
        },
      )

      cy.contains('What to consume').click()
      cy.contains('Burger').click()
      cy.contains('Pizza').should('be.visible')
    })
  }
})

it(`SDropdown - when value is selected and label is not provided, then label is not rendered`, () => {
  cy.mount({
    setup() {
      const showLabel = ref(true)
      const label = computed(() => (showLabel.value ? 'Choice' : ''))
      return {
        options: [{ label: 'Pizza', value: 'pizza' }],
        showLabel,
        label,
      }
    },
    template: `
      <input v-model="showLabel" type="checkbox"> Show label

      <SDropdown
        v-bind="{ options, modelValue: 'pizza', label }"
      />
    `,
  })

  findBtnLabel().should('have.text', 'Choice:')
  cy.get('input').click().should('not.be.checked')
  findBtnLabel().should('not.exist')
})

it('SSelectDropdown overlaps STextField', () => {
  cy.mount({
    components: { STextField },
    setup() {
      return {
        options: [
          { label: 'one', value: 1 },
          { label: 'two', value: 2 },
        ],
      }
    },
    template: `
      <div class="m-4 space-y-4">
        <SDropdown label="I am top" v-bind="{ options }" />
        <STextField placeholder="I am bottom" />
      </div>
    `,
  })

  cy.contains('I am top').click()
  cy.contains('two')
    // trying to click to ensure the element is not covered by anything
    .click()
})
