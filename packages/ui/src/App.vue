<script setup lang="ts">
import 'virtual:windi.css'
import { SRadioButton, SRadioGroup } from './components/Radio'

const value = ref(null)

// const set = shallowReactive(new Set())

// const val = ref(1)
// const double = computed(() => val.value * 2)

// const el = templateRef('btn')

// function append() {
//   set.add({ val, double, el })
//   val.value++
// }

// watch(set, (set) =>
//   console.log(
//     'updated %o',
//     [...set].map((x) => [x.val.value, x.double.value].join(' ')),
//   ),
// )
</script>

<template>
  <div class="m-10 space-y-4">
    <p>Model: {{ value || 'none' }}</p>

    <button>
      Pre
    </button>

    <SRadioGroup v-model="value">
      <template #label>
        Pizza Crust
      </template>

      <SRadioButton value="regular">
        Regular crust
      </SRadioButton>

      <SRadioButton value="deep">
        Deep dish
      </SRadioButton>

      <SRadioButton value="thin">
        Thin crust
      </SRadioButton>
    </SRadioGroup>

    <button>
      Post
    </button>
  </div>
</template>

<style lang="scss">
@use '@/theme';
@use '@soramitsu-ui/theme/fonts/Sora';

@include theme.typography-preset-default;

:root {
  @include theme.tokens-preset-light;
}

button {
  @apply px-2 rounded bg-blue-200;

  &:hover {
    @apply bg-blue-200;
  }

  &:focus {
    @apply ring ring-blue-600;
  }
}
</style>
