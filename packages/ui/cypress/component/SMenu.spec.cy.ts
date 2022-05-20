import { mount } from '@cypress/vue'
import { SMenu, SSubmenu, SMenuItem } from '@/lib'
import { config } from '@vue/test-utils'

const testIdSelector = (id: string) => `[data-testid=${id}]`

before(() => {
  config.global.components = { SMenu, SSubmenu, SMenuItem }
})

after(() => {
  config.global.components = {}
})

describe('Menu', () => {
  const findMenu = () => cy.get(testIdSelector('menu'))
  const HEADER_TEXT = 'Header'
  const FOOTER_TEXT = 'Footer'
  const OPENED_MENU_WIDTH = '220px'
  const CLOSED_MENU_WIDTH = '64px'
  const INITIALLY_SELECTED_ITEM = '1'

  context(`Given default menu`, () => {
    beforeEach(() => {
      mount({
        setup() {
          return {
            collapsed: ref(false),
            selectedItem: ref(INITIALLY_SELECTED_ITEM),
          }
        },
        template: `
          <button id="collapse-btn" @click="collapsed = !collapsed">collapse</button>
      
          <SMenu v-model="selectedItem" :collapsed="collapsed">
          <template #header>
            <div id="header-content">${HEADER_TEXT}</div>
          </template>

            <SMenuItem v-for="i in 5" :index="String(i)" :id="'item-' + i">
              <template #icon="iconProps">
                <IconStatusInfo :class="iconProps.class" />
              </template>
              Option {{ String(i) }}
            </SMenuItem>

            <SSubmenu>
              <template #title>Submenu</template>
              <SMenuItem v-for="i in 5" :index="String(i) + 0" :id="'item-' + i + '0'">
                Option {{ String(i) + 0 }}
              </SMenuItem>
            </SSubmenu>
          
            <template #footer>
              <div id="footer-content">${FOOTER_TEXT}</div>
            </template>
          </SMenu>
        `,
      })
    })

    context('When it is initiated', () => {
      it('Then it is expanded', () => {
        findMenu().should('have.css', 'width', OPENED_MENU_WIDTH)
      })

      it('Then its submenu opens on click', () => {
        cy.get(testIdSelector('submenu-items')).should('be.hidden')
        cy.get(testIdSelector('submenu-trigger')).click()
        cy.get(testIdSelector('submenu-items')).should('be.visible')
      })

      it('Then passed into header text is present', () => {
        cy.get('#header-content').should('have.text', HEADER_TEXT)
      })

      it('Then passed into footer text is present', () => {
        cy.get('#footer-content').should('have.text', FOOTER_TEXT)
      })
    })

    context('When menu is collapsed', () => {
      beforeEach(() => {
        cy.get('#collapse-btn').click()
      })

      it("Then submenu can't be opened ", () => {
        cy.get(testIdSelector('submenu-items')).should('be.hidden')
        cy.get(testIdSelector('submenu-trigger')).click()
        cy.get(testIdSelector('submenu-items')).should('be.hidden')
      })
    })

    context('When it toggles collapse state', () => {
      it('Then it changes its width', () => {
        findMenu().should('have.css', 'width', OPENED_MENU_WIDTH)
        cy.get('#collapse-btn').click()
        findMenu().should('have.css', 'width', CLOSED_MENU_WIDTH)
        cy.get('#collapse-btn').click()
        findMenu().should('have.css', 'width', OPENED_MENU_WIDTH)
      })

      it('Then it closes submenus on menu close', () => {
        cy.get(testIdSelector('submenu-trigger')).click()
        cy.get('#collapse-btn').click()
        cy.get(testIdSelector('submenu-items')).should('be.hidden')
      })
    })
  })

  context(`Given menu with active item in submenu`, () => {
    beforeEach(() => {
      mount({
        setup() {
          return {
            selectedItem: ref('10'),
          }
        },
        template: `
          <SMenu v-model="selectedItem">
            <SSubmenu>
              <template #title>Submenu</template>
              <SMenuItem v-for="i in 5" :index="String(i) + 0">
                Option {{ String(i) + 0 }}
              </SMenuItem>
            </SSubmenu>
          </SMenu>
        `,
      })
    })

    context('When it is initiated', () => {
      it('Then submenu with active item is open', () => {
        cy.get(testIdSelector('submenu-items')).should('be.visible')
      })
    })
  })

  context(`Given collapsed menu with active item in submenu`, () => {
    beforeEach(() => {
      mount({
        setup() {
          return {
            selectedItem: ref('10'),
            collapsed: ref(true),
          }
        },
        template: `
          <SMenu v-model="selectedItem" :collapsed="collapsed">
            <SSubmenu>
              <template #title>Submenu</template>
              <SMenuItem v-for="i in 5" :index="String(i) + 0">
                Option {{ String(i) + 0 }}
              </SMenuItem>
            </SSubmenu>
          </SMenu>
        `,
      })
    })

    context('When it is initiated', () => {
      it('Then submenu with active item is closed', () => {
        cy.get(testIdSelector('submenu-items')).should('be.hidden')
      })
    })
  })
})
