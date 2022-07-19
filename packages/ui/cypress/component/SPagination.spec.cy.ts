import { mount } from '@cypress/vue'
import { SPagination } from '@/lib'
import { config } from '@vue/test-utils'

const testIdSelector = (id: string) => `[data-testid=${id}]`

before(() => {
  config.global.components = { SPagination }
})

after(() => {
  config.global.components = {}
})

describe('Pagination', () => {
  const TOTAL = 202

  const getCustomProgressText = (firstItemNum: number, lastItemNum: number, total: number) => {
    return `shown ${firstItemNum} from ${lastItemNum} of ${total}`
  }

  context(`Given pagination`, () => {
    beforeEach(() => {
      mount({
        setup() {
          return {
            total: TOTAL,
            getCustomProgressText,
          }
        },
        template: `
          <SPagination
            :total="total"
            :page-sizes="[10, 20, 100, 200, 500]"
          >
            <template #progress="{ firstItemNum, lastItemNum, total }">
              {{ getCustomProgressText(firstItemNum, lastItemNum, total) }}
            </template>
          </SPagination>`,
      })
    })

    context('When it is initiated', () => {
      it(`Then there are custom text showing pagination progress in 'progress' slot`, () => {
        const customProgressText = getCustomProgressText(1, 10, TOTAL)

        cy.get(testIdSelector('pagination-progress')).should('contain.text', customProgressText)
      })

      it(`Then there are controls block`, () => {
        cy.get(testIdSelector('pagination-controls')).should('exist')
      })
    })
  })

  context(`Given pagination with a few pages`, () => {
    beforeEach(() => {
      mount({
        setup() {
          return {
            total: TOTAL,
          }
        },
        template: `
          <SPagination
            :total="total"
            :page-sizes="[100]"
          />`,
      })
    })

    context('When it is initiated', () => {
      it(`Then there are no controls block`, () => {
        cy.get(testIdSelector('pagination-controls')).should('not.exist')
      })
    })
  })
})
