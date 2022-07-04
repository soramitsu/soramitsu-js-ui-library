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
        const date = ref([])
        return {
          date,
        }
      },
    })
    picker().children('.options-panel').should('not.exist')
  })


  describe('Panels tests', () => { 

  it('Input panel works correctly', () => {
    mount({
      template: `
          <SDatePicker v-model="date" :type="'day'" data-cy="pk"/>
          <p data-cy="result">{{date.getTime()}}</p>
        `,
      setup() {
        const date = ref(new Date())
        return {
          date,
        }
      },
    })
    getEl('pk')
      .children()
      .click()
      .then(() => {
        picker()
          .get('.options-panel__item')
          .last()
          .click()
          .then(() => {
            picker()
              .get('.custom-panel__input')
              .focus()
              .clear()
              .type('01012000')
              .blur()              
          })
          .then(() => {
            getEl('result').should('have.text', '946666800000')
          })
      })
  })

  it('Month panel works as expected', () => {
    mount({
      template: `
      <SDatePicker v-model="date" :type="'day'" data-cy="picker"/>
      <p data-cy="result">{{date}}</p>
    `,
      setup() {
        const date = ref(new Date('01.01.2000'))
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
            cy.get('.year-range-panel > button').first().click()
            cy.get('.month-table > div:contains("May")').click()
          })
          .then(() => {
            picker().get('.header__label').should('contain', '1999')
            picker().get('.header__label').should('contain', 'May')
          })
      })
  })

  it('Year panel works correctly', () => {
    mount({
      template: `
      <SDatePicker v-model="date" :type="'day'" data-cy="picker"/>
      <p data-cy="result">{{date}}</p>
    `,
      setup() {
        const t = new Date('01.01.2000')
        const date = ref(t)
        console.log(date)
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
          .last()
          .click()
          .then(() => {
            cy.get('.year-table > .available:contains("2004")').click()
          })
          .then(() => {
            picker().get('.header__label').should('contain', '2004')
          })
      })
  })

  it('Time panel works correctly', () => {
    mount({
      template: `
      <SDatePicker v-model="date" :type="'day'" data-cy="picker" :time="true"/>
      <p data-cy="result">{{date}}</p>
    `,
      setup() {
        const t = new Date('01.01.2000')
        const date = ref(t)
        return {
          date,
        }
      },
    })

    getEl('picker')
      .children()
      .click()
      .then(() => {
            cy.get('.time-table > p:contains("02:00")').click()          
          .then(() => {
            getEl('result').should('contain', '02:00')
          })
      })
  })
})
})
