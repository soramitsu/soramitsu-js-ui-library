import { mount } from '@cypress/vue'
import { ref, h, Ref } from 'vue'
import { Option, SSelectSize } from './types'
import { SSelectApi } from './api'
import SDropdown from './SDropdown.vue'
import SSelectBase from './SSelectBase.vue'
import SSelectButton from './SSelectButton.vue'
import SSelectInput from './SSelectInput.vue'
import SSelect from './SSelect.vue'
import { useToggle } from '@vueuse/core'
import { bareMetalVModel } from '@/util'

const SIZES = [SSelectSize.Sm, SSelectSize.Md, SSelectSize.Lg, SSelectSize.Xl]

function vModel<T>(model: Ref<T>) {
  return bareMetalVModel(model, 'modelValue')
}

it('Gallery - Dropdown', () => {
  const model = ref<string[]>([])
  const options = [
    {
      label: 'Aaaa',
      value: 'a',
    },
    {
      label: 'Bbbb',
      value: 'b',
    },
  ]

  const Dropdown = (props: { size: SSelectSize; inline?: boolean }) =>
    h(
      SDropdown,
      {
        ...vModel(model),
        size: props.size,
        multiple: true,
        options,
        inline: props.inline,
      },
      { label: () => 'My label' },
    )

  const ComponentsList = () => [false, true].map((inline) => SIZES.map((size) => Dropdown({ size, inline }))).flat()

  mount(
    () =>
      h('div', { class: 'p-2 space-y-2' }, [
        h('span', ['Model: ', h('code', {}, JSON.stringify(model.value))]),
        h('div', { class: 'grid grid-cols-2 gap-2' }, h(ComponentsList)),
      ]),
    {
      global: {
        stubs: {
          transition: false,
        },
      },
    },
  )
})

it('Gallery - Select', () => {
  const model = ref<null | number[]>(null)
  const options: Option[] = [
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
  ]

  const Select = (props: { size: SSelectSize }) =>
    h(SSelect, {
      ...vModel(model),
      label: 'dip dap',
      size: props.size,
      multiple: true,
      options,
    })

  const Variants = () => SIZES.map((size) => Select({ size }))

  mount(
    () =>
      h(
        'div',
        { class: 'p-4' },
        h(
          'div',
          {
            class: 'grid gap-2 grid-cols-2',
          },
          h(Variants),
        ),
      ),
    {
      global: {
        stubs: {
          transition: false,
        },
      },
    },
  )
})

for (const [ControlComponent, name] of [
  [SSelectButton, 'Button'],
  [SSelectInput, 'Input'],
] as [any, string][]) {
  it(`${name} - api is available at \'label\' slot`, () => {
    const CheckSlot = (api: SSelectApi<any>) => `CHECKING: ${api.selectedOptions.length}`

    mount(() =>
      h(
        SSelectBase,
        {
          modelValue: [1, 2],
          options: [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
          ],
        },
        {
          control: () =>
            h(
              ControlComponent,
              {},
              {
                label: CheckSlot,
              },
            ),
        },
      ),
    )

    cy.contains('CHECKING: 2')
  })

  it(`${name} - Control is not clickable if input is disabled`, () => {
    mount(() =>
      h(
        SSelectBase,
        {
          label: 'Test',
          disabled: true,
        },
        {
          control: () => h(ControlComponent),
        },
      ),
    )

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
      const opts = [
        { label: 'Opt 1', value: 1 },
        { label: 'Opt 2', value: 2 },
        { label: 'Opt 3', value: 3 },
      ]
      const [multiple, toggle] = useToggle(false)

      return () => [
        h('div', {}, `Value: ${JSON.stringify(model.value)}`),
        h('button', { onClick: () => toggle() }, multiple.value ? 'multi' : 'single'),
        h(SSelect, {
          ...vModel(model),
          options: opts,
          label: 'Dap',
          multiple: multiple.value,
        }),
      ]
    },
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
      const opts = [{ value: true, label: 'Truth' }]

      return () => [
        h('span', {}, `Value: ${JSON.stringify(model.value)}`),
        h(SDropdown, {
          ...vModel(model),
          options: opts,
          label: 'drop',
        }),
      ]
    },
  })

  cy.contains('drop').click()
  cy.contains('Truth').click()
  cy.contains('Value: true')
})
