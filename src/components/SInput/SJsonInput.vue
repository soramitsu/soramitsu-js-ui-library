<template>
  <div class="json-viewer">
    <v-jsoneditor
      v-model="value"
      :options="options"
      :plus="false"
      height="400px"
      @error="onError"
    >
    </v-jsoneditor>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, Ref } from 'vue-property-decorator'

@Component
export default class SJsonInput extends Vue {
  @Prop({ default: '' }) readonly json!: any

  value = this.json

  options = {
    onChange: (e) => {
      console.log(e)
    },
    mode: 'code'
  }

  onError (): void {}
}
</script>

<style lang="scss">
.json-viewer {
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
}
.jsoneditor {
  border: none;
  .jsoneditor-menu {
    width: 0;
    height: 0;
    position: absolute;
    visibility: hidden;
  }
  .ace-jsoneditor.ace_editor {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .jsoneditor-statusbar {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .jsoneditor-statusbar,
  .ace_gutter .ace_gutter-cell {
    font-family: 'Sora', sans-serif !important;
  }
  div.jsoneditor-outer.has-main-menu-bar {
    margin-top: 0;
    padding-top: 0;
  }
}
</style>
