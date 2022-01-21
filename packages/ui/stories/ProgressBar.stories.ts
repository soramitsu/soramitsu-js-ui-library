import { Meta } from '@storybook/vue3'
import { SProgressBar } from '@/lib'

const meta: Meta = {
  title: 'Example/ProgressBar',
}

export default meta

interface Args {
  percent?: number
  lineHeight?: string
  barColor?: string
  activeBarColor?: string
}


const configurableStory = (args: Args) => ({
  components: { SProgressBar },
  template: `<div class="w-1/4"><SProgressBar  :percent="percent"
      :lineHeight="lineHeight">
  </SProgressBar></div>`,
  setup() {
    const {percent, lineHeight} = args;
    return { percent, lineHeight};
  }
})

export const configurable = configurableStory.bind({});
configurable.args = {
  percent: 50,
  lineHeight: 2
  }


const demoStory = (args: Args) => ({
  components: { SProgressBar },
  template: `<div class="w-1/4"><SProgressBar  :percent="loadingStatus"
      :lineHeight="lineHeight">
  </SProgressBar></div>`,
  setup() {
    const { lineHeight } = args;
    let loadingStatus = ref(0);
    const interval = setInterval(async ()=> {
      loadingStatus.value++;
      if (loadingStatus.value===100) {
        await new Promise(r => {setTimeout(r, 1000)});
        loadingStatus.value = 0;
      }
    }, 10)
    return { loadingStatus, lineHeight };
  }
})

export const demo = demoStory.bind({});

demo.args = {
  lineHeight: 2
  }
