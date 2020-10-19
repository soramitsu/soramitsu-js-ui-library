<template>
  <div class="s-slider">
    <el-slider
      ref="el-slider"
      v-model="model"
      :min="min"
      :max="max"
      :show-tooltip="showTooltip"
      :tooltip-class="tooltipClass"
      :format-tooltip="formatTooltip"
      :step="step"
      :show-stops="showStops"
      :show-input="showInput"
      :show-input-controls="showInputControls"
      :input-size="inputSize"
      :debounce="debounce"
      :vertical="isVertical && (height !== '')"
      :height="height"
      :label="label"
      :range="range"
      :marks="marks"
      :disabled="disabled"
      @input="handleInput"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { ElSlider } from 'element-ui/types/slider'

@Component
export default class SSlider extends Vue {
  /**
   * Binding value
   */
  @Prop({ default: 0 }) readonly value!: number | number[]
  /**
   * Minimum value
   */
  @Prop({ default: 0, type: Number }) readonly min!: number
  /**
   * Maximum value
   */
  @Prop({ default: 100, type: Number }) readonly max!: number
  /**
   * Show tooltip
   */
  @Prop({ default: true, type: Boolean }) readonly showTooltip!: boolean
  /**
   * Custom class name for the tooltip
   */
  @Prop({ default: '', type: String }) readonly tooltipClass!: string
  /**
   * Step size
   */
  @Prop({ default: 1, type: Number }) readonly step!: number
  /**
   * Whether to display breakpoints
   */
  @Prop({ default: false, type: Boolean }) readonly showStops!: boolean
  /**
   * Whether to display an input box, works when range is false
   */
  @Prop({ default: false, type: Boolean }) readonly showInput!: boolean
  /**
   * Whether to display control buttons when show-input is true
   */
  @Prop({ default: true, type: Boolean }) readonly showInputControls!: boolean
  /**
   * Size of the input box
   */
  @Prop({ default: 'small', type: String }) readonly inputSize!: 'large' | 'medium' | 'small' | 'mini'
  /**
   * Debounce delay when typing, in milliseconds, works when show-input is true
   */
  @Prop({ default: 300, type: Number }) readonly debounce!: number
  /**
   * Vertical mode
   */
  @Prop({ default: true, type: Boolean }) readonly isVertical!: boolean
  /**
   * Slider height, required in vertical mode
   */
  @Prop({ default: '', type: String }) readonly height!: string
  /**
   * Label for screen reader
   */
  @Prop({ default: '', type: String }) readonly label!: string
  /**
   * Whether to select a range
   */
  @Prop({ default: false, type: Boolean }) readonly range!: boolean
  /**
   * Marks， type of key must be number and must in closed interval [min, max], each mark can custom style
   */
  @Prop({ default: () => {}, type: Object }) readonly marks!: object
  /**
   * Whether Slider is disabled
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean

  model = this.value

  @Watch('value')
  private handlePropChange (value: number): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: number): void {
    this.$emit('input', value)
    this.$emit('change', value)
  }

  handleInput (value: number): void {
    this.$emit('input', value)
  }

  handleChange (value: number): void {
    this.$emit('change', value)
  }

  formatTooltip (value: number): number {
    // To format tooltip value you shoud change return value at the next line
    // return value / 100
    return value
  }
}
</script>
