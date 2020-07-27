<template>
  <div
    class="s-json-input"
    :class="computedClasses"
  >
    <v-jsoneditor
      v-model="model"
      :options="options"
      :plus="false"
      :height="height"
      @error="handleError"
    >
    </v-jsoneditor>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import isEmpty from 'lodash/isEmpty'

@Component
export default class SJsonInput extends Vue {
  /**
   * Value of JSON input. Could be used with `v-model`
   */
  @Prop({ type: Object }) readonly value!: object
  /**
   * Height of JSON input component. Minimum value should be around `"150px"`.
   *
   * In this context, the value of the height property must match the valid value of the
   * **CSS height** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ type: String, default: '' }) readonly height!: string
  /**
   * Disabled state
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  /**
   * Autocomplete dictionary. For now it doesn't work for some reasons
   */
  @Prop({ type: Array }) readonly dictionary!: Array<string>

  model = this.value
  options = {
    // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
    mode: 'code',
    mainMenuBar: false,
    statusBar: true,
    autocomplete: {
      caseSensitive: false,
      getOptions: () => {
        return isEmpty(this.dictionary) ? null : this.dictionary
      }
    }
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.disabled) {
      cssClasses.push('disabled')
    }
    return cssClasses
  }

  handleError (error: string): void {
    this.$emit('error', error)
  }

  @Watch('value', { deep: true })
  private handlePropChange (value: object): void {
    this.model = value
  }

  @Watch('model', { deep: true })
  private handleValueChange (value: object): void {
    this.$emit('change', value)
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/icons.scss";

$color-ide-variable: #0451A5;
$color-ide-string: #A31515;
$color-ide-number: #098658;
$color-ide-boolean: #0000FF;

.s-json-input {
  width: 100%;
  border: 1px solid $color-neutral-border;
  border-radius: $border-radius-default;
  &.disabled {
    .ace-jsoneditor {
      pointer-events: none;
      .ace_cursor {
        display: none !important;
      }
      .ace_scroller,
      .ace_gutter-active-line {
        background-color: $color-neutral-placeholder;
      }
    }
  }
  // TODO: think about hover and focus
}

.jsoneditor {
  border: none !important;
  font-family: $font-family-mono;
  .ace-jsoneditor {
    *, textarea.jsoneditor-text * {
      font-family: $font-family-mono;
    }
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
      @extend .s-icon-error; // TODO: fix the path for icon
    }
  }
  .ace_editor .ace_content,
  .ace_gutter .ace_gutter-cell {
    font-family: $font-family-mono;
  }
  .ace_tooltip {
    font-family: $font-family-default;
    background: $color-basic-black;
    border-color: $color-basic-black;
    color: $color-basic-white;
    border-radius: $border-radius-default;
    padding: 10px;
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>
