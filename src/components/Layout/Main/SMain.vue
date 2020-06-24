<template>
  <el-main>
    <slot></slot>
  </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SMain extends Vue {
}
</script>

<style lang="scss">
.el-main {
  padding: 32px;
}
</style>
