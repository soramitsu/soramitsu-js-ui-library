import { shallowMount } from '@vue/test-utils'

import { SButton } from '@/components'
import { ButtonTypes } from '@/components/Button'

describe('SButton.vue', () => {
  it('renders props.type when passed', () => {
    const type = ButtonTypes.PRIMARY
    const wrapper = shallowMount(SButton, {
      propsData: { type: ButtonTypes.PRIMARY }
    })
    expect((wrapper.element.firstChild as any).className).toContain(type)
  })
})
