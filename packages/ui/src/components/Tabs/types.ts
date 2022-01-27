import { Ref } from 'vue'

export interface InjectData {
  active: Ref<number>
  tabs: Ref<any[]>
  selectTab: (tab: number) => void
}
