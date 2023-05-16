import { SSelect } from '@/lib'

describe('SSelect', () => {
  beforeEach(() => {
    cy.mount({
      components: { SSelect },
      setup() {
        const options: { key: number; label: string; disabled?: boolean }[] = [
          { key: 1, label: 'Mark' },
          { key: 2, label: 'Jane' },
          { key: 3, label: 'Cloc', disabled: true },
          { key: 4, label: 'Rela' },
        ]

        const model = ref(undefined)

        const multiple = ref(false)

        return { options, model, multiple }
      },
      template: `
        <div class="p-4">
          <SSelect
            v-model="model"
            :options="options"
            option-get-disabled="disabled"
            option-get-key="key"
            option-get-label="label"
            :multiple="multiple"
          >
            <template #label>
              Name
            </template>
          </SSelect>
        
          {{ model }}
        
          <label>
            <input type="checkbox" v-model="multiple">
            Multiple
          </label>
        </div>
      `,
    })
  })

  it('play', () => {})
})
