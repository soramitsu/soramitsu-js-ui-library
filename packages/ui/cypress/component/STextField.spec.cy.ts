import { Status } from '@/types'
import { mount } from '@cypress/vue'
import { config } from '@vue/test-utils'
import { STextField } from '@/lib'

const findInput = () => cy.get('input')
const findLabel = () => cy.get('label')
const findCounter = () => cy.get('[data-testid=counter]')
const findMsg = () => cy.get('[data-testid=message]')
const findEye = () => cy.get('[data-testid=eye]')
const findAppend = () => cy.get('[data-testid=append]')

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

describe('Modeling extensions', () => {
  it('Input does not change its value when prop is not updated', () => {
    mount({
      template: `<STextField />`,
    })

    findInput().type('henno').should('have.value', '')
  })

  it('Input changes its value when prop is not updated BUT strict sync is disabled', () => {
    mount({
      template: `<STextField no-model-value-strict-sync />`,
    })

    findInput().type('henno').should('have.value', 'henno')
  })

  it('Input value does not change if upstream modelValue has not been changed', () => {
    mount({
      setup() {
        const nums = ref('')

        function updateNums(val: string) {
          if (/^\d+$/.test(val)) {
            nums.value = val
          }
        }

        return { nums, updateNums }
      },
      template: `
        <STextField
          :model-value="nums"
          @update:model-value="updateNums"
        />

        <span id="assert">{{ nums }}</span>
      `,
    })

    findInput().type('123fff').should('have.value', '123')
    cy.get('#assert').should('have.text', '123')
  })
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

  it('Conditional slot works', () => {
    mount({
      setup() {
        return {
          showSlot: ref(false),
        }
      },
      template: `
        <input type="checkbox" v-model="showSlot">

        <STextField>
          <template #message v-if="showSlot">
            Conditional message
          </template>
        </STextField>
      `,
    })

    findMsg().should('not.exist')
    cy.get('input[type=checkbox]').click()
    findMsg().should('exist')
    cy.get('input[type=checkbox]').click()
    findMsg().should('not.exist')
  })
})

describe('Append slot', () => {
  it('No append if no slot', () => {
    mount(() => h(STextField))

    findAppend().should('not.exist')
  })

  it('Rendered with eye', () => {
    mount(() =>
      h(
        STextField,
        { password: true },
        {
          append: () => 'Anchor',
        },
      ),
    )

    findAppend().within(() => {
      findEye()
      cy.contains('Anchor')
    })
  })

  it('Rendered with counter', () => {
    mount(() =>
      h(
        STextField,
        { counter: 20 },
        {
          append: () => 'Hey',
        },
      ),
    )

    findAppend().within(() => {
      findCounter()
      cy.contains('Hey')
    })
  })

  it('Conditional slot works', () => {
    mount({
      setup() {
        return {
          showSlot: ref(false),
        }
      },
      template: `
        <input type="checkbox" v-model="showSlot">
    
        <STextField>
          <template #append v-if="showSlot">
            He
          </template>
        </STextField>
      `,
    })

    findAppend().should('not.exist')
    cy.get('input[type=checkbox]').click()
    findAppend().should('exist')
    cy.get('input[type=checkbox]').click()
    findAppend().should('not.exist')
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
