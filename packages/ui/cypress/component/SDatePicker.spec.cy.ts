import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { SDatePicker } from '@/lib'

before(() => {
  config.global.components = { SDatePicker }
})

after(() => {
  config.global.components = {}
})

describe('SDatePicker', () => {
  const getEl = (id: string) => cy.get(`[data-cy=${id}]`)
  const picker = () => cy.get(`[data-testid=date-picker]`)

  it('Time prop works correctly', () => {
    mount({
      template: `
        <SDatePicker v-model="date" :type="'day'" :time="true" data-cy="picker"/>
        <p data-cy="result">{{date}}</p>
      `,
      setup() {
        const date = ref(new Date())
        return {
          date,
        }
      },
    })

    picker().children('.time-panel').should('exist')
  })

  it('Displayed two calendars in range mode', () => {
    mount({
      template: `
        <SDatePicker v-model="date" :type="'range'"/>
        <p data-cy="result">{{date}}</p>
      `,
      setup() {
        const date = ref(new Date())
        return {
          date,
        }
      },
    })
    picker().children('.calendars-panel').children().should(`have.length`, 2)
  })

  it('Displayed one calendar in day mode', () => {
    mount({
      template: `
        <SDatePicker v-model="date" :type="'day'"/>
        <p data-cy="result">{{date}}</p>
      `,
      setup() {
        const date = ref(new Date())
        return {
          date,
        }
      },
    })
    picker().children('.calendars-panel').children().should(`have.length`, 1)
  })

  it('No options panel in Pick mode', () => {
    mount({
      template: `
        <SDatePicker v-model="date" :type="'pick'"/>
        <p data-cy="result">{{date}}</p>
      `,
      setup() {
        const date = ref(new Date())
        return {
          date,
        }
      },
    })
    picker().children('.options-panel').should('not.exist')
  })

  //   it('Input panel works correctly', () => {
  //     mount({
  //       template: `
  //         <SDatePicker v-model="date" :type="'day'" data-cy="pk"/>
  //         <p data-cy="result">{{date}}</p>
  //       `,
  //       setup() {
  //         const date = ref(new Date())
  //         return {
  //           date,
  //         }
  //       },
  //     })
  //     getEl('pk').children().click()
  //     .then(() => {
  //     picker().get('.options-panel__item').last()
  //       .click()
  //       .then(() => {
  //         picker().children('.custom-panel').get('input').type('01012000')
  //         .then(() => {
  //           getEl('result').should('have.text', '111')
  //         })
  //       })
  //     })

  // })

  it('Click on month cause display Month Table', () => {
    mount({
      template: `
      <SDatePicker v-model="date" :type="'pick'" data-cy="picker"/>
      <p data-cy="result">{{date}}</p>
    `,
      setup() {
        const date = ref(new Date())
        return {
          date,
        }
      },
    })

    getEl('picker')
      .children()
      .click()
      .then(() => {
        picker()
          .get('.header__label')
          .first()
          .click()
          .then(() => {
            picker().get('.month-table').should('exist')
          })
      })
  })
})
