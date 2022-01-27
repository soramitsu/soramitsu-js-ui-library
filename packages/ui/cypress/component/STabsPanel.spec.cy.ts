import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { STabsPanel, STab } from '@/lib'

before(() => {
  config.global.components = { STabsPanel, STab }
})

after(() => {
  config.global.components = {}
})

describe('STabsPanel', () => {
  const getEl = (id: string) => cy.get(`[data-cy=${id}]`)

  it('STab border-radius prop test', () => {
    mount({
      template: `
        <STab :border-radius="'full'" data-cy="full">full</STab>
        <STab data-cy="none">none</STab>
        <STab :border-radius="'left'" data-cy="left">left</STab>
        <STab :border-radius="'right'" data-cy="right">right</STab>
      `,
    })
    getEl('full').should('have.css', 'border-radius', '8px')
    getEl('none').should('have.css', 'border-radius', '0px')
    getEl('left').should('have.css', 'border-radius', '8px 0px 0px 8px')
    getEl('right').should('have.css', 'border-radius', '0px 8px 8px 0px')
  })

  it('STab disabled prop test', () => {
    mount({
      template: `
        <STab :disabled="true" data-cy="disabled">disabled</STab>
        <STab data-cy="notDisabled">notDisabled</STab>
      `,
    })
    getEl('disabled').should('be.disabled')
    getEl('notDisabled').should('not.be.disabled')
  })

  it('STabsPanel - click on STab test', () => {
    mount({
      template: `
            <STabsPanel v-model="currentTab">
              <STab>First</STab>
              <STab data-cy="second">Second</STab>
              <STab>Third</STab>
              <STab  data-cy="disabled" :disabled="true">Disabled</STab>
            </STabsPanel>`,
      setup() {
        let currentTab = ref(0)
        return {
          currentTab,
        }
      },
    })
    getEl('second')
      .should('not.have.class', 's-tab_active')
      .click()
      .then(() => {
        getEl('second').should('have.class', 's-tab_active')
      })
  })
})
