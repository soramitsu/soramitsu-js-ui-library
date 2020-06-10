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

$color-ide-variable: #0451A5;
$color-ide-string: #A31515;
$color-ide-number: #098658;
$color-ide-boolean: #0000FF;

.icon-error {
  background-image: url('~@/assets/icons/warning.svg');
  background-repeat: no-repeat;
  background-position: 2px center;
}

.json-viewer {
  width: 100%;
  border: 1px solid $color-neutral-border;
  border-radius: $border-radius-default;
}
.jsoneditor {
  border: none;
  font-family: $font-family-mono;
  .jsoneditor-outer.has-main-menu-bar {
    margin-top: 0;
    padding-top: 0;
  }
  .jsoneditor-menu {
    display: none;
  }
  .ace-jsoneditor {
    .ace_fold {
      border: none;
      background: none;
      color: $color-basic-black;
      margin-top: -13px;
    }
    .ace_text-layer {
      color: $color-basic-black;
    }
    .ace_variable {
      color: $color-ide-variable;
    }
    .ace_string {
      color: $color-ide-string;
    }
    .ace_constant {
      &.ace_numeric {
        color: $color-ide-number;
      }
      &.ace_language {
        color: $color-ide-boolean;
      }
    }
    &.ace_editor {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      .ace_marker-layer {
        .ace_active-line {
          background-color: $color-neutral-placeholder;
        }
        .ace_selection {
          background: $color-neutral-border;
        }
      }
    }
  }
  .jsoneditor-statusbar {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background-color: $color-neutral-placeholder;
    color: $color-neutral-secondary;
    .jsoneditor-parse-error-icon {
      // If full error message will be needed, then it should be removed
      display: none !important;
      pointer-events: none;
    }
  }
  .ace_gutter {
    background-color: $color-neutral-placeholder;
    &-active-line {
      background-color: $color-neutral-border;
    }
    .ace_gutter-cell.ace_error {
      @extend .icon-error;
    }
  }
  .ace_editor,
  .ace_gutter .ace_gutter-cell {
    font-family: $font-family-mono;
  }
  .ace_tooltip {
    font-family: $font-family-default;
    background: $color-basic-black; // TODO: fix el-tooltip colors, when tooltip component will be created
    border-color: $color-basic-black;
    color: $color-basic-white;
    border-radius: $border-radius-default;
    padding: 10px;
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>
