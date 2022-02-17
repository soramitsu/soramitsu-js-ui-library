import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { STabsPanel, STab, useTabsStateApi, TabsPanelApi } from '@/lib'

before(() => {
  config.global.components = { STabsPanel, STab }
})

after(() => {
  config.global.components = {}
})

describe('STabsPanel', () => {
  const getEl = (id: string) => cy.get(`[data-cy=${id}]`)

  it('The first and the last tabs in Panel have border-radius', () => {
    mount({
      template: `
      <STabsPanel>
        <STab :name="'left'" data-cy="left">left</STab>
        <STab :name="'center'" data-cy="center">center</STab>
        <STab :name="'right'" data-cy="right">right</STab>
      </STabsPanel>
      `,
    })
    getEl('left').should('have.css', 'border-radius', '8px 0px 0px 8px')
    getEl('center').should('have.css', 'border-radius', '0px')
    getEl('right').should('have.css', 'border-radius', '0px 8px 8px 0px')
  })

  it('Disabled prop works correctly', () => {
    mount({
      template: `
        <STabsPanel>
          <STab :disabled="true" data-cy="disabled">disabled</STab>
          <STab data-cy="notDisabled">notDisabled</STab>
        </STabsPanel>
      `,
    })
    getEl('disabled').should('be.disabled')
    getEl('notDisabled').should('not.be.disabled')
  })

  it('Background type prop is primary', () => {
    mount({
      template: `
        <STabsPanel :background="'primary'" data-cy="primary">
          <STab data-cy="tabName" :name="tabName">TabTitle</STab>
        </STabsPanel>
      `,
    })
    getEl('tabName').should('have.class', 's-tab_background-primary')
  })

  it('Background type prop is secondary', () => {
    mount({
      template: `
        <STabsPanel :background="'secondary'" data-cy="secondary">
          <STab data-cy="tabName" :name="tabName">TabTitle</STab>
        </STabsPanel>
      `,
    })
    getEl('tabName').should('have.class', 's-tab_background-secondary')
  })

  it('Background type prop is none', () => {
    mount({
      template: `
        <STabsPanel :background="'none'" data-cy="none">
          <STab data-cy="tabName" :name="tabName">TabTitle</STab>
        </STabsPanel>
      `,
    })
    getEl('tabName').should('have.class', 's-tab_background-none')
  })

  it('Click on tab makes this tab active', () => {
    mount({
      template: `
      <div data-cy="currentValue">{{currentTab}}</div>
            <STabsPanel v-model="currentTab">
              <STab :name="'first'">First</STab>
              <STab :name="'second'" data-cy="second">Second</STab>
              <STab :name="'third'">Third</STab>
              <STab :name="'disabled'" data-cy="disabled" :disabled="true">Disabled</STab>
            </STabsPanel>`,
      setup() {
        let currentTab = ref('first')
        return {
          currentTab,
        }
      },
    })
    getEl('currentValue').contains('first')
    getEl('second')
      .should('not.have.class', 's-tab_active')
      .click()
      .then(() => {
        getEl('second').should('have.class', 's-tab_active')
        getEl('currentValue').contains('second')
      })
  })

  it('If active tab goes disabled, modelValue become empty string', () => {
    mount({
      template: `
      <div data-cy="currentValue">{{currentTab}}</div>
            <STabsPanel v-model="currentTab">
              <STab :name="'first'" :disabled="disabled">First</STab>
              <STab :name="'second'" data-cy="second">Disabled</STab>
            </STabsPanel>`,
      setup() {
        let currentTab = ref('first')
        let disabled = ref(false)
        onMounted(() => {
          disabled.value = true
        })
        return {
          currentTab,
          disabled,
        }
      },
    })

    getEl('currentValue').should('be.empty')
  })

  it('Using custom component with TabsPanelApi', () => {
    const CustomTab = defineComponent({
      props: {
        tabId: {
          type: String,
          default: '',
          required: true,
        },
      },

      setup(props) {
        const { tabId } = toRefs(props)

        const state: TabsPanelApi = useTabsStateApi()
        const { selectTab } = state
        const activateTab = () => {
          selectTab(tabId.value)
        }

        return { activateTab }
      },
      template: `<button @click="activateTab">button</button>`,
    })

    mount({
      components: { CustomTab },
      template: `
            <div data-cy="currentValue">{{currentTab}}</div>
            <STabsPanel v-model="currentTab" data-cy="panel">
              <custom-tab :tabId="'first'"/>
              <custom-tab :tabId="'second'" data-cy="second"/>
            </STabsPanel>`,
      setup() {
        let currentTab = ref('first')
        return {
          currentTab,
        }
      },
    })

    getEl('currentValue').contains('first')
    getEl('second')
      .click()
      .then(() => {
        getEl('currentValue').contains('second')
      })
  })
})
