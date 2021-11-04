import { mount } from '@cypress/vue'
import SSelectBase from './SSelectBase.vue'
import SSelectButton from './SSelectButton.vue'
import { ref } from 'vue'
import SSelectDropdown from './SSelectDropdown.vue'

it('Mounting bare-metal SSelectBase', () => {
  const model = ref<string[]>([])

  mount(() => (
    <div>
      Model: {model.value.join(', ')}

      <SSelectBase
        options={[{ label: 'Aaaa', value: 'a' }, { label: "Bbbb", value: 'b' }]}
        v-model={model.value}
        multiple
        v-slots={{
          control: () => (
            <SSelectButton v-slots={{
              label: () => 'My label'
            }} />
          ),
          dropdown: () => <SSelectDropdown />
        }}
      />
    </div>
  ), {
    global: {
      stubs: {
        transition: false,
        'transition-group': false,
      },
    },
  })
})
