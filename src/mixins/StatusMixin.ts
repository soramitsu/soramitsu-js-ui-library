import { Vue, Component, Prop } from 'vue-property-decorator'

import { Status } from '../types'

@Component
export default class StatusMixin extends Vue {
  /**
   * Status of component. Possible values: `"default"`, `"success"`, `"warning"`, `"error"`.
   *
   * By default it's set to `"default"`
   */
  @Prop({ default: Status.DEFAULT }) status!: string

  get isStandardStatus (): boolean {
    return (Object.values(Status) as Array<string>).includes(this.status)
  }

  get statusClass (): string {
    return this.isStandardStatus ? `s-status-${this.status}` : ''
  }
}
