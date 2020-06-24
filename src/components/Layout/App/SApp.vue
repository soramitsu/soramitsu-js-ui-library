<template>
  <s-container>
    <s-aside v-if="!!this.$slots.aside">
      <slot name="aside" />
    </s-aside>
    <s-container>
      <s-header v-if="!!this.$slots.header">
        <slot name="header" />
      </s-header>
      <s-main v-if="!!this.$slots.main">
        <slot name="main" />
      </s-main>
      <s-footer v-if="!!this.$slots.footer">
        <slot name="footer" />
      </s-footer>
    </s-container>
  </s-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { SAside } from '../Aside'
import { SContainer, ContainerDirection } from '../Container'
import { SFooter } from '../Footer'
import { SHeader } from '../Header'
import { SMain } from '../Main'

@Component({
  components: {
    SAside,
    SContainer,
    SFooter,
    SHeader,
    SMain
  }
})
export default class SApp extends Vue {
  readonly ContainerDirection = ContainerDirection
}
</script>
