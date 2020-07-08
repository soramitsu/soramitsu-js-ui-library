import { SRow, SCol, SMain } from '../../components'

export default {
  title: 'Design System/Layout',
  excludeStories: /.*Data$/
}

export const layoutStylesData = {
  bgPurple: {
    background: '#d3dce6'
  },
  bgPurpleLight: {
    background: '#e5e9f2'
  },
  gridContent: {
    borderRadius: '4px',
    minHeight: '36px'
  },
  rowBg: {
    padding: '10px',
    backgroundColor: '#f9fafc'
  }
}
export const basicLayout = () => ({
  components: { SRow, SCol, SMain },
  template: `<s-main>
               <s-row :style="[rowBg]">
                 <s-col :span="12"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row :style="[rowBg]">
                 <s-col :span="6"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="6"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
               </s-row>
               <s-row :style="[rowBg]">
                 <s-col :span="4"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="4"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="4"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
               </s-row>
               <s-row :style="[rowBg]">
                 <s-col :span="2"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="2"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="2"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="2"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="2"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="2"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
               </s-row>
               <s-row :style="[rowBg]">
                 <s-col :span="1"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="1"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
               </s-row>
             </s-main>`,
  data: () => layoutStylesData
})

export const columnSpacing = () => ({
  components: { SRow, SCol, SMain },
  template: `<s-main>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
             </s-main>`,
  data: () => layoutStylesData
})

export const hybridLayout = () => ({
  components: { SRow, SCol, SMain },
  template: `<s-main>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="8"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="4"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="4"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="4"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="2"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="2"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="2"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="8"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="2"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
             </s-main>`,
  data: () => layoutStylesData
})

export const columnOffset = () => ({
  components: { SRow, SCol, SMain },
  template: `<s-main>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3" :offset="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="3" :offset="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3" :offset="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="6" :offset="6"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
             </s-main>`,
  data: () => layoutStylesData
})

export const rowAlignment = () => ({
  components: { SRow, SCol, SMain },
  template: `<s-main>
               <s-row flex :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row flex justify="center" :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row flex justify="end" :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row flex justify="space-between" :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
               <s-row flex justify="space-around" :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
             </s-main>`,
  data: () => layoutStylesData
})

export const responsiveLayout = () => ({
  components: { SRow, SCol, SMain },
  template: `<s-main>
               <s-row :gutter="10" :style="[rowBg]">
                 <s-col :xs="5" :sm="4" :md="3" :lg="2" :xl="1"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :xs="2" :sm="4" :md="4" :lg="8" :xl="10"><div :style="[gridContent, bgPurpleLight]"></div></s-col>
                 <s-col :xs="5" :sm="4" :md="3" :lg="2" :xl="1"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
             </s-main>`,
  data: () => layoutStylesData
})
