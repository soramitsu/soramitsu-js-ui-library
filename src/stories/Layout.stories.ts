import { text, boolean, select, withKnobs } from '@storybook/addon-knobs'

import { SApp } from '../components'

export default {
  component: SApp,
  title: 'Design System/Layout',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const withAllSection = () => ({
  components: { SApp },
  template: `<s-app>
               <template #aside>
                 <div style="
                   height: 100%;
                   background-color: #2D2926;
                   color: #fff;
                   text-align: center;
                   padding-top: 45%;
                 ">
                   Menu
                 </div>
               </template>
               <template #header>Header</template>
               <template #main>Main</template>
               <template #footer>Footer</template>
             </s-app>`
})

export const withoutMenu = () => ({
  components: { SApp },
  template: `<s-app>
               <template #header>Header</template>
               <template #main>Main</template>
               <template #footer>Footer</template>
             </s-app>`
})

export const withoutFooterSection = () => ({
  components: { SApp },
  template: `<s-app>
               <template #aside>
                 <div style="
                   height: 100%;
                   background-color: #2D2926;
                   color: #fff;
                   text-align: center;
                   padding-top: 60px;
                 ">
                   Menu
                 </div>
               </template>
               <template #header>Header</template>
               <template #main>Main</template>
             </s-app>`
})
