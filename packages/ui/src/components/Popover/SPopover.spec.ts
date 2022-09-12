import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SPopover from './SPopover'

test('Throws an error if no trigger slot', () => {
  expect(() =>
    mount({
      components: { SPopover },
      template: `<SPopover />`,
    }),
  ).toThrowErrorMatchingInlineSnapshot('"\\"trigger\\" slot is required"')
})

test('Throws an error if trigger slot is not a single element', () => {
  expect(() =>
    mount({
      components: { SPopover },
      template: `
      <SPopover>
        <template #trigger>
          <span>A</span>
          <span>B</span>
        </template>
      </SPopover>
    `,
    }),
  ).toThrowErrorMatchingInlineSnapshot('"\\"trigger\\" slot should render exact 1 element"')
})

test('Throws an error if popper slot renders more than 1 element', () => {
  expect(() =>
    mount({
      components: { SPopover },
      template: `
      <SPopover>
        <template #trigger>
          <span>A</span>
        </template>

        <template #popper>
          <span>A</span>
          <span>B</span>
        </template>
      </SPopover>
    `,
    }),
  ).toThrowErrorMatchingInlineSnapshot('"\\"popper\\" slot should return either nothing or the only 1 element"')
})
