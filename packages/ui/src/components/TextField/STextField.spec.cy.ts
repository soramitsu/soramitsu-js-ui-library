import { Status } from '@/types'
import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { STextField } from './index'

const findInput = () => cy.get('input')
const findLabel = () => cy.get('label')
const findCounter = () => cy.get('[data-testid=counter]')
const findMsg = () => cy.get('[data-testid=message]')
const findEye = () => cy.get('[data-testid=eye]')

before(() => {
  config.global.components = { STextField }
})

after(() => {
  config.global.components = {}
})

it('Playground', () => {
  mount({
    setup() {
      const model = ref('Lorem ipsum')
      const statuses = [null, Status.Warning, Status.Error, Status.Success]

      return {
        model,
        statuses,
      }
    },
    template: `
      <div class="p-4 grid gap-4 grid-cols-2">
        <STextField
          v-for="(x, i) in statuses"
          :key="i"
          v-model="model"
          :status="x"
        >
          <template #label>
            Status: {{ x || 'default' }}
          </template>
        </STextField>
      </div>
    `,
  })

  // TODO make snapshot?
})

it('Events are emitted from input', () => {
  mount({
    setup() {
      const focused = ref(false)

      return { focused }
    },
    template: `
      Focused: {{ focused }}

      <STextField
        @blur="focused = false"
        @focus="focused = true"
      />
    `,
  })

  findInput().focus()
  cy.contains('Focused: true')
  findInput().blur()
  cy.contains('Focused: false')
})

it('Input changes its value even if modelValue is not set', () => {
  mount({
    template: `<STextField />`,
  })

  findInput().type('henno').should('have.value', 'henno')
})

describe('Counter', () => {
  it('Displays counter with a limit', () => {
    mount({
      template: `<STextField counter="5" model-value="Google" />`,
    })

    findCounter().should('have.text', '6/5')
  })

  it('Displays counter without a limit', () => {
    mount({
      template: `<STextField counter model-value="Google" />`,
    })

    findCounter().should('have.text', '6')
  })
})

describe('Label', () => {
  it('Works via prop', () => {
    mount({
      template: `<STextField label="Hey" />`,
    })

    findLabel().should('have.text', 'Hey')
  })

  it('Works via slot', () => {
    mount({
      template: `
        <STextField>
          <template #label>Umm?</template>
        </STextField>
      `,
    })

    findLabel().should('have.text', 'Umm?')
  })
})

describe('Status message', () => {
  it('Not shown by default', () => {
    mount({
      template: `<STextField />`,
    })

    findMsg().should('not.exist')
  })

  it('Shown if prop is set', () => {
    mount({
      template: `<STextField message="foo" />`,
    })

    findMsg().contains('foo')
  })

  it('Shown if slot is defined', () => {
    mount({
      template: `
        <STextField>
          <template #message>bar</template>
        </STextField>
      `,
    })

    findMsg().contains('bar')
  })
})

describe('Password input', () => {
  it("Eye is shown and toggles input's type", () => {
    mount({
      template: `<STextField password />`,
    })

    const inputTypeShouldBe = (type: string) => findInput().should('have.attr', 'type', type)

    inputTypeShouldBe('password')
    findEye().should('exist').click()
    inputTypeShouldBe('text')
    findEye().click()
    inputTypeShouldBe('password')
  })

  it('Eye is not shown if `no-eye` prop is set', () => {
    mount({
      template: `<STextField password no-eye />`,
    })

    findEye().should('not.exist')
  })
})

it('disabled=true => input itself is disabled too', () => {
  mount({ template: `<STextField disabled />` })

  findInput().should('be.disabled')
})

it('`id` - it is set correctly', () => {
  mount({
    template: `<STextField id="email" />`,
  })

  findInput().should('have.id', 'email')
  findLabel().should('have.attr', 'for', 'email')
})

it('Autofocus works', () => {
  mount({ template: `<STextField autofocus />` })
  findInput().should('have.attr', 'autofocus')
})
