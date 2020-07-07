<template>
  <el-menu></el-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide, Inject } from 'vue-property-decorator'
import { InjectOptions } from 'vue/types/options'

@Component
export default class SMenu extends Vue {
  @Provide('rootMenu') rootMenu = () => this.$children[0]

  mounted (): void {
    console.log(this.$children[0], this.rootMenu())
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

</style>
