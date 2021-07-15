<template>
  <el-main class="s-main">
    <slot></slot>
  </el-main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ElMain from 'element-ui/lib/main'

@Component({
  components: { ElMain }
})
export default class SMain extends Vue {
}
</script>
