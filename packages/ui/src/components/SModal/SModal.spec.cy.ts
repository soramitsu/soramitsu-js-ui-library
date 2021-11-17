import SModal from './SModal.vue'
import SModalCard from './SModalCard.vue'

import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { h, defineComponent, Ref, ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { bareMetalVModel } from '@/util'
import { useSModalApi } from './api'

const showVModel = (val: Ref<boolean>) => bareMetalVModel(val, 'show')

before(() => {
  config.global.stubs = { transition: false }
})

after(() => {
  config.global.stubs = {}
})

it('Mounts', () => {
  mount({
    setup() {
      const [show, toggleShow] = useToggle(false)

      return () => [
        h('button', { onClick: () => toggleShow() }, { default: () => 'show toggle' }),
        h(
          SModal,
          {
            ...showVModel(show),
          },
          {
            default: () =>
              h(
                SModalCard,
                {},
                {
                  title: () => 'Titul',
                  default: () => 'defualt',
                },
              ),
          },
        ),
      ]
    },
  })
})

describe('Focus trap', () => {
  /**
   * If focus occures inside of it, renders message "__FOCUSED__"
   */
  const FocusChecker = defineComponent({
    setup() {
      const [focused, setFocus] = useToggle(false)

      return () => [
        h(
          'div',
          {
            class: 'bg-white p-4',
          },
          [
            h('input', {
              onFocus: () => setFocus(true),
              onBlur: () => setFocus(false),
            }),
            focused.value && '__FOCUSED__',
          ],
        ),
      ]
    },
  })

  const CHECK_REGEX = /__FOCUSED__/

  function Scene(props?: { focusTrap?: boolean }) {
    return defineComponent({
      setup() {
        const [show, toggleShow] = useToggle(false)

        return () => [
          h(
            'button',
            {
              onClick: () => toggleShow(true),
            },
            'open modal',
          ),
          h(
            SModal,
            {
              focusTrap: props?.focusTrap,
              ...showVModel(show),
            },
            {
              default: () => h(FocusChecker),
            },
          ),
        ]
      },
    })
  }

  it('Works by default', () => {
    mount(Scene())

    cy.get('button').click()

    cy.contains(CHECK_REGEX)
  })

  it("Doesn't work if `false` is passed", () => {
    mount(Scene({ focusTrap: false }))

    cy.get('button').click()

    cy.contains(CHECK_REGEX).should('not.exist')
  })
})

describe('Some tests with simple modal', () => {
  /**
   * Mounts:
   * - without a focus trap
   * - without a modal transition
   */
  function mountFactory(params?: {
    closeOnOverlayClick?: boolean
    closeOnEsc?: boolean
    showOverlay?: boolean
    absolute?: boolean
  }) {
    return mount({
      setup() {
        const show = ref(false)

        return () => [
          h(
            'button',
            {
              onClick: () => {
                show.value = true
              },
            },
            'toggle',
          ),
          h(
            SModal,
            {
              ...showVModel(show),
              ...params,
              focusTrap: false,
              modalTransition: null,
            },
            {
              default: () => h('span', {}, 'Dip'),
            },
          ),
        ]
      },
    })
  }

  const MODAL_OVERLAY_SELECTOR = '.s-modal__overlay'

  it('Modal closes by click on overlay', () => {
    mountFactory()

    cy.get('button').click()
    cy.contains('Dip')
    cy.get(MODAL_OVERLAY_SELECTOR).click('top', { force: true })
    cy.contains('Dip').should('not.exist')
  })

  it("Modal doesn't close by click on overlay with the false prop", () => {
    mountFactory({ closeOnOverlayClick: false })

    cy.get('button').click()
    cy.contains('Dip')
    cy.get(MODAL_OVERLAY_SELECTOR).click('top', { force: true })

    // it may be still mounted
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50)
    cy.contains('Dip').should('exist')
  })

  it('Modal closes by esc key down', () => {
    mountFactory()

    cy.get('button').click()
    cy.contains('Dip')

    cy.get('body').type('{esc}')
    cy.contains('Dip').should('not.exist')
  })

  it("Modal doesn't close by esc if it is disabled by prop", () => {
    mountFactory({ closeOnEsc: false })

    cy.get('button').click()
    cy.contains('Dip')

    cy.get('body').type('{esc}')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50)
    cy.contains('Dip').should('exist')
  })

  it('No overlay if prop is set', () => {
    mountFactory({ showOverlay: false })

    cy.get('button').click()
    cy.get(MODAL_OVERLAY_SELECTOR).should('not.exist')
  })

  it('Modal root is `fixed` by default', () => {
    mountFactory()

    cy.get('button').click()
    cy.get('.s-modal__root').should('have.css', 'position', 'fixed')
  })

  it('Modal root is `absolute` if related prop is set to true', () => {
    mountFactory({ absolute: true })

    cy.get('button').click()
    cy.get('.s-modal__root').should('have.css', 'position', 'absolute')
  })
})

