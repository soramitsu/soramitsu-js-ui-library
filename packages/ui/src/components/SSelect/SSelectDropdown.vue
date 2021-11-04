<script setup lang="ts">
import { useSSelectApi } from './api'
import { SSelectItemType } from './types'
import SSelectItem from './SSelectItem.vue'

const api = useSSelectApi()

const ITEM_TYPE = SSelectItemType.Check
</script>

<template>
  <div class="bg-utility-surface rounded overflow-hidden shadow-dropdown">
    <SSelectItem
      v-for="(opt, i) in api.options"
      :key="i"
      :type="ITEM_TYPE"
      :selected="api.isValueSelected(opt.value)"
      @toggle="api.toggleSelection(opt.value)"
    >
      {{ opt.label }}
    </SSelectItem>
  </div>
</template>
