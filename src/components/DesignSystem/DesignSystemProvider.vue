<template>
  <div class="design-system-provider">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import { DesignSystemTypes } from './consts'

@Component
export default class DesignSystemProvider extends Vue {
  @Prop({ default: DesignSystemTypes.DEFAULT, type: String }) readonly value!: string
  @Provide('designSystem') designSystem = this
}
</script>
