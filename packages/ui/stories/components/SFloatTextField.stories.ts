import { SFloatTextField } from '@/lib'
import { IconCopy, IconQuestion } from '@/components/icons'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  component: defineComponent({
    components: { SFloatTextField, IconCopy, IconQuestion },
    props: ['modelValue', 'oneIcon', 'twoIcons', 'isValidationsList', 'top', 'bottom', 'left', 'right', 'decimals', 'max'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const model = useVModel(props, 'modelValue', emit, { passive: true })

      function validations(value: string) {
        return [
          { rule: /[a-z]/.test(value), message: 'At least 1 lowercase letter' },
          { rule: /\d/.test(value), message: 'At least 1 digit' },
          { rule: /[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~\\-]/.test(value), message: 'At least 1 special character' }
        ]
      }

      const validationsList = computed(() => {
        if (!props.isValidationsList) return null
        return {
          validations: validations(model.value).map(v => ({ isMatching: v.rule, ...v })),
          title: 'String must contain:',
          showOnFocusOnly: true
        }
      })

      return { model, validationsList }
    },
    template: `
      <SFloatTextField
        v-model="model"
        v-bind="$attrs"
        :validations-list="validationsList"
        :decimals="decimals"
        :max="max"
      >
        <!-- Top slot -->
        <template #top v-if="top">{{ top }}</template>

        <!-- Bottom slot -->
        <template #bottom v-if="bottom">{{ bottom }}</template>

        <!-- Left slot -->
        <template #left v-if="left">{{ left }}</template>

        <!-- Right slot -->
        <template #right v-if="right">{{ right }}</template>

        <!-- Append slot -->
        <template #append v-if="twoIcons || oneIcon">
          <IconCopy />
          <IconQuestion v-if="twoIcons" />
        </template>
      </SFloatTextField>
    `,
  }),
  decorators: [
    () => ({
      template: `
        <div class="w-max">
          <story />
        </div>
      `,
    }),
  ],
  args: {
    label: 'Float Text',
    top: '',
    bottom: '',
    left: '',
    right: '',
    decimals: 2,
    max: '100000',
  },
  argTypes: {
    top: { control: 'text' },
    bottom: { control: 'text' },
    left: { control: 'text' },
    right: { control: 'text' },
    decimals: { control: { type: 'number', min: 0 }, defaultValue: 2 },
    max: { control: { type: 'text' }, defaultValue: '100000' },
  },
} as Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}