describe('Teleportation', () => {
  it('Teleports to body by default', () => {
    mount(() =>
      h(
        SModal,
        {
          show: true,
          focusTrap: false,
        },
        { default: () => h('span', { 'data-cy': 'content' }) },
      ),
    )

    cy.get('body span[data-cy=content]').should('exist')
  })

  it('Teleports to custom target', () => {
    mount(() => [
      h('div', { id: 'anchor' }),
      h(
        SModal,
        {
          teleportTo: '#anchor',
          show: true,
          focusTrap: false,
        },
        { default: () => h('span', { 'data-cy': 'content' }) },
      ),
    ])

    cy.get('#anchor [data-cy=content]').should('exist')
  })

  it('No teleportation at all if target is null', () => {
    mount(() => [
      h('div', { 'data-cy': 'anchor' }, [
        h(
          SModal,
          {
            teleportTo: null,
            show: true,
            focusTrap: false,
          },
          { default: () => h('span', { 'data-cy': 'content' }) },
        ),
      ]),
    ])

    cy.get('[data-cy=anchor] [data-cy=content]').should('exist')
  })
})

describe('Classes & styles applying', () => {
  type GenStyle<T extends string> = { [K in `${T}Style`]: object }
  type GenClass<T extends string> = { [K in `${T}Class`]: object | string | string[] }
  type GenStyleClass<T extends string> = GenStyle<T> & GenClass<T>

  type Params = Partial<GenStyleClass<'root' | 'modal' | 'overlay'>>

  function mountFactory(params?: Params) {
    mount(() =>
      h(
        SModal,
        {
          ...params,
          show: true,
          focusTrap: false,
        },
        {
          default: () => 'Hey!',
        },
      ),
    )
  }

  type Case = [label: string, params: Params, assertionCb: () => void]

  function defineCases(cases: Case[]): Case[] {
    return cases
  }

  const CASES = defineCases([
    [
      'Root class',
      { rootClass: ['a', 'b', { c: true }] },
      () => cy.get('.s-modal__root').should('have.class', 'a b c'),
    ],
    [
      'Root style',
      { rootStyle: { zIndex: 55123 } },
      () => cy.get('.s-modal__root').should('have.css', 'zIndex', '55123'),
    ],
    ['Modal class', { modalClass: ['re ri rae'] }, () => cy.get('.s-modal__modal').should('have.class', 're ri rae')],
    [
      'Modal style',
      { modalStyle: { zIndex: 55123 } },
      () => cy.get('.s-modal__modal').should('have.css', 'zIndex', '55123'),
    ],
    [
      'Overlay class',
      { overlayClass: [{ a: false }, 're ri rae'] },
      () => cy.get('.s-modal__overlay').should('have.class', 're ri rae'),
    ],
    [
      'Overlay style',
      { overlayStyle: { zIndex: 55123 } },
      () => cy.get('.s-modal__overlay').should('have.css', 'zIndex', '55123'),
    ],
  ])

  for (const [label, params, assertion] of CASES) {
    it(label, () => {
      mountFactory(params)
      assertion()
    })
  }
})

describe('Modal API', () => {
  it('Modal closes via API call', () => {
    const ModalContent = defineComponent({
      setup() {
        const api = useSModalApi()

        return () =>
          h(
            'button',
            {
              onClick: () => api.close(),
            },
            'Close modal from inner slot',
          )
      },
    })

    const ModalMounter = defineComponent({
      setup() {
        const show = ref(false)

        return () => [
          `State: ${show.value ? 'opened' : 'closed'}`,
          h(
            'button',
            {
              onClick: () => {
                show.value = true
              },
            },
            'Open modal',
          ),
          h(
            SModal,
            {
              ...showVModel(show),
              focusTrap: false,
            },
            {
              default: () => h(ModalContent),
            },
          ),
        ]
      },
    })

    mount(ModalMounter)

    cy.contains('Open modal').click()
    cy.contains('Close modal from inner slot').click()
    cy.contains('State: closed')
  })
})

describe('Scroll Lock', () => {
  function mountFactory(params?: { lockScroll?: boolean }) {
    return mount({
      setup() {
        const show = ref(false)

        return () => [
          h(
            'button',
            {
              onClick: () => {
                show.value = true
              },
            },
            'toggle',
          ),
          h(
            'div',
            {
              style: {
                height: '9999px',
              },
            },
            'A very huge element',
          ),
          h(
            SModal,
            {
              ...showVModel(show),
              ...params,
              focusTrap: false,
              modalTransition: null,
            },
            {
              default: () => h('span', {}, 'Dip'),
            },
          ),
        ]
      },
    })
  }

  it('Locks scroll by default', () => {
    mountFactory()

    cy.get('body').should('have.css', 'overflowY', 'visible')
    cy.get('button').click()
    cy.get('body').should('have.css', 'overflowY', 'hidden')
  })

  it('No lock if related prop is false', () => {
    mountFactory({ lockScroll: false })

    cy.get('body').should('have.css', 'overflowY', 'visible')
    cy.get('button').click()
    cy.get('body').should('have.css', 'overflowY', 'visible')
  })
})

