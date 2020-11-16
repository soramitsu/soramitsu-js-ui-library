import { Vue, Component } from 'vue-property-decorator'
import { Size, BorderRadius } from '../types'

@Component
export default class StandardPropsMixin extends Vue {
  isStandardSize (size: string): boolean {
    return (Object.values(Size) as Array<string>).includes(size)
  }

  getComponentSize (size: string): string {
    if (size === Size.BIG || !this.isStandardSize(size)) {
      return ''
    }
    return size
  }

  isStandardBorderRadius (borderRadius: string): boolean {
    return (Object.values(BorderRadius) as Array<string>).includes(borderRadius)
  }
}
