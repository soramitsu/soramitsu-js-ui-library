<script setup lang="ts">
const value = ref<null | string | number>(null)
</script>

<template>
  <SRadioGroup v-model="value">
    <template #label>
      Pizza Crust
    </template>

    <SRadioButton value="regular">
      Regular crust
    </SRadioButton>

    <SRadioButton
      value="deep"
      bordered
    >
      Deep dish
    </SRadioButton>

    <SRadioButton
      value="thin"
      bordered
      has-description
    >
      Thin crust

      <template #description>
        Description
      </template>
    </SRadioButton>

    <SRadioButton nude />
  </SRadioGroup>

  <!-- alternate labelling -->
  <SRadioGroup labelled-by="l1">
    <h3 id="l1">
      Pizza Crust
    </h3>
  </SRadioGroup>
  <!-- or?.. -->
  <SRadioGroup v-slot="{ labelledBy }">
    <h3 :id="labelledBy">
      Pizza Crust
    </h3>
  </SRadioGroup>

  <!-- Alternate description -->
  <SRadioButton has-description="Yey" />

  <SCheckbox />
</template>