describe('Emitting of click:overlay', () => {
  function mountFactory(params?: { closeOnOverlayClick?: boolean }) {
    return mount({
      setup() {
        const emitted = ref(false)
        return () => [
          `Emitted: ${emitted.value}`,
          h(
            SModal,
            {
              ...params,
              show: true,
              focusTrap: false,
              'onClick:overlay': () => {
                emitted.value = true
              },
            },
            {
              default: () => '...',
            },
          ),
        ]
      },
    })
  }

  it('Emitted by default', () => {
    mountFactory()

    cy.get('.s-modal__overlay').click('top', { force: true })
    cy.contains('Emitted: true')
  })

  it('Emitted even with closeOnOverlayClick=false', () => {
    mountFactory({ closeOnOverlayClick: false })

    cy.get('.s-modal__overlay').click('top', { force: true })
    cy.contains('Emitted: true')
  })
})

it('Open-closed events', () => {
  const EMITTED: string[] = []

  function eventsPush(name: string) {
    EMITTED.push(name)
  }

  function eventsClear() {
    EMITTED.splice(0, 99)
  }

  mount({
    setup() {
      const show = ref(false)

      return () => [
        h(
          'button',
          {
            onClick: () => {
              show.value = true
            },
          },
          'Open',
        ),
        h(
          SModal,
          {
            ...showVModel(show),
            focusTrap: false,
            onBeforeOpen: () => eventsPush('before-open'),
            onAfterOpen: () => eventsPush('after-open'),
            onBeforeClose: () => eventsPush('before-close'),
            onAfterClose: () => eventsPush('after-close'),
          },
          {
            default: () =>
              h(
                'button',
                {
                  onClick: () => {
                    show.value = false
                  },
                },
                'Close',
              ),
          },
        ),
      ]
    },
  }).then(() => {
    cy.wrap(EMITTED).should('be.empty')
  })

  cy.contains('Open')
    .click()
    .then(() => {
      cy.wrap(EMITTED).should('deep.equal', ['before-open', 'after-open'])
    })
    .then(eventsClear)

  cy.contains('Close')
    .click()
    .then(() => {
      cy.wrap(EMITTED).should('deep.equal', ['before-close', 'after-close'])
    })
})

describe('Eagering', () => {
  const ROOT = 'cy-root'
  const OVERLAY = 'cy-overlay'
  const MODAL = 'cy-modal'

  function mountFactory(params?: { eager?: boolean }) {
    mount({
      components: { SModal },
      setup() {
        const show = ref(false)

        const bindings = {
          rootClass: ROOT,
          overlayClass: OVERLAY,
          modalClass: MODAL,
          teleportTo: null,
          focusTrap: false,
          overlayTransition: null,
          modalTransition: null,
          ...params,
        }

        return { show, bindings }
      },
      template: `
        Show: {{ show }}
  
        <button @click="show = true">Open</button>
  
        <div id="anchor">
          <SModal
            v-model:show="show"
            v-bind="bindings"
          >
            <button @click="show = false">Close</button>
          </SModal>
        </div>
      `,
    })
  }

  it('Non-eager rendering (default behavior)', () => {
    mountFactory()

    // nothing rendered
    cy.get('#anchor').children().should('have.length', 0)

    cy.contains('Open').click()

    // everything should be visible
    for (const fragmentClass of [ROOT, MODAL]) {
      cy.get(`#anchor .${fragmentClass}`).should('exist').and('be.visible')
    }
    cy.get(`#anchor .${OVERLAY}`).should('exist')

    cy.contains('Close').click()

    // everything should not exist
    for (const fragmentClass of [ROOT, OVERLAY, MODAL]) {
      cy.get(`#anchor .${fragmentClass}`).should('not.exist')
    }
  })

  it('Eager rendering', () => {
    mountFactory({ eager: true })

    cy.get(`#anchor .${ROOT}`).should('exist').and('not.be.visible')
    cy.get(`#anchor .${MODAL}`).should('exist')

    cy.contains('Open').click()

    cy.get(`#anchor .${MODAL}`).should('be.visible')

    cy.contains('Close').click()

    cy.contains('Show: false')
    cy.get(`#anchor .${ROOT}`).should('exist').and('not.be.visible')
    cy.get(`#anchor .${MODAL}`).should('exist').and('not.be.visible')
  })
})
