<script setup lang="ts">

import { ref } from 'vue';


const props = withDefaults(
  defineProps<{
    disabled?: boolean,
    borderRadius?: string,
  }>(), {
  disabled: false,
  borderRadius: ''
}
)

const instance = getCurrentInstance();


const {active, tabs, selectTab}  = inject("tabsState", {
  active: ref(0),
  tabs: ref<any>([]),
  selectTab: (t:number) => {},
});

const index = computed(() =>
  tabs.value.findIndex((target:any) => target.uid === instance?.uid)
);
const isActive = computed(() => index.value === active.value);

const activateTab = () => {
  selectTab(index.value);
};

watchEffect(() => {
  if (index.value === -1) {
    if (instance)
    tabs.value.push(instance);
  }
});

</script>

<template>
  <button
    role="tab"
    class="s-tab flex justify-center items-center"
    :disabled="disabled"
    :class="[
      { 's-tab_active': isActive },
      borderRadius ? `s-tab_border-radius-${borderRadius}` : 's-tab_border-radius-none'
    ]"
    @click="activateTab"
  >
    <div class="s-tab__label-container flex justify-center items-center">
      <div class="s-tab__label">
        <slot />
      </div>
    </div>
  </button>
</template>

<style lang="scss">
$border-radius-side: v-bind(borderRadius);

$inactive-font-color: var(--s-color-base-content-primary);
$background-color: var(--s-color-base-background);
$hover-font-color: var(--s-color-theme-accent-hover);
$text-color-active: var(--s-color-base-content-primary);
$text-color-disabled: var(--s-color-base-content-quaternary);

.s-tab {
  @apply select-none;
  padding: 4px;

  background: $background-color;
  color: $inactive-font-color;

  font-family: Sora;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 180%;
  outline: none;

  &_border-radius-none {
    border-radius: 0;
  }

  &_border-radius-right {
    border-radius: 0 8px 8px 0;
  }

  &_border-radius-left {
    border-radius: 8px 0 0 8px;
  }

  &_border-radius-full {
    border-radius: 8px;
  }

  &:not(.s-tab_active) .s-tab__label {
    opacity: 0.55;
  }

  &:focus {
    outline: none;
  }

  &:hover:not(.s-tab_active, .s-tab:disabled) {
    color: $hover-font-color;

    .s-tab__label {
      opacity: 1;
    }
  }

  &_active {
    cursor: default;
    color: $text-color-active;

    .s-tab__label-container {
      background: white;
      box-shadow: 0px 1px 1px rgba(83, 86, 90, 0.1);
    }
  }

  &__label-container {
    width: 100%;
    height: 100%;
    padding: 4px 16px;
    border-radius: 8px;
  }

  &:disabled {
    cursor: default;

    .s-tab__label {
      color: $text-color-disabled;
      opacity: 0.7;
    }
  }
}
</style>