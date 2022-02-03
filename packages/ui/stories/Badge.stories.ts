import { Meta } from '@storybook/vue3'
import { SBadge } from '@/lib'
import { defineStory } from './util'
import { BadgeType, BadgeTypes } from '../src/components/Badge/types'

const meta: Meta = {
  title: 'Example/Badge',
}

export default meta

interface Args {
  type?: BadgeType
  colorBackground?: boolean
  withBorder?: boolean
  onlyMarker?: boolean
}

const configurableStory = (args: Args) => ({
  components: { SBadge },
  template: `<SBadge  :type="args.type" :colorBackground ="args.colorBackground"
  :onlyMarker="args.onlyMarker"
  :withBorder="args.withBorder"> {{args.slotTitle}}
  </SBadge>`,
  setup() {
    return { args }
  },
})

export const configurable = configurableStory.bind({})
configurable.args = {
  type: 'active',
  withBorder: false,
  colorBackground: false,
  onlyMarker: false,
  slotTitle: 'badge',
}

const badgeTypeValues = Object.values(BadgeTypes).filter((t) => typeof t === 'string')

configurable.argTypes = {
  type: {
    options: badgeTypeValues,
    control: { type: 'select' },
  },
}

export const DifferentStatuses = defineStory(() => ({
  components: { SBadge },
  template: `
    <div class="grid grid-cols-3 gap-4 w-max">
      <SBadge
        type="active"> active
      </SBadge>
      <SBadge 
        type="error"> error
      </SBadge>
      <SBadge 
        type="warning"> warning
      </SBadge>
      <SBadge 
        type="info"> info
      </SBadge>
      <SBadge 
        type="debug"> debug
      </SBadge>
      <SBadge 
        type="pending"> pending
      </SBadge>
    </div>
  `,
}))

export const onlyMarker = defineStory(() => ({
  components: { SBadge },
  template: `
    <div class="grid grid-cols-3 gap-4 w-max">
      <SBadge
        :onlyMarker="true"
        type="active"> active
      </SBadge>
      <SBadge
        :onlyMarker="true" 
        type="error"> error
      </SBadge>
      <SBadge
        :onlyMarker="true" 
        type="warning"> warning
      </SBadge>
      <SBadge
        :onlyMarker="true" 
        type="info"> info
      </SBadge>
      <SBadge
        :onlyMarker="true" 
        type="debug"> debug
      </SBadge>
      <SBadge
        :onlyMarker="true" 
        type="pending"> pending
      </SBadge>
    </div>
  `,
}))

export const withColorBackground = defineStory(() => ({
  components: { SBadge },
  template: `
    <div class="grid grid-cols-3 gap-4 w-max">
      <SBadge
        :colorBackground="true"
        type="active"> active
      </SBadge>
      <SBadge
        :colorBackground="true" 
        type="error"> error
      </SBadge>
      <SBadge
        :colorBackground="true" 
        type="warning"> warning
      </SBadge>
      <SBadge
        :colorBackground="true" 
        type="info"> info
      </SBadge>
      <SBadge
        :colorBackground="true" 
        type="debug"> debug
      </SBadge>
      <SBadge
        :colorBackground="true" 
        type="pending"> pending
      </SBadge>
    </div>
  `,
}))

export const withBorder = defineStory(() => ({
  components: { SBadge },
  template: `
    <div class="grid grid-cols-3 gap-4 w-max">
      <SBadge
        :withBorder="true"
        type="active"> active
      </SBadge>
      <SBadge
        :withBorder="true" 
        type="error"> error
      </SBadge>
      <SBadge
        :withBorder="true" 
        type="warning"> warning
      </SBadge>
      <SBadge
        :withBorder="true" 
        type="info"> info
      </SBadge>
      <SBadge
        :withBorder="true" 
        type="debug"> debug
      </SBadge>
      <SBadge
        :withBorder="true" 
        type="pending"> pending
      </SBadge>
    </div>
  `,
}))
