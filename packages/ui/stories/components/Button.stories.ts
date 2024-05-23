import { SButton, BUTTON_TYPE_VALUES, BUTTON_SIZE_VALUES, BUTTON_ICON_POSITION_VALUES } from '@/lib'
import { IconClose,IconBasicCirclePlus24, IconBasicCircleX24, IconBasicEye24, } from '@/components/icons'
import type { Meta } from '@storybook/vue3'

export default {
  component: defineComponent({
    components: { SButton, IconClose,IconBasicCirclePlus24,IconBasicCircleX24, IconBasicEye24 },
    template: `
      <div class="flex flex-col items-start space-y-4">
        <SButton v-bind="$attrs">
          <template #icon>
            <IconClose
            />
          </template>
          {{ $attrs.type }}
        </SButton>
        <SButton v-bind="$attrs" type="primary" :alternative="true">
          Primary Alternative
        </SButton>
        <SButton v-bind="$attrs" type="secondary">
          Secondary
        </SButton>
         <SButton v-bind="$attrs" type="tertiary">
          Tertiary
        </SButton>
        <s-col >
          <s-button-group size="big" border-radius="big" style="margin-right: 24px;">
            <SButton v-bind="$attrs" type="action">
              <template #icon>
                <IconBasicCirclePlus24 style="width: 1em; height: 1em;"/>
              </template>
            </SButton>
            <SButton v-bind="$attrs" type="action">
              <template #icon>
                <IconBasicCircleX24 style="width: 1em; height: 1em;" />
              </template>
            </SButton>
            <SButton v-bind="$attrs" type="action">
              <template #icon>
                <IconBasicEye24 style="width: 1em; height: 1em;" />
              </template>
            </SButton>
          </s-button-group>
          <s-button-group size="big" border-radius="big" style="margin-right: 24px;">
            <SButton v-bind="$attrs" type="action" :alternative="true">
              <template #icon>
                <IconBasicCirclePlus24 style="width: 1em; height: 1em;"/>
              </template>
            </SButton>
            <SButton v-bind="$attrs" type="action" :alternative="true">
              <template #icon>
                <IconBasicCircleX24 style="width: 1em; height: 1em;" />
              </template>
            </SButton>
            <SButton v-bind="$attrs" type="action" :alternative="true">
              <template #icon>
                <IconBasicEye24 style="width: 1em; height: 1em;" />
              </template>
            </SButton>
          </s-button-group>
          <s-button-group size="big" border-radius="big" style="margin-right: 24px; gap: 10px">
            <SButton v-bind="$attrs" type="action" :primary="true">
              <template #icon>
                <IconBasicCirclePlus24 style="width: 1em; height: 1em;"/>
              </template>
            </SButton>
            <SButton v-bind="$attrs" type="action" :primary="true" style="margin-right: 4px; margin-left: 4px">
              <template #icon>
                <IconBasicCircleX24 style="width: 1em; height: 1em;" />
              </template>
            </SButton>
            <SButton v-bind="$attrs" type="action" :primary="true">
              <template #icon>
                <IconBasicEye24 style="width: 1em; height: 1em;" />
              </template>
            </SButton>
          </s-button-group>
        </s-col>
      </div>
    `,
  }),
  args: {
    type: 'primary',
    size: 'md',
    icon: '',
    iconPosition: 'left',
    disabled: false,
    rounded: false,
    loading: false,
    uppercase: false,
    alternative: false,
    primary: false,
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: BUTTON_TYPE_VALUES,
    },
    size: {
      control: 'inline-radio',
      options: BUTTON_SIZE_VALUES,
    },
    icon: { control: 'text' },
    iconPosition: {
      control: 'inline-radio',
      options: BUTTON_ICON_POSITION_VALUES,
    },
    disabled: { control: 'boolean' },
    rounded: { control: 'boolean' },
    loading: { control: 'boolean' },
    uppercase: { control: 'boolean' },
    alternative: { control: 'boolean' }, // Add alternative prop control
  },
} as Meta

export const Default = {}
