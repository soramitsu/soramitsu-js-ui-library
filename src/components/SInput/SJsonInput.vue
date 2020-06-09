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
@import "~@/styles/variables.scss";

.icon-error {
  background-image: url('~@/assets/icons/warning.svg');
  background-repeat: no-repeat;
  background-position: 2px center;
}
.json-viewer {
  width: 100%;
  border: 1px solid $gray;
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
    .jsoneditor-parse-error-icon {
      @extend .icon-error;
      pointer-events: none; // If full error message will be needed, then it should be removed
    }
  }
  .jsoneditor-statusbar,
  .ace_gutter .ace_gutter-cell,
  .ace_tooltip {
    font-family: $font-family-default;
  }
  .ace_gutter .ace_gutter-cell.ace_error {
    @extend .icon-error;
  }
  div.jsoneditor-outer.has-main-menu-bar {
    margin-top: 0;
    padding-top: 0;
  }
  .ace_tooltip {
    background: $black; // TODO: fix el-tooltip colors, when tooltip component will be created
    border-color: $black;
    color: $white;
    border-radius: 4px;
    padding: 10px;
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>
