import { defineMeta, defineStory } from './util'
import { SAccordionItem, SAccordion } from '@/lib'
import { Ref } from 'vue';

export default defineMeta({
  title: 'Example/Accordion'
})

export const AccordionItem = defineStory((args: Record<string, unknown>) =>  ({
  components: {
    SAccordionItem,
  },
  setup() {
    return {
      args,
      model: ref(false)
    }
  },
  template: `
    <SAccordionItem v-bind="args" v-model="model">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur.
    </SAccordionItem>
  `
}))
AccordionItem.argTypes = {
  title: { control: 'text' },
  subtitle: { control: 'text' },
}
AccordionItem.args = {
  title: 'Accordion item',
  subtitle: 'Accordion item description',
}

export const Accordion = defineStory((args: Record<string, unknown>) =>  ({
  components: {
    SAccordionItem,
    SAccordion
  },
  setup() {
    const selectedStr = ref('item2 item1');
    let modelValue: Ref<string[]> = ref([])

    watch(selectedStr, () => {
      modelValue.value = selectedStr.value.split(' ')
    }, { immediate: true })

    return {
      args,
      selectedStr,
      modelValue
    }
  },
  template: `
    <input class="border mb-4 w-500px" v-model="selectedStr">
    <SAccordion v-model="modelValue" v-bind="args">
      <SAccordionItem v-for="i in 5" :name="'item' + i">
        <template #title>Item {{ i }}</template>
        <template #subtitle>{{ i }} item</template>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur.
      </SAccordionItem>
      <SAccordionItem>
        <template #title>Nameless</template>
        <template #subtitle>Nameless item</template>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur.
      </SAccordionItem>
    </SAccordion>
  `
}))
Accordion.argTypes = {
  multiple: { control: 'boolean' }
}
Accordion.args = {
  multiple: true
}
