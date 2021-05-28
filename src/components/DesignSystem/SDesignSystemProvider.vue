<template>
  <div class="design-system-provider">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import { DesignSystemTypes, DesignSystemProvideKey } from './consts'

@Component
export default class SDesignSystemProvider extends Vue {
  @Prop({ default: DesignSystemTypes.DEFAULT, type: String }) readonly value!: string
  @Provide(DesignSystemProvideKey) designSystem = this
}
</script>
