<template>
  <s-aside></s-aside>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SAside extends Vue {
  @Prop({ default: '', type: String }) readonly type!: string
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

</style>
