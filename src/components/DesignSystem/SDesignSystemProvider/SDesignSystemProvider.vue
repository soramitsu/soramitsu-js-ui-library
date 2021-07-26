<template>
  <div class="design-system-provider">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Watch } from 'vue-property-decorator'

import { DesignSystemProvideKey } from '../consts'
import DesignSystem from '../../../types/DesignSystem'

@Component
export default class SDesignSystemProvider extends Vue {
  @Prop({ default: DesignSystem.DEFAULT, type: String }) readonly value!: string

  @Provide(DesignSystemProvideKey) providedObject = {
    value: DesignSystem.DEFAULT
  }

  @Watch('value', { immediate: true })
  onValueChange (newValue: DesignSystem) {
    this.providedObject.value = newValue
  }
}
</script>

<style lang="scss" scoped>
.design-system-provider {
  flex: 1;
  width: 100%;
}
</style>
