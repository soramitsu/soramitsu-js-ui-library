import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { SSelect, SSelectBase, SSelectButton, SSelectInput, SDropdown, SelectSize } from './index'

const SIZES = [SelectSize.Sm, SelectSize.Md, SelectSize.Lg, SelectSize.Xl]

before(() => {
  config.global.components = { SDropdown, SSelectButton, SSelectInput, SSelectBase, SSelect }
  config.global.stubs = { transition: false }
})

after(() => {
  config.global.components = {}
  config.global.stubs = {}
})

it('Gallery - Dropdown', () => {
  mount({
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
  mount({
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
    mount({
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
    mount({
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

  mount(() =>
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
  mount(SSelect, { props: { label: 'dip dap' } })

  cy.contains('dip dap')
})

it('SDropdown - renders label without slot', () => {
  mount(SDropdown, { props: { label: 'dap dip' } })

  cy.contains('dap dip')
})

it('SSelect - clicking options, checking auto-transformations', () => {
  mount({
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
  mount({
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
