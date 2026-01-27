<script setup>
defineProps({
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' },
})
</script>

<template>
    <button
        :type="type"
        class="px-4 py-2 rounded text-sm font-medium cursor-pointer hover:shadow-sm active:scale-95 transition"
        :class="{
      'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
      'bg-gray-200 hover:bg-gray-300': variant === 'secondary',
      'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
    }"
    >
        <slot />
    </button>
</template>

<style scoped>

</style>
