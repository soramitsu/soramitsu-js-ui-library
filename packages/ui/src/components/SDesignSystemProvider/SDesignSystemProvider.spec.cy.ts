import { defineComponent, h } from 'vue'
import { mount } from '@cypress/vue'
import { DesignSystem, useDesignSystem } from '@/state/design-system'
import SDesignSystemProvider from './SDesignSystemProvider.vue'

const Checker = defineComponent({
  setup() {
    const current = useDesignSystem()

    return () => (current.value === DesignSystem.Default ? 'default' : 'neumorphic')
  },
})

it('Default design system if provider is not used', () => {
  mount(Checker)

  cy.contains('default')
})

it('Default design system if provider is used without setting value', () => {
  mount(SDesignSystemProvider, { slots: { default: () => h(Checker) } })

  cy.contains('default')
})

it('Neumorphic design system is applied', () => {
  mount(SDesignSystemProvider, {
    props: {
      value: DesignSystem.Neumorphic,
    },
    slots: { default: () => h(Checker) },
  })

  cy.contains('neumorphic')
})
