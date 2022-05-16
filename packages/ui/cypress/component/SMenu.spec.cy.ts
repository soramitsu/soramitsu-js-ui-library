import { mount } from '@cypress/vue'
import { SMenu, SSubmenu, SMenuItem } from '@/lib'

const testIdSelector = (id: string) => `[data-testid=${id}]`

describe('Menu', () => {
  const findMenu = () => cy.get(testIdSelector('menu'))
  const headerText = 'Header'
  const footerText = 'Footer'
  const openedMenuWidth = '220px'
  const closedMenuWidth = '64px'
  const initiallySelectedItem = '1'

  context(`Given default menu`, () => {
    beforeEach(() => {
      mount({
        components: {
          SMenu,
          SSubmenu,
          SMenuItem,
        },
        setup() {
          return {
            collapsed: ref(false),
            selectedItem: ref(initiallySelectedItem),
          }
        },
        template: `
          <button id="collapse-btn" @click="collapsed = !collapsed">collapse</button>
      
          <SMenu v-model="selectedItem" :collapsed="collapsed">
          <template #header>
            <div id="header-content">${headerText}</div>
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
              <div id="footer-content">${footerText}</div>
            </template>
          </SMenu>
        `,
      })
    })

    context('When it is initiated', () => {
      it('Then it is expanded', () => {
        findMenu().should('have.css', 'width', openedMenuWidth)
      })

      it('Then its submenu opens on click', () => {
        cy.get(testIdSelector('submenu-items')).should('be.hidden')
        cy.get(testIdSelector('submenu-trigger')).click()
        cy.get(testIdSelector('submenu-items')).should('be.visible')
      })

      it('Then passed into header text is present', () => {
        cy.get('#header-content').should('have.text', headerText)
      })

      it('Then passed into footer text is present', () => {
        cy.get('#footer-content').should('have.text', footerText)
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
        findMenu().should('have.css', 'width', openedMenuWidth)
        cy.get('#collapse-btn').click()
        findMenu().should('have.css', 'width', closedMenuWidth)
        cy.get('#collapse-btn').click()
        findMenu().should('have.css', 'width', openedMenuWidth)
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
        components: {
          SMenu,
          SSubmenu,
          SMenuItem,
        },
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
        components: {
          SMenu,
          SSubmenu,
          SMenuItem,
        },
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
