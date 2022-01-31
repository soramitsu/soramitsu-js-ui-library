<script setup lang="ts">
interface Props {
  /**
   * v-model for two-way data binding
   */
  modelValue?: boolean
  /**
   * Id for matching switch with label
   *
   */
  id: string
  /**
   * Text label for switch
   *
   * @default ''
   */
  label?: string
  /**
   * Attr specifies whether switch is active
   *
   * @default true
   */
  checked?: boolean
  /**
   * Attr specfifies whether switch is disabled
   *
   * @default false
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  checked: true,
  disabled: false,
})

const emit = defineEmits<(event: 'update:modelValue', value: boolean) => void>()
const model = useVModel(props, 'modelValue', emit)

console.log('modelValue', model.value)

function onSwitchChange(e: Event) {
  model.value = (e.target as HTMLInputElement).checked
}
</script>

<template>
  <div class="s-switch">
    <input
      type="checkbox"
      @change="onSwitchChange"
      :id="id"
      :checked="checked"
      :disabled="disabled"
      class="s-switch-button"
    />
    <label :for="id" class="s-switch-label">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.s-switch {
  display: flex;
  align-items: center;
  &-button {
    position: relative;
    background-color: var(--s-color-base-border-primary);
    width: 40px;
    height: 20px;
    appearance: none;
    outline: none;
    border-radius: 20px;
    transition: 0.5s;
    &:checked {
      background-color: var(--s-color-theme-accent);
    }
    &:checked:hover {
      background-color: var(--s-color-theme-accent-hover);
    }
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      top: 0;
      left: 0;
      background-color: var(--s-brand-white);
      transition: 0.5s;
      transform: scale(0.8);
    }
    &:checked::before {
      left: 20px;
    }
    &:hover {
      background-color: var(--s-color-theme-accent-hover);
      cursor: pointer;
    }
    &:disabled {
      background-color: var(--s-color-base-border-primary);
    }
    &:disabled + .s-switch-label {
      color: var(--s-color-base-content-quaternary);
    }
    &:disabled:hover {
      background-color: var(--s-color-base-border-primary);
      cursor: pointer;
    }
  }
  &-label {
    font-family: Sora;
    color: var(--s-color-base-content-primary);
    font-size: 20px;
    margin-left: 8px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
