<template>
  <el-button-group>
    <slot></slot>
  </el-button-group>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ElButtonGroup from 'element-ui/lib/button-group'

@Component({
  components: {
    ElButtonGroup
  }
})
export default class SButtonGroup extends Vue {}
</script>
