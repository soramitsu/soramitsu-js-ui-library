<script setup lang="ts">
type BtnType = 'primary' | 'outline'

const props = withDefaults(
    defineProps<{
        rounded: boolean
        type: BtnType
    }>(),
    {
        type: 'primary',
    },
)
</script>

<template>
    <div
        :class="[
            's-button',
            `s-button--type-${type}`,
            {
                's-rounded--rounded': rounded,
            },
        ]"
    >
        <slot />
    </div>
</template>

<style lang="scss">
.s-button {
    color: white;
}
</style>
