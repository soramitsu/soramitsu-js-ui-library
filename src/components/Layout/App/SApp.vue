<template>
  <s-container class="s-app">
    <s-aside v-if="this.$slots.aside" :width="asideWidth">
      <slot name="aside" />
    </s-aside>
    <s-container>
      <s-header v-if="this.$slots.header" :height="headerHeight">
        <slot name="header" />
      </s-header>
      <slot></slot>
      <s-main v-if="this.$slots.main">
        <slot name="main" />
      </s-main>
      <s-footer v-if="this.$slots.footer" :height="footerHeight">
        <slot name="footer" />
      </s-footer>
    </s-container>
  </s-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { SAside } from '../Aside'
import { SContainer } from '../Container'
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
  /**
   * Width of aside component. Default value is `"196px"`.
   *
   * In this context, the value of the width property must match the valid value of the
   * **CSS width** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ default: '196px', type: String }) readonly asideWidth!: string
  /**
   * Height of the header component. Default value is `"56px"`.
   *
   * In this context, the value of the height property must match the valid value of the
   * **CSS height** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ default: '56px', type: String }) readonly headerHeight!: string
  /**
   * Height of the footer component. Default value is `"56px"`.
   *
   * In this context, the value of the height property must match the valid value of the
   * **CSS height** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ default: '56px', type: String }) readonly footerHeight!: string
}
</script>

<style lang="scss">
.s-app {
  height: 100%;
}
</style>
