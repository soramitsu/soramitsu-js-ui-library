<template>
  <div class="design-system-provider">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import { DesignSystemProvideKey } from './consts'
import { DesignSystemTypes } from '../../utils/DesignSystem'

@Component
export default class SDesignSystemProvider extends Vue {
  @Prop({ default: DesignSystemTypes.DEFAULT, type: String }) readonly value!: string
  @Provide(DesignSystemProvideKey) designSystem = this
}
</script>

<style lang="scss" scoped>
.design-system-provider {
  flex: 1;
  width: 100%;
}
</style>
