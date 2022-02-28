<script setup lang="ts">
interface Props {
  modelValue: string
  readonly type: string
  unlinkPanels: string
  readonly: boolean
  disabled: boolean
  size?: string
  editable: boolean
  clearable: boolean
  placeholder: string
  startPlaceholder: string
  endPlaceholder: string
  readonly format: string
   readonly align: string
   readonly popperClass: string
  readonly pickerOptions: object
   readonly rangeSeparator: string
   readonly defaultValue: any
   readonly defaultTime: Array<string>
   readonly valueFormat: string
   readonly name: string
  readonly clearIcon: string
  readonly validateEvent: boolean

  readonly borderRadius?: string
}
</script>
<template>
  <el-input
    class="el-date-editor"
    :class="'el-date-editor--' + type"
    :readonly="!editable || readonly || type === 'dates' || type === 'week'"
    :disabled="pickerDisabled"
    :size="pickerSize"
    :name="name"
    v-bind="firstInputId"
    v-if="!ranged"
    v-clickoutside="handleClose"
    :placeholder="placeholder"
    @focus="handleFocus"
    @keydown.native="handleKeydown"
    :value="displayValue"
    @input="value => userInput = value"
    @change="handleChange"
    @mouseenter.native="handleMouseEnter"
    @mouseleave.native="showClose = false"
    :validateEvent="false"
    ref="reference">
    <i slot="prefix"
      class="el-input__icon"
      :class="triggerClass"
      @click="handleFocus">
    </i>
    <i slot="suffix"
      class="el-input__icon"
      @click="handleClickIcon"
      :class="[showClose ? '' + clearIcon : '']"
      v-if="haveTrigger">
    </i>
  </el-input>
  <div
    class="el-date-editor el-range-editor el-input__inner"
    :class="[
      'el-date-editor--' + type,
      pickerSize ? `el-range-editor--${ pickerSize }` : '',
      pickerDisabled ? 'is-disabled' : '',
      pickerVisible ? 'is-active' : ''
    ]"
    @click="handleRangeClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="showClose = false"
    @keydown="handleKeydown"
    ref="reference"
    v-clickoutside="handleClose"
    v-else>
    <i :class="['el-input__icon', 'el-range__icon', triggerClass]"></i>
    <input
      autocomplete="off"
      :placeholder="startPlaceholder"
      :value="displayValue && displayValue[0]"
      :disabled="pickerDisabled"
      v-bind="firstInputId"
      :readonly="!editable || readonly"
      :name="name && name[0]"
      @input="handleStartInput"
      @change="handleStartChange"
      @focus="handleFocus"
      class="el-range-input">
    <slot name="range-separator">
      <span class="el-range-separator">{{ rangeSeparator }}</span>
    </slot>
    <input
      autocomplete="off"
      :placeholder="endPlaceholder"
      :value="displayValue && displayValue[1]"
      :disabled="pickerDisabled"
      v-bind="secondInputId"
      :readonly="!editable || readonly"
      :name="name && name[1]"
      @input="handleEndInput"
      @change="handleEndChange"
      @focus="handleFocus"
      class="el-range-input">
    <i
      @click="handleClickIcon"
      v-if="haveTrigger"
      :class="[showClose ? '' + clearIcon : '']"
      class="el-input__icon el-range__close-icon">
    </i>
  </div>
</template>
<style></style>