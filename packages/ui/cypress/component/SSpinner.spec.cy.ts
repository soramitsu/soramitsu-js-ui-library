import { SSpinner } from '@/lib'
import { mount } from '@cypress/vue'

const findSvg = () => cy.get('svg')

const svgSizeShouldBe = (cssValue: string) => {
  findSvg().should('have.css', 'width', cssValue).and('have.css', 'height', cssValue)
}

it('When size pros is a number, it is set as px', () => {
  mount(SSpinner, { props: { size: 55 } })

  svgSizeShouldBe('55px')
})

it('When size prop is a stringified number, it is set as px', () => {
  mount(SSpinner, { props: { size: '55' } })

  svgSizeShouldBe('55px')
})

it('When size prop is a number with some dimension, it is set as is', () => {
  mount(SSpinner, { props: { size: '16rem' } })

  svgSizeShouldBe('16rem')
})
