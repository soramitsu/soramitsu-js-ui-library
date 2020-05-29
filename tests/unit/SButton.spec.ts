import { shallowMount } from '@vue/test-utils'

import { SButton } from '@/components/SButton'

describe('SButton.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(SButton, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